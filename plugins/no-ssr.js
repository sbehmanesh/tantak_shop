import Vue from 'vue'
import VueSlickCarousel from 'vue-slick-carousel'
import AmpJdate from '~/components/Base/AmpJdate.vue'
import VueQRCodeComponent from 'vue-qrcode-component'
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import VueSlickCarouselRtl from 'vue-slick-carousel-rtl'
import 'vue-slick-carousel-rtl/dist/vue-slick-carousel-rtl.css'
// optional style for arrows & dots
import 'vue-slick-carousel-rtl/dist/vue-slick-carousel-theme.css'

import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

Vue.component('AmpJdate', AmpJdate)
Vue.component('qr-code', VueQRCodeComponent)
Vue.component('VueSlickCarousel', VueSlickCarousel)
Vue.component('VueSlickCarouselRtl', VueSlickCarouselRtl)
Vue.component('persian-date-picker', VuePersianDatetimePicker)