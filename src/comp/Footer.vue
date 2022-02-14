<script lang="ts" setup>
import Theme from '<Theme.vue';
</script>

<template>
	<footer>
		<Theme />
	</footer>
</template>

<style lang="scss">
$size: 128px;
footer {
	display: flex;
	align-self: center;
	justify-content: center;

	.icon {
		width: $size;
		height: $size;
	}
}
</style>