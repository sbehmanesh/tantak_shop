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
        <v-row :class="$vuetify.breakpoint.mdAndUp ? 'pt-10' : 'pt-4'">
          <v-col
            cols="12"
            :class="
              $vuetify.breakpoint.smAndDown ? 'd-flex justify-center' : ''
            "
          >
            <h1>حفظ حریم شخصی</h1>
          </v-col>
          <v-col
            cols="12"
            v-if="!$vuetify.breakpoint.mdAndUp"
            class="d-flex justify-center"
          >
            <img src="/image/img_tantak4.jpg" width="280" />
          </v-col>
          <v-col cols="12" md="7">
            <div>
              <div
                :class="
                  $vuetify.breakpoint.mdAndUp
                    ? 'line-height-40 mx-6'
                    : 'line-height-36 mx-2'
                "
              >
                <h3 :class="$vuetify.breakpoint.smAndDown ? 'mr-3' : ''">
                  استفاده از وب سايت تن تاک
                </h3>
                <div class="d-flex">
                  <v-icon
                    size="20"
                    color="primary"
                    class="align-start ml-2 mt-3"
                    >mdi-send</v-icon
                  >
                  <p>
                    رعایت حریم خصوصی مجموعه تن تاک از اهمیت بالایی برخوردار است
                    و ما به اهمیت آن برای مشتریان گرامی واقف هستیم. ما به حفظ
                    حریم خصوصی شما متعهد هستیم و قصد داریم که شما در هنگام
                    بازدید از وب سایت و اپلیکیشن ما و همچنین به هنگام استفاده از
                    خدمات ما احساس رضایت و امنیت کنید . این اعلامیه حفظ حریم
                    خصوصی، مبنایی را برای پردازش هر گونه اطلاعات شخصی را که ما
                    از شما دریافت می کنیم یا آنچه که به ما ارائه می دهید، ارائه
                    می‌نماید. توجه داشته باشید کلیه اصول و رویه‏‌های تن تاک
                    منطبق با قوانین جمهوری اسلامی ایران می باشد و متعاقبا کاربر
                    نیز موظف به رعایت قوانین مرتبط با کاربر است. لازم به ذکر است
                    ورود کاربران وب سایت و اپلیکیشن تن تاک به معنای آگاه بودن و
                    پذیرفتن شرایط و قوانین و همچنین نحوه استفاده از خدمات تن تاک
                    است. توجه داشته باشید که ثبت سفارش نیز در هر زمان به معنی
                    پذیرفتن کامل کلیه شرایط و قوانین از سوی کاربر است.
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
            <img src="/image/img_tantak4.jpg" width="500" />
          </v-col>
        </v-row>
        <v-col cols="12">
          <div class="line-height-40 mr-6">
            <h3>تعریف داده های شخصی</h3>

            <div class="d-flex">
              <v-icon size="20" color="primary" class="align-start ml-2 mt-3"
                >mdi-send</v-icon
              >
              <p>
                "داده های شخصی" به معنای هر گونه اطلاعات مربوط به یک فرد حقیقی
                شناخته شده یا قابل شناسایی است.
              </p>
            </div>
          </div>
          <div
            class="line-height-40"
            :class="$vuetify.breakpoint.mdAndUp ? 'mx-6' : 'mx-3'"
          >
            <h3 :class="$vuetify.breakpoint.smAndDown ? 'mr-3' : ''">
              اعمال اعلامیه حریم شخصی
            </h3>
            <div class="d-flex">
              <v-icon size="20" color="primary" class="align-start ml-2 mt-3"
                >mdi-send</v-icon
              >

              <p>
                اعلامیه حریم شخصی در مورد پردازش تمام داده های شخصی که در رابطه
                با ارتباط مشتریان یا مشتریان بالقوه تن تاک است استفاده می‌شود.
                ما تنها زمانی از اطلاعات شما بر اساس این اعلامیه حریم خصوصی
                استفاده خواهیم کرد که شما از وبسایت یا اپلیکیشن و خدمات ما
                استفاده کنید و زمانی که شما با ما در تماس باشید.
              </p>
            </div>
          </div>
          <div
            class="line-height-40"
            :class="$vuetify.breakpoint.mdAndUp ? 'mx-6' : 'mx-3'"
          >
            <h3 :class="$vuetify.breakpoint.smAndDown ? 'mr-3' : ''">
              مسئولیت در برابر داده های شخصی
            </h3>
            <div class="d-flex">
              <v-icon size="20" color="primary" class="align-start ml-2 mt-3"
                >mdi-send</v-icon
              >
              <p>
                تن تاک مسئول پردازش تمام داده های شخصی است که در اعلامیه حریم
                خصوصی شرح داده شده است و ما توضیح می دهیم که چه اطلاعات شخصی
                پردازش می شود و برای چه اهداف، افرادی یا سازمان هایی این داده ها
                ارائه خواهند شد. وب سایت ما و برنامه های موبایل ما ممکن است حاوی
                لینک هایی باشد تا شما را قادر به بازدید از وب سایت برنامه های
                کاربردی دیگر کند که تحت خط مشی های حفظ حریم خصوصی خود آن ها قرار
                دارند. لطفا توجه داشته باشید که ما هیچگونه نظارت بر قوانین و خط
                مشی آن ها نداریم و آن ها مسئول حفاظت و حفظ حریم خصوصی هر گونه
                اطلاعاتی هستند که شما در هنگام بازدید از این سایت ها ارائه می
                دهید.
              </p>
            </div>
          </div>
          <div
            class="line-height-40"
            :class="$vuetify.breakpoint.mdAndUp ? 'mx-6' : 'mx-3'"
          >
            <h3 :class="$vuetify.breakpoint.smAndDown ? 'mr-3' : ''">
              نحوه جمع آوری داده های شخصی
            </h3>
            <div class="d-flex">
              <v-icon size="20" color="primary" class="align-start ml-2 mt-3"
                >mdi-send</v-icon
              >
              <p>
                ما مستقیما از شما یا نماینده مجاز شما اطلاعات شخصی را جمع آوری و
                دریافت می کنیم (در برخی مواقع با استفاده از کوکی ها). همچنین ما
                ممکن است داده های شخصی اقوام و آشنایان شما را جمع آوری کنیم که
                شما این داده ها را از طرف آن ها به ما داده باشید، از جمله زمانی
                که:
              </p>
            </div>

            <div class="d-flex">
              <v-icon size="20" color="primary" class="align-start ml-2 mt-3"
                >mdi-send</v-icon
              >
              <p>
                ثبت نام، استفاده یا دسترسی به وب سایت یا برنامه های موبایل ما
              </p>
            </div>

            <div class="d-flex">
              <v-icon size="20" color="primary" class="align-start ml-2 mt-3"
                >mdi-send</v-icon
              >
              <p>
                برقراری ارتباط با ما از طریق ایمیل، تلفن، پیامک، رسانه های
                اجتماعی، ، حساب کاربری و ...
              </p>
            </div>
          </div>
          <div
            class="line-height-40"
            :class="$vuetify.breakpoint.mdAndUp ? 'mx-6' : 'mx-3'"
          >
            <h3 :class="$vuetify.breakpoint.smAndDown ? 'mr-3' : ''">کوکی</h3>
            <div class="d-flex">
              <v-icon size="20" color="primary" class="align-start ml-2 mt-3"
                >mdi-send</v-icon
              >
              <p>
                کوکی ها فایل های کوچکی از اطلاعات هستند که اطلاعات مربوط به
                بازدید شما از وب سایت ما را ذخیره و بازیابی می کنند.
              </p>
            </div>
          </div>
          <div :class="$vuetify.breakpoint.mdAndUp ? 'mx-6' : 'mx-3'">
            <h3
              :class="$vuetify.breakpoint.smAndDown ? 'mr-3' : ''"
              class="mb-4"
            >
              دلایل استفاده از این اطلاعات
            </h3>

            <ul>
              <li>
                <p>
                  برای پاسخگویی به سوالات یا شکایاتِ نظرات و پیشنهادات شما و
                  بهبود خدمات در جهت افزایش رضایت مشتریان
                </p>
              </li>
              <li>
                <p>
                  برای مدیریت حساب و اطمینان از محرمانه بودن و امنیت خریدها و
                  معاملات
                </p>
              </li>
              <li>
                <p>
                  برای دسترسی و اجازه ارتباط بین ما و شما در رسانه های اجتماعی
                </p>
              </li>
              <li>
                <p>برای توسعه و بهبود خدمات و سرویس ها</p>
              </li>
              <li>
                <p>
                  برای ارزیابی و پذیرش مشتری در هنگام خرید از ما یا برای استفاده
                  از خدمات فرعی ما
                </p>
              </li>
              <li>
                <p>
                  برای تجزیه و تحلیل و توسعه سازمانی، مدیریت داخلی، گزارش های
                  سازمانی و خرید و فروش ها
                </p>
              </li>
              <li>
                <p>ی انطباق با قانون، نظارت و بررسی انطباق ها</p>
              </li>
              <li>
                <p>برای مدیریت مشارکت های شما با ما بر اساس انتخاب های شما</p>
              </li>
            </ul>
          </div>
          <div
            class="line-height-40"
            :class="$vuetify.breakpoint.mdAndUp ? 'mx-6' : 'mx-3'"
          >
            <h3 :class="$vuetify.breakpoint.smAndDown ? 'mr-3' : ''">
              حفاظت از اطلاعات شما
            </h3>
            <div class="d-flex">
              <v-icon size="20" color="primary" class="align-start ml-2 mt-3"
                >mdi-send</v-icon
              >
              <p>
                تن تاک اقدامات لازم را برای اطمینان از محرمانه بودن و امنیت
                اطلاعات شخصی شما انجام داده است. ما متعهد هستیم تا اطمینان حاصل
                کنیم که اطلاعات شخصی شما امن است و در تلاش برای جلوگیری از
                دسترسی غیرمجاز و یا افشای اطلاعات شخصی شما، انواع حفاظت های
                فیزیکی، فنی و اداری را در برابر نابودی تصادفی یا غیرقانونی یا از
                دست دادن تصادفی، آسیب، تغییر، افشای غیرمجاز یا دسترسی و همچنین
                تمام اشکال دیگر را انجام داده ایم و همچنین برای محافظت از امنیت
                اطلاعات شما، در صورت لزوم، هنگام جمع آوری یا انتقال اطلاعات
                شخصی، از تکنولوژی رمزگذاری استفاده می کنیم. البته باید در نظر
                داشت اگر چه ما از تلاش های منطقی و مناسب برای حفاظت از اطلاعات
                شخصی خود استفاده می کنیم، اما نمی توانیم امنیت داده های شخصی خود
                را که از طریق اینترنت یا اتصال مشابه به وب سایت ما یا برنامه های
                موبایل دیگر، تضمین کنیم.
              </p>
            </div>
          </div>
          <div
            class="line-height-40"
            :class="$vuetify.breakpoint.mdAndUp ? 'mx-6' : 'mx-3'"
          >
            <h3 :class="$vuetify.breakpoint.smAndDown ? 'mr-3' : ''">
              ارتباط با ما
            </h3>
            <div class="d-flex">
              <v-icon size="20" color="primary" class="align-start ml-2 mt-3"
                >mdi-send</v-icon
              >
              <p>
                شما می‌توانید در هر زمان با برقراری ارتباط با سازمان ما درخواست
                دسترسی، اصلاح، ایجاد محدودیت و پاک کردن اطلاعات شخصی خود را به
                ما ابلاغ کرده تا در اسرع وقت این تغییرات ایجاد شوند.
              </p>
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
          text: "حریم شخصی",
          disabled: false,
          to: "/privacy",
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
ul {
  padding-left: 0px;
}
</style>
