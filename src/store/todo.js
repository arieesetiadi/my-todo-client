import axios from "axios";
import useAppStore from "./app.js";
import { defineStore } from "pinia";
import { ref } from "vue";

const appStore = useAppStore();
const APIBaseURI = appStore.APIBaseURI;

const useTodoStore = defineStore("todoStore", () => {
  // Properties
  const todos = ref([]);

  // Actions
  async function getTodo(id) {
    const response = await axios.get(`${APIBaseURI}/todos/${id}`);
    const todo = response.data.data;
    return todo;
  }

  async function loadTodos() {
    const response = await axios.get(`${APIBaseURI}/todos`);
    todos.value = Array.from(response.data.data);
  }

  async function storeTodo({ title, description }) {
    const response = await axios.post(`${appStore.APIBaseURI}/todos`, {
      title,
      description,
    });
    return response;
  }

  async function updateTodo({ id, title, description }) {
    const response = await axios.put(`${appStore.APIBaseURI}/todos/${id}`, {
      title,
      description,
    });
    return response;
  }

  async function deleteTodo(id) {
    const response = await axios.delete(`${APIBaseURI}/todos/${id}`);
    return response;
  }

  async function toggleDone(id) {
    const todo = await getTodo(id);
    const response = await axios.put(`${appStore.APIBaseURI}/todos/${id}`, {
      isDone: !todo.isDone,
    });
    return response;
  }

  async function setAllStatus(status) {
    const response = await axios.post(
      `${appStore.APIBaseURI}/todos/set-status`,
      {
        status,
      }
    );
    return response;
  }

  return {
    todos,
    getTodo,
    toggleDone,
    loadTodos,
    storeTodo,
    updateTodo,
    deleteTodo,
    setAllStatus,
  };
});

export default useTodoStore;
