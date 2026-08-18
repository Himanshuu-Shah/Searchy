import type { Intent } from "../shared/messages/intents/intent"
import type {
	GlobalSearchSession,
	LocalSearchSession,
	SearchMode,
	SearchSession,
	TabResultsSummary,
} from "../shared/messages/session/SearchSession"
import { sendCommand } from "./commandRouter"
import { publishSession } from "./publisher"

type TabResults = {
	totalMatches: number
	currentIndex: number
}

type GlobalNavigation = {
	tabId: number
	matchIndex: number
}

type GlobalSearchState = {
	enabled: boolean
	participants: Set<number>
	session: GlobalSearchSession | null
	navigation: GlobalNavigation | null
}

type CoordinatorState = {
	localSessions: Map<number, LocalSearchSession>
	global: GlobalSearchState
	tabResults: Map<number, TabResults>
}

export const coordinatorState: CoordinatorState = {
	global: {
		enabled: false,
		participants: new Set(),
		session: null,
		navigation: null,
	},

	localSessions: new Map<number, LocalSearchSession>(),

	tabResults: new Map<number, TabResults>(),
}

function createLocalSession(): LocalSearchSession {
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
			currentIndex: -1,
		},
		scopeSelection: {
			enabled: false,
		},
	}
}

function createGlobalSession(): GlobalSearchSession {
	return {
		query: "",
		mode: "global",
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
			currentIndex: -1,
		},
		globalResults: {
			totalMatches: 0,
			tabResultsSummary: [],
		},
	}
}

function getOrCreateSession(tabId: number): LocalSearchSession {
	const existing = coordinatorState.localSessions.get(tabId)

	if (existing) {
		return existing
	}

	const session = createLocalSession()
	coordinatorState.localSessions.set(tabId, session)

	return session
}

export function resolveSession(tabId: number): SearchSession {
	if (
		coordinatorState.global.enabled &&
		coordinatorState.global.participants.has(tabId)
	) {
		if (coordinatorState.global.session === null) {
			const session: GlobalSearchSession = createGlobalSession()

			coordinatorState.global.session = session
		}

		return coordinatorState.global.session
	}

	return getOrCreateSession(tabId)
}

export async function setGlobalMode(mode: SearchMode): Promise<void> {
	if (mode === "local") {
		coordinatorState.global.enabled = false
		coordinatorState.global.participants.clear()
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
	}
}

export function setGlobalParticipants(participants: Set<number>): void {
	coordinatorState.global.participants = new Set(participants)
}

export function getSessionParticipants(): Set<number> {
	return new Set(coordinatorState.global.participants)
}

export function isGlobalSessionParticipant(tabId: number): boolean {
	if (
		coordinatorState.global.enabled &&
		coordinatorState.global.participants.has(tabId)
	) {
		return true
	}

	return false
}

export function setTabResults(tabId: number, tabResults: TabResults) {
	coordinatorState.tabResults.set(tabId, tabResults)
}

export function getTabResults(tabId: number): TabResults | undefined {
	return coordinatorState.tabResults.get(tabId)
}

export async function getGlobalResults(): Promise<
	GlobalSearchSession["globalResults"]
> {
	let totalMatches = 0
	const tabResultsSummary: TabResultsSummary[] = []
	const tabs = await chrome.tabs.query({
		windowType: "normal",
		url: ["http://*/*", "https://*/*"],
	})

	const participants = tabs.filter(
		(tab) =>
			tab.id !== undefined &&
			coordinatorState.global.participants.has(tab.id)
	)

	for (const participant of participants) {
		if (participant.id === undefined) {
			continue
		}

		const results = coordinatorState.tabResults.get(participant.id)

		if (!results) {
			continue
		}

		totalMatches += results.totalMatches

		tabResultsSummary.push({
			tabId: participant.id,
			tabName: participant.title ?? "Untitled",
			totalMatches: results.totalMatches,
		})
	}

	return {
		totalMatches,
		tabResultsSummary,
	}
}

export function removeGlobalParticipant(tabId: number) {
	coordinatorState.global.participants.delete(tabId)
	coordinatorState.tabResults.delete(tabId)

	if (coordinatorState.global.navigation?.tabId === tabId) {
		coordinatorState.global.navigation = null
	}
}

export async function syncGlobalParticipants(
	session: GlobalSearchSession,
	intent?: Intent["intent"]
): Promise<void> {
	const globalResults = await getGlobalResults()

	for (const participant of getSessionParticipants()) {
		const tabSession = structuredClone(session)
		const tabResults = getTabResults(participant)

		if (tabResults) {
			tabSession.results = {
				...tabResults,
			}
			tabSession.globalResults = globalResults
		} else {
			tabSession.globalResults = globalResults
		}

		publishSession(participant, tabSession)

		if (intent) {
			sendCommand(participant, intent, {
				session: tabSession,
			})
		}
	}
}
