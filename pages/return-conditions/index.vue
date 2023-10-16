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
      <v-card class="mt-8 px-7 card_class">
        <v-row class="py-10">
          <v-col
            cols="12"
            :class="$vuetify.breakpoint.mdAndUp ? '' : 'd-flex justify-center'"
          >
            <h1 :class="$vuetify.breakpoint.smAndDown ? '' : 'mr-10'">شرایط مرجوعی کالا</h1>
          </v-col>
          <v-col
          cols="12"
            v-if="!$vuetify.breakpoint.mdAndUp"
            class="d-flex justify-center"
          >
            <img src="/image/img_tantak5.jpg" width="280" />
          </v-col>
          <v-col cols="12" md="7">
            <div
            :class="
                  $vuetify.breakpoint.mdAndUp
                    ? 'line-height-40 mx-6'
                    : 'line-height-36 mx-2'
                "
            >
              <div class="line-height-40 mx-6">
                <h3 :class="$vuetify.breakpoint.smAndDown ? 'mr-3' : ''">
                  بازگشت و یا تعویض کالا چه دلایلی می‌تواند داشته باشد؟
                </h3>
                <div class="d-flex">
                  <v-icon
                    size="20"
                    color="primary"
                    class="align-start ml-2 mt-3"
                    >mdi-send</v-icon
                  >
                  <p>
                    در صورت عدم استفاده از کفش خریداری شده،ظرف مدت زمان 7روز
                    میتوانید کفش خریداری شده را تعویض و یا مرجوع نمایید.
                  </p>
                </div>

                <div class="d-flex">
                  <v-icon
                    size="20"
                    color="primary"
                    class="align-start ml-2 mt-3"
                    >mdi-send</v-icon
                  >
                  <p>
                    مورد پسند نبودن کالای دریافتی ، مناسب نبودن سایز محصول
                    دریافتی، عدم مطابقت محصول سفارش داده شده با محصول دریافتی یا
                    وجود نقص و ایراد در کالای خریداری شده دلایلی است که میتوانید
                    کالای خریداری شده خود را تعویض و یا مرجوع نمایید.
                  </p>
                </div>
              </div>
            </div>
          </v-col>
          <v-col
            cols="5"
            v-if="$vuetify.breakpoint.mdAndUp"
            class="d-flex justify-center"
          >
            <img src="/image/img_tantak5.jpg" width="450" />
          </v-col>
        </v-row>
        <v-col cols="12" md="10">
          <div>
            <div class="line-height-40 mx-3 pb-8">
              <h3 :class="$vuetify.breakpoint.smAndDown ? 'mr-3' : ''">
                شرایط مرجوعی
              </h3>
              <ul>
                <div class="d-flex">
                  <v-icon
                    size="20"
                    color="primary"
                    class="align-start ml-2 mt-3"
                    >mdi-send</v-icon
                  >
                  <p>کالای برگشت حتما همراه فاکتور مربوطه باشد.</p>
                </div>
                <div class="d-flex">
                  <v-icon
                    size="20"
                    color="primary"
                    class="align-start ml-2 mt-3"
                    >mdi-send</v-icon
                  >
                  <p>
                    شرایط مرجوعی محصولات چرمی شامل :شکستگی زیره،معیوب بودن چرم و
                    همچنین جداشدن رویه از زیره کفش می باشد.
                  </p>
                </div>
                <div class="d-flex">
                  <v-icon
                    size="20"
                    color="primary"
                    class="align-start ml-2 mt-3"
                    >mdi-send</v-icon
                  >
                  <p>
                    شرایط مرجوعی کتانی و کفش های راحتی شامل: شکستگی زیره و
                    جداشدن رویه از زیره کفش می باشد.
                  </p>
                </div>
              </ul>
              <h3 :class="$vuetify.breakpoint.smAndDown ? 'mr-3' : ''">
                ثبت درخواست مرجوعی و یا تعویض به چه صورت می باشد؟
              </h3>
              <div class="d-flex">
                <v-icon size="20" color="primary" class="align-start ml-2 mt-3"
                  >mdi-send</v-icon
                >
                <p>
                  مشتریان عزیز در صورتی که قصد مرجوعی و یا تعویض کالایی را دارید
                  پس از ثبت درخواست ، کالای خود را برگشت دهید. برای ثبت درخواست
                  مرجوعی و تعویض می‌توانید از پنل کاربری خود در سایت تن تاک ،
                  درخواست خود را ثبت نمائید.
                </p>
              </div>

              <br />
              <h3 :class="$vuetify.breakpoint.smAndDown ? 'mr-3' : ''">
                تعویض
              </h3>
              <div class="d-flex">
                <v-icon size="20" color="primary" class="align-start ml-2 mt-3"
                  >mdi-send</v-icon
                >
                <p>
                  پس از بررسی درخواست تعویض شما و تایید توسط مسئول مربوطه،پیامکی
                  حاوی اطلاعات لازم برای تعویض کالا برای شما ارسال می گردد.
                </p>
              </div>
              <div class="d-flex">
                <v-icon size="20" color="primary" class="align-start ml-2 mt-3"
                  >mdi-send</v-icon
                >
                <p>
                  پس از دریافت کالای شما و تایید توسط کارشناسان مربوطه، طی 3 الی
                  7 روز کاری کالای مورد نظر ارسال میشود.
                </p>
              </div>
              <div class="d-flex">
                <v-icon size="20" color="primary" class="align-start ml-2 mt-3"
                  >mdi-send</v-icon
                >
                <p>
                  توجه: چنان چه قصد تعویض دارید، در حداقل زمان ممکن پس از دریافت
                  کالا اقدام نمایید تا این روال بدون هیچ گونه مشکلی، برای شما
                  انجام شود.
                </p>
              </div>

              <h3 :class="$vuetify.breakpoint.smAndDown ? 'mr-3' : ''">
                مرجوعی
              </h3>
              <div class="d-flex">
                <v-icon size="20" color="primary" class="align-start ml-2 mt-3"
                  >mdi-send</v-icon
                >
                <p>
                  پس از بررسی درخواست مرجوعی و تایید توسط مسئول مربوطه،پیامکی
                  حاوی اطلاعات لازم برای بازگشت کالا برای شما ارسال می گردد. در
                  این صورت مبلغ واریزی شما، طی حداقل 72 ساعت(3روز کاری)به شماره
                  کارت ثبت شده شما واریز میگردد.
                </p>
              </div>
              <div class="d-flex">
                <v-icon size="20" color="primary" class="align-start ml-2 mt-3"
                  >mdi-send</v-icon
                >
                <h5>
                  توجه: چنان چه قصد تعویض دارید، در حداقل زمان ممکن پس از دریافت
                  کالا اقدام نمایید تا این روال بدون هیچ گونه مشکلی، برای شما
                  انجام شود.
                </h5>
              </div>

              <br />

              <h3 :class="$vuetify.breakpoint.smAndDown ? 'mr-3' : ''">
                کالای خود را به چه آدرسی ارسال کنیم؟
              </h3>
              <div class="d-flex">
                <v-icon size="20" color="primary" class="align-start ml-2 mt-3"
                  >mdi-send</v-icon
                >
                <p>
                  تهران، بزرگراه آزادگان، بزرگراه رجایی، بزرگراه شهید بهشتی،
                  نرسیده به سه راه ترانسفور، مجتمع تجاری آرین تلفن پشتیبانی:
                  57917000-021
                </p>
              </div>
            </div>
          </div>
        </v-col>
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
