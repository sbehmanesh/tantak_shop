<template>
  <v-row class="ma-6">
    <v-col cols="12" md="12">
      <v-card class="mt-8 px-10 card_class">
        <v-form v-model="valid" @submit.prevent="submit">
          <v-row class="py-10">
            <v-col cols="12" class="text-center">
              <h1>ثبت شکایت مشتری</h1>
            </v-col>

            <v-col cols="12">
              <h3 class="white_sp">شکایات خود را برای ما ارسال کنید</h3>
            </v-col>

            <v-col cols="12" md="6">
              <AmpInput
                rules="require"
                text="نام"
                outlined
                v-model="form.name"
              />
            </v-col>

            <v-col cols="12" md="6">
              <AmpInput
                rules="require"
                text="نام خانوادگی"
                outlined
                v-model="form.family"
              />
            </v-col>

            <v-col cols="12" md="6">
              <AmpInput
                rules="require,phone"
                text="شماره همراه"
                outlined
                v-model="form.phone"
              />
            </v-col>

            <v-col cols="12">
              <AmpInput
                rules="require"
                text="موضوع"
                outlined
                v-model="form.issue"
              />
            </v-col>

            <v-col cols="12">
              <amp-textarea
                rules="require"
                placeholder="متن پیام"
                text="پیام"
                outlined
                v-model="form.message"
              />
            </v-col>
            <v-col cols="12" md="2">
              <AmpButton
                type="submit"
                color="orange"
                text="ثبت"
                width="100%"
                :disabled="!valid"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>
  
  <script>
import AmpTextarea from "~/components/Base/AmpTextarea.vue";
export default {
  components: { AmpTextarea },
  data: () => ({
    items: [
      {
        text: "خانه",
        disabled: false,
        to: "/",
      },
      {
        text: 'ثبت شکایات',
        disabled: true
      }
    ],
    form: {},
    valid: false,
  }),
  methods: {
    submit() {
      // to do
    },
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
.white_sp {
  white-space: nowrap;
}
</style>
  