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
      <v-card class="mt-8 px-10 card_class">
        <v-row class="py-10">
          <v-col cols="12" class="d-flex mr-14 text-center">
            <h1>خدمات پس از فروش و پشتیبانی</h1>
          </v-col>
          <v-col cols="6" md="7" class="text_center">
            <div class="mx-14">
              <div class="line-height-40 mx-6">
                <h3>ضمانت 7روزه تمامی محصولات تن تاک</h3>
                <p>
                  در صورتی که مشتری محترم تمایل به برگشت محصول خریداری شده خود
                  را داشته باشد، درصورت تطابق باشرایط مرجوعی کالا ،طی 7 روز مهلت
                  ارسال کالا را دارد.
                </p>
                <p>
                  همچنین محصولات چرمی دارای ضمانت 6 ماهه زیره کفش می باشند و
                  کتانی و کفش های راحتی شامل 3 ماه ضمانت زیره کفش می باشند.
                </p>

                <h5>تلفن پشتیبانی: 57917000-021</h5>
                <br />
                <p>
                  خدمات پس از فروش: تهران، بزرگراه آزادگان، بزرگراه رجایی،
                  بزرگراه شهید بهشتی، نرسیده به سه راه ترانسفور، مجتمع تجاری
                  آرین
                </p>
              </div>
            </div>
          </v-col>
          <v-col cols="5">
            <img
              src="/image/img_tantak6.jpg
            "
              width="450"
            />
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
  