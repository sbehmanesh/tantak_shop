<template>
  <v-row :class="$vuetify.breakpoint.mdAndUp ? 'ma-6' : 'mx-2'">
    <v-col cols="12" md="12">
      <v-card class="border12" v-if="$vuetify.breakpoint.mdAndUp">
        <v-breadcrumbs :items="menus">
          <template v-slot:divider>
            <v-icon>mdi-chevron-left</v-icon>
          </template>
        </v-breadcrumbs>
      </v-card>
      <v-card class="my-5 border12 box-shadow-none" :class="{ 'px-14': $vuetify.breakpoint.mdAndUp }">
        <div class="font_32 pt-3 pr-3">تیم تن تاک</div>
        <v-col cols="12" class="text-center">
          <img src="/image/team/manager.jpg" width="180" class="border-50" />
          <div class="font_28 py-2 gray--text">سید سجاد صدیقی</div>
          <div class="gray--text">مدیرعامل و موسس برند تن تاک</div>
        </v-col>
        <v-col cols="12">
          <v-expansion-panels accordion>
            <v-expansion-panel v-for="(item, i) in items" :key="i">
              <v-expansion-panel-header> {{ item.title }} </v-expansion-panel-header>
              <v-expansion-panel-content v-html="item.text" class="pr-6 pb-5">
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
        <v-row class="py-14">
          <v-col
            cols="12"
            md="3"
            class="text-center d-flex justify-center flex-column align-center"
            v-for="(Official, i) in Officials"
            :key="i"
          >
            <v-img aspect-ratio="1" :src="Official.img" width="140" height="140" class="border-50" />
            <div class="orange--text font_14">{{ Official.name }}</div>
            <div class="font_12 gray--text">{{ Official.job }}</div>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data: () => ({
    menus: [
      {
        text: "خانه",
        disabled: false,
        to: "/",
      },
      {
        text: "تیم تن تاک",
        disabled: true,
        to: "",
      },
    ],
    items: [
      {
        title: "مدرک تحصیلی",
        text: "کارشناسی مهندسی مکانیک از دانشگاه سیستان و بلوچستان<br>و هم اکنون محصل در مقطع کارشناسی ارشد مدیریت بازرگانی گرایش تجارت الکترونیک",
      },
      {
        title: "سوابق اجرایی",
        text: "۱ .موسس و دبیر انجمن علمی انرژی دانشگاه سیستان و بلو چستان<br>۲ .دبیر انجمن علمی مکانیک و دبیر انجمن علمی دانشکده مهندسی دانشگاه سیستان و بلوچستان<br>۳ .دبیر اجرایی جشنواره حرکت<br>۴ .موسس و مدیرعامل شرکت دانش بنیان جاوید انرژی سبز قهستان<br>۵ .موسس و مدیرعامل شرکت خالق بنیان تن تاکسازان دشت بنفش<br>۶ .عضو هیئت مشاوران دانشجویی ریاست دانشگاه سیستان و بلوچستان<br>۷ .عضو کمیته فرهنگی دانشگاه سیستان و بلوچستان<br>۸ .مالک برند ” تن تاک ” و راه اندازی فروش گاه اینترنتی ” تن تاک “",
      },
      {
        title: "مدارک غیر دانشگاهی",
        text: "۱ .دوره طراحی نیروگاه های خورشیدی فتوولتائیک<br>۲ .دوره طراحی آب شیرین کن خورشیدی<br>۳ .دوره تجارت الکترونیک معاونت علمی نهاد ریاست جمهوری<br>۴ .دوره سئوتکن یکال پیشرفته معاونت علمی نهاد ریاست جمهوری<br>۵ .دوره دیجیتال مارکتینگ م قدماتی و پیشرفته معاونت علمی نهاد ریاست جمهوری<br>۶ .دوره نرم افزار انسیس فلوئنت<br>۷ .دوره نرم افزار آباکوس<br>۸ .دوره بازرسی جوش جشمی و التراسونیک",
      },
      {
        title: "افتخارات",
        text: "۱ .کسب مقام اول در زمینه کارآفرینی در هشتمین جشنواره ملی حرکت<br>۲ .کسب مقام اول در زمینه پژوهش در نهمین جشنواره ملی حرکت<br>۳ .کسب مقام سوم در مسابقات ملی دوچرخه های هیبریدی دانشگ اه صنعتی شریف سال ۹۴<br>۴ .کسب مقام دوم در مسابقات ملی کانستنت سازمان فناوری های فضایی ایران س ال )",
      },
    ],
    Officials: [
      {
        img: "/image/team/crmexpert.jpg",
        name: "محدثه جهانی",
        job: "کارشناس بخش crm تن تاک",
      },
      {
        img: "/image/team/web-designer.jpg",
        name: "شرکت آذرمهر پردازش",
        job: "طراح و پشتیبان وب سایت تن تاک",
      },
      {
        img: "/image/team/graphics.jpeg",
        name: "تیم طراحی وسام",
        job: "مسئول گرافیک و هویت بصری تن تاک",
      },
      {
        img: "/image/team/packaging-designer.jpeg",
        name: "گروه چهل دونه",
        job: "طراح و تولید کننده بسته بندی پارچه ای تن تاک",
      },
    ],
  }),
};
</script>
