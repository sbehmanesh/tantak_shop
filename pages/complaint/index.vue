<template>
  <v-row no-gutters class="ma-6">
    <v-col cols="12" md="12" class="pa-0">
      <v-card class="border12" v-if="$vuetify.breakpoint.mdAndUp">
        <v-breadcrumbs :items="items">
          <template v-slot:divider>
            <v-icon>mdi-chevron-left</v-icon>
          </template>
        </v-breadcrumbs>
      </v-card>
      <v-card class="mt-8 px-10 card_class" v-if="loading == false">
        <v-form v-model="valid" @submit.prevent="submit">
          <v-row class="py-10">
            <v-col cols="12" class="text-center">
              <h1
                :class="[$vuetify.breakpoint.mdAndUp ? 'font_30' : 'font_18']"
              >
                ثبت شکایت مشتری
              </h1>
            </v-col>

            <v-col cols="12">
              <h3
                :class="[
                  $vuetify.breakpoint.mdAndUp ? 'font_20' : 'font_10',
                  'pb-0'
                ]"
              >
                شکایات خود را برای ما ارسال کنید
              </h3>
            </v-col>

            <v-col cols="12" sm="3" class="py-0">
              <AmpInput
                rules="require"
                text="نام"
                :textClass="$vuetify.breakpoint.mdAndUp ? '' : 'font_10'"
                outlined
                v-model="form.first_name"
              />
            </v-col>

            <v-col cols="12" sm="3" class="py-0">
              <AmpInput
                rules="require"
                text="نام خانوادگی"
                :textClass="$vuetify.breakpoint.mdAndUp ? '' : 'font_10'"
                outlined
                v-model="form.last_name"
              />
            </v-col>

            <v-col cols="12" sm="3" class="py-0">
              <AmpInput
                rules="require,phone"
                text="شماره همراه"
                :isNumber="true"
                :textClass="$vuetify.breakpoint.mdAndUp ? '' : 'font_10'"
                outlined
                v-model="form.phone_number"
              />
            </v-col>

            <v-col cols="12" sm="3" class="py-0">
              <AmpInput
                rules="require"
                text="موضوع"
                :textClass="$vuetify.breakpoint.mdAndUp ? '' : 'font_10'"
                outlined
                v-model="form.subject"
              />
            </v-col>

            <v-col cols="12" class="py-0">
              <amp-textarea
                rules="require"
                :rows="2"
                :textClass="$vuetify.breakpoint.mdAndUp ? '' : 'font_10'"
                auto-grow
                placeholder="متن پیام"
                text="پیام"
                outlined
                v-model="form.text"
              />
            </v-col>

            <v-col cols="12" sm="4" class="mr-auto d-flex">
              <AmpButton
                type="submit"
                color="orange"
                :cClass="$vuetify.breakpoint.smAndUp ? 'mr-auto' : ''"
                text="ثبت"
                :textClass="$vuetify.breakpoint.mdAndUp ? '' : 'font_14'"
                :width="$vuetify.breakpoint.smAndUp ? '75%' : '100%'"
                :loading="loading"
                :disabled="!valid || loading"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card>
      <v-card v-else class="mt-8 px-10 card_class d-flex justify-center align-center " min-height="490" >
        <v-progress-circular indeterminate color="red"></v-progress-circular>
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
        to: "/"
      },
      {
        text: "ثبت شکایات",
        disabled: true,
        to: ""
      }
    ],
    form: {
      first_name: "",
      last_name: "",
      phone_number: "",
      subject: "",
      text: ""
    },
    valid: false,
    loading: false
  }),
  methods: {
    submit() {
      this.loading = true;
      this.$reqApi("/shop/complaint-form/insert", this.form)
        .then(res => {
          this.$toast.success("پیام شما با موفقیت ثبت شد");
          this.form.first_name = "";
          this.form.last_name = "";
          this.form.phone_number = "";
          this.form.subject = "";
          this.form.text = "";
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          return err;
        });
    }
  }
};
</script>

<style scoped>
.card_class {
  border-radius: 10px;
  background-color: #ffffff;
}
.white_sp {
  white-space: nowrap;
}
</style>
