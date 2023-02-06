<!-- eslint-disable no-undef -->
<!-- eslint-disable no-debugger -->
<!-- eslint-disable prettier/prettier -->
<template>
  <div>
    <div class="container">
      <div class="alert alert-primary" role="alert">
        <center>
          <h2>
            <b><i class="text-danger">TODO</i> APP</b>
          </h2>
        </center>
      </div>

      <div class="card">
        <div class="card-body">
          <form>
            <div class="form-row align-items-center">
              <div class="col-sm-3 my-1">
                <input
                  type="text"
                  class="form-control"
                  v-model="newTask"
                  id="inlineFormInputName"
                  placeholder="Add Task"
                />
              </div>

              <div class="col-auto my-1">
                <!-- <button type="submit" class="btn btn-primary" @click.prevent="addTask">Add</button> -->
                <button
                  class="btn btn-outline-primary my-2 my-sm-0"
                  type="submit"
                  @click.prevent="addTask"
                  :disabled="isAddBtnDisabled"
                >
                  <b>Add</b>
                </button>
              </div>
            </div>
          </form>

          <ul class="list-group">
            <li class="list-group-item active"><b>Tast List</b></li>
            <TaskComponent
              v-for="(task, i) in taskList"
              :key="i"
              :task="task"
              :method="getTaskLists"
            />
            <!-- {{ taskLists }} -->
          </ul>
        </div>
      </div>
    </div>

    <button
      type="button"
      class="btn btn-primary modal-button"
      id="task-modal"
      data-toggle="modal"
      data-target="#editTaskModal"
    >
      Launch demo modal
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="editTaskModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="#editTaskModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editTaskModalLabel">Edit Task</h5>
            <button
              type="button"
              class="close"
              id="modal-close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="task-form">
              <div class="form-group">
                <label for="title">Title</label>
                <input
                  type="text"
                  class="form-control"
                  name="title"
                  placeholder="Title"
                  :value="taskDetail.title"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">
              Close
            </button>
            <button
              type="button"
              class="btn btn-success"
              @click.prevent="updateTask(taskDetail.id)"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TaskComponent from "./components/TaskComponent.vue";
// @ts-ignore
import { mapState } from "vuex";
import HttpService from "./services/axios-http.service";
import { useToast } from "vue-toastification";
import type { ITaskFormData } from "./interfaces/task-store.interface";

export default defineComponent({
  components: { TaskComponent },
  data() {
    return {
      newTask: "",
      formData: {},
      isAddBtnDisabled: false,
    };
  },
  computed: {
    ...mapState({
      taskList(state: any) {
        return state.taskStore.tasks;
      },
      taskDetail(state: any): ITaskFormData {
        return state.taskStore.formData;
      },
    }),
  },
  methods: {
    async addTask() {
      this.isAddBtnDisabled = true;
      const toast = useToast();
      const url: string = "api/task";
      const data = {
        title: this.newTask,
      };
      const response = await HttpService.create(url, data);
      toast.success(response.message);
      this.getTaskLists();
      this.isAddBtnDisabled = false;
    },
    async getTaskLists() {
      const url: string = "api/task";
      const response = await HttpService.get(url);

      this.$store.commit("ADD_TASKS", response.data);
      this.newTask = "";
    },

    async updateTask(id: number) {
      const toast = useToast();
      const myForm: HTMLElement = document.getElementById("task-form");
      const formData = new FormData(myForm);
      const data = {};
      // need to convert it before using not with XMLHttpRequest
      for (let [key, val] of formData.entries()) {
        Object.assign(data, { [key]: val });
      }
      const url = `/api/task/update/${id}`;
      const response = await HttpService.update(url, data);
      const closeModal = document.getElementById("modal-close");
      console.log(closeModal);
      toast.success(response.message);
      closeModal?.click();
      this.getTaskLists();
    },
  },
  mounted() {
    this.getTaskLists();
  },
});
</script>
