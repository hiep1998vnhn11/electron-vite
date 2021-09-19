import type { Tab } from '@renderer/types/tab'
import type { Commit } from 'vuex'
import { getItem, setItem } from '@renderer/utils/storage'
type TabState = {
  tabs: Tab[]
}
type Context = {
  state: TabState
  commit: Commit
  getters: any
  rootState: any
  rootGetters: any
}

const tabKey = 'listTab'
const initState: TabState = {
  tabs: getItem(tabKey) || [
    { title: 'Tab1', name: 'Message' },
    { title: 'Tab2', name: 'Search' },
  ],
}

const state = () => initState

const getters = {
  tabs: (state: TabState) => state.tabs,
}

const actions = {
  removeTab({ commit, state }: Context, index: number) {
    commit('SET_TABS', [
      ...state.tabs.slice(0, index),
      ...state.tabs.slice(index + 1, state.tabs.length),
    ])
  },
  addTab({ commit, state }: Context, tab: Tab) {
    commit('SET_TABS', [...state.tabs, tab])
  },
  clearTab({ commit }: Context) {
    commit('SET_TABS', [])
  },
}

const mutations = {
  SET_TABS: function (state: TabState, tabs: Tab[]) {
    state.tabs = tabs
    setItem(tabKey, tabs)
  },
}

export default { state, getters, actions, mutations, namespaced: true }
