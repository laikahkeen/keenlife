<template>
	<NuxtLayout name="app">
		<!-- <NavigationCard />
		<TransactionCard /> -->
		<UButton @click="trigger" label="Trigger" />
		<UCard class="w-[300px] overflow-y-auto" v-for="x in pages">
			<p class="whitespace-pre-line">
				{{ extract(x) }}
			</p>
		</UCard>
		<UCard class="w-[300px] overflow-y-auto" v-for="i in pages">
			<UCard class="overflow-y-auto" v-for="x in i.lines">
				<p class="whitespace-pre-line">
					{{ extract(x) }}
				</p>
			</UCard>
		</UCard>
		<template v-for="i in pages">
			<div
				class="relative overflow-auto border"
				:class="[`w-[${i.image.width}px]`, `h-[${i.image.height}px]`]"
			>
				<template v-for="x in i.lines">
					<div
						class="absolute"
						:style="{
							left:
								Math.round(extract2(x).x * i.image.width) +
								'px',
							top:
								Math.round(extract2(x).y * i.image.height) +
								'px',
						}"
					>
						{{ extract(x) }}
					</div>
				</template>
			</div>
		</template>
	</NuxtLayout>
</template>

<script setup>
import data from "assets/json/document-ocr-receipt.json";
const text = data.text;
const pages = data.pages;

const extract = (item) => {
	const textSegments = item.layout.textAnchor.textSegments;
	if (!textSegments || textSegments.length === 0) {
		return "";
	}
	const textGroup = textSegments.map((x) => {
		return text.substring(x.startIndex, x.endIndex);
	});
	return textGroup[0];
};

const extract2 = (item) => {
	const normalizedVertices = item.layout.boundingPoly.normalizedVertices;
	if (!normalizedVertices || normalizedVertices.length !== 4) {
		return "";
	}
	const textArea = normalizedVertices[0];
	return textArea;
};

const trigger = () => {
	console.log(pages);
};
</script>
