<template>
	<view>
		<!-- <CustomNavBar :title="$t('settings.name')" @callback="refreshSettings"></CustomNavBar> -->
		<uni-list>
			<!-- <uni-list-item :title="$t('settings.language')" showArrow
				thumb="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png" thumb-size="sm" /> -->
			<uni-list-item @click="language" :clickable="true" :title="$t('settings.language')" showArrow thumb-size="sm" />
		</uni-list>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {

			}
		},
		onShow() {
			uni.setNavigationBarTitle({
				title:this.$t('settings.name')
			})
		},
		computed:{
		},
		methods: {
			language(){
				uni.navigateTo({
					url:'/pages/settings/language/index'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.logout {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 200rpx 40rpx 40rpx 40rpx;

		.btn {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100rpx;
			background-color:rgba(0, 103, 184, 1);
			color: #fff;
			border-radius: 8rpx;
		}
	}
</style>