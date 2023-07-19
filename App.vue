<script>
	export default {
		globalData: {
			env: process.env.config[process.env.name ? process.env.name : "dev"]
		},
		onLaunch: function() {
			console.log('App Launch')
			let code = uni.getStorageSync('locale') ? uni.getStorageSync('locale') :uni.getLocale();
			uni.setLocale(code);
		},
		onShow: function() {
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style lang="scss">
	@import '@/uni.scss';
	
	page{
		background-color: rgba(246, 246, 251, 1);
	}
	
	.container {
		margin: 0;
		padding: 0;
	}

	button {
		margin-bottom: 15px;
	}
</style>