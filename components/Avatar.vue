<template>
	<UDropdown :items="items" :popper="{ placement: 'bottom-end' }">
		<UButton variant="ghost" square color="gray" :disabled="user">
			<UAvatar src="" alt="Nobody" />
		</UButton>
		<template #account="{ item }">
			<div class="text-left">
				<p>Signed in as</p>
				<p class="truncate font-medium text-gray-900 dark:text-white">
					{{ item.label }}
				</p>
			</div>
		</template>
		<template #item="{ item }">
			<span class="truncate">{{ item.label }}</span>
			<UIcon
				:name="item.icon"
				class="ms-auto h-4 w-4 flex-shrink-0 text-gray-400 dark:text-gray-500"
			/>
		</template>
	</UDropdown>
</template>

<script setup>
// const supabase = useSupabaseClient();
// const user = useSupabaseUser();
const user = ref();

const signOut = async () => {
	// const { error } = await supabase.auth.signOut();
	// if (error) console.log(error);
};

const items = [
	[
		{
			label: user.value ? user.value.email : "nobody",
			slot: "account",
			disabled: true,
		},
	],
	[
		{
			label: "Settings",
			icon: "i-heroicons-cog-8-tooth",
		},
	],
	[
		{
			label: "Documentation",
			icon: "i-heroicons-book-open",
		},
		{
			label: "Changelog",
			icon: "i-heroicons-megaphone",
		},
		{
			label: "Status",
			icon: "i-heroicons-signal",
			click: () => {
				console.log("testeste");
			},
		},
	],
	[
		{
			label: "Sign out",
			icon: "i-heroicons-arrow-left-on-rectangle",
			click: () => {
				console.log("test");
				signOut();
			},
		},
	],
];
</script>
