<template>
  <v-row :class="$vuetify.breakpoint.smAndDown ? 'my-6 mx-3' : 'ma-6'">
    <v-col cols="12" md="12">
      <v-card class="border12" v-if="$vuetify.breakpoint.mdAndUp">
        <v-breadcrumbs :items="items">
          <template v-slot:divider>
            <v-icon>mdi-chevron-left</v-icon>
          </template>
        </v-breadcrumbs>
      </v-card>
      <v-card
        class="border12"
        :class="$vuetify.breakpoint.mdAndUp ? 'mt-8 px-10' : 'px-4'"
      >
        <v-row :class="$vuetify.breakpoint.mdAndUp ? 'py-10' : 'py-4'">
          <v-col
            cols="12"
            :class="$vuetify.breakpoint.mdAndUp ? '' : 'd-flex justify-center'"
          >
            <h1>درباره تن تاک</h1>
          </v-col>
          <v-col
            cols="12"
            v-if="!$vuetify.breakpoint.mdAndUp"
            class="d-flex justify-center"
          >
            <img src="/image/tantak.jpg" width="240" />
          </v-col>
          <v-col cols="12" md="7">
            <div>
              <div
                :class="
                  $vuetify.breakpoint.mdAndUp
                    ? 'line-height-40'
                    : 'line-height-36'
                "
              >
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
          <v-col
            cols="5"
            v-if="$vuetify.breakpoint.mdAndUp"
            class="d-flex justify-center mt-n6"
          >
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
</style>
