export function clearHighlights(): void {
	if (!("highlights" in CSS)) {
		console.warn("CSS highlight not provided by the broswer")
		return
	}

	CSS.highlights.delete("all-results")
}
