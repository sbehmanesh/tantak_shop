<template>
  <v-row no-gutters :class="$vuetify.breakpoint.mdAndUp ? 'ma-6' : 'ma-3'">
    <v-col cols="12">
      <v-card class="border12" v-if="$vuetify.breakpoint.mdAndUp">
        <v-breadcrumbs :items="items">
          <template v-slot:divider>
            <v-icon>mdi-chevron-left</v-icon>
          </template>
        </v-breadcrumbs>
      </v-card>
      <v-card class="border12" :class="$vuetify.breakpoint.mdAndUp ? 'mt-8 py-8' : 'py-6'">
        <v-row>
          <v-col cols="12" class="d-flex justify-center">
            <h1 v-if="$vuetify.breakpoint.mdAndUp">ارتباط با ما</h1>
            <h2 v-if="!$vuetify.breakpoint.mdAndUp">ارتباط با ما</h2>
          </v-col>
          <v-col cols="1" v-if="$vuetify.breakpoint.mdAndUp"></v-col>
          <v-col cols="12" md="5">
            <v-card class="form-text pa-4" :class="$vuetify.breakpoint.mdAndUp ? '' : 'mx-3'">
              <div>سوال، انتقاد و پیشنهاد خود را با ما درمیان بگذارید</div>
            </v-card>
            <v-card class="form-card mt-2" :class="$vuetify.breakpoint.mdAndUp ? 'pa-4' : 'mx-3 pa-2'">
              <v-form>
                <div :class="$vuetify.breakpoint.mdAndUp ? 'd-flex' : ''">
                  <amp-input text="نام" :class="$vuetify.breakpoint.mdAndUp ? 'col-6' : 'col-12 pa-0'" />
                  <amp-input text="نام خانوادگی" :class="$vuetify.breakpoint.mdAndUp ? 'col-6' : 'col-12 pa-0'" />
                </div>
                <div :class="$vuetify.breakpoint.mdAndUp ? 'd-flex' : ''">
                  <amp-input text="شماره همراه" :class="$vuetify.breakpoint.mdAndUp ? 'col-6' : 'col-12 pa-0'" />
                  <amp-input text="پست الکترونیک" :class="$vuetify.breakpoint.mdAndUp ? 'col-6' : 'col-12 pa-0'" />
                </div>
                <amp-input text="موضوع" />
                <amp-textarea text="پیام" />
                <div class="col-12 text-left py-0">
                  <amp-button text="ارسال پیام" width="260" />
                </div>
              </v-form>
            </v-card>
          </v-col>
          <v-col cols="12" md="5" class="d-flex flex-column justify-center" :class="$vuetify.breakpoint.mdAndUp ? '' : 'px-6'">
            <v-card width="520" class="pa-3 contact-card-1" :class="$vuetify.breakpoint.mdAndUp ? '' : 'font_14'">
              آدرس ما:تهران، خیابان ملاصدرا، شیخ بهایی، خیابان برزیل غربی، پلاک
              136، طبقه چهارم
              <br />
              ایمیل: info@tantak.ir
              <br />
              تلفن روابط عمومی و تبلیغات: 57917500-021
            </v-card>
            <v-card width="520" class="mt-1 pa-3 contact-card-2" :class="$vuetify.breakpoint.mdAndUp ? '' : 'font_14'">
              خدمات پس از فروش: تهران، بزرگراه آزادگان، بزرگراه رجایی، بزرگراه
              شهید بهشتی، نرسیده به سه راه ترانسفور، مجتمع تجاری آرین
              <br />
              تلفن پشتیبانی: 57917000-021
              <br />
              کدپستی: 1879613154
            </v-card>
            <v-card width="520" class="mt-1 pa-3 contact-card-3" :class="$vuetify.breakpoint.mdAndUp ? '' : 'font_14'">
              ساعات کاری
              <br />
              همه روزه به جز ایام تعطیل رسمی ساعت 9 الی 17
              <br />
              پنجشنبه: 9 الی 14
            </v-card>
            <div id="map-wrap" class="mt-1" :class="$vuetify.breakpoint.mdAndUp ? 'width520' : ''">
              <client-only>
                <l-map :zoom="13" :center="[55.9464418, 8.1277591]">
                  <l-tile-layer
                    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                  ></l-tile-layer>
                  <l-marker :lat-lng="[55.9464418, 8.1277591]"></l-marker>
                </l-map>
              </client-only>
            </div>
          </v-col>
          <v-col cols="1" v-if="$vuetify.breakpoint.mdAndUp"></v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          text: "خانه",
          disabled: false,
          to: "/",
        },
        {
          text: "ارتباط با ما",
          disabled: true,
          to: "",
        },
      ],
    };
  },
};
</script>
<style scoped>
.contact-card-1,
.contact-card-2,
.contact-card-3 {
  box-shadow: none !important;
  /* background-color: #ffc07b; */
  /* background-color: #f27c01; */
  /* color: white; */
  border: 2px solid #ffc07b;
  line-height: 28px;
}
.contact-card-1,
.contact-card-2,
.contact-card-3 {
  border-top-left-radius: 40px;
  border-bottom-right-radius: 40px;
}
.form-text {
  box-shadow: none !important;
  border: 2px solid #ffc07b;
  /* border: 2px solid #f27c01; */
  border-top-right-radius: 40px;
  border-top-left-radius: 40px;
}
.form-card {
  box-shadow: none !important;
  border: 2px solid #ffc07b;
  /* border: 2px solid #f27c01; */
  border-bottom-right-radius: 40px;
  border-bottom-left-radius: 40px;
}
.back-img {
  background-image: url("/image/static/contact-us.jpg");
}
#map-wrap {
    height: 280px;
    /* width: 520px;/ */
    z-index: 1;
}
.width520 {
  width: 520px;
}
/* .contact-card-2 {
    border-top-right-radius: 40px;
    border-bottom-left-radius: 40px;
} */
</style>
