import type { SearchSession } from "../session/SearchSession"

export type Session = {
	type: "session"
	searchSession: SearchSession
}

export type SuccessResponse = {
	success: true
}

export type ErrorResponse = {
	success: false
	error: string
}
