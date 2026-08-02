import type { SearchSession } from "../shared/messages/session/SearchSession"

const sessionStore = new Map<number, SearchSession>()

function createDefaultSession(): SearchSession {
	return {
		query: "",
		mode: "local",
		algorithm: "literal",
		config: {
			literal: {
				caseSensitive: false,
				wholeWord: false,
			},
			regex: {
				caseSensitive: false,
			},
		},
		results: {
			totalMatches: 0,
			currentIndex: 0,
		},
	}
}

export function getOrCreateSession(tabId: number): SearchSession {
	const existing = sessionStore.get(tabId)

	if (existing) {
		return existing
	}

	const session = createDefaultSession()

	sessionStore.set(tabId, session)

	return session
}
