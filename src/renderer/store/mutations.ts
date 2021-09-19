import type { State } from './state'
export default {
  TOGGLE_DARK_MODE: (state: State) => {
    state.darkMode = !state.darkMode
    localStorage.setItem('darkMode', JSON.stringify(state.darkMode))
  },
}
