import { ComputedRef } from 'vue'
import { State } from '|state'

declare global {
	const state: State
	const value: {
		[P in keyof State]: ComputedRef<State[P]>
	}
}