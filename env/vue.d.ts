import { ObjectDirective } from "vue"

declare global {
	type Directive<T> = ObjectDirective<HTMLElement, T>
}