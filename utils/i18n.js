import messages from '@/locale/index'
import {
	createI18n
} from 'vue-i18n'

let i18nConfig = {
	locale: uni.getStorageSync('locale') ? uni.getStorageSync('locale') : uni.getLocale(),
	messages
}
const i18n = createI18n(i18nConfig)

export default i18n