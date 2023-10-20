<template>
	<NuxtLayout name="auth">
		<h2 class="mt-10text-2xl font-bold leading-9 tracking-tight">
			Confirm your email address.
		</h2>
		<p>Activate your account now!</p>
		<div class="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
			<UButton block size="md" @click="confirmEmail"
				>Confirm email</UButton
			>
		</div>
	</NuxtLayout>
</template>

<script setup>
const toast = useToast();
const route = useRoute();
console.log(route.query.confirmationURL);
const confirmEmail = () => {
	toast.add({
		title: "Email confirmed!",
		description:
			"Your account has been activated successfully! You may proceed to sign in now.",
		callback: () => {
			navigateTo(route.query.confirmationURL, {
				external: true,
			});
		},
	});
};
</script>
