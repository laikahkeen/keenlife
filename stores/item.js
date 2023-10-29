import { defineStore } from "pinia";

export const useItemStore = defineStore("item", () => {
	const list = ref([]);
	console.log(list.value);
	const indexedDB = process.client ? useIndexedDB() : null;

	const getItem = async () => {
		if (indexedDB) {
			list.value = await indexedDB.getItem("item");
		}
	};

	const setItem = async () => {
		if (indexedDB) {
			await indexedDB.setItem(
				"item",
				JSON.parse(JSON.stringify(list.value)),
			);
		}
	};

	const id = computed(() => {
		return (list.value ? list.value.length : 0) + 1;
	});
	const isAddItemOpen = ref(false);

	const toggleAddItem = () => {
		isAddItemOpen.value = !isAddItemOpen.value;
	};

	const addItem = (item) => {
		list.value.push({
			...item,
			id: id.value,
		});
	};
	const deleteItem = (itemId) => {
		list.value = list.value.filter((x) => {
			return x.id !== itemId;
		});
	};

	onBeforeMount(() => {
		getItem();
		watch(
			list,
			async () => {
				await setItem();
			},
			{ deep: true },
		);
	});

	return {
		list,
		id,
		isAddItemOpen,
		getItem,
		addItem,
		deleteItem,
		toggleAddItem,
	};
});
