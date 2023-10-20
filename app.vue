<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
	<UNotifications />
</template>

<script setup>
const user = useSupabaseUser();
// watchEffect(
// 	() => {
// 		if (!user.value) {
// 			return navigateTo("/auth");
// 		}
// 	},
// 	{ immediate: true },
// );
</script>
