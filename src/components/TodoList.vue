<template>
  <v-container class="h-screen">
    <v-row class="h-100">
      <!-- Action Buttons -->
      <v-col cols="12">
        <TodoListActionButtons class="pt-10" />
      </v-col>

      <!-- Todo list -->
      <v-col
        :key="todoListKey"
        id="todo-list"
        cols="12"
        class="h-100 overflow-y-auto pb-16"
      >
        <TodoCard v-for="(todo, i) in todos" :key="i" :todo="todo" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { onBeforeMount, ref } from "vue";
import TodoCard from "@/components/TodoCard.vue";
import TodoListActionButtons from "@/components/TodoListActionButtons.vue";
import useTodoStore from "@/store/todo.js";

export default {
  name: "TodoList Component",
  components: {
    TodoCard,
    TodoListActionButtons,
  },
  setup() {
    // Properties
    const todoListKey = ref(0);
    const todoStore = useTodoStore();
    const todos = ref([]);

    onBeforeMount(async () => {
      await todoStore.loadTodos();
    });

    todoStore.$subscribe(({ events }) => {
      console.log("TodoStore: Something changes");
      todos.value = events.newValue;
      todoListKey.value = Math.floor(Math.random() * 100);
    });

    return { todos, todoListKey };
  },
};
</script>

<style>
#todo-list::-webkit-scrollbar {
  display: none;
}
</style>
