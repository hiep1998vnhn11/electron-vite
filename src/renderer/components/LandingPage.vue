<template>
  <div>
    <div id="wrapper">
      <img id="logo" :src="logo" alt="electron-vue" />
      <main>
        <div class="left-side">
          <span class="title">
            {{ $t('welcome') }}
          </span>
          <SystemInformation />
        </div>

        <div class="right-side">
          <div class="doc">
            <div class="title alt">
              {{ $t('buttonTips') }}
            </div>
            <el-button type="primary" round @click="goTest">
              {{ $t('buttons.console') }}
            </el-button>
            <el-button type="primary" round @click="CheckUpdate('one')">
              {{ $t('buttons.checkUpdate') }}
            </el-button>
          </div>
          <div class="doc">
            <el-button type="primary" round @click="CheckUpdate('two')">
              {{ $t('buttons.checkUpdate2') }}
            </el-button>
            <el-button type="primary" round @click="CheckUpdate('three')">
              {{ $t('buttons.checkUpdateInc') }}
            </el-button>
            <el-button type="primary" round @click="StartServer">
              {{ $t('buttons.startServer') }}
            </el-button>
            <el-button type="primary" round @click="StopServer">
              {{ $t('buttons.stopServer') }}
            </el-button>
            <el-button type="primary" round @click="getMessage">
              {{ $t('buttons.viewMessage') }}
            </el-button>
            <el-button type="primary" round @click="crash">
              {{ $t('buttons.simulatedCrash') }}
            </el-button>
          </div>
          <div class="doc">
            <el-button type="primary" round @click="openNewWin">
              {{ $t('buttons.openNewWindow') }}
            </el-button>
            <el-button type="primary" round @click="changeLanguage">{{
              $t('buttons.changeLanguage')
            }}</el-button>

            <el-button type="primary" round @click="copyClipboard"> Copy clipboard </el-button>
          </div>
          <div class="doc">
            <el-pagination
              :current-page="elCPage"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="elPageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            >
            </el-pagination>
          </div>
        </div>
      </main>
      <el-dialog
        title="123"
        v-model="dialogVisible"
        :before-close="handleClose"
        center
        width="14%"
        top="45vh"
      >
        <div class="conten">
          <el-progress
            type="dashboard"
            :percentage="percentage"
            :color="colors"
            :status="progressStatus"
          ></el-progress>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts">
  import SystemInformation from './LandingPage/SystemInformation.vue'
  import { message } from '@renderer/api/login'
  import logo from '@renderer/assets/logo.png'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { onUnmounted, ref, defineComponent } from 'vue'
  import { useStore } from 'vuex'
  import { i18n, setLanguage } from '@renderer/i18n'
  import useGo from '@renderer/hooks/useGo'
  const { ipcRenderer, clipboard } = require('electron')
  export default defineComponent({
    name: 'landing-page',
    components: {
      SystemInformation,
    },
    setup() {
      const go = useGo()
      const percentage = ref(0)
      const colors = ref([
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#6f7ad3', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#5cb87a', percentage: 100 },
      ] as string | ColorInfo[])
      const dialogVisible = ref(false)
      const progressStatus = ref(null)
      const filePath = ref('')
      const updateStatus = ref('')
      const store = useStore()
      store.dispatch('TEST_ACTION', '123456')
      const elPageSize = ref(100)
      const elCPage = ref(1)

      function changeLanguage() {
        setLanguage(i18n.global.locale === 'zh-cn' ? 'en' : 'zh-cn')
      }

      function handleSizeChange(val: number) {
        elPageSize.value = val
      }

      function handleCurrentChange(val: number) {
        elCPage.value = val
      }

      function crash() {
        process.crash()
      }

      function openNewWin() {
        const data = {
          url: '/form/index',
        }
        ipcRenderer.invoke('open-win', data)
      }
      function getMessage() {
        message().then((res) => {
          ElMessageBox.alert(res.data, '提示', {
            confirmButtonText: '确定',
          })
        })
      }
      function StopServer() {
        ipcRenderer.invoke('stop-server').then((res) => {
          ElMessage({
            type: 'success',
            message: '已关闭',
          })
        })
      }
      function StartServer() {
        ipcRenderer.invoke('start-server').then((res) => {
          if (res) {
            ElMessage({
              type: 'success',
              message: res,
            })
          }
        })
      }
      function open() {}
      function CheckUpdate(data) {
        switch (data) {
          case 'one':
            ipcRenderer.invoke('check-update')
            console.log('Checkupdate!')
            break
          case 'two':
            ipcRenderer.invoke('start-download').then(() => {
              dialogVisible.value = true
            })
            break
          case 'three':
            ipcRenderer.invoke('hot-update')
            break

          default:
            break
        }
      }
      function handleClose() {
        dialogVisible.value = false
      }

      ipcRenderer.on('download-progress', (event, arg) => {
        percentage.value = Number(arg)
      })
      ipcRenderer.on('download-error', (event, arg) => {
        if (arg) {
          progressStatus.value = 'exception'
          percentage.value = 40
          colors.value = '#d81e06'
        }
      })
      ipcRenderer.on('download-paused', (event, arg) => {
        if (arg) {
          progressStatus.value = 'warning'
          ElMessageBox.alert('Dừng tải xuống!', 'Gợi ý', {
            confirmButtonText: 'Đồng ý',
            callback: (action) => {
              ipcRenderer.invoke('start-download')
            },
          })
        }
      })

      ipcRenderer.on('start-download', (event, age) => {
        console.log(event, age)
      })

      ipcRenderer.on('download-done', (event, age) => {
        filePath.value = age.filePath
        progressStatus.value = 'success'
        ElMessageBox.alert('Tải xuống thành công!', 'Gợi ý', {
          confirmButtonText: 'Đồng ý',
          callback: (action) => {
            // electron.shell.openPath(this.filePath);
          },
        })
      })
      ipcRenderer.on('UpdateMsg', (event, age) => {
        switch (age.state) {
          case -1:
            const msgdata = {
              title: 'Update',
              message: age.msg,
            }
            console.log(213)
            dialogVisible.value = false
            ipcRenderer.invoke('open-errorbox', msgdata)
            break
          case 0:
            ElMessage('Case 0')
            break
          case 1:
            ElMessage({
              type: 'success',
              message: 'Case 1',
            })
            dialogVisible.value = true
            break
          case 2:
            ElMessage({ type: 'success', message: 'Case 2' })
            break
          case 3:
            percentage.value = age.msg.percent.toFixed(1)
            break
          case 4:
            progressStatus.value = 'success'
            ElMessageBox.alert('Case 4', 'Gợi ý', {
              confirmButtonText: 'Đồng ý',
              callback: (action) => {
                ipcRenderer.invoke('confirm-update')
              },
            })
            break
          default:
            break
        }
      })

      ipcRenderer.on('hot-update-status', (event, msg) => {
        updateStatus.value = msg.status
      })

      onUnmounted(() => {
        ipcRenderer.removeAllListeners('confirm-message')
        ipcRenderer.removeAllListeners('download-done')
        ipcRenderer.removeAllListeners('download-paused')
        ipcRenderer.removeAllListeners('confirm-stop')
        ipcRenderer.removeAllListeners('confirm-start')
        ipcRenderer.removeAllListeners('confirm-download')
        ipcRenderer.removeAllListeners('download-progress')
        ipcRenderer.removeAllListeners('download-error')
      })

      const goTest = () => go({ name: 'Test' })

      const copyClipboard = () => {
        clipboard.writeText('Copy String', 'selection')
      }

      return {
        StartServer,
        logo,
        StopServer,
        getMessage,
        elCPage,
        percentage,
        dialogVisible,
        filePath,
        handleSizeChange,
        CheckUpdate,
        open,
        openNewWin,
        crash,
        elPageSize,
        ipcRenderer,
        handleClose,
        colors,
        handleCurrentChange,
        changeLanguage,
        updateStatus,
        goTest,
        copyClipboard,
      }
    },
  })
</script>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Source Sans Pro', sans-serif;
  }

  #wrapper {
    padding: 60px 80px;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div {
    flex-basis: 50%;
  }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }
  .doc {
    margin-bottom: 10px;
  }
  .doc p {
    color: black;
    margin-bottom: 10px;
  }
  .doc .el-button {
    margin-top: 10px;
    margin-right: 10px;
  }
  .doc .el-button + .el-button {
    margin-left: 0;
  }
  .conten {
    text-align: center;
  }
</style>
