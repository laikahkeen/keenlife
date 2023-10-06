<template>
	<header class="sticky top-0 z-20 h-16 bg-background/80 backdrop-blur">
		<!-- flex cotainer -->
		<div
			class="container flex h-16 max-w-screen-xl items-center justify-between border-b"
		>
			<!-- left side header -->
			<div class="flex items-center gap-3">
				<!-- logo -->
				<img
					src="/icon.svg"
					alt="Analytics Logo"
					class="h-10 w-10 object-contain"
				/>
				<!-- page title -->
				<NuxtLink to="/" class="text-xl font-bold"
					>Keen <span class="text-primary">Life</span></NuxtLink
				>
			</div>
			<!-- right side header -->
			<div class="flex items-center gap-5">
				<!-- color theme toggle -->
				<UButton
					variant="ghost"
					class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
					@click="toggleTheme"
				>
					<Icon
						:name="
							colorMode.value === 'light'
								? 'heroicons:sun'
								: 'heroicons:moon'
						"
					/>
				</UButton>
				<UButton
					variant="ghost"
					class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full lg:hidden"
					@click="toggleSideBar"
				>
					<Icon name="heroicons:bars-4" />
				</UButton>
				<!-- profile dropdown menu -->
				<HMenu as="div" class="relative">
					<HMenuButton
						class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-background"
					>
						<img
							src="https://randomuser.me/api/portraits/med/men/75.jpg"
							alt="logged in user"
							class="h-full w-full rounded-full"
						/>
					</HMenuButton>
					<HMenuItems
						class="absolute right-0 z-10 mt-3 w-48 rounded-md border bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
					>
						<div class="border-b px-3 py-1.5 text-sm">
							<p class="font-semibold">Hello John</p>
							<a
								href="mailto:johndoe@test.com"
								class="leading-none text-muted-foreground"
								>johndoe@test.com</a
							>
						</div>
						<div class="p-1">
							<template
								v-for="(p, i) in profileMenuOptions"
								:key="i"
							>
								<HMenuItem
									v-if="!p.divider"
									v-slot="{ active }"
								>
									<button
										:class="[active && 'bg-muted']"
										class="inline-flex w-full items-center rounded-md p-2 text-sm font-medium"
									>
										{{ p.title }}
									</button>
								</HMenuItem>
								<hr v-else />
							</template>
						</div>
					</HMenuItems>
				</HMenu>
			</div>
		</div>
	</header>
</template>

<script setup>
const colorMode = useColorMode();
const toggleTheme = () => {
	colorMode.value = colorMode.value === "light" ? "dark" : "light";
};

const profileMenuOptions = [
	{ title: "Profile" },
	{ title: "Billing" },
	{ title: "Settings" },
	{ title: "Team members" },
	{ title: "Sales" },
	{ divider: true },
	{ title: "Logout" },
];

const emit = defineEmits(["toggleSideBar"]);
const toggleSideBar = () => {
	emit("toggleSideBar");
};
</script>

<style scoped></style>
