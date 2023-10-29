<template>
	<UButton
		class="flex"
		icon="i-heroicons-bars-3-20-solid"
		color="gray"
		variant="ghost"
		square
		aria-label="Menu"
		@click="isSideBarOpen = !isSideBarOpen"
	/>
	<USlideover v-model="isSideBarOpen" side="left">
		<UCard
			class="flex flex-1 flex-col"
			:ui="{
				ring: '',
			}"
		>
			<template #header>
				<div class="flex items-center justify-between">
					<h3 class="text-base font-semibold leading-6">Sidebar</h3>
					<UButton
						color="gray"
						variant="ghost"
						square
						icon="i-heroicons-x-mark-20-solid"
						@click="isSideBarOpen = !isSideBarOpen"
					/>
				</div>
			</template>
			<SideBar></SideBar>
		</UCard>
	</USlideover>
</template>

<script setup>
const isSideBarOpen = ref(false);
</script>
