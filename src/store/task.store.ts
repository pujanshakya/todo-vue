/* eslint-disable prettier/prettier */
/* eslint-disable no-debugger */
export const taskStore = {
  namespace: true,
  state: {
    tasks: [],
    formData: {
      id: 0,
      title: "",
    },
  },
  mutations: {
    ADD_TASKS(state: any, task: Array<{ [key: string]: any }>) {
      state.tasks = task;
    },
    REMOVE_TASK(state: any, task: string) {
      state.tasks.splice(state.tasks.indexOf(task), 1);
    },
    ADD_TASK(state: any, task: { [key: string]: any }) {
      state.formData.title = task.title;
      state.formData.id = task.id;
    },
  },
  actions: {
    // addToFavorites(context, payload) {
    //   const favorites = context.state.favorites;
    //   favorites.push(payload);
    //   context.commit("UPDATE_FAVORITES", favorites);
    // },
  },
};
