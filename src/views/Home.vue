<template>
	<v-container class="fill-height pa-0">
		<v-responsive class="d-flex align-center fill-height">
			<v-row>
				<v-col cols="12">
					<!-- Todo alert -->
					<TodoAlert :key="alertKey" class="alert" />
				</v-col>

				<!-- Left -->
				<v-col
					cols="12"
					md="6"
					class="d-flex align-center justify-center"
				>
					<div class="text-center">
						<v-img contain height="300" src="@/assets/logo.svg" />

						<div class="text-body-2">Welcome to</div>
						<h1 class="text-h2 font-weight-bold">MyTodo</h1>
					</div>
				</v-col>
				<!-- Right -->
				<v-col cols="12" md="6" class="h-screen">
					<TodoList />
				</v-col>
			</v-row>
		</v-responsive>
	</v-container>
</template>

<script>
import { ref } from "vue";
import TodoList from "@/components/TodoList.vue";
import TodoAlert from "@/components/TodoAlert.vue";
import useAlertStore from "@/store/alert.js";

export default {
	name: "Home View",
	components: {
		TodoList,
		TodoAlert,
	},
	setup() {
		// Properties
		const alertStore = useAlertStore();
		const alertKey = ref(0);

		alertStore.$subscribe(({ events }) => {
			console.log("AlertStore: Something changes");
			alertKey.value = Math.floor(Math.random() * 100);
		});

		return {
			alertKey,
		};
	},
};
</script>

<style>
.alert {
	user-select: none;
	cursor: pointer;
}
</style>
