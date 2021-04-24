import nav from './nav'
import { actions as routerActions, getters as routerGetters, mutations as routerMutations, state as routerState } from './router'

export interface storeState extends routerState, nav {}
export interface storeGetters extends routerGetters {}
export interface storeActions extends routerActions {}
export interface storeMutations extends routerMutations {}
