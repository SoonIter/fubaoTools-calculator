import {
  createStore
} from 'vuex'
import calculator from './modules/calculator'
export default createStore({
  modules: {
    calculator
  }
})