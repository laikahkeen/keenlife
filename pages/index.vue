<template>
	<h1 class="text-2xl">Expense List</h1>
	<UInput color="primary" variant="outline" />
	<UButton
		variant="ghost"
		class="flex h-10 w-40 shrink-0 items-center justify-center rounded-full"
		@click="addItem"
		><span>Add Item</span>
		<Icon name="heroicons:plus-solid" />
	</UButton>
	<button @click="toast.add({ title: 'test' })">test</button>
</template>

<script setup>
const toast = useToast();
const addItem = () => {
	console.log("added!");
};
</script>
