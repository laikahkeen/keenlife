<template>
	<VCalendarDatePicker
		v-model="date"
		transparent
		borderless
		:attributes="attributes"
		:is-dark="isDark"
		title-position="left"
		trim-weeks
		:first-day-of-week="1"
	/>
</template>

<script setup>
import { DatePicker as VCalendarDatePicker } from "v-calendar";
import "v-calendar/dist/style.css";

const props = defineProps({
	modelValue: {
		type: String,
		default: null,
	},
});

const emit = defineEmits(["update:model-value", "close"]);

const colorMode = useColorMode();

const isDark = computed(() => colorMode.value === "dark");

const date = computed({
	get: () => props.modelValue,
	set: (value) => {
		emit("update:model-value", value.toISOString());
		emit("close");
	},
});

const attributes = [
	{
		key: "today",
		highlight: {
			color: "blue",
			fillMode: "outline",
			class: "!bg-gray-100 dark:!bg-gray-800",
		},
		dates: new Date(),
	},
];
</script>
