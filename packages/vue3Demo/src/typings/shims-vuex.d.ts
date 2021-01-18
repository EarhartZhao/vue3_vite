import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import storeState from '/@types/index'

declare module '@vue/runtime-core' {
  // Declare your own store states.
  interface State extend storeState

  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
