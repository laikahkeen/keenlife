<template>
	<div class="container px-4">
		<top-bar @toggle-side-bar="toggleSideBar"></top-bar>
		<main
			class="container grid min-h-[calc(100vh-64px)] max-w-screen-xl grid-cols-10 gap-4"
		>
			<side-bar
				class="hidden lg:sticky lg:top-[-64px] lg:col-span-2 lg:block lg:max-h-[calc(100vh-64px)]"
				:is-side-bar-open="isSideBarOpen"
			></side-bar>
			<div class="col-span-10 w-full lg:col-span-6">
				<slot></slot>
			</div>
			<USlideover v-model="isSideBarOpen" side="left">
				<side-bar></side-bar>
			</USlideover>
		</main>
	</div>
</template>

<script setup>
const isSideBarOpen = ref(false);
const toggleSideBar = () => {
	isSideBarOpen.value = !isSideBarOpen.value;
};
</script>
