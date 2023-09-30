<template>
  <v-row :class="$vuetify.breakpoint.mdAndUp ? 'ma-6' : 'mx-2'">
    <v-col cols="12">
      <v-card class="border12" v-if="$vuetify.breakpoint.mdAndUp">
        <v-breadcrumbs :items="items">
          <template v-slot:divider>
            <v-icon>mdi-chevron-left</v-icon>
          </template>
        </v-breadcrumbs>
      </v-card>
      <v-card
        class="my-5 border12 box-shadow-none"
        :class="{ 'px-14': $vuetify.breakpoint.mdAndUp }"
      >
        <v-col cols="12">
          <div class="font_32">نشونی تن تاک</div>
        </v-col>
        <v-row
          :class="{
            'px-6': $vuetify.breakpoint.mdAndUp,
            'px-4': $vuetify.breakpoint.smAndDown,
          }"
        >
          <v-col cols="12" md="6">
            <div
              class="py-6"
              :class="{ font_14: $vuetify.breakpoint.smAndDown }"
            >
              {{ main_setting && main_setting.address }}
            </div>
            <div
              class="pb-6"
              :class="{ font_14: $vuetify.breakpoint.smAndDown }"
            >
              تلفن تماس :
              {{ main_setting && main_setting.phone }}
            </div>
            <div
              class="pb-6"
              :class="{ font_14: $vuetify.breakpoint.smAndDown }"
            >
              پست الکترونیک:

              {{ main_setting && main_setting.email }}
            </div>
            <div>
              <div class="mt-1 d-flex flex-wrap">
                <v-btn
                  class="elevation-0 d-flex justify-center align-center rounded"
                  style="min-width: 40px; width: 55px; height: 55px"
                  :href="this.main_setting.instagram"
                  target="_blank"
                  text
                >
                  <v-img width="40px" src="/icon/icons8-instagram.svg"></v-img>
                </v-btn>
                <v-btn
                  class="elevation-0 d-flex justify-center align-center rounded"
                  style="min-width: 40px; width: 55px; height: 55px"
                  :href="this.main_setting.facebook"
                  target="_blank"
                  text
                >
                  <v-img width="40px" src="/icon/icons8-facebook.svg"></v-img>
                </v-btn>
                <v-btn
                  class="elevation-0 d-flex justify-center align-center rounded"
                  style="min-width: 40px; width: 55px; height: 55px"
                  :href="this.main_setting.pintrest"
                  target="_blank"
                  text
                >
                  <v-img width="36px" src="/icon/icons8-pinterest.svg"></v-img>
                </v-btn>
                <v-btn
                  class="elevation-0 d-flex justify-center align-center rounded"
                  style="min-width: 40px; width: 55px; height: 55px"
                  :href="this.main_setting.whatsup"
                  target="_blank"
                  text
                >
                  <v-img width="32px" src="/icon/icons8-whatsapp.svg"></v-img>
                </v-btn>
                <v-btn
                  class="elevation-0 d-flex justify-center align-center rounded"
                  style="min-width: 40px; width: 55px; height: 55px"
                  :href="this.main_setting.youtube"
                  target="_blank"
                  text
                >
                  <v-img
                    width="40px"
                    src="/icon/icons8-youtube-logo.svg"
                  ></v-img>
                </v-btn>
                <v-btn
                  class="elevation-0 d-flex justify-center align-center rounded"
                  style="min-width: 40px; width: 55px; height: 55px"
                  :href="this.main_setting.aparat"
                  target="_blank"
                  text
                >
                  <v-img width="32px" src="/icon/aparat.svg"></v-img>
                </v-btn>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <MapViewer lat="33.751310" long="59.162810" />
          </v-col>
        </v-row>
        <v-col cols="12" class="my-6 text-center">
          <div class="px-6 font_24">
            برای تماس با تن تاک می توانید از فرم زیر استفاده کنید.
          </div>
        </v-col>
        <v-row class="px-6">
          <v-col
            cols="12"
            md="6"
            class="text-center"
            :class="{ 'pr-0': $vuetify.breakpoint.mdAndUp }"
          >
            <img
              src="/image/contactus/contact-us.png"
              :width="$vuetify.breakpoint.mdAndUp ? 570 : 276"
              height="auto"
              :class="{ 'pt-10': $vuetify.breakpoint.mdAndUp }"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-form v-model="valid" ref="form">
              <amp-input
                v-model="form.name"
                text="نام و نام خانوداگی"
                label="نام و نام خانوداگی"
                textClass="font_14 gray--text"
                cClass="border10"
                height="44"
                rules="require"
              />
              <amp-input
                v-model="form.email"
                text="پست الکترونیک"
                label="پست الکترونیک"
                class="mt-n3"
                cClass="border10"
                rules="email"
                height="44"
                textClass="font_14 gray--text"
              />
              <amp-input
                v-model="form.phone"
                text="تلفن تماس"
                label="تلفن تماس"
                class="mt-n3"
                cClass="border10"
                height="44"
                textClass="font_14 gray--text"
                rules="require,phone"
                is-number
              />
              <amp-input
                v-model="form.subject"
                text="موضوع"
                label="پیشنهاد"
                class="mt-n3"
                cClass="border10"
                height="44"
                textClass="font_14 gray--text"
                rules="require"
              />
              <amp-textarea
                v-model="form.content"
                text="متن پیام"
                label="متن پیام خود را وارد کنید"
                height="80"
                class="mt-n3"
                textClass="font_14 gray--text"
                cClass="border10"
                rules="require"
              />
              <v-col cols="12" class="pa-0 d-flex justify-center">
                <amp-button
                  @click="submit"
                  :loading="loading"
                  :disabled="!valid"
                  text="ثبت اطلاعات"
                  color="#00b7d8"
                  height="46"
                  width="160"
                  class="rounded-lg mt-n2"
                />
              </v-col>
            </v-form>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import MapViewer from "@/components/Map/MapViewer";
export default {
  components: { MapViewer },
  data() {
    return {
      items: [
        {
          text: "خانه",
          disabled: false,
          to: "/",
        },
        {
          text: "نشونی تن تاک",
          disabled: true,
          to: "",
        },
      ],
      valid: false,
      loading: false,
      form: {
        name: null,
        phone: "",
        email: null,
        content: null,
        subject: null,
      },
      main_setting: null,
    };
  },

  created() {
    this.main_setting = this.$store.state.base.main_setting;
  },

  methods: {
    submit() {
      this.loading = true
      this.$reqApi("/contact-us/insert", this.form)
      .then((res) => {
          this.loading = false
          this.resetForm();
          this.$toast.success(
            "درخواست با موفقیت ثبت شد و در اسرع وقت رسیدگی خواهد شد"
            );
          })
          .catch((error) => {
          this.loading = false
          this.$toast.error("درخواست ثبت نشد");
        });
    },
    resetForm() {
      this.$refs.form.reset();
      this.form.phone = ''
    },
  },
};
</script>
