import { ObjectDirective, ComputedRef } from "vue"

declare global {
	type Directive<T> = ObjectDirective<HTMLElement, T>
	type Ref<T> = ComputedRef<T>
}
