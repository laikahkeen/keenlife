<template>
	<UButton
		icon="i-heroicons-document-arrow-down-solid"
		label="Import CSV"
		@click="handleOpen"
	/>
	<UModal v-model="isOpen">
		<UCard>
			<template #header>
				<div class="font-bold">Import your data below.</div>
			</template>
			<div class="flex flex-col gap-4">
				<p>Click here to get a sample format of the csv.</p>
				<div>
					<UButton
						icon="i-heroicons-document-arrow-down-solid"
						label="sample CSV"
						@click="sampleCSV"
					/>
				</div>
				<label for="image_uploads"
					><p>Upload your file here to import the data.</p></label
				>
				<input
					type="file"
					id="image_uploads"
					name="image_uploads"
					class="file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:px-4 file:py-2 file:text-sm file:font-semibold"
					accept=".csv"
					@change="importCSV"
				/>
				<div>{{ result }}</div>
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

const toast = useToast();
const result = ref("");

const sampleCSV = () => {
	const csv = Papa.unparse([
		{
			type: "Expense",
			account: "Cash",
			category: "Food",
			name: "Fried Chicken",
			description: "from kfc",
			amount: 28.95,
			date: useDateFormat(new Date(), "DD/MM/YYYY HH:mm:ss").value,
		},
	]);
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
		id: `sample_csv_${new Date().getTime()}`,
		title: `Sample CSV is downloaded!`,
	});
};

const importCSV = async (event) => {
	const file = event.target.files[0];
	console.log(file);
	await Papa.parse(file, {
		header: true,
		dynamicTyping: true,
		complete: (data) => {
			result.value = data.data;
		},
	});
	toast.add({
		id: `import_csv_${new Date().getTime()}`,
		title: `CSV file is imported!`,
	});
};
</script>
