<template>
	<view class="container"
		:style="`--size:${size}px;--zindex:${zindex};--position:${position};--flexStyle:${flexStyle};--tian:${tian}`">
		<view class="tian"></view>
		<lottie v-if="success" :class="lottieClass" @animCreated="lottieAnimation" />
	</view>
</template>

<script setup>
	import cnchar from 'cnchar-all'
	import dayjs from 'dayjs'
	import {
		callApp
	} from '@/utils/common.js'

	import {
		onLoad
	} from '@dcloudio/uni-app'

	import {
		ref,
		reactive,
		onMounted,
		nextTick
	} from 'vue'

	const text = ref('')
	const size = ref(300)
	const zindex = ref(-1)
	const position = ref('fixed')
	const lottieClass = ref('lottiercmp')
	const flexStyle = ref('flex-start')
	const tian = ref('auto')
	const success = ref(false)
	const lottier = ref(null)
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
			onTestStatus: testStatus
		},
	})

	onLoad((querys) => {
		if (querys.text) {
			text.value = querys.text
		} else {
			var queryText = GetQueryString('text')
			text.value = queryText !== '' ? queryText : "人"
		}
		if (querys.size) {
			console.log(querys.size);
			size.value = querys.size - 60
		} else {
			var querySize = GetQueryString('size')
			console.log(querySize);
			size.value = querySize !== '' ? Number(querySize) - 60 : drawScreen.screenWidth / (text.value.length < 5 ?
				text.value.length : 5)
			//drawOptions.style.length = Math.floor(size.value)	
		}
		drawOptions.style.length = Math.floor(size.value) - 2 //减去svg的style边框宽度，否则会超出宽度导致换行
		if (text.value.length === 1) {
			zindex.value = 999
			position.value = 'absolute'
			lottieClass.value = 'lottiercmp1'
			flexStyle.value = 'center'
			tian.value = '100%'
		}
	})

	onMounted(() => {
		const app = getApp().globalData.env
		cnchar.setResourceBase(app.char_baseurl)

		cnchar.draw(text.value, drawOptions);
		
		cnchar.draw.onWordNotFound(word => {
			console.log(word);
		});
		
		cnchar.voice(text.value);
		
		// cnchar.explain('好强').then((res) =>{
		// 	console.log(res)
		// })
		
		window.webAction = webAction;
	})

	function testStatus(args) {
		if (args.status === "complete") {
			cnchar.voice(args.data.character)
			success.value = true
			nextTick(() => {
				lottier.value.play();
			})
			callApp('appAction', {
				actionName: "saveCharTestData",
				params: {
					code: 1,
					char: args.data.character,
					status: "complete",
					error: null,
					time: dayjs().format('YYYY/MM/DD HH:mm:ss')
				}
			})
		} else if (args.status === "mistake") {
			callApp('appAction', {
				actionName: "saveCharTestData",
				params: {
					code: 0,
					char: args.data.character,
					status: "mistake",
					error: {
						step: args.data.strokeNum,
						remaining: args.data.strokesRemaining,
						mistakes: args.data.mistakesOnStroke,
						total: args.data.totalMistakes
					},
					time: dayjs().format('YYYY/MM/DD HH:mm:ss')
				}
			})
		}
	}

	function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
		var context = "";
		if (r != null) context = decodeURIComponent(r[2]);
		reg = null;
		r = null;
		return context == null || context == "" || context == "undefined" ?
			"" :
			context;
	}

	function lottieAnimation(anim) {
		lottier.value = anim
		lottier.value.onComplete = () => {
			lottier.value.destroy()
			success.value = false
		}
	}

	function webAction(actionName, params) {
		console.log(actionName)
		console.log(params)
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: transparent;
	}

	.container {
		margin: 0;
		padding: 30px;
		width: 100vw;
		position: relative;
		box-sizing: border-box;;

		.tian {
			width: 100%;
			height: var(--tian);
			margin: 0 auto;
			font-size: 0;
			box-sizing: border-box;
			display: flex;
			justify-content: var(--flexStyle);
			align-items: var(--flexStyle);
			flex-wrap: wrap;
			background-color: transparent;

			svg {
				box-sizing: border-box;
				width: var(--size);
				height: var(--size);
				background-color: transparent !important;
			}
		}

		.lottiercmp {
			position: fixed;
			bottom: 0;
			margin: 0 auto;
			overflow: hidden;
			width: 100vw;
			z-index: var(--zindex);
		}

		.lottiercmp1 {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			overflow: hidden;
			z-index: var(--zindex);
		}
	}
</style>