<template>
  <div>
      <v-container class="text-center">
        <v-row>
          <v-col cols="12" md="12">
            <v-card class="mt-15 text-center py-15 px-10 card_class" >
              <v-row class="py-10">
                <v-col cols="12" md="12" class="text_center ">
                  <h1 >درباره ما</h1>
                </v-col>
                <v-col>
                  <div>
                    <p class="ma-5">
                      یک دهه پیش بود که تن تاک متولد شد. برندی برای ایران و
                      ایرانی، برندی برای خانواده، برندی برای تو و من، برندی برای
                      همپا بودن
                    </p>
                  </div>
                  <div>
                    <p class="ma-5 p_matn">
                      تن تاک با تکیه بر شعار "ما میتوانیم" و اتکاء به دانش
                      متخصصان ایرانی و تجربه صنعتگران داخلی کشور، اقدام به تولید
                      بیش از 100 مدل کفش در طرح های چرمی، ورزشی و راحتی برای
                      تمامی اعضا خانواده های ایرانی نموده است
                    </p>
                  </div>
                  <div>
                    <p class="ma-5">
                      این محصولات در بیش از 50 کارگاه تولیدی کوچک و بزرگ در
                      سراسر میهن عزیزمان تولید می شود و مفتخریم که در راستای
                      اشتغال جوانان این مرز و بوم قدمی موثر برداشته و در سال
                      رونق و تولید ملی محیطی آرام و جذاب را در بیش از 120
                      فروشگاه زنجیره ای تن تاک گرد هم آورده ایم.
                    </p>
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