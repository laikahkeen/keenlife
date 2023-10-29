<template>
	<NuxtLayout name="auth">
		<h2 class="mt-10 text-center text-2xl font-bold">
			Reset Your Password
		</h2>
		<p class="my-10 text-center text-sm text-gray-500">
			Type in your email and we'll send you a link to reset your password
		</p>
		<UForm
			class="space-y-6"
			:schema="schema"
			:state="state"
			@submit="sendResetEmail"
		>
			<UFormGroup label="Email" name="email" size="md">
				<UInput v-model="state.email" placeholder="you@example.com">
				</UInput>
			</UFormGroup>
			<UButton block type="submit" size="md">Send Reset Email</UButton>
		</UForm>
		<p class="mt-10 text-center text-sm text-gray-500">
			Already have an account?
			<NuxtLink
				to="/login"
				class="text-primary hover:text-primary-600 font-semibold leading-6"
				>Sign In</NuxtLink
			>
		</p>
	</NuxtLayout>
</template>

<script setup>
const toast = useToast();
const supabase = useSupabaseClient();

import Joi from "joi";
const schema = Joi.object({
	email: Joi.string()
		.email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
		.required(),
});

const state = ref({
	email: undefined,
});

const sendResetEmail = async () => {
	const { data, error } = await supabase.auth.resetPasswordForEmail(
		state.value.email,
		{ redirectTo: `${process.env.SITE_URL}/update-password` },
	);
	if (error) {
		console.log(error);
	} else {
		console.log(data);
		toast.add({
			title: "Reset email sent!",
			description:
				"If you registered using your email and password, you will receive a password reset email.",
		});
	}
};
</script>
