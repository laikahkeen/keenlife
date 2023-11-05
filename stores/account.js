import { defineStore } from "pinia";

export const useAccountStore = defineStore("account", () => {
	const type = "account";
	const toast = useToast();
	const list = ref([]);
	const id = ref(0);
	const indexedDB = process.client ? useIndexedDB() : null;
	const getItem = async () => {
		if (indexedDB) {
			list.value = (await indexedDB.getItem(type)) ?? [];
			id.value = (await indexedDB.getItem(`${type}Id`)) ?? 0;
		}
	};
	const setItem = async () => {
		if (indexedDB) {
			await indexedDB.setItem(
				type,
				JSON.parse(JSON.stringify(list.value)),
			);
			await indexedDB.setItem(`${type}Id`, id.value);
		}
	};

	const createItem = (item) => {
		list.value.push({
			...item,
			id: ++id.value,
		});
		toast.add({
			id: `create${type}_${id.value}_${new Date().getTime()}`,
			title: `Created new ${type}!`,
		});
	};

	const updateItem = (id, item) => {
		list.value = list.value.map((x) => {
			return x.id === id ? item : x;
		});
		toast.add({
			id: `update${type}_${id}_${new Date().getTime()}`,
			title: `Updated ${type} #${id}!`,
		});
	};

	const deleteItem = (id) => {
		list.value = list.value.filter((x) => {
			return x.id !== id;
		});
		toast.add({
			id: `delete${type}_${id}_${new Date().getTime()}`,
			title: `Deleted ${type} #${id}!`,
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
		createItem,
		updateItem,
		deleteItem,
	};
});
