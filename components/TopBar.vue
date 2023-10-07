<template>
	<header class="bg-background/80 sticky top-0 z-20 h-16 backdrop-blur">
		<!-- flex cotainer -->
		<div class="flex h-16 items-center justify-between border-b">
			<!-- left side header -->
			<div class="flex items-center gap-3">
				<!-- page title -->
				<NuxtLink to="/" class="flex items-center gap-2">
					<!-- logo -->
					<svg
						id="logo"
						class="fill-primary h-8 w-8"
						width="49"
						height="48"
						viewBox="0 0 49 48"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M24.5 12.75C24.5 18.9632 19.4632 24 13.25 24H2V12.75C2 6.53679 7.03679 1.5 13.25 1.5C19.4632 1.5 24.5 6.53679 24.5 12.75Z"
						></path>
						<path
							d="M24.5 35.25C24.5 29.0368 29.5368 24 35.75 24H47V35.25C47 41.4632 41.9632 46.5 35.75 46.5C29.5368 46.5 24.5 41.4632 24.5 35.25Z"
						></path>
						<path
							d="M2 35.25C2 41.4632 7.03679 46.5 13.25 46.5H24.5V35.25C24.5 29.0368 19.4632 24 13.25 24C7.03679 24 2 29.0368 2 35.25Z"
						></path>
						<path
							d="M47 12.75C47 6.53679 41.9632 1.5 35.75 1.5H24.5V12.75C24.5 18.9632 29.5368 24 35.75 24C41.9632 24 47 18.9632 47 12.75Z"
						></path>
					</svg>
					<span class="text-xl font-bold">
						Keen <span class="text-primary">Life</span>
					</span>
				</NuxtLink>
			</div>
			<!-- right side header -->
			<div class="flex items-center gap-2">
				<!-- color theme toggle -->
				<UButton
					class="flex lg:hidden"
					icon="i-heroicons-bars-3-20-solid"
					color="gray"
					variant="ghost"
					square
					aria-label="Menu"
					@click="toggleSideBar"
				/>
				<ColorPicker />
				<ColorMode />
				<!-- profile dropdown menu -->
				<HMenu as="div" class="relative">
					<HMenuButton
						class="bg-background flex h-8 w-8 shrink-0 items-center justify-center rounded-full border"
					>
						<img
							src="https://randomuser.me/api/portraits/med/men/75.jpg"
							alt="logged in user"
							class="h-full w-full rounded-full"
						/>
					</HMenuButton>
					<HMenuItems
						class="bg-background focus-visible:ring-ring absolute right-0 z-10 mt-3 w-48 rounded-md border focus:outline-none focus-visible:ring-2"
					>
						<div class="border-b px-3 py-1.5 text-sm">
							<p class="font-semibold">Hello John</p>
							<a
								href="mailto:johndoe@test.com"
								class="text-muted-foreground leading-none"
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
