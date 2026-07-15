import {
	type ClearHighlights,
	type ClearScope,
	type ExtensionMessage,
} from "../shared/messages/messages"
import {
	MessageType,
	type SearchMessage,
	type NextResult,
	type PreviousResult,
	type ToggleScopeSelection,
} from "../shared/messages/messages"
import type { SearchConfig } from "../shared/search/searchConfigs"

async function sendMessage(message: ExtensionMessage) {
	const [tab] = await chrome.tabs.query({
		active: true,
		currentWindow: true,
	})

	if (!tab.id) {
		return
	}

	await chrome.tabs.sendMessage(tab.id, message)
}

export async function sendSearchMessage(
	query: string,
	searchConfig: SearchConfig
) {
	await sendMessage({
		type: MessageType.SEARCH,
		query: query,
		searchConfig: searchConfig,
	} satisfies SearchMessage)
}

export async function sendNextMessage() {
	await sendMessage({
		type: MessageType.NEXT_RESULT,
	} satisfies NextResult)
}

export async function sendPrevMessage() {
	await sendMessage({
		type: MessageType.PREVIOUS_RESULT,
	} satisfies PreviousResult)
}

export async function sendClearMessage() {
	await sendMessage({
		type: MessageType.CLEAR_HIGHLIGHTS,
	} satisfies ClearHighlights)
}

export async function sendStartSelectionScope() {
	await sendMessage({
		type: MessageType.TOGGLE_SCOPE_SELECTION,
	} satisfies ToggleScopeSelection)
}

export async function sendClearScopeMessage() {
	await sendMessage({
		type: MessageType.CLEAR_SCOPE,
	} satisfies ClearScope)
}
