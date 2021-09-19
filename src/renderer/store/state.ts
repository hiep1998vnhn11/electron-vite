export type State = {
  darkMode: boolean
}
import { toBoolean } from '@renderer/utils/transform'

const state: () => State = () => ({
  darkMode: toBoolean(localStorage.getItem('darkMode')),
})

export default state
