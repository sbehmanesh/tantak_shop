<template>
  <div>
    <v-container >
      <v-row>
        <v-col cols="12" md="12">
          <v-card class="mt-15 py-15 px-10 card_class">
            <v-row class="py-10">
              <v-col cols="12" md="12" class="text-center">
                <h1>شرایط ارسال کالا</h1>
              </v-col>
              <v-col>
                <div>
                  <h4 class="my-4">ارسال محصولات تن تاک به چه صورت می باشد؟</h4>
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
                        محصولات برای تهران بین 3 تا 5 روز کاری و برای شهرستان
                        بین 3 تا 7 روز کاری طول می کشد ارسال شود. ارسال محصولات
                        از طریق پست می باشد.
                      </p>
                    </li>
                  </ul>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {};
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