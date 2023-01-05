<template>
  <v-card
    :prepend-icon="todo.isDone ? 'mdi-check' : ''"
    :title="todo.title"
    :text="todo.description"
    :subtitle="formatDateTime(todo.createdAt)"
    :loading="todoCardLoading"
    class="my-3"
  >
    <TodoFormEdit :key="keyEditTodo" :dialog="dialogEditTodo" :todo="todo" />
    <v-card-actions class="d-flex justify-end">
      <!-- Toggle button -->
      <v-tooltip :text="todo.isDone ? 'Uncheck 😒' : 'Check 😊'">
        <template v-slot:activator="{ props }">
          <v-btn
            @click="toggleDone(todo._id)"
            v-bind="props"
            size="x-small"
            :icon="todo.isDone ? 'mdi-close' : 'mdi-check'"
          >
          </v-btn>
        </template>
      </v-tooltip>

      <!-- Edit button -->
      <v-tooltip text="Edit Todo 🤣">
        <template v-slot:activator="{ props }">
          <v-btn
            @click="editTodo"
            v-bind="props"
            size="x-small"
            icon="mdi-pencil"
          >
          </v-btn>
        </template>
      </v-tooltip>

      <!-- Delete button -->
      <v-tooltip text="Delete Todo 😒">
        <template v-slot:activator="{ props }">
          <v-btn
            @click="deleteTodo(todo._id)"
            v-bind="props"
            size="x-small"
            icon="mdi-delete"
            color="error"
          >
          </v-btn>
        </template>
      </v-tooltip>
    </v-card-actions>
  </v-card>
</template>

<script>
import { ref } from "vue";
import useTodoStore from "@/store/todo.js";
import useAlertStore from "@/store/alert.js";
import TodoFormEdit from "@/components/TodoFormEdit.vue";

export default {
  name: "TodoCard Component",
  props: ["todo"],
  components: { TodoFormEdit },
  setup(props) {
    // Properties
    const todoStore = useTodoStore();
    const alertStore = useAlertStore();
    const keyEditTodo = ref(0);
    const dialogEditTodo = ref(false);
    const todoCardLoading = ref(false);
    const todo = ref(props.todo);
    const timeOut = 500;

    // Method
    async function toggleDone(id) {
      todoCardLoading.value = true;
      const response = await todoStore.toggleDone(id);
      if (response.status === 200) {
        setTimeout(() => {
          todoStore.loadTodos();
          todoCardLoading.value = false;
        }, timeOut);
      }
    }

    function editTodo() {
      dialogEditTodo.value = true;
      keyEditTodo.value = Math.floor(Math.random() * 100);
    }

    async function deleteTodo(id) {
      const confirmed = confirm("Delete Todo? 😒");
      if (confirmed) {
        const response = await todoStore.deleteTodo(id);
        if (response.status === 200) {
          todoCardLoading.value = true;
          setTimeout(() => {
            todoStore.loadTodos();
            todoCardLoading.value = false;
            alertStore.trigger({
              type: "success",
              message: "Todo deleted successfully 👌"
            })
          }, timeOut);
        }
      }
    }

    function formatDateTime(dateTime) {
      return new Date(dateTime).toDateString();
    }

    // Expose to template
    return {
      keyEditTodo,
      dialogEditTodo,
      todo,
      todoCardLoading,
      toggleDone,
      editTodo,
      deleteTodo,
      formatDateTime,
    };
  },
};
</script>

<style scoped>
* {
  user-select: none;
}
</style>
