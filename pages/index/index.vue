<template>
	<view class="container" :style="`--size:${size}px;--zindex:-1;`">
		<!-- <router-link to="/pages/settings/settings">{{ $t('settings.name') }}</router-link> -->
		<view class="tian"></view>
		<lottie v-if="success" class="lottier" @animCreated="lottieAnimation" />
	</view>
</template>

<script setup>
	import cnchar from 'cnchar-all';

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
		}else{
			var queryText = GetQueryString('text')
			text.value = queryText  !== '' ? queryText : "中国"
		}
		if (querys.size) {
			size.value = querys.size
		} else {
			var querySize = GetQueryString('size')
			size.value = querySize !== '' ? Number(querySize) : drawScreen.screenWidth / (text.value.length < 5 ? text.value.length : 5)
			//drawOptions.style.length = Math.floor(size.value)
			drawOptions.style.length = Math.floor(size.value) - 2 //减去svg的style边框宽度，否则会超出宽度导致换行
		}
	})

	onMounted(() => {
		const app = getApp().globalData.env
		if(app.env === 'production'){
			cnchar.setResourceBase('cnchar-data/')
		}else{
			cnchar.setResourceBase('http://localhost:8080/')
		}

		cnchar.draw(text.value, drawOptions);

		cnchar.draw.onWordNotFound(word => {
			console.log(word);
		});
	})
	
	function testStatus(args){
		if (args.status === "complete") {
			success.value = true
			nextTick(()=>{
			      lottier.value.play();
			    })
			
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
	}
	
	function GetQueryString(name) {
	      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	      var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
	      var context = "";
	      if (r != null) context = decodeURIComponent(r[2]);
	      reg = null;
	      r = null;
	      return context == null || context == "" || context == "undefined"
	        ? ""
	        : context;
	    }
	
	function lottieAnimation (anim) {
      lottier.value = anim
	  lottier.value.onComplete = () => {
	    lottier.value.destroy()
		success.value = false
	  };
    }
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
		}
		
		.lottier{
			position: fixed;
			bottom: 0;
			margin: 0 auto;
			overflow: hidden;
			width: 100vw;
			height: 100vw;
			z-index: var(--zindex);
		}
	}
</style>