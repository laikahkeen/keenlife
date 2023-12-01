import { v1 } from "@google-cloud/documentai";
import { readFileSync } from "fs";
const { DocumentProcessorServiceClient } = v1;
const documentaiClient = new DocumentProcessorServiceClient();

async function processDocument(
	projectId,
	location,
	processorId,
	filePath,
	mimeType,
) {
	const resourceName = documentaiClient.processorPath(
		projectId,
		location,
		processorId,
	);

	// Read the file into memory.
	const imageFile = readFileSync(filePath);

	// Convert the image data to a Buffer and base64 encode it.
	const encodedImage = Buffer.from(imageFile).toString("base64");

	// Load Binary Data into Document AI RawDocument Object
	const rawDocument = {
		content: encodedImage,
		mimeType: mimeType,
	};

	// Configure ProcessRequest Object
	const request = {
		name: resourceName,
		rawDocument: rawDocument,
	};

	// Use the Document AI client to process the sample form
	const [result] = await documentaiClient.processDocument(request);

	return result.document;
}

async function main() {
	const projectId = "972856831213";
	const location = "us"; // Format is 'us' or 'eu'
	const processorId = "ebc90ba87574e750"; // document ocr
	// const processorId = "863cab832e559bde"; // form parser
	// const processorId = "56067bf26348f0ab"; // expense parser
	// const processorId = "ebc90ba87574e750"; // invoice parser

	const filePath = "C:/Users/kaez9/Desktop/keenlife/public/receipt.jpg";
	const mimeType = "image/jpeg";

	const document = await processDocument(
		projectId,
		location,
		processorId,
		filePath,
		mimeType,
	);

	return document;
}

export default defineEventHandler(async (event) => {
	const response = await main();
	return response;
});
