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
            <h1 v-if="$vuetify.breakpoint.mdAndUp">خدمات پس از فروش و پشتیبانی</h1>
            <h3 v-if="!$vuetify.breakpoint.mdAndUp">خدمات پس از فروش و پشتیبانی</h3>
          </v-col>
          <v-col
            cols="12"
            v-if="!$vuetify.breakpoint.mdAndUp"
            class="d-flex justify-center"
          >
            <img
              src="/image/img_tantak6.jpg
            "
              width="200"
            />
          </v-col>
          <v-col cols="12" md="7">
            <div>
              <div class="line-height-40" :class="$vuetify.breakpoint.mdAndUp ? 'mx-6' : ''">
                <h3 :class="$vuetify.breakpoint.smAndDown ? 'mr-3 font_18' : ''">
                  ضمانت 7روزه تمامی محصولات تن‌تاک
                </h3>
                <div class="d-flex">
                  <v-icon
                    size="20"
                    color="primary"
                    class="align-start ml-2 mt-3"
                    >mdi-check</v-icon
                  >

                  <p>
                    در صورتی که مشتری محترم تمایل به برگشت محصول خریداری شده خود
                    را داشته باشد، درصورت تطابق باشرایط مرجوعی کالا ،طی 7 روز
                    مهلت ارسال کالا را دارد.
                  </p>
                </div>
                <div class="d-flex">
                  <v-icon
                    size="20"
                    color="primary"
                    class="align-start ml-2 mt-3"
                    >mdi-check</v-icon
                  >

                  <p>
                    همچنین محصولات چرمی دارای ضمانت 6 ماهه زیره کفش می باشند و
                    کتانی و کفش های راحتی شامل 3 ماه ضمانت زیره کفش می باشند.
                  </p>
                </div>
                <div class="d-flex">
                  <v-icon
                    size="20"
                    color="primary"
                    class="align-start ml-2 mt-3"
                    >mdi-face-agent</v-icon
                  >
                  <h5>تلفن پشتیبانی: 57917000-021</h5>
                </div>
                <div class="d-flex">
                  <v-icon
                    size="20"
                    color="primary"
                    class="align-start ml-2 mt-3"
                    >mdi-face-agent</v-icon
                  >
                  <p>
                    خدمات پس از فروش: تهران، بزرگراه آزادگان، بزرگراه رجایی،
                    بزرگراه شهید بهشتی، نرسیده به سه راه ترانسفور، مجتمع تجاری
                    آرین
                  </p>
                </div>
              </div>
            </div>
          </v-col>
          <v-col cols="5" v-if="$vuetify.breakpoint.mdAndUp" class="d-flex justify-center mt-n10">
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
          text: "خدمات پس از فروش",
          disabled: true,
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
