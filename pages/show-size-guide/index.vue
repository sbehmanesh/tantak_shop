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
      <v-card class="mt-8 px-10 py-10 card_class">
        <v-row class="py-10">
          <v-col cols="12" class="d-flex mr-14 text-center">
            <h1>راهنمای سایز کفش</h1>
          </v-col>
          <v-col cols="6" md="7" class="text_center">
            <div class="mx-14">
              <div class="line-height-40 mx-6">
                <h4>نحوه اندازه گیری سایز کفش و پا</h4>
                <ul>
                  <li>
                    <p>
                      اندازه بودن کفش دارای اهمیت زیادی می باشد،اگر کفش شما تنگ
                      باشد یا گشاد، استایل شما را به هم می ریزد و باعث ناراحتی
                      پا می شود.
                    </p>
                  </li>
                </ul>
              </div>
              <div class="line-height-40 mx-6">
                <h4>نحوه صحیح اندازه گیری پا</h4>
                <ul>
                  <li>
                    <p>
                      اندازه گیری طول پا: پای خود را روی سطحی صاف قرار دهید
                      میتوانید از کاغذ هم استفاده کنید. و به صورت عمود و دقیق
                      پاشنه و نوک شصت را علامت گذاری کنید.
                    </p>
                  </li>
                  <li>
                    <p>
                      طول پای خود را اندازه بگیرد، از پاشنه تا نوک انگشت شصت را
                      با خط کش اندازه بگیرید
                    </p>
                  </li>
                  <li>
                    <p>
                      حال عدد به دست آمده را در جدول زیر قرار دهید و سایز خود را
                      پیدا کنید.درکشور ما سایز اروپایی برای تعیین سایز کفش ها
                      استفاده می شود . ملاک ما برای پیدا کردن سایز کفش ، سایز
                      اروپایی می باشد.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </v-col>
          <v-col cols="5">
            <img
              src="/image/img_tantak7.jpg
              "
              width="500"
            />
          </v-col>
        </v-row>
        <v-col cols="5" md="10">
          <div class="line-height-40 mx-6">
            <h4>ما به طور کلی 3 نوع سایز بندی داریم:</h4>
            <ul>
              <li><p>سایز کفش انگلیسی (UK)</p></li>
              <li><p>سایز کفش آمریکایی ( US)</p></li>
              <li><p>سایز کفش اروپایی (EU)</p></li>
            </ul>
          </div>
          <div class="line-height-40 mx-6">
            <h4>نکته:</h4>
            <ul>
              <li>
                <p>
                  در پایان روز پای شما بزرگتر از صبح می باشد. بنابراین بهترین
                  زمان برای اندازه گیری سایز پا در ساعات پایانی روز میباشد. بعضی
                  از افراد سایز پای چپ و راستشان با هم فرق دارد و شما هر دو پا
                  را اندازه بگیرد و بعد و باتوجه به سایز پای بزرگ تر کفش را
                  انتخاب کنید.
                </p>
              </li>
              <li>
                <p>
                  در صورتی که سایز پای شما دقیقا برابر اعداد جدول نشد و ما بین
                  دوعدد شد، عدد بزرگتر را به عنوان سایز کف پای خود انتخاب کنید.
                </p>
              </li>
            </ul>
          </div>
        </v-col>
        <v-row>
          <v-col cols="2" md="2"></v-col>
          <v-col cols="8" md="8">
            <div class="text-center">
              <h3 class="orange lighten-6 pa-3">
                راهنمای سایز کفش کودک 2 تا 7 سال
              </h3>
              <template>
                <v-data-table
                  :headers="headers"
                  :hide-default-footer="true"
                  :items="desserts"
                  :items-per-page="100"
                  class="elevation-1"
                ></v-data-table>
              </template>
            </div>
          </v-col>
          <v-col cols="2" md="2"></v-col>
        </v-row>

        <v-row>
          <v-col cols="2" md="2"></v-col>
          <v-col cols="8" md="8">
            <div class="text-center">
              <h3 class="orange lighten-6 pa-3">راهنمای سایز کفش 8 - 16 سال</h3>
              <template>
                <v-data-table
                  :headers="headers_2"
                  :hide-default-footer="true"
                  :items="desserts_2"
                  :items-per-page="100"
                  class="elevation-1"
                ></v-data-table>
              </template>
            </div>
          </v-col>
          <v-col cols="2" md="2"></v-col>
        </v-row>
        <v-row>
          <v-col cols="2" md="2"></v-col>
          <v-col cols="8" md="8">
            <div class="text-center">
              <h3 class="orange lighten-6 pa-3">راهنمای سایز کفش زنانه</h3>
              <template>
                <v-data-table
                  :headers="headers_3"
                  :hide-default-footer="true"
                  :items="desserts_3"
                  :items-per-page="100"
                  class="elevation-1"
                ></v-data-table>
              </template>
            </div>
          </v-col>
          <v-col cols="2" md="2"></v-col>
        </v-row>
        <v-row>
          <v-col cols="2" md="2"></v-col>
          <v-col cols="8" md="8">
            <div class="text-center">
              <h3 class="orange lighten-6 pa-3">راهنمای سایز کفش مردانه</h3>
              <template>
                <v-data-table
                  :headers="headers_4"
                  :hide-default-footer="true"
                  :items="desserts_4"
                  :items-per-page="100"
                  class="elevation-1"
                ></v-data-table>
              </template>
            </div>
          </v-col>
          <v-col cols="2" md="2"></v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>
    
    <script>
