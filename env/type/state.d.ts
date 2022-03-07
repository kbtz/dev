import { ComputedRef } from 'vue'
import { State } from '|state'

declare global {
	const state: State & {
		track: {
			[P in keyof State]: ComputedRef<State[P]>
		}
	}
}