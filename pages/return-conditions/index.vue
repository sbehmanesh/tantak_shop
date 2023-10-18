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
      <v-card class="border12" :class="$vuetify.breakpoint.mdAndUp ? 'px-6 mt-8' : 'px-3'">
        <v-row class="pt-10">
          <v-col
            cols="12"
            :class="$vuetify.breakpoint.mdAndUp ? '' : 'd-flex justify-center'"
          >
            <h1 :class="$vuetify.breakpoint.smAndDown ? '' : 'mr-10'">
              شرایط مرجوعی کالا
            </h1>
          </v-col>
          <v-col cols="12">
            <div
              :class="
                $vuetify.breakpoint.mdAndUp ? 'mx-6' : 'line-height-36 mx-2'
              "
            >
              <div>
                <div v-for="(condition, i) in conditions" :key="i" class="mb-4">
                  <div class="d-flex mb-4">
                    <v-icon size="20" color="primary">mdi-restore-alert</v-icon>
                    <h4 class="mr-3">
                      {{ condition.title }}
                    </h4>
                  </div>
                  <!-- </div> -->
                  <div :class="$vuetify.breakpoint.mdAndUp ? 'mx-6' : 'mr-6 ml-3'">
                    <ul>
                      <li v-for="term in condition.terms" :key="term">
                        <p>
                          {{ term }}
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
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
          text: "شرایط مرجوعی ",
          disabled: false,
          to: "/return-conditions",
        },
      ],
      conditions: [
        {
          title: "بازگشت و یا تعویض کالا چه دلایلی می تواند داشته باشد؟",
          terms: [
            "در صورت عدم استفاده از کفش خریداری شده،ظرف مدت زمان 7روز میتوانید کفش خریداری شده را تعویض و یا مرجوع نمایید.",
            "مورد پسند نبودن کالای دریافتی ، مناسب نبودن سایز محصول دریافتی، عدم مطابقت محصول سفارش داده شده با محصول دریافتی یا وجود نقص و ایراد در کالای خریداری شده دلایلی است که میتوانید کالای خریداری شده خود را تعویض و یا مرجوع نمایید.",
          ],
        },
        {
          title: "شرایط مرجوعی",
          terms: [
            "کالای برگشت حتما همراه فاکتور مربوطه باشد.",
            "شرایط مرجوعی محصولات چرمی شامل :شکستگی زیره،معیوب بودن چرم و همچنین جداشدن رویه از زیره کفش می باشد.",
            "شرایط مرجوعی کتانی و کفش های راحتی شامل: شکستگی زیره و جداشدن رویه از زیره کفش می باشد.",
          ],
        },
        {
          title: "ثبت درخواست مرجوعی و یا تعویض به چه صورت می باشد؟",
          terms: [
            "مشتریان عزیز در صورتی که قصد مرجوعی و یا تعویض کالایی را دارید پس از ثبت درخواست ، کالای خود را برگشت دهید. برای ثبت درخواست مرجوعی و تعویض می‌توانید از پنل کاربری خود در سایت تن تاک ، درخواست خود را ثبت نمائید.",
          ],
        },
        {
          title: "تعویض",
          terms: [
            "پس از بررسی درخواست تعویض شما و تایید توسط مسئول مربوطه،پیامکی حاوی اطلاعات لازم برای تعویض کالا برای شما ارسال می گردد.",
            "پس از دریافت کالای شما و تایید توسط کارشناسان مربوطه، طی 3 الی 7 روز کاری کالای مورد نظر ارسال میشود.",
            "توجه: چنان چه قصد تعویض دارید، در حداقل زمان ممکن پس از دریافت کالا اقدام نمایید تا این روال بدون هیچ گونه مشکلی، برای شما انجام شود.",
          ],
        },
        {
          title: "مرجوعی",
          terms: [
            "پس از بررسی درخواست مرجوعی و تایید توسط مسئول مربوطه،پیامکی حاوی اطلاعات لازم برای بازگشت کالا برای شما ارسال می گردد.",
            "در این صورت مبلغ واریزی شما، طی حداقل 72 ساعت(3روز کاری)به شماره کارت ثبت شده شما واریز میگردد.",
            "توجه: چنان چه قصد تعویض دارید، در حداقل زمان ممکن پس از دریافت کالا اقدام نمایید تا این روال بدون هیچ گونه مشکلی، برای شما انجام شود.",
          ],
        },
        {
          title: "کالای خود را به چه آدرسی ارسال کنیم؟",
          terms: [
            "تهران، بزرگراه آزادگان، بزرگراه رجایی، بزرگراه شهید بهشتی، نرسیده به سه راه ترانسفور، مجتمع تجاری آرین",
            "تلفن پشتیبانی: 57917000-021",
          ],
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
