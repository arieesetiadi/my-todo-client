<template>
	<v-alert
		@click="dismiss"
		v-if="status"
		:icon="type == 'success' ? 'mdi-check-all' : 'mdi-close'"
		:text="message"
		:type="type"
		variant="tonal"
		class="alert"
	></v-alert>
</template>

<script>
import { ref } from "vue";
import useAlertStore from "@/store/alert.js";

export default {
	name: "TodoAlert Component",
	setup() {
		const alertStore = useAlertStore();
		const { status, type, message, dismiss } = alertStore;

		return { status, type, message, dismiss };
	},
};
</script>