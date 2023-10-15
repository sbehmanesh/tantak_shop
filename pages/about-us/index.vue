<template>
  <v-row class="ma-6">
    <v-col cols="12" md="12">
      <v-card class="border12" v-if="$vuetify.breakpoint.mdAndUp">
        <v-breadcrumbs :items="items">
          <template v-slot:divider>
            <v-icon>mdi-chevron-left</v-icon>
          </template>
        </v-breadcrumbs>
      </v-card>
      <v-card class="mt-8 text-center px-10 card_class">
        <v-row class="py-10">
          <v-col cols="12" class="d-flex mr-14">
            <h1>درباره تن تاک</h1>
          </v-col>
          <v-col cols="6" md="7" class="text_center">
            <div class="mx-14">
              <div class="line-height-40 mx-6">
                یک دهه پیش بود که تن تاک متولد شد. برندی برای ایران و ایرانی،
                برندی برای خانواده، برندی برای تو و من، برندی برای همپا بودن
                <br />
                تن تاک با تکیه بر شعار "ما میتوانیم" و اتکاء به دانش متخصصان
                ایرانی و تجربه صنعتگران داخلی کشور، اقدام به تولید بیش از 100
                مدل کفش در طرح های چرمی، ورزشی و راحتی برای تمامی اعضا خانواده
                های ایرانی نموده است
                <br />
                این محصولات در بیش از 50 کارگاه تولیدی کوچک و بزرگ در سراسر میهن
                عزیزمان تولید می شود و مفتخریم که در راستای اشتغال جوانان این
                مرز و بوم قدمی موثر برداشته و در سال رونق و تولید ملی محیطی آرام
                و جذاب را در بیش از 120 فروشگاه زنجیره ای تن تاک گرد هم آورده
                ایم.
              </div>
            </div>
          </v-col>
          <v-col cols="5">
            <img src="/image/tantak.jpg" width="450" />
          </v-col>
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
          text: "درباره ما",
          disabled: false,
          to: "/about-us",
        },
        {
          text: "نحوه ارسال",
          disabled: false,
          to: "/how-to-send",
        },
        {
          text: "حریم شخصی",
          disabled: false,
          to: "/privacy",
        },
        {
          text: "قوانین و مقررات",
          disabled: false,
          to: "/terms-and-conditions",
        },
        {
          text: "راهنمای سایز کفش",
          disabled: false,
          to: "/show-size-guide",
        },
        {
          text: "شرایط مرجوعی ",
          disabled: false,
          to: "/return-conditions",
        },
        {
          text: "خدمات پس از فروش",
          disabled: false,
          to: "/support",
        },
      ],
    };
  },
};
</script>

<style scoped>
h1 {
  font-size: 30px;
}
p {
  font-size: 15px;
}
.card_class {
  border-radius: 10px;
  background-color: #ffffff;
}
</style>
