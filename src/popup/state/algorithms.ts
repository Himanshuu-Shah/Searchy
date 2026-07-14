export type SearchAlgorithms = "literal" | "regex"

export const SEARCH_ALGORITHMS: {
	id: SearchAlgorithms
	name: string
	description: string
}[] = [
	{
		id: "literal",
		name: "Literal",
		description: "Find exact text matches",
	},
	{
		id: "regex",
		name: "Regex",
		description: "Search using regular expressions",
	},
]
