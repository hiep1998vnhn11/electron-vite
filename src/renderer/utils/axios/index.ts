import type { AxiosResponse } from 'axios'
import type { RequestOptions, Result } from '/#/axios'
import type { AxiosTransform, CreateAxiosOptions } from './axiosTransform'
import { VAxios } from './Axios'
import { checkStatus } from './checkStatus'
import { useGlobSetting } from '/@/hooks/setting'
import { RequestEnum, ResultEnum, ContentTypeEnum } from '/@/enums/httpEnum'
import { isString } from '/@/utils/is'
import { getToken } from '/@/utils/auth'
import { setObjToUrlParams, deepMerge } from '/@/utils'
import { store } from '/@/store'
import { joinTimestamp, formatRequestDate } from './helper'

const globSetting = useGlobSetting()
const urlPrefix = globSetting.urlPrefix
const transform: AxiosTransform = {
  transformRequestHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { isTransformResponse, isReturnNativeResponse } = options
    if (isReturnNativeResponse) {
      return res
    }
    if (!isTransformResponse) {
      return res.data
    }
    const { data } = res
    if (!data) {
      throw new Error('sys.api.apiRequestFailed')
    }
    const { code, result, message } = data
    const hasSuccess = data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS
    if (hasSuccess) {
      return result
    }
    let timeoutMsg = ''
    switch (code) {
      case ResultEnum.TIMEOUT:
        timeoutMsg = 'sys.api.timeoutMessage'
        break
      default:
        if (message) {
          timeoutMsg = message
        }
    }
    if (options.errorMessageMode === 'modal') {
      console.log({ title: 'sys.api.errorTip', content: timeoutMsg })
    } else if (options.errorMessageMode === 'message') {
      console.error(timeoutMsg)
    }

    throw new Error(timeoutMsg || 'sys.api.apiRequestFailed')
  },
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true } = options

    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`
    }

    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`
    }
    const params = config.params || {}
    const data = config.data || false
    formatDate && data && !isString(data) && formatRequestDate(data)
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false))
      } else {
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`
        config.params = undefined
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params)
        if (Reflect.has(config, 'data') && config.data && Object.keys(config.data).length > 0) {
          config.data = data
          config.params = params
        } else {
          config.data = params
          config.params = undefined
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(
            config.url as string,
            Object.assign({}, config.params, config.data)
          )
        }
      } else {
        config.url = config.url + params
        config.params = undefined
      }
    }
    return config
  },
  requestInterceptors: (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = 'Bearer' + token
    }
    return config
  },

  responseInterceptors: (res: AxiosResponse<any>) => {
    return res
  },
  responseInterceptorsCatch: (error: any) => {
    store.dispatch('errorLog/addAjaxErrorInfo', error)
    const { response, code, message, config } = error || {}
    const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none'
    const msg: string = response?.data?.error?.message ?? ''
    const err: string = error?.toString?.() ?? ''
    let errMessage = ''

    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        errMessage = 'sys.api.apiTimeoutMessage'
      }
      if (err?.includes('Network Error')) {
        errMessage = 'sys.api.networkExceptionMsg'
      }

      if (errMessage) {
        if (errorMessageMode === 'modal') {
          console.log({ title: 'sys.api.errorTip', content: errMessage })
        } else if (errorMessageMode === 'message') {
          console.error(errMessage)
        }
        return Promise.reject(error)
      }
    } catch (error: any) {
      throw new Error(error)
    }

    checkStatus(error?.response?.status, msg, errorMessageMode)
    return Promise.reject(error)
  },
}

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    deepMerge(
      {
        authenticationScheme: '',
        timeout: 10 * 1000,
        urlPrefix: urlPrefix,
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        transform,
        requestOptions: {
          joinPrefix: true,
          isReturnNativeResponse: false,
          isTransformResponse: true,
          joinParamsToUrl: false,
          formatDate: true,
          errorMessageMode: 'message',
          apiUrl: globSetting.apiUrl,
          joinTime: true,
          ignoreCancelToken: true,
          withToken: true,
        },
      },
      opt || {}
    )
  )
}
export const defHttp = createAxios()