export default {
  data() {
    return {
      headers: [
        {
          text: "طول پا به سانتی متر",
          align: "start",
          sortable: false,
          value: "cm",
        },
        { text: "Us", value: "Us" },
        { text: "Uk", value: "Uk" },
        { text: "Eu & Iran", value: "Eu" },
      ],
      headers_2: [
        {
          text: "طول پا به سانتی متر",
          align: "start",
          sortable: false,
          value: "cm",
        },
        { text: "Us", value: "Us" },
        { text: "Uk", value: "Uk" },
        { text: "Eu & Iran", value: "Eu" },
      ],
      headers_3: [
        {
          text: "طول پا به سانتی متر",
          align: "start",
          sortable: false,
          value: "cm",
        },
        { text: "Us", value: "Us" },
        { text: "Uk", value: "Uk" },
        { text: "Eu & Iran", value: "Eu" },
      ],
      headers_4: [
        {
          text: "طول پا به سانتی متر",
          align: "start",
          sortable: false,
          value: "cm",
        },
        { text: "Us", value: "Us" },
        { text: "Uk", value: "Uk" },
        { text: "Eu & Iran", value: "Eu" },
      ],
      desserts_2: [
        {
          cm: 19.7,
          Us: 1,
          Uk: 13,
          Eu: 32,
        },
        {
          cm: 20.6,
          Us: 2,
          Uk: 1,
          Eu: 33,
        },
        {
          cm: 21.6,
          Us: 3,
          Uk: 2,
          Eu: 34,
        },
        {
          cm: 22.2,
          Us: 4,
          Uk: 3,
          Eu: 35,
        },
        {
          cm: 23.2,
          Us: 5,
          Uk: 4,
          Eu: 36,
        },
        {
          cm: 24.1,
          Us: 6,
          Uk: 5,
          Eu: 37,
        },
      ],
      desserts_4: [
        {
          cm: 23,
          Us: 5.5,
          Uk: 5,
          Eu: 38,
        },
        {
          cm: 24,
          Us: 6,
          Uk: 5.5,
          Eu: 38.7,
        },
        {
          cm: 24.5,
          Us: 6.5,
          Uk: 6,
          Eu: 39.3,
        },
        {
          cm: 25,
          Us: 7,
          Uk: 6.5,
          Eu: 40,
        },
        {
          cm: 25.5,
          Us: 7.5,
          Uk: 7,
          Eu: 40.5,
        },
        {
          cm: 26,
          Us: 8,
          Uk: 7.5,
          Eu: 41,
        },
        {
          cm: 26.5,
          Us: 8.5,
          Uk: 8,
          Eu: 42,
        },
        {
          cm: 27,
          Us: 8.5,
          Uk: 79,
          Eu: 42.5,
        },
        {
          cm: 27.5,
          Us: 9.5,
          Uk: 9,
          Eu: 43,
        },
        {
          cm: 28,
          Us: 10,
          Uk: 9.5,
          Eu: 44,
        },
        {
          cm: 28.5,
          Us: 10.5,
          Uk: 10,
          Eu: 44.5,
        },
        {
          cm: 29.5,
          Us: 11.5,
          Uk: 11,
          Eu: 46.5,
        },
        {
          cm: 30,
          Us: 12,
          Uk: 11.5,
          Eu: 46.5,
        },
        {
          cm: 30.5,
          Us: 12.5,
          Uk: 12,
          Eu: 47,
        },
      ],
      desserts: [
        {
          cm: 12.7,
          Us: 5.5,
          Uk: 4.5,
          Eu: 21,
        },
        {
          cm: 13,
          Us: 6,
          Uk: 5,
          Eu: 22,
        },
        {
          cm: 13.3,
          Us: 6.5,
          Uk: 5.5,
          Eu: 22,
        },
        {
          cm: 14,
          Us: 7,
          Uk: 6,
          Eu: 23,
        },
        {
          cm: 14.2,
          Us: 7.5,
          Uk: 6.5,
          Eu: 23,
        },
        {
          cm: 14.6,
          Us: 8,
          Uk: 7,
          Eu: 24,
        },
        {
          cm: 15.2,
          Us: 8.5,
          Uk: 7.5,
          Eu: 25,
        },
        {
          cm: 15.6,
          Us: 9,
          Uk: 8,
          Eu: 25,
        },
        {
          cm: 15.9,
          Us: 9.5,
          Uk: 8.5,
          Eu: 26,
        },
        {
          cm: 16.5,
          Us: 10,
          Uk: 9,
          Eu: 27,
        },
        {
          cm: 16.8,
          Us: 10.5,
          Uk: 9.5,
          Eu: 27,
        },
        {
          cm: 17.1,
          Us: 11,
          Uk: 10,
          Eu: 28,
        },
        {
          cm: 17.8,
          Us: 11.5,
          Uk: 10.5,
          Eu: 29,
        },
        { cm: 18.1, Us: 12, Uk: 11, Eu: 30 },
        { cm: 18.4, Us: 12.5, Uk: 11.5, Eu: 30 },
        { cm: 19.1, Us: 13, Uk: 12, Eu: 31 },
      ],
      desserts_3: [
        {
          cm: 21.5,
          Us: 4.5,
          Uk: 2,
          Eu: 34,
        },
        {
          cm: 22,
          Us: 5,
          Uk: 2.5,
          Eu: 35,
        },
        {
          cm: 22.2,
          Us: 5.5,
          Uk: 3,
          Eu: 35.5,
        },
        {
          cm: 23,
          Us: 6,
          Uk: 3.5,
          Eu: 36,
        },
        {
          cm: 23,
          Us: 6.5,
          Uk: 4,
          Eu: 37,
        },
        {
          cm: 23.5,
          Us: 7,
          Uk: 4.5,
          Eu: 37.5,
        },
        {
          cm: 24,
          Us: 7.5,
          Uk: 5,
          Eu: 38,
        },
        {
          cm: 24,
          Us: 8,
          Uk: 5.5,
          Eu: 38.5,
        },
        {
          cm: 24.5,
          Us: 8.5,
          Uk: 6,
          Eu: 39,
        },
        {
          cm: 25,
          Us: 9,
          Uk: 6.5,
          Eu: 39.5,
        },
        {
          cm: 25.5,
          Us: 9.5,
          Uk: 7,
          Eu: 40,
        },
        {
          cm: 26,
          Us: 10,
          Uk: 7.5,
          Eu: 41,
        },
        {
          cm: 26,
          Us: 10.5,
          Uk: 8,
          Eu: 41,
        },
      ],
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
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 30px;
}
</style>
    