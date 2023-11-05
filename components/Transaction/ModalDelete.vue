<template>
	<UModal v-model="isOpen">
		<UCard class="flex flex-1 flex-col">
			<template #header>
				<div class="flex items-center justify-between">
					<h3 class="text-base font-semibold leading-6">
						Are you sure you want to delete?
					</h3>
					<UButton
						color="gray"
						variant="ghost"
						square
						icon="i-heroicons-x-mark-20-solid"
						@click="handleClose"
					/>
				</div>
			</template>
			<div class="flex flex-col gap-4">
				<ul>
					<li v-for="d of deleteItem">
						{{ d.id }}.
						{{ useDateFormat(d.date, "DD/MM/YYYY (ddd)").value }} :
						{{ d.description }} :
						{{ d.amount }}
					</li>
				</ul>
				<div class="flex justify-center gap-4">
					<UButton
						class="block flex-1"
						size="md"
						label="Cancel"
						@click="handleClose"
					/>
					<UButton
						class="block flex-1"
						type="submit"
						size="md"
						label="Confirm"
						@click="handleDelete"
					/>
				</div>
			</div>
		</UCard>
	</UModal>
</template>

<script setup>
const props = defineProps({
	deleteItem: Array,
});

const emit = defineEmits(["update:deleteItem"]);

const deleteItem = computed({
	get: () => props.deleteItem,
	set: (value) => emit("update:deleteItem", value),
});

const isOpen = computed({
	get: () => deleteItem.value.length > 0,
	set: (value) => emit("update:deleteItem", value ? deleteItem.value : []),
});

const handleClose = () => {
	deleteItem.value = [];
};

const handleDelete = async () => {
	deleteItem.value.forEach((x) => transaction.deleteItem(x.id));
	handleClose();
};

import { useTransactionStore } from "~/stores/transaction";
const transaction = useTransactionStore();
</script>
