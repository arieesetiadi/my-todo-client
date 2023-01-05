import { defineStore } from "pinia";
import { ref, computed } from "vue";

const useAlertStore = defineStore("alertStore", () => {
  // Properties
  const status = ref(false);
  const type = ref("");
  const message = ref("")

  const alert = computed(() => {
    return {
      type: type.value,
      message: message.value
    }
  })

  // Methods
  function trigger(alert) {
    status.value = true;
    type.value = alert.type;
    message.value = alert.message;
  }

  function dismiss(){
    status.value = false;
    type.value = "";
    message.value = "";
  }

  return {
    status, type, message, alert, trigger, dismiss
  };
});

export default useAlertStore;
