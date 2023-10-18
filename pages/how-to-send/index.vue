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
            <h1>شرایط ارسال کالا</h1>
          </v-col>
          <v-col
          cols="12" v-if="!$vuetify.breakpoint.mdAndUp" class="d-flex justify-center"
          >
            <img src="/image/img_tantak1.jpg" width="200" />
          </v-col>
          <v-col cols="12" md="7">
            <div>
              <div :class="$vuetify.breakpoint.mdAndUp ? 'line-height-40 mx-6' : 'line-height-36 mx-2'">
                <h3 :class="$vuetify.breakpoint.smAndDown ? 'mr-3' : ''">ارسال محصولات تن تاک به چه صورت می باشد؟</h3>
                <div class="d-flex">
                  <v-icon size="20" color="primary" class="align-start ml-2 mt-3">mdi-send</v-icon>
                  <p>
                    در خرید‌های کمتر از 1,500,000 ریال، بابت ارسال محصول تا محل
                    مورد نظر مشتریان، هزینه دریافت می‌شود، اما خریدهای بیش‌ از
                    این مبلغ رایگان ارسال خواهند شد. در صورت حضور گیرنده در
                    محدوده شهر تهران، ارسال کالاهای خریداری شده معمولا با پیک
                    انجام خواهد شد.
                  </p>
                </div>
                <div class="d-flex">
                  <v-icon size="20" color="primary" class="align-start ml-2 mt-3">mdi-send</v-icon>
                  <p>
                    در صورتی که کالای مورد نظر شما در انبار موجود باشد، محصولات
                    برای تهران بین 3 تا 5 روز کاری و برای شهرستان بین 3 تا 7 روز
                    کاری طول می کشد ارسال شود. ارسال محصولات از طریق پست می
                    باشد.
                  </p>
                </div>
              </div>
            </div>
          </v-col>
          <v-col cols="5" v-if="$vuetify.breakpoint.mdAndUp" class="d-flex justify-center">
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
          text: "شرایط ارسال کالا",
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
