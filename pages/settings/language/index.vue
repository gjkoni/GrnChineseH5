<template>
	<view class="container">
		<!-- <CustomNavBar :title="$t('settings.language')"></CustomNavBar> -->
		<view class="locale-list">
			<view class="locale-item" v-for="(item, index) in locales" :key="index" @click="onLocaleChange(item)">
				<text class="text">{{item.text}}</text>
				<text class="icon-check" v-if="item.code == applicationLocale"></text>
			</view>
		</view>
	</view>
</template>

<script>
import locale from '../../../locale';
	export default {
		data() {
			return {
				systemLocale: '',
				applicationLocale: ''
			}
		},
		computed: {
			locales() {
				return [
					// {
					//           text: this.$t('locale.auto'),
					//           code: 'auto'
					//         }, 
					{
						text: this.$t('locale.en'),
						code: 'en'
					},
					{
						text: this.$t('locale.zh-hans'),
						code: 'zh-Hans'
					}
				]
			}
		},
		onShow() {
			uni.setNavigationBarTitle({
				title:this.$t('settings.language')
			})
		},
		onLoad() {
			this.applicationLocale = uni.getStorageSync('locale') ? uni.getStorageSync('locale') :uni.getLocale();
			uni.onLocaleChange((e) => {
				this.applicationLocale = e.locale;
			})
		},
		mounted() {
		},
		methods: {
			onLocaleChange(e) {
				uni.setLocale(e.code);
				this.$i18n.locale = e.code;
				uni.setStorageSync("locale", e.code);
				uni.setNavigationBarTitle({
					title:this.$t('settings.language')
				})
			},
			
		}
	}
</script>

<style>
	.container {
	}
	
	.locale-list{
		box-sizing: border-box;
		padding: 20rpx;
	}

	.locale-item {
		display: flex;
		flex-direction: row;
		padding: 10px 0;
	}

	.locale-item .text {
		flex: 1;
	}

	.icon-check {
		margin-right: 5px;
		border: 2px solid #007aff;
		border-left: 0;
		border-top: 0;
		height: 12px;
		width: 6px;
		transform-origin: center;
		/* #ifndef APP-NVUE */
		transition: all 0.3s;
		/* #endif */
		transform: rotate(45deg);
	}
</style>