<template>
	<NuxtLayout name="auth">
		<h2 class="mt-10text-2xl font-bold leading-9 tracking-tight">
			Update Your Password
		</h2>
		<p>Change your password for {{ user ? user.email : "" }}</p>
		<UForm
			class="space-y-6"
			:schema="schema"
			:state="state"
			@submit="resetPassword"
		>
			<UFormGroup label="Password" name="password" size="lg">
				<UInput
					v-model="state.password"
					:type="isRevealed ? 'text' : 'password'"
					placeholder="********"
					:ui="{ icon: { trailing: { pointer: '' } } }"
				>
					<template #trailing>
						<UButton
							variant="outline"
							:icon="
								isRevealed
									? 'i-heroicons-eye'
									: 'i-heroicons-eye-slash'
							"
							:padded="false"
							@click="isRevealed = !isRevealed"
							class="h-7 w-7"
							block
						/>
					</template>
				</UInput>
			</UFormGroup>
			<UFormGroup
				label="Confirm Password"
				name="confirmPassword"
				size="lg"
			>
				<UInput
					v-model="state.confirmPassword"
					:type="isRevealed ? 'text' : 'password'"
					placeholder="********"
					:ui="{ icon: { trailing: { pointer: '' } } }"
				>
					<template #trailing>
						<UButton
							variant="outline"
							:icon="
								isRevealed
									? 'i-heroicons-eye'
									: 'i-heroicons-eye-slash'
							"
							:padded="false"
							@click="isRevealed = !isRevealed"
							class="h-7 w-7"
							block
						/>
					</template>
				</UInput>
			</UFormGroup>
			<UButton block type="submit" size="md">Reset Password</UButton>
		</UForm>
	</NuxtLayout>
</template>

<script setup>
const toast = useToast();
// const supabase = useSupabaseClient();
// const user = useSupabaseUser();

import Joi from "joi";
const schema = Joi.object({
	password: Joi.string().min(8).required(),
	confirmPassword: Joi.string().min(8).required(),
});

const state = ref({
	password: undefined,
	confirmPassword: undefined,
});

const isRevealed = ref(false);

const resetPassword = async () => {
	// const { data, error } = await supabase.auth.updateUser({
	// 	password: state.value.password,
	// });
	// if (error) {
	// 	console.log(error);
	// } else {
	// 	console.log(data);
	// 	toast.add({
	// 		title: "Password updated!",
	// 		description: "Your password has been updated successfully!",
	// 	});
	// }
};
</script>
