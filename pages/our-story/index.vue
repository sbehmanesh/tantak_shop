<template>
  <v-row :class="$vuetify.breakpoint.mdAndUp ? 'ma-6' : 'mx-2'">
    <v-col cols="12" md="12">
      <v-card class="border12" v-if="$vuetify.breakpoint.mdAndUp">
        <v-breadcrumbs :items="items">
          <template v-slot:divider>
            <v-icon>mdi-chevron-left</v-icon>
          </template>
        </v-breadcrumbs>
      </v-card>
      <v-card class="border12 box-shadow-none" :class="{'px-14': $vuetify.breakpoint.mdAndUp, 'px-4': $vuetify.breakpoint.smAndDown }">
      <div class="font_32 mt-5 pt-4">قصه گل قند</div>
      <div class="mt-5">
        همیشه برامون سوال بود که چرا از این هم گیاهی که تو بیابان های اطراف شهر
        به صورت خودرو رشد می کنه و یه عالمه خواص دارویی داره استفاده درست نمیشه؟
        <br />
        <br />
        آیا مردمی که تو مناطق سردسیر زندگی می کنند به خاصیت این گیاهان نیازمند
        نیستند؟
        <br />
        <br />
        همیشه هم برامون دغدغه بوده با این همه گیاه دارویی خوب که در کشورمون
        داریم چرا این گیاهان رو نمی‌توانیم به کشور های دیگه بفرستیم؟
        <br />
        <br />
        چرا تو عطاری‌ها این گیاهان ارزشمند به صورت فله و بدون بسته بندی به
        فروش‌میرسن و از ارزش این گیاهان کم می کنند.
        <br />
        <br />
        چرا اگر بسته بندی هایی که در بازار موجود هست با نایلون های پلاستیکی بسته
        بندی میشه که ضرر زیادی برای محیط زیست داره؟
        <br />
        <br />
        ما اومدیم در شرکت گل قند، محصولات ارگانیک و طبیعی کشورمون رو با بسته
        بندی هایی که هم زیبا باشه و هم به محیط زیست آسیبی نرسونه و مهمتر از همه
        ارزش محصولات رو حفظ بکنه، به دست شما برسونیم.
        <br />
        <br />
        حالا با خودت میگی گل قند چیه
        <br />
        <br />
        گل قند یه معجون گیاهیه که از ترکیب عسل و غنچه گل محمدی درست میشه
        <br />
        <br />
        مامان بزرگامون هروقت بچه هاشون سردیشون می شد یا مشکل گوارشی داشتن از این
        معجون مقوی برای مداوا استفاده می‌کردند
        <br />
        <br />
        ما اومدیم هم این معجون رو احیا کنیم و هم سایر گیاهان دارویی که متناسب با
        طبع ایرانی وارد خونه های شما کنیم اما با کیفیت و بسته بندی عالی
        <br />
        <br />
        گل قند طبیعت توست….
      </div>
      <v-col cols="12" class="text-center" :class="{ 'px-0': $vuetify.breakpoint.smAndDown }">
        <img src="/image/ourstory.jpeg" class="mt-4" :width="$vuetify.breakpoint.mdAndUp ? 768 : 260" />
      </v-col>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data: () => ({
    items: [
      {
        text: "خانه",
        disabled: false,
        to: "/",
      },
      {
        text: "قصه گل قند",
        disabled: true,
        to: "",
      },
    ],
  }),
};
</script>
