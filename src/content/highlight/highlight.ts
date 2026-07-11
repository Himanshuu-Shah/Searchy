import { createRange } from "../dom/createRange";
import { type SearchMatch } from "../search/types";

export function highlight(matches: SearchMatch[]) :void {

    if (!("highlights" in CSS)) {
        console.warn("CSS highlight not provided by the broswer")
        return
    }

    CSS.highlights.delete("all-results")

    const ranges: Range[] = []

    for (const match of matches) {
        const range = createRange(match)
        ranges.push(range)
    }

    const highlight = new Highlight(...ranges)
    CSS.highlights.set("all-results", highlight)
}