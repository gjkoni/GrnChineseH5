<template>
	<view class="container" :style="`--size:${size}px;--zindex:-1;`">
		<!-- <router-link to="/pages/settings/settings">{{ $t('settings.name') }}</router-link> -->
		<view class="tian"></view>
		<view id="completesvg" v-if="success"></view>
	</view>
</template>

<script setup>
	import cnchar from 'cnchar-all';
	
	import { onLoad } from '@dcloudio/uni-app'

	import {
		ref,
		reactive,
		onMounted
	} from 'vue'
	
	const text = ref('')
	const size = ref(300)
	const success = ref(false)
	const drawScreen = reactive({
		screenWidth: window.innerWidth
	})
	const drawOptions = reactive({
		clear: false,
		el: '.tian',
		type: cnchar.draw.TYPE.TEST,
		style: {
			radicalColor: "#E06B6A",
			currentColor: "#6abe83",
			strokeColor: "#333",
			length: size.value
		},
		line: {
			lineWidth: 1,
		},
		test: {
			drawingWidth: 50,
			onTestStatus: function(args) {
				if (args.status === "complete") {
					success.value = true
					// var animData = {
					//   container: document.getElementById("completesvg"),
					//   renderer: "svg",
					//   loop: false,
					//   prerender: true,
					//   autoplay: true,
					//   path: `static/lottie/p${getRandom(1, 20)}.json`,
					// };
					// anim = bodymovin.loadAnimation(animData);
					// anim.onComplete = () => {
					//   anim.destroy();
					//   document.getElementById("completesvg").style.display = "none";
					//   totalStrokes = 0;
					// };
				} else if (args.status === "mistake") {
					// console.log("error");
					// console.log("已画" + args.data.strokeNum + "笔");
					// console.log("剩余" + args.data.strokesRemaining + "笔");
					// console.log(
					//   "当前应画笔画错误第" +
					//   args.data.mistakesOnStroke +
					//   "次（当上一笔写对后，本次从0开始记）"
					// );
					// console.log("总共写错次数" + args.data.totalMistakes + "次");
					// totalStrokes = args.data.strokeNum + args.data.strokesRemaining;
				}
			},
		},
	})
	
	onLoad((querys) =>{
		console.log(drawScreen.screenWidth)
		if(querys.text){
			text.value = querys.text
		}
		if(querys.size){
			size.value = querys.size
		}else{
			size.value = drawScreen.screenWidth / (text.value.length < 5 ? text.value.length : 5)
			console.log(size.value)
			//drawOptions.style.length = Math.floor(size.value)
			drawOptions.style.length = Math.floor(size.value) - 2 //减去svg的style边框宽度，否则会超出宽度导致换行
		}
	})

	onMounted(() => {
		cnchar.setResourceBase('http://localhost:12321/')

		cnchar.draw(text.value, drawOptions);

		cnchar.draw.onWordNotFound(word => {
			console.log(word);
		});
	})
</script>

<style lang="scss" scoped>
	.container {
		margin: 0;
		padding: 0;
		width: 100vw;
		height: 100vh;
		position: relative;
		box-sizing: border-box;
		padding: 0;

		.tian {
			width: 100%;
			margin: 0 auto;
			font-size: 0;
			box-sizing: border-box;
			display: flex;
			justify-content: flex-start;
			align-items: flex-start;
			flex-wrap: wrap;
			background-color: transparent;
			
			svg {
				box-sizing: border-box;
				width: var(--size);
				height: var(--size);
				background-color: transparent !important;
			}
			
			// img {
			// 	width: 100%;
			// 	height: 100%;
			// }
		}

		#completesvg {
			position: absolute;
			width: 100%;
			height: 100%;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: var(--zindex);
		}
	}
</style>