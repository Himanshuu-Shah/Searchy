export type SearchOptions = {
    caseSensitive: boolean;
    wholeWord: boolean;
    regex: boolean;
}

export const DEFAULT_SEARCH_OPTIONS: SearchOptions = {
    caseSensitive: false,
    wholeWord: false,
    regex: false,
}