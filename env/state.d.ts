import { ComputedRef, readonly } from 'vue'
import { State } from '|state'

declare global {
	const state: State & {
		track: {
			[P in keyof State]: ComputedRef<State[P]>
		}
	}

	const pointer: 𝝱
	const cover: 𝝱
}