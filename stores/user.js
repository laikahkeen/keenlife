import { defineStore } from "pinia";

export const useUserStore = defineStore(
	"user",
	() => {
		let users = ref([]);
		function updateUser(a) {
			users.value = a;
		}
		return { users, updateUser };
	},
	{
		persist: true,
	},
);
