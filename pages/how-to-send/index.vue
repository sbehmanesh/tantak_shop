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
      <v-card class="mt-8 px-7 card_class">
        <v-row class="py-10">
          <v-col cols="12" class=" text-center">
            <h1>شرایط ارسال کالا</h1>
          </v-col>
          <v-col cols="12" v-if="!$vuetify.breakpoint.mdAndUp" class="text-center">
            <img src="/image/img_tantak1.jpg" width="200" />
          </v-col>
          <v-col cols="12" md="7">
            <div>
              <div class="line-height-40 mx-6">
                <h3>ارسال محصولات تن تاک به چه صورت می باشد؟</h3>

                <ul>
                  <li>
                    <p>
                      در خرید‌های کمتر از 1,500,000 ریال، بابت ارسال محصول تا
                      محل مورد نظر مشتریان، هزینه دریافت می‌شود، اما خریدهای
                      بیش‌ از این مبلغ رایگان ارسال خواهند شد. در صورت حضور
                      گیرنده در محدوده شهر تهران، ارسال کالاهای خریداری شده
                      معمولا با پیک انجام خواهد شد.
                    </p>
                  </li>
                  <li>
                    <p>
                      در صورتی که کالای مورد نظر شما در انبار موجود باشد،
                      محصولات برای تهران بین 3 تا 5 روز کاری و برای شهرستان بین
                      3 تا 7 روز کاری طول می کشد ارسال شود. ارسال محصولات از
                      طریق پست می باشد.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </v-col>
          <v-col cols="5" v-if="$vuetify.breakpoint.mdAndUp">
            <img src="/image/img_tantak1.jpg" width="450" />
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
