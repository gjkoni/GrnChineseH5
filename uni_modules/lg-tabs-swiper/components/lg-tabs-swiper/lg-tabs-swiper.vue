<template>
	<view class="lg-swiper-page_wrap" :style="swiperBodyComputed">
		<scroll-view class="scroll-view_body" :show-scrollbar="false" :scroll-left="scrollToLeft" scroll-x enable-flex scroll-with-animation @scroll="slidingBlocksScrollChange">
			<view class="swiper__sliding-blocks_box">
				<view class="sliding-block_wrap" v-for="({ title = '' }, index) in swiperList" :key="index">
					<view
						class="sliding-block_body"
						:class="{
							'sliding--active': swiperIndex == index
						}"
						@click="slidingBodyClick(index)"
					>
						{{ $t(title) }}
					</view>
				</view>
				<view class="sliding-line_box" :style="slidingLineStyleComputed"></view>
			</view>
		</scroll-view>
		<swiper class="swiper_body" @change="swiperChange" :current="swiperIndex">
			<swiper-item v-for="({ slot }, index) in swiperList" :key="index">
				<view class="swiper-block_box">
					<slot :name="slot"></slot>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script setup>
/**
 * @description 页面切换
 * @property {array} swiperList = [value]   --> 切换页面列表
 * @return {function} onChange = () => swiperIndex --> emit onChange 事件，抛出swiperIndex
 */

// #ifdef MP-WEIXIN
options:{
	multipleSlots:true
}
// #endif

import { useSlots, computed, ref, unref, onMounted, nextTick, getCurrentInstance, watch } from 'vue';
/**
 *  props
 */
const props = defineProps({
	swiperList: {
		type: Array,
		default: () => []
	}
});
/**
 * emits
 */

const emits = defineEmits(['onChange']);

/**
 * 获取当前实例
 */

const currentInstance = getCurrentInstance();

/**
 * 定义变量
 */
const swiperIndex = ref(0);
const slidingLineWidth = ref(10); //活动块宽度
const slidingLineLeft = ref(0); // 活动块左偏移量
const slidingBlocksLeft = ref(0); // 活动区域左偏移量
const slidingBlocksWidth = ref(0); // 活动区域宽度
const slidingBlocksHeight = ref(0); // 活动区域高度
const scrollToLeft = ref(0); // scrollView 偏移量
const slidingInfoList = ref([]); // 所有活动区域块的信息

/**
 * 组件 style
 */

const swiperBodyComputed = computed(() => {
	return `bottom:${slidingBlocksHeight.value}px;`
});

/**
 * 滑块区域
 */

// 获取滑块节点信息

onMounted(() => {
	const query = uni.createSelectorQuery().in(currentInstance);
	query.select('.swiper__sliding-blocks_box').fields({ rect: true, size: true }, ({ left, width, height }) => {
		slidingBlocksWidth.value = width;
		slidingBlocksHeight.value = height;
		slidingBlocksLeft.value = left;
	});

	query.selectAll('.sliding-block_body').fields({ rect: true, size: true }, data => {
		data.forEach((item, index) => {
			if (index == 0) {
				slidingLineWidth.value = item.width;
				slidingLineLeft.value = item.left;
			}
			slidingInfoList.value.push(item);
		});
	});

	query.exec();
});

// siliding line 样式计算属性
const slidingLineStyleComputed = computed(() => {
	const slidingLineWidthVal = unref(slidingLineWidth);
	const slidingLineLeftVal = unref(slidingLineLeft);
	return `width:${slidingLineWidthVal}px; left:${slidingLineLeftVal}px`;
});

// slidingBlock  点击触发事件

const slidingBodyClick = index => {
	swiperIndex.value = index;
};

// 触发 slidingLine  滚动
const lineScrollTrigger = () => {
	const slidingInfoListVal = unref(slidingInfoList);
	const slidingInfoListLength = slidingInfoListVal.length;
	const swiperIndexVal = unref(swiperIndex);
	const slidingBloksWidthVal = unref(slidingBlocksWidth);
	const slidingBloksLeftVal = unref(slidingBlocksLeft);

	const { width, left } = slidingInfoListVal[swiperIndexVal];
	const offsetLeft = left - slidingBloksLeftVal;
	const scrollLeft = offsetLeft - (slidingBloksWidthVal - width) / 2;
	scrollToLeft.value = scrollLeft < 0 ? 0 : scrollLeft;
	slidingLineWidth.value = width;
	slidingLineLeft.value = left;
};

// swiperIndex 变动 触发滚动 slidingLine

watch(swiperIndex, (val = 0) => {
	lineScrollTrigger();
	emits('onChange', val);
});

// 触发了滑块区域的滑动事件

const slidingBlocksScrollChange = event => {
	const { scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY } = event.detail;
};

/**
 *  swiper 切换区域
 */

const swiperChange = event => {
	const { current: current, source: source } = event.detail;
	swiperIndex.value = current;
};
</script>
<style lang="scss" scoped>
$lg-color-primary: rgba(0,103,184,1);
$lg-sliding-line-height: 5rpx;
$lg-sliding-block-marging: 16rpx;
$lg-sliding-block-bottom-color: #e5e5e5;
$lg-swiper-block-bgcolor: #f8f8f8;
.lg-swiper-page_wrap {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 1;
}
.swiper_body {
	height: 100%;
	position: relative;
}
.swiper-block_box {
	height: 100%;
	position: relative;
}
.swiper__sliding-blocks_box {
	white-space: nowrap;
	position: relative;
	padding: $lg-sliding-line-height 0;
	transition: color 0.3s ease;

	display: flex;
	flex-wrap: nowrap;
	justify-content: space-between;
}
.sliding-block_wrap {
	display: inline-block;
	margin: 10rpx $lg-sliding-block-marging;
	text-align: center;
	flex: 1;
}
.sliding-block_body {
	display: inline-block;
}
.sliding-line_box {
	position: absolute;
	bottom: 0;
	height: $lg-sliding-line-height;
	border-radius: 10rpx;
	transition: left 0.3s ease;
	background-color: $lg-color-primary;
}
.sliding--active {
	font-weight: bold;
	color: $lg-color-primary;
}
.swiper-block_box {
	height: 100%;
	background-color: $lg-swiper-block-bgcolor;
	border-top: solid 1px $lg-sliding-block-bottom-color;
}

scroll-view ::v-deep ::-webkit-scrollbar {
	display: none;
}
</style>
