import { type ExtensionMessage } from "../shared/messages";

export async function sendMessage(message: ExtensionMessage) {
    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    })

    if (!tab.id) {
        return
    }

    await chrome.tabs.sendMessage(tab.id, message)
}