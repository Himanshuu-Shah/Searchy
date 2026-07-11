export const MessageType = {
    SEARCH: "SEARCH",
    NEXT_RESULT: "NEXT_RESULT",
    PREVIOUS_RESULT: "PREVIOUS_RESULT",
    CLEAR_HIGHLIGHTS: "CLEAR_HIGHLIGHTS"
} as const

export interface SearchMessage {
    type: typeof MessageType.SEARCH;
    query: string;
}

export interface NextResult {
    type: typeof MessageType.NEXT_RESULT
}

export interface PreviousResult {
    type: typeof MessageType.PREVIOUS_RESULT
}

export type ExtensionMessage =
    | SearchMessage
    | NextResult
    | PreviousResult