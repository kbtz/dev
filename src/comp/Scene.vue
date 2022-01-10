<script lang="ts" setup>
import Header from '<Header.vue'
</script>

<template>
	<page-content></page-content>
	<Header />
	<footer></footer>
</template>

<style>
page-content {
	position: fixed;
	overflow-y: auto;
	top: 0;
	bottom: 0;
	left: 10vw;
	width: 80vw;
}

footer {
	display: none;
}
</style>