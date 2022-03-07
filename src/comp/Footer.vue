<script lang="ts" setup>
import Theme from '<Theme.vue';
</script>

<template>
	<footer>
		<Theme />
	</footer>
</template>

<style lang="scss">
footer {
	display: flex;
	align-self: center;
	justify-content: center;

	.icon {
		--size: 64px;
		width: var(--size);
		height: var(--size);
	}
}
</style>