<script setup lang='ts'>
const
	close = () => state.cover = true

</script>
<template>
	<header></header>
	<page-content>
		<h1 @click="close">
			AAAAAA
			AAAAAA
			AAAAAA
			AAAAAA
		</h1>
	</page-content>
	<footer></footer>
</template>

<style>
page-content {
	position: fixed;
	background-color: aquamarine;
}

header,
footer {
	display: none;
}
</style>