<template>
  <v-container>
    <v-row class="buttons-container justify-space-between">
      <!-- new Todo Form -->
      <v-col cols="4" class="pa-0">
        <TodoFormAdd :key="keyAddTodo" :dialog="dialogAddTodo" />
        <v-btn
          @click="addTodo"
          prepend-icon="mdi-plus"
          variant="tonal"
          color="primary"
          class="w-100 text-capitalize"
          >Add Todo 😍</v-btn
        >
      </v-col>

      <!-- Check all -->
      <v-col cols="4" class="pa-0 px-1">
        <v-btn
          @click="checkAll"
          prepend-icon="mdi-check-all"
          variant="tonal"
          color="success"
          class="w-100 text-capitalize"
          :loading="checkAllLoading"
          >Check All 😊</v-btn
        >
      </v-col>

      <!-- Un-check all -->
      <v-col cols="4" class="pa-0">
        <v-btn
          @click="uncheckAll"
          prepend-icon="mdi-cancel"
          variant="tonal"
          color="error"
          class="w-100 text-capitalize"
          :loading="uncheckAllLoading"
          >Uncheck All 😒</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from "vue";
import TodoFormAdd from "@/components/TodoFormAdd.vue";
import useTodoStore from "@/store/todo";
export default {
  name: "TodoList Action Buttons Component",
  components: {
    TodoFormAdd,
  },
  setup() {
    // Properties
    const keyAddTodo = ref(0);
    const dialogAddTodo = ref(false);
    const checkAllLoading = ref(false);
    const uncheckAllLoading = ref(false);
    const todoStore = useTodoStore();

    // Methods
    function addTodo() {
      dialogAddTodo.value = true;
      keyAddTodo.value = Math.floor(Math.random() * 100);
    }

    async function checkAll() {
      checkAllLoading.value = true;
      const response = await todoStore.setAllStatus(true);
      if (response.status === 200) {
        await todoStore.loadTodos();
        checkAllLoading.value = false;
      }
    }

    async function uncheckAll() {
      uncheckAllLoading.value = true;
      const response = await todoStore.setAllStatus(false);
      if (response.status === 200) {
        await todoStore.loadTodos();
        uncheckAllLoading.value = false;
      }
    }

    // Expose to the template
    return {
      keyAddTodo,
      dialogAddTodo,
      checkAllLoading,
      uncheckAllLoading,
      addTodo,
      checkAll,
      uncheckAll,
    };
  },
};
</script>
