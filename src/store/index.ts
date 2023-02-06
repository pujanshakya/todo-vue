// @ts-ignore
import { Store } from "vuex";
// @ts-ignore
import { createStore } from "vuex";
import { taskStore } from "./task.store";
import type { InjectionKey, State } from "vue";

// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const state = createStore({
  modules: { taskStore },
});
