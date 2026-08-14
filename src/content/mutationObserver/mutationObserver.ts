import type { SearchPayload } from "../../shared/messages/commands/runSearch"
import { findMatches } from "../search/findmatches"

let rerunTimer: number | null = null

function scheduleRerunSearch(onMutation: () => void) {
	if (rerunTimer !== null) {
		clearTimeout(rerunTimer)
	}

	rerunTimer = window.setTimeout(() => {
		rerunTimer = null
		onMutation()
	}, 300)
}

function textContainsSearchMatch(
	text: string,
	search: SearchPayload | null
): boolean {
	if (!search || !text.trim()) {
		return false
	}

	return findMatches(text, search).length > 0
}

function shouldIgnore(
	mutation: MutationRecord,
	search: SearchPayload | null
): boolean {
	const host = document.getElementById("searchy-root")

	// Ignore mutations inside Searchy's own UI.
	if (host?.contains(mutation.target)) {
		return true
	}

	if (mutation.type === "childList") {
		const changedNodes = [...mutation.addedNodes, ...mutation.removedNodes]

		// No text was added or removed, so this cannot
		// affect a text search.
		for (const node of changedNodes) {
			const text = node.textContent ?? ""

			if (textContainsSearchMatch(text, search)) {
				return false
			}
		}

		return true
	}

	if (mutation.type === "characterData") {
		const oldText = mutation.oldValue ?? ""
		const newText = mutation.target.textContent ?? ""

		if (
			textContainsSearchMatch(oldText, search) ||
			textContainsSearchMatch(newText, search)
		) {
			return false
		}

		return true
	}

	return true
}

export function startMutationObserver(
	rerunSearch: () => void,
	getSearch: () => SearchPayload | null
): MutationObserver {
	const observer = new MutationObserver((mutations) => {
		const relevant = mutations.filter(
			(mutation) => !shouldIgnore(mutation, getSearch())
		)

		if (relevant.length === 0) {
			return
		}

		scheduleRerunSearch(rerunSearch)
	})

	observer.observe(document.body, {
		childList: true,
		subtree: true,
		characterData: true,
		characterDataOldValue: true,
	})

	return observer
}
