<template>
	<UButton
		icon="i-heroicons-document-arrow-up-solid"
		label="Export CSV"
		@click="handleOpen"
	/>
	<UModal v-model="isOpen">
		<UCard>
			<template #header>
				<div class="font-bold">Export your data below.</div>
			</template>
			<div class="flex flex-col gap-4">
				<p>Click here to export your data in csv format.</p>
				<div>
					<UButton
						icon="i-heroicons-document-arrow-down-solid"
						label="Export CSV"
						@click="exportCSV"
					/>
				</div>
			</div>
		</UCard>
	</UModal>
</template>

<script setup>
const isOpen = ref(false);

const handleOpen = () => {
	isOpen.value = true;
};

import Papa from "papaparse";

const props = defineProps({
	data: Array,
});
const { data } = toRefs(props);

const convertISODateStrings = (obj) => {
	const { id, createdAt, updatedAt, ...updatedObj } = obj;
	for (const key in updatedObj) {
		if (updatedObj.hasOwnProperty(key)) {
			const value = updatedObj[key];
			if (
				typeof value === "string" &&
				/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z)$/.test(value)
			) {
				const formattedDate = useDateFormat(
					value,
					"DD/MM/YYYY HH:mm:ss",
				).value;
				updatedObj[key] = formattedDate;
			} else if (typeof value === "object") {
				updatedObj[key] = convertISODateStrings(value);
			}
		}
	}
	return updatedObj;
};

const convertISODateStringsInArray = (arr) => {
	return arr.map((obj) => convertISODateStrings(obj));
};

const exportCSV = () => {
	const csv = Papa.unparse(convertISODateStringsInArray(data.value));
	console.log(csv);

	const blob = new Blob([csv], { type: "text/csv" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = "data.csv";
	a.style.display = "none";
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);

	toast.add({
		id: `export_csv_${new Date().getTime()}`,
		title: `CSV file is exported!`,
	});
};
</script>
