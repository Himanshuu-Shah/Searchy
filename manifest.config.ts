import { defineManifest } from "@crxjs/vite-plugin"

export default defineManifest({
	manifest_version: 3,

	name: "Searchy",

	version: "0.3.0",

	description: "Enhanced Find in Page.",

	action: {
		default_popup: "popup.html",
	},

	background: {
		service_worker: "src/background/service-worker.ts",
		type: "module",
	},

	permissions: ["storage", "tabs"],

	content_scripts: [
		{
			matches: ["<all_urls>"],
			js: ["src/content/content-script.ts"],
		},
	],
})
