<template>
  <v-sheet class="footer pb-15 pb-md-10 px-3">
    <v-col cols="12">
      <v-row class="justify-center pa-4">
        <v-col cols="12">
          <v-card class="pa-5 rounded-lg elevation-0" color="#9a9a9a0f">
            <p>
              <b class="font_13"> پشتیبانی </b>
            </p>
            <p class="font_12">
              شماره تماس 02191002029 واحد پشتیبانی عدد 4 <br />شنبه تا چهارشنبه از ساعت 9
              تا 17 و پنجشنبه ها از ساعت 9 تا 13 پاسخگوی شما هستیم
            </p>
            <p class="font_12">آدرس ایمیل : info@banian-vp.ir</p>
          </v-card>

          <v-expansion-panels class="rounded-lg elevation-0 mt-5">
            <v-expansion-panel class="expan-class">
              <v-expansion-panel-header
                ><b class="font_13"> راهنمای خرید </b></v-expansion-panel-header
              >
              <v-expansion-panel-content class="expan-class">
                <p class="font_12">نحوه ثبت سفارش</p>
                <p class="font_12">رویه ارسال سفارش</p>
                <p class="font_12">شیوه های پرداخت</p>
                <p class="font_12">رویه های بازگرداندن کالا</p>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-expansion-panels class="rounded-lg elevation-0 mt-5 expan-class">
            <v-expansion-panel class="expan-class">
              <v-expansion-panel-header class="expan-class"
                ><b class="font_13"> با بانیان </b></v-expansion-panel-header
              >
              <v-expansion-panel-content class="expan-class">
                <p class="font_12">حریم خصوصی</p>
                <p class="font_12">پاسخ به پرسش های متداول</p>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
      <v-col cols="12">
        <v-divider></v-divider>
        <div class="text-center pt-1">
          <b class="grey--text my-2 font_13"> رسانه های خبری</b>
          <v-col cols="12" class="pb-0">
            <v-row class="pa-3 pb-0 justify-center">
              <v-icon
                v-for="(icon, i) in social_icons"
                :key="i"
                size="30"
                class="mx-2"
                color="#3e3e3e"
              >
                {{ icon.name }}
              </v-icon>
            </v-row>
          </v-col>
        </div>
      </v-col>
      <p>
        <b class="font_14"> فروشگاه اینترنتی بانیان , انتخاب و خرید آنلاین </b>
      </p>
      <small>
        بانیان به عنوان یکی از قدیمی ترین فروشگاه های اینترنتی با بیش از یک دهه تجربه , با
        پایبندی به سه اصل پرداخت در محل , 7 روز ضمانت بازگشت کالا و تضمین اصل بودن کالا
        موفق شده تا همگام با فروشگاه های معتبر , به یک از بزرگترین فروشگاه های اینترنتی
        ایران تبدیل شود به محض ورود به سایت با دنیایی از کالا ها روبه رو میشوید ! هر آنچه
        نیاز دارید و به ذهن شما خطور میکند در اینجا ئیدا خواهید کرد
      </small>
    </v-col>
  </v-sheet>
</template>

<script>
export default {
  data() {
    return {
      main_setting: null,
      informations: [
        {
          icon: "mdi-office-building",
          description: "",
        },
        {
          icon: "mdi-face-agent",
          description: "",
        },
        {
          icon: "mdi-email-outline",
          description: " ",
        },
        {
          icon: "mdi-phone",
          description: "",
        },
        {
          icon: "mdi-cellphone",
          description: "",
        },
        {
          icon: "mdi-post-outline",
          description: "",
        },
      ],
      menu1: [
        {
          name: "درباره ما",
          route: "/about-us",
        },
        {
          name: "نحوه ارسال",
          route: "/how-to-send",
        },
        {
          name: "حریم شخصی",
          route: "/privacy",
        },
        {
          name: "قوانین و مقررات",
          route: "/terms-and-conditions",
        },
        {
          name: "ثبت شکایات",
          route: "/complaint",
        },
      ],
      menu2: [
        {
          name: "ارتباط با ما",
          route: "/contact-us",
        },
        {
          name: "راهنمای سایز کفش",
          route: "/show-size-guide",
        },
        {
          name: "شرایط مرجوعی ",
          route: "/return-conditions",
        },
        {
          name: "خدمات پس از فروش",
          route: "/support",
        },
        {
          name: "شعب و نمایندگی",
          route: "/dealership",
        },
        {
          name: "درخواست نمایندگی",
          route: "/form-for-branch-registeration",
        },
        {
          name: "فروش عمده و سازمانی",
          route: "/whole-sale",
        },
      ],
      social_icons: [
        {
          name: "mdi-facebook",
          route: "",
        },
        {
          name: "mdi-twitter",
          route: "",
        },
        {
          name: "mdi-instagram",
          route: "",
        },
        {
          name: "mdi-whatsapp",
          route: "",
        },
        {
          name: "telegram",
          route: "",
        },
        {
          name: "aparat",
          route: "",
        },
      ],
    };
  },
  created() {
    // this.main_setting =  this.$store.state.base.main_setting
  },
  watch: {
    "$store.state.setting.main_setting"() {
      let clone_main_setting = [...this.$store.state.setting.main_setting];
      clone_main_setting.map((x) => {
        this.informations[0].description = x.address;
        this.informations[1].description = x.addres_after_sales_service;
        this.informations[2].description = x.email;
        this.informations[3].description = x.advertising;
        this.informations[4].description = x.phone;
        this.informations[5].description = x.postal_code;
      });
    },
  },
  methods: {
    goToPage(value) {
      this.$router.push(value);
    },
  },
};
</script>
<style scoped>
.expan-class {
  background-color: #9a9a9a0f !important;
}
</style>
