<template>
  <v-dialog v-model="dialog" persistent class="w-50">
    <v-card>
      <v-card-title class="mt-3">
        <span class="text-h5">
          <v-icon icon="mdi-plus"></v-icon>
          New Todo
        </span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <!-- Show errors if exist -->
            <v-col cols="12">
              <ul style="list-style-type: none">
                <li v-for="(todoError, i) in todoErrors" :key="i" class="py-1">
                  <v-alert
                    :text="todoError.message"
                    type="warning"
                    variant="tonal"
                  ></v-alert>
                </li>
              </ul>
            </v-col>

            <!-- Todo Title -->
            <v-col cols="12">
              <v-text-field
                v-model="todo.title"
                label="Todo Title *"
                hint="What are you going to do? 😊"
                required
              ></v-text-field>
            </v-col>

            <!-- Todo Description -->
            <v-col cols="12">
              <v-textarea
                v-model="todo.description"
                label="Todo Description"
                hint="Tell us more detail about what you are going to do! 👍"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
        <small>* Indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          v-if="!todoLoading"
          color="blue-darken-1"
          variant="text"
          @click="dialog = false"
        >
          Close
        </v-btn>
        <v-btn
          @click="storeTodo"
          color="blue-darken-1"
          variant="text"
          :loading="todoLoading"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { ref } from "vue";
import useTodoStore from "@/store/todo.js";
import useAlertStore from "@/store/alert.js";

export default {
  name: "TodoFormAdd Component",
  props: ["dialog"],
  setup(props) {
    // Properties
    const todoStore = useTodoStore();
    const alertStore = useAlertStore();
    const todo = ref({
      title: "",
      description: "",
    });
    const dialog = ref(props.dialog);
    const todoLoading = ref(false);
    const todoErrors = ref([]);

    // Methods
    async function storeTodo() {
      try {
        const response = await todoStore.storeTodo(todo.value);
        if (response.status === 200) {
          todoLoading.value = true;
          setTimeout(async () => {
            await todoStore.loadTodos();
            todoLoading.value = false;
            dialog.value = false;
            alertStore.trigger({
              type: "success",
              message: "Todo added successfully 😊"
            })
          }, 1000);
        }
      } catch (error) {
        todoErrors.value = error.response.data.error.details;
      }
    }

    // Expose to template
    return {
      todo,
      dialog,
      todoLoading,
      todoErrors,
      storeTodo,
    };
  },
};
</script>

<style scoped>
v-row {
  margin: 0;
  padding: 0;
}
</style>
