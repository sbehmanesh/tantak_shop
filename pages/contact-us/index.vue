<template>
  <v-row no-gutters class="ma-6">
    <v-col cols="12">
      <v-card class="border12" v-if="$vuetify.breakpoint.mdAndUp">
        <v-breadcrumbs :items="items">
          <template v-slot:divider>
            <v-icon>mdi-chevron-left</v-icon>
          </template>
        </v-breadcrumbs>
      </v-card>
      <v-card class="mt-8 border12 py-8">
        <v-row>
          <v-col cols="12" class="d-flex justify-center">
            <h1>ارتباط با ما</h1>
          </v-col>
          <v-col cols="1"></v-col>
          <v-col cols="5" class="d-flex flex-column justify-center">
            <v-card width="520" class="pa-3 contact-card-1">
              آدرس ما:تهران، خیابان ملاصدرا، شیخ بهایی، خیابان برزیل غربی، پلاک
              136، طبقه چهارم
              <br />
              ایمیل: info@tantak.ir
              <br />
              تلفن روابط عمومی و تبلیغات: 57917500-021
            </v-card>
            <v-card width="520" class="mt-1 pa-3 contact-card-2">
              خدمات پس از فروش: تهران، بزرگراه آزادگان، بزرگراه رجایی، بزرگراه
              شهید بهشتی، نرسیده به سه راه ترانسفور، مجتمع تجاری آرین
              <br />
              تلفن پشتیبانی: 57917000-021
              <br />
              کدپستی: 1879613154
            </v-card>
            <v-card width="520" class="mt-1 pa-3 contact-card-3">
              ساعات کاری
              <br />
              همه روزه به جز ایام تعطیل رسمی ساعت 9 الی 17
              <br />
              پنجشنبه: 9 الی 14
            </v-card>
            <div id="map-wrap" class="mt-1">
              <client-only>
                <l-map :zoom="13" :center="[55.9464418, 8.1277591]">
                  <l-tile-layer
                    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                  ></l-tile-layer>
                  <l-marker :lat-lng="[55.9464418, 8.1277591]"></l-marker>
                </l-map>
              </client-only>
            </div>
          </v-col>
          <v-col cols="5">
            <v-card class="form-text pa-4">
              <div>سوال، انتقاد و پیشنهاد خود را با ما درمیان بگذارید</div>
            </v-card>
            <v-card class="form-card mt-2 pa-4" v-if="loading == false">
              <v-form
                v-model="valid"
                @submit.prevent="submit()"
                :disabled="loading"
              >
                <div class="d-flex">
                  <amp-input
                    text="نام"
                    v-model="form.first_name"
                    rules="require"
                  />
                  <amp-input
                    text="نام خانوادگی"
                    v-model="form.last_name"
                    rules="require"
                  />
                </div>
                <div class="d-flex">
                  <amp-input
                    text="شماره همراه"
                    v-model="form.phone_number"
                    rules="require,phone"
                    dir="ltr"
                  />
                  <amp-input
                    text="پست الکترونیک"
                    v-model="form.email"
                    rules="email"
                    dir="ltr"
                  />
                </div>
                <amp-input
                  text="موضوع"
                  v-model="form.subject"
                  rules="require"
                />
                <amp-textarea text="پیام" v-model="form.text" rules="require" />
                <div class="col-12 text-left py-0">
                  <amp-button
                    text="ارسال پیام"
                    width="260"
                    type="submit"
                    color="success"
                    :loading="loading"
                    :disabled="!valid || loading"
                  />
                </div>
              </v-form>
            </v-card>
            <v-card
              v-else
              min-height="600"
              class="form-card mt-2 pa-4 d-flex align-center justify-center"
            >
              <v-card  class=" elevation-0">
                <v-img src="/image/send.png" width="96" height="96" />
              </v-card>
            </v-card>
          </v-col>
          <v-col cols="1"></v-col>
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
          to: "/"
        },
        {
          text: "ارتباط با ما",
          disabled: true,
          to: ""
        }
      ],
      valid: false,
      loading: false,
      form: {
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        subject: "",
        text: ""
      }
    };
  },
  methods: {
    submit() {
      let form = { ...this.form };
      this.loading = true;
      let url = "/shop/contact-us-form/insert";
      this.$reqApi(url, form)
        .then(response => {
          this.$toast.success("پیام با موفقیت ارسال شد");
          this.loading = false;
          this.emptyForm();
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
        });
    },
    emptyForm() {
      this.form.first_name = "";
      this.form.last_name = "";
      this.form.phone_number = "";
      this.form.email = "";
      this.form.subject = "";
      this.form.text = "";
    }
  }
};
</script>
<style scoped>
.contact-card-1,
.contact-card-2,
.contact-card-3 {
  box-shadow: none !important;
  background-color: #ffc07b;
  /* background-color: #f27c01; */
  /* color: white; */
  line-height: 28px;
}
.contact-card-1,
.contact-card-2,
.contact-card-3 {
  border-top-left-radius: 40px;
  border-bottom-right-radius: 40px;
}
.form-text {
  box-shadow: none !important;
  border: 2px solid #ffc07b;
  /* border: 2px solid #f27c01; */
  border-top-right-radius: 40px;
  border-top-left-radius: 40px;
}
.form-card {
  box-shadow: none !important;
  border: 2px solid #ffc07b;
  /* border: 2px solid #f27c01; */
  border-bottom-right-radius: 40px;
  border-bottom-left-radius: 40px;
}
.back-img {
  background-image: url("/image/static/contact-us.jpg");
}
#map-wrap {
  height: 280px;
  width: 520px;
}
/* .contact-card-2 {
    border-top-right-radius: 40px;
    border-bottom-left-radius: 40px;
} */
</style>
