<script lang="ts" setup>
import { ref } from 'vue'
import vPage from '-page'

const
	{ theme } = state,
	open = ref(false), focus = ref(false), drag = ref(false),
	offset = ref<𝝶[]>(), current = ref<𝝶[]>(),
	origin = ref<SVGElement>(null as 𝞌),
	size = 512, pad = 32, center = size / 2,
	count = 10, step = 360 / (count * 2),
	radius = center - pad,
	clip = (radius - pad * 3).int,
	dot = (clip * .7).int,
	point = (offset = 0, lenght = radius) => (idx: 𝝶) =>
		(step * idx + offset)
			.vec.amp(idx % 2 ? lenght : lenght - pad * 1.5)
			.map(v => v.int).join(','),
	arrow = [3].make(point(-90 - step, radius + pad * 2)),
	star = [1 + count * 2].make(point())

function pointermove({ isPrimary, pageX: x, pageY: y }: PointerEvent) {
	if (drag.value && isPrimary) {
		open.value = true
		offset.value ||= origin.value.center

		const [cx, cy] = offset.value
		change(x - cx, cy - y)
	}
}

function pointerup({ isPrimary }: PointerEvent) {
	drag.value = false
	if (open.value && isPrimary) close()
}

function close() {
	drag.value = false
	open.value = false
	focus.value = false
	offset.value = undefined
	current.value = undefined
}

function toggle() {
	if (open.value) return
	focus.value = true
	theme.bright = !theme.bright
}

function select() {
	if (focus.value)
		open.value = true
}

function change(x: 𝝶, y: 𝝶) {
	if (y < 0) return

	if (y < 12 && x.abs < 12) {
		theme.saturate = 0
		return
	}

	const
		{ PI, atan2, sin, cos } = Math,
		delta = (((x ** 2 + y ** 2) ** .5).clamp(24, 256) / 48).up * 48 * 4,
		arct = (atan2(y, x) * 180 / PI).int,
		angle = ((90 - arct.clamp(32, 148)) / 4).up * 4,
		rad = angle / 180 * PI

	theme.saturate = (delta - 48) / 48
	theme.hue = (angle + 60) / 120 * 360

	x = (sin(rad) * delta).int
	y = (cos(rad) * delta).int
	current.value = [x, -y, angle]
}

</script>

<template>
	<svg
		:viewBox="`0 0 ${size} ${size}`"
		class="icon icon-theme"
		:class="{ focus, open }"
		tabindex="0"
		v-page="{ pointermove, pointerup }"
		@pointerenter="focus = true"
		@pointerleave="focus = false"
		@blur="close"
	>
		<g :transform="`translate(${center} ${center})`">
			<defs>
				<rect id="th-rect" :x="-center" :y="-center" :width="size" :height="size" />
				<circle id="th-circle" cx="0" cy="0" :r="clip" />
				<clipPath id="th-clip">
					<use href="#th-circle" transform="scale(1.1)" />
				</clipPath>
				<mask id="th-mask">
					<use ref="origin" href="#th-rect" fill="white" />
					<use
						href="#th-circle"
						fill="black"
						:transform="`scale(${open ? 1.8 : 1}) translate(0 ${open ? dot * -.85 : 0})`"
					/>
				</mask>
			</defs>
			<g class="icon-theme-shapes" @click="toggle">
				<g mask="url(#th-mask)" clip-path="url(#th-clip-open)">
					<path
						:d="`M ${star[0]} L ${star.slice(1).join(' L')} L ${star[0]} Z`"
						:transform="`rotate(${theme.bright ? step * 2 * 3 : 0})`"
					/>
				</g>
				<g clip-path="url(#th-clip)">
					<circle
						cx="0"
						cy="0"
						:r="dot"
						:transform="`translate(${theme.bright || open ? 0 : dot * -.7} 0) scale(${open ? .4 : (theme.bright ? 1 : 1.4)})`"
					/>
				</g>
			</g>
			<g
				class="icon-theme-handles"
				@click="select"
				:transform="current ? `translate(${current[0]} ${current[1]}) rotate(${current[2]})` : 'translate(0 0) rotate(0)'"
			>
				<path :d="`M ${arrow[0]} L ${arrow.slice(1).join(' L')} `" />
				<rect
					:x="-center + size * .2"
					:y="(center + pad * (open ? 0 : 2)) * -1"
					:width="size * .6"
					:height="size * .4"
					@pointerdown="drag = true"
					fill="transparent"
				/>
			</g>
		</g>
	</svg>
</template>

<style lang="scss">
$time: 0.6s;

.icon-theme {
	g,
	use,
	path,
	circle {
		will-change: transform;
	}

	overflow: visible;
	outline: none;

	use {
		transition: transform calc(#{$time} / 3) ease-out;
	}

	&-shapes {
		path,
		circle {
			fill: var(--light);
			fill-rule: evenodd;
			transition: transform $time var(--bounce);
		}
	}

	&.open &-shapes {
		circle {
			fill: #888;
			transition-duration: calc(#{$time} / 2);
		}
	}

	&-handles {
		path {
			pointer-events: bounding-box;
			fill: none;
			stroke: var(--light);
			stroke-width: 32pt;
			transform: translate(0, 15%);
			transition: transform calc(#{$time} / 2) var(--bounce);
		}
	}

	&.focus:not(.open) &-handles {
		path {
			transform: translate(0, 0);
		}
	}

	&.open &-handles path {
		transform: translate(0, 20%);
	}
}
</style>