<template>
	<ClientOnly>
		<UButton
			:icon="
				isDark
					? 'i-heroicons-moon-20-solid'
					: 'i-heroicons-sun-20-solid'
			"
			color="gray"
			variant="ghost"
			square
			aria-label="Theme"
			@click="isDark = !isDark"
		/>
		<template #fallback>
			<UButton
				aria-label="Loading"
				loading
				color="gray"
				variant="ghost"
				square
			/>
		</template>
	</ClientOnly>
</template>

<script setup>
const colorMode = useColorMode();
const isDark = computed({
	get() {
		return colorMode.value === "dark";
	},
	set() {
		colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
	},
});
</script>
