import type {
	ErrorResponse,
	SuccessResponse,
} from "../shared/messages/response/response"
import { coordinatorState, isGlobalSessionParticipant } from "./sessionManager"

type NavigationResult =
	| {
			tab: {
				type: "same-tab"
				tabId: number
			}
			response: SuccessResponse | ErrorResponse
	  }
	| {
			tab: { type: "different-tab"; tabId: number; matchIndex: number }
			response: SuccessResponse | ErrorResponse
	  }
	| {
			tab: {
				type: "none"
			}
			response: SuccessResponse | ErrorResponse
	  }

async function getParticipatingTabs(): Promise<number[]> {
	const tabs = await chrome.tabs.query({
		windowType: "normal",
		url: ["http://*/*", "https://*/*"],
	})

	return tabs
		.filter((tab) => tab.id != undefined)
		.filter((tab) => coordinatorState.global.participants.has(tab.id!))
		.map((tab) => tab.id!)
}

async function getNextParticipatingTab(
	currentTabId: number
): Promise<number | null> {
	const tabs = await getParticipatingTabs()

	if (tabs.length === 0) {
		return null
	}

	const currentIndex = tabs.indexOf(currentTabId)

	if (currentIndex === -1) {
		return null
	}

	for (let offset = 1; offset <= tabs.length; offset++) {
		const candidateIndex = (currentIndex + offset) % tabs.length
		const candidateTabId = tabs[candidateIndex]

		const results = coordinatorState.tabResults.get(candidateTabId)

		if (results && results.totalMatches > 0) {
			return candidateTabId
		}
	}

	return null
}

async function navigateGlobalNext(
	currentTabId: number
): Promise<NavigationResult> {
	const currentTabResults = coordinatorState.tabResults.get(currentTabId)

	if (!currentTabResults) {
		throw new Error(
			`No tab results found for participating tab ${currentTabId}`
		)
	}

	coordinatorState.global.navigation = {
		tabId: currentTabId,
		matchIndex: currentTabResults.currentIndex,
	}

	// There is another match in the current tab.
	if (currentTabResults.currentIndex < currentTabResults.totalMatches - 1) {
		return {
			tab: { type: "same-tab", tabId: currentTabId },
			response: { success: true } satisfies SuccessResponse,
		}
	}

	// Current tab is exhausted.
	const nextTabId = await getNextParticipatingTab(currentTabId)

	if (nextTabId === null) {
		return {
			tab: { type: "none" },
			response: { success: true } satisfies SuccessResponse,
		}
	}

	return {
		tab: { type: "different-tab", tabId: nextTabId, matchIndex: 0 },
		response: { success: true } satisfies SuccessResponse,
	}
}

function navigateLocalNext(tabId: number): NavigationResult {
	return {
		tab: { type: "same-tab", tabId },
		response: { success: true } satisfies SuccessResponse,
	} satisfies NavigationResult
}

export async function navigateNext(tabId: number): Promise<NavigationResult> {
	if (isGlobalSessionParticipant(tabId)) {
		return navigateGlobalNext(tabId)
	}
	return navigateLocalNext(tabId)
}

async function getPreviousParticipatingTab(
	currentTabId: number
): Promise<number | null> {
	const tabs = await getParticipatingTabs()

	if (tabs.length === 0) {
		return null
	}

	const currentIndex = tabs.indexOf(currentTabId)

	if (currentIndex === -1) {
		return null
	}

	for (let offset = 1; offset <= tabs.length; offset++) {
		const candidateIndex =
			(currentIndex - offset + tabs.length) % tabs.length
		const candidateTabId = tabs[candidateIndex]

		const results = coordinatorState.tabResults.get(candidateTabId)

		if (results && results.totalMatches > 0) {
			return candidateTabId
		}
	}

	return null
}

async function navigateGlobalPrevious(
	currentTabId: number
): Promise<NavigationResult> {
	const currentTabResults = coordinatorState.tabResults.get(currentTabId)

	if (!currentTabResults) {
		throw new Error(
			`No tab results found for participating tab ${currentTabId}`
		)
	}

	coordinatorState.global.navigation = {
		tabId: currentTabId,
		matchIndex: currentTabResults.currentIndex,
	}

	// There is another match in the current tab.
	if (currentTabResults.currentIndex > 0) {
		return {
			tab: { type: "same-tab", tabId: currentTabId },
			response: { success: true } satisfies SuccessResponse,
		}
	}

	// Current tab is at its first match.
	const previousTabId = await getPreviousParticipatingTab(currentTabId)

	if (previousTabId === null) {
		return {
			tab: { type: "none" },
			response: { success: true } satisfies SuccessResponse,
		}
	}

	const previousResults = coordinatorState.tabResults.get(previousTabId)

	if (!previousResults || previousResults.totalMatches === 0) {
		return {
			tab: { type: "none" },
			response: { success: true } satisfies SuccessResponse,
		}
	}

	return {
		tab: {
			type: "different-tab",
			tabId: previousTabId,
			matchIndex: previousResults.totalMatches - 1,
		},
		response: { success: true } satisfies SuccessResponse,
	}
}

function navigateLocalPrevious(tabId: number): NavigationResult {
	return {
		tab: { type: "same-tab", tabId },
		response: { success: true } satisfies SuccessResponse,
	} satisfies NavigationResult
}

export async function navigatePrevious(
	tabId: number
): Promise<NavigationResult> {
	if (isGlobalSessionParticipant(tabId)) {
		return navigateGlobalPrevious(tabId)
	}

	return navigateLocalPrevious(tabId)
}
