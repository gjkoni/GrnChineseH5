<template>
	<div ref="bodyAnimation"></div>
</template>

<script>
	import lottie from "lottie-web";
	export default {
		name: "lottie",
		data() {
			return {
			};
		},
		mounted() {
			this.anim = lottie.loadAnimation({
				container: this.$refs.bodyAnimation, // the dom element that will contain the animation
				renderer: "svg",
				loop: false,
				autoplay: false,
				prerender: true,
				path: `/static/lottie/p${this.getRandom(1, 20)}.json`
			});
			this.$emit("animCreated", this.anim);
		},
		methods: {
			getRandom(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			}
		},
	};
</script>

<style lang="scss" scoped>
</style>