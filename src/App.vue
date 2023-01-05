<template>
	<router-view />
</template>

<script>
import useAppStore from "@/store/app.js";

export default {
	setup() {
		const appStore = useAppStore();

		console.log(appStore.APIBaseURI);
	},
};
</script>
