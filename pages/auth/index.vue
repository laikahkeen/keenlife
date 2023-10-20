<template>
	<NuxtLayout name="auth">
		<h2 class="my-10 text-center text-2xl font-bold">
			{{
				isSigningIn ? "Sign in to your account" : "Create a new account"
			}}
		</h2>
		<UForm
			class="space-y-6"
			:schema="schema"
			:state="state"
			@submit="isSigningIn ? signIn() : signUp()"
		>
			<UFormGroup label="Email" name="email" size="md">
				<UInput v-model="state.email" placeholder="you@example.com">
				</UInput>
			</UFormGroup>
			<UFormGroup label="Password" name="password" size="lg">
				<template #hint>
					<NuxtLink
						v-if="isSigningIn"
						to="/forget-password"
						class="text-primary hover:text-primary-600 font-semibold"
						>Forgot password?</NuxtLink
					>
				</template>
				<UInput
					v-model="state.password"
					:type="!isSigningIn && isRevealed ? 'text' : 'password'"
					placeholder="********"
					:ui="{ icon: { trailing: { pointer: '' } } }"
				>
					<template #trailing>
						<UButton
							v-if="!isSigningIn"
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
			<UButton block type="submit" size="md">{{
				isSigningIn ? "Sign In" : "Sign Up"
			}}</UButton>
		</UForm>
		<p class="mt-10 text-center text-sm text-gray-500">
			{{ isSigningIn ? "Don't have an account?" : "Have an account?" }}
			<a
				href="#"
				@click="isSigningIn = !isSigningIn"
				class="text-primary hover:text-primary-600 font-semibold leading-6"
				>{{ isSigningIn ? "Sign Up Now" : "Sign In Now" }}</a
			>
		</p>
		<div class="inline-flex w-full items-center justify-center">
			<hr class="my-8 h-px w-full border-0 bg-border" />
			<span
				class="absolute left-1/2 -translate-x-1/2 bg-background px-3 font-medium"
				>or continue with</span
			>
		</div>
		<div class="flex justify-center gap-4">
			<UButton
				@click="signInOAuth('google')"
				variant="outline"
				class="block flex-1"
				size="md"
			>
				<Icon name="fa6-brands:google" class="h-6 w-6" />
			</UButton>
			<UButton
				@click="signInOAuth('facebook')"
				variant="outline"
				class="block flex-1"
				size="md"
			>
				<Icon name="simple-icons:facebook" class="h-6 w-6" />
			</UButton>
			<UButton
				@click="signInOAuth('github')"
				variant="outline"
				class="block flex-1"
				size="md"
			>
				<Icon name="fa6-brands:github" class="h-6 w-6" />
			</UButton>
		</div>
		<p class="mt-10 text-center text-sm text-gray-500">
			Not a member?
			<a
				href="#"
				class="text-primary hover:text-primary-600 font-semibold leading-6"
				>Start a 14 day free trial</a
			>
		</p>
	</NuxtLayout>
</template>

<script setup>
import Joi from "joi";

const schema = Joi.object({
	email: Joi.string()
		.email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
		.required(),
	password: Joi.string().min(8).required(),
});

const supabase = useSupabaseClient();

const state = ref({
	email: undefined,
	password: undefined,
});

const isSigningIn = ref(true);
const isRevealed = ref(false);

const toast = useToast();

const signIn = async () => {
	const { data, error } = await supabase.auth.signInWithPassword({
		email: state.value.email,
		password: state.value.password,
	});
	console.log(data);
	if (error) {
		toast.add({
			title: "Invalid login credentials!",
			description: `Email does not match with the given password!`,
		});
		console.log(error);
	} else {
		toast.add({
			title: "Signed In!",
			description: `${state.value.email} signed in successfully!`,
		});
	}
};

const signUp = async () => {
	const { data, error } = await supabase.auth.signUp({
		email: state.value.email,
		password: state.value.password,
	});
	console.log(data);
	if (error) {
		console.log(error);
	} else {
		toast.add({
			title: "Signed Up!",
			description: `${state.value.email} signed up successfully! Please confirm your email address before signing in`,
		});
		isSigningIn.value = !isSigningIn.value;
	}
};

const signInOAuth = async (prov) => {
	const { error } = await supabase.auth.signInWithOAuth({
		provider: prov,
		redirectTo: window.location.origin,
	});
	if (error) console.log(error);
};

onErrorCaptured((error) => {
	if (error.message.search("form validation failed")) {
		console.log(error.message);
		return false;
	}
	return true;
});
</script>
