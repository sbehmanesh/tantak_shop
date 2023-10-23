<template>
  <v-row class="ma-6">
    <v-col cols="12" md="12" class="pa-0">
      <v-card class="border12" v-if="$vuetify.breakpoint.mdAndUp">
        <v-breadcrumbs :items="items">
          <template v-slot:divider>
            <v-icon>mdi-chevron-left</v-icon>
          </template>
        </v-breadcrumbs>
      </v-card>
      <v-card class="mt-8 px-10 card_class">
        <v-form v-model="valid" @submit.prevent="submit">
          <v-row class="py-10">
            <v-col cols="12" class="text-center">
              <h1
                :class="[$vuetify.breakpoint.mdAndUp ? 'font_30' : 'font_18']"
              >
                فروش عمده و سازمانی
              </h1>
            </v-col>

            <v-col cols="12">
              <h3
                :class="[
                  $vuetify.breakpoint.mdAndUp ? 'font_20' : 'font_10',
                  'my-3'
                ]"
              >
                برای ثبت سفارش،لطفا اطلاعات خود را وارد نمایید
              </h3>
            </v-col>

            <v-col cols="12" md="3" sm="6" class="py-0">
              <AmpInput
                rules="require"
                text="نام"
                :textClass="$vuetify.breakpoint.mdAndUp ? '' : 'font_10'"
                outlined
                v-model="form.first_name"
              />
            </v-col>

            <v-col cols="12" md="3" sm="6" class="py-0">
              <AmpInput
                rules="require"
                text="نام خانوادگی"
                :textClass="$vuetify.breakpoint.mdAndUp ? '' : 'font_10'"
                outlined
                v-model="form.last_name"
              />
            </v-col>

            <v-col cols="12" md="3" sm="6" class="py-0">
              <AmpInput
                rules="require,phone"
                text="شماره همراه"
                :textClass="$vuetify.breakpoint.mdAndUp ? '' : 'font_10'"
                outlined
                v-model="form.phone_number"
              />
            </v-col>

            <v-col cols="12" md="3" sm="6" class="py-0">
              <AmpSelect
                :items="product_item"
                rules="require"
                text="نوع و مدل کفش"
                :textClass="$vuetify.breakpoint.mdAndUp ? '' : 'font_10'"
                outlined
                v-model="form.product"
              />
            </v-col>

            <v-col cols="12" md="3" sm="6" class="py-0">
              <AmpInput
                rules="require,number"
                text="تعداد مورد نیاز"
                :textClass="$vuetify.breakpoint.mdAndUp ? '' : 'font_10'"
                outlined
                v-model="form.count"
              />
            </v-col>

            <v-col cols="12" md="10" sm="7" class="mr-auto d-flex justify-end">
              <AmpButton
                type="submit"
                color="orange"
                text="ارسال درخواست"
                :cClass="$vuetify.breakpoint.mdAndUp ? 'mr-auto' : ''"
                :textClass="$vuetify.breakpoint.mdAndUp ? '' : 'font_14'"
                :width="
                  $vuetify.breakpoint.smAndUp
                    ? $vuetify.breakpoint.mdAndUp
                      ? '28%'
                      : '50%'
                    : '100%'
                "
                :loading="loading"
                :disabled="!valid || loading"
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
        to: "/"
      },
      {
        text: "فروش عمده و سازمانی",
        disabled: true,
        to: ""
      }
    ],
    product_item: [],
    form: {
      first_name: "",
      last_name: "",
      phone_number: "",
      product: "",
      count: ""
    },
    valid: false,
    loading: false
  }),
  beforeMount() {
    this.loadProduct();
  },
  methods: {
    submit() {
      this.loading = true;
      this.$reqApi("/shop/wholesale-form/insert", this.form)
        .then(res => {
          this.$toast.success("درخواست با موفقیت ثبت شد");
          this.form.first_name = '',
          this.form.last_name = '',
          this.form.phone_number = '',
          this.form.product = '',
          this.form.count = ''
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          return err;
        });
    },
    loadProduct() {
      this.$reqApi("/shop/product")
        .then(res => {
          res.model.data.map(x => {
            this.product_item.push({
              text: x.name,
              value: x.id
            });
          });
        })
        .catch(err => {
          return err;
        });
    }
  }
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
