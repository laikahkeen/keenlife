import localforage from "localforage";

export const useIndexedDB = () => {
	let indexedDB;
	if (process.client) {
		indexedDB = localforage.createInstance({
			name: "keenlife-storage",
			storeName: "keyvalue",
			driver: localforage.INDEXEDDB,
		});
	}

	return indexedDB;
};
