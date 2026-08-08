import type {
	SearchMode,
	SearchSession,
} from "../shared/messages/session/SearchSession"

type TabResults = {
	totalMatches: number
	currentIndex: number
}

type GlobalSearchState = {
	enabled: boolean
	participants: Set<number>
	session: SearchSession | null
}

type CoordinatorState = {
	localSessions: Map<number, SearchSession>
	global: GlobalSearchState
	tabResults: Map<number, TabResults>
}

const coordinatorState: CoordinatorState = {
	global: {
		enabled: false,
		participants: new Set(),
		session: null,
	},

	localSessions: new Map<number, SearchSession>(),

	tabResults: new Map<number, TabResults>(),
}

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
		scopeSelection: {
			enabled: false,
		},
	}
}

function getOrCreateSession(tabId: number): SearchSession {
	const existing = coordinatorState.localSessions.get(tabId)

	if (existing) {
		return existing
	}

	const session = createDefaultSession()
	coordinatorState.localSessions.set(tabId, session)

	return session
}

export function resolveSession(tabId: number): SearchSession {
	if (
		coordinatorState.global.enabled &&
		coordinatorState.global.participants.has(tabId)
	) {
		if (coordinatorState.global.session === null) {
			const session = createDefaultSession()
			session.mode = "workspace"

			coordinatorState.global.session = session
		}

		return coordinatorState.global.session
	}

	return getOrCreateSession(tabId)
}

export async function setGlobalMode(mode: SearchMode): Promise<Set<number>> {
	if (mode === "local") {
		const participants = new Set(coordinatorState.global.participants)

		coordinatorState.global.enabled = false
		coordinatorState.global.participants.clear()

		return participants
	} else {
		coordinatorState.global.enabled = true
		const tabs = await chrome.tabs.query({
			windowType: "normal",
			url: ["http://*/*", "https://*/*"],
		})

		for (const tab of tabs) {
			if (tab.id !== undefined) {
				coordinatorState.global.participants.add(tab.id)
			}
		}

		return new Set(coordinatorState.global.participants)
	}
}

export function setGlobalParticipants(participants: Set<number>): Set<number> {
	coordinatorState.global.participants = participants
	const newParticipants = new Set(coordinatorState.global.participants)

	return newParticipants
}

export function getSessionParticipants(tabId: number): Set<number> {
	if (
		coordinatorState.global.enabled &&
		coordinatorState.global.participants.has(tabId)
	) {
		return new Set(coordinatorState.global.participants)
	}

	return new Set([tabId])
}
