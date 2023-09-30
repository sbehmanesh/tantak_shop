<template>
  <div>
    <v-row :class="$vuetify.breakpoint.mdAndUp ? 'ma-6' : 'mx-2'">
      <v-col cols="12">
        <v-card class="border12" v-if="$vuetify.breakpoint.mdAndUp">
          <v-breadcrumbs :items="menus">
            <template v-slot:divider>
              <v-icon>mdi-chevron-left</v-icon>
            </template>
          </v-breadcrumbs>
        </v-card>
        <v-card class="my-5 border12 box-shadow-none h-max" :class="{'px-2': $vuetify.breakpoint.smAndDown}">
        <div class="font_32 mr-4 pt-8">کارگاه</div>
        <div class="lineheight py-8" :class="{ 'px-5': $vuetify.breakpoint.mdAndUp }">
          کارگاه گل قند تشکیل شده از دو بخش اداری و کارگاهی که در بخش اداری امور
          دفتری، بازاریابی، ارتباط با مشتریان عمده و… انجام می شود در بخش
          کارگاهی پس از انتخاب محصول نوبت سورت می باشد<br />
          تمامی مراحل از پاکسازی تا بسته بندی و همینطور ارتباطات در این مکان نیز
          صورت میگیرد<br />
          تیم گل قند پس از انتخاب و بررسی محصول، آن را در مرحله آزمایش قرار داده
          تا در شرایط مختلف نیز کیفیت مشخص شود. مرحله بعدی مرحله سورت و پاکسازی
          محصول سالم است تا بدون هیچگونه ناخالصی باشد مرحله سوم آسیاب ادویه است
          که توسط دستگاه آسیاب می شود، اگر این محصول گیاه دارویی باشد آسیاب نمی
          شود، سپس تیم بسته بندی گل قند شروع به بسته بندی کرده و درون ظروف و
          بسته بندی پارچه ای ریخته و‌وزن می کنند حال نوبت نصب تگ و لیبل است که
          این بسته بندی را کامل می کند.
        </div>

        <v-col cols="12" :class="{ 'pa-0': $vuetify.breakpoint.smAndDown }">
          <v-row class="flex-wrap" >
            
            <v-col cols="12" md="4">
              <v-img
                src="/image/workshop/2.jpeg"
                @click="slider_dialog = true"
                class="pointer"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-img
                src="/image/workshop/3.jpeg"
                @click="slider_dialog = true"
                class="pointer"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-img
                src="/image/workshop/5.jpeg"
                @click="slider_dialog = true"
                class="pointer"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-img
                src="/image/workshop/1.jpeg"
                @click="slider_dialog = true"
                class="pointer"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-img
                src="/image/workshop/4.jpeg"
                @click="slider_dialog = true"
                class="pointer"
              />
            </v-col>
          </v-row>
        </v-col>
        </v-card>
      </v-col>
    </v-row>

    <v-col cols="12">
      <v-dialog v-model="slider_dialog"  max-width="800px" >
        <v-carousel hide-delimiters >
          <v-carousel-item
            v-for="(image, i) in images"
            :key="i"
            :src="image.src"
            reverse-transition="fade-transition"
            transition="fade-transition"
          ></v-carousel-item>
        </v-carousel>
      </v-dialog>
    </v-col>
  </div>
</template>
<script>
export default {
  data() {
    return {
      slider_dialog: false,
      menus: [
        {
          text: "خانه",
          disabled: false,
          to: "/",
        },
        {
          text: "کارگاه",
          disabled: true,
          to: "",
        },
      ],
      images: [
        {
          src: "/image/workshop/1.jpeg",
        },
        {
          src: "/image/workshop/2.jpeg",
        },
        {
          src: "/image/workshop/3.jpeg",
        },
        {
          src: "/image/workshop/4.jpeg",
        },
        {
          src: "/image/workshop/5.jpeg",
        },
      ],
    };
  },
};
</script>
