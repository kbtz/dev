import { ComputedRef } from 'vue'
import { State } from '|state'

declare global {
	const state: State & {
		track: {
			[P in keyof State]: ComputedRef<State[P]>
		}
	}

	const page: 𝞁
	const pointer: 𝝱
	const cover: 𝝱
	const intro: 𝝱
}