<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable prettier/prettier -->
<template>
  <div>
    <li
      class="list-group-item d-flex justify-content-between align-items-center"
    >
      <label>{{ task.title }}</label>
      <div class="d-flex align-items-center" style="gap: 10px">
        <button
          type="button"
          class="btn btn-outline-primary btn-sm my-2 my-sm-0 edit-btn"
          @click.prevent="editTask(task.id, $event)"
        >
        <font-awesome-icon icon="pen" />
        </button>
        <button
          class="btn btn-outline-danger btn-sm my-2 my-sm-0 delete-btn"
          type="submit"
          @click.prevent="removeTask(task.id)"
        >
        <font-awesome-icon icon="trash" />
        </button>
      </div>
    </li>

    
  </div>
</template>

<script lang="ts">
import axiosHttpService from "@/services/axios-http.service";
import type { SweetAlertResult } from "sweetalert2";
import { defineComponent } from "vue";
import { useToast } from "vue-toastification";
// @ts-ignore
import { mapState } from "vuex";

export default defineComponent({
  props: ["task", "method"],
  computed: {
    ...mapState({
      taskList(state: any) {
        return state.taskStore.tasks;
      },
    })
  },
  methods: {
    removeTask(id: number) {
      this.$swal
        .fire({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
          },
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "Cancel",
          reverseButtons: true,
        })
        .then(async (result: SweetAlertResult) => {
          if (result.isConfirmed) {
            // Get toast interface
            const toast = useToast();
            const url = `api/task/delete/${id}`;
            const response = await axiosHttpService.delete(url);

            toast.success(response.message);
            this.method();
          }
        });
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    editTask(id: number, event: MouseEvent) {
      const taskModal = document.getElementById("task-modal");
      const lists = this.taskList.find((data) => data.id == id);
      this.$store.commit("ADD_TASK", lists);

      taskModal?.click();
    },
  },
});
</script>
