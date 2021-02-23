import { storeState } from '@types/index'
import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'

declare module "@vue/runtime-core" {
  // Declare your own store states.
  interface State extends storeState {}

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
