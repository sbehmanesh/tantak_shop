<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="pa-4 rounded-lg box-shadow-none">
          <v-card-title class="justify-space-between px-0">
            <span>درخواست مرجوعی</span>
            <v-chip v-if="maxNumber" color="primary" text-color="white" small>
              حداکثر {{ maxNumber }} عدد
            </v-chip>
          </v-card-title>
          <v-card-text class="px-0">
            <v-alert
              v-if="!ready"
              type="error"
              outlined
              dense
              class="mb-4"
            >
              اطلاعات مرجوعی ناقص است. لطفاً از طریق سفارشات مجدداً اقدام کنید.
            </v-alert>

            <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submit">
              <v-select
                v-model="form.type"
                :items="reasonOptions"
                label="دلیل مرجوعی"
                :rules="[requiredRule]"
                :disabled="!ready || loading"
                outlined
                dense
              />

              <v-textarea
                v-model="form.description"
                label="توضیحات"
                :rules="[requiredRule]"
                :disabled="!ready || loading"
                outlined
                dense
                auto-grow
              />

              <v-text-field
                v-model="form.number"
                type="number"
                min="1"
                :max="maxNumber"
                label="تعداد مرجوعی"
                :rules="[requiredRule, numberLimitRule]"
                :disabled="!ready || loading"
                outlined
                dense
              />

              <v-btn
                color="primary"
                class="mt-4"
                block
                large
                type="submit"
                :loading="loading"
                :disabled="!ready"
              >
                ثبت درخواست مرجوعی
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: "profile",
  data() {
    return {
      title: "درخواست مرجوعی",
      loading: false,
      valid: false,
      ready: true,
      maxNumber: 1,
      form: {
        basket_id: null,
        basket_item_id: null,
        section_id: null,
        section_name: null,
        description: "",
        number: 1,
        type: null,
      },
      reasonOptions: [
        { text: "عدم رضایت از محصول", value: "dissatisfaction" },
        { text: "خرابی یا مشکل در کالا", value: "defect" },
      ],
    };
  },
  mounted() {
    this.$store.dispatch("setPageTitle", this.title);
    this.fillFormFromQuery();
  },
  methods: {
    requiredRule(value) {
      return Boolean(value) || "پر کردن این فیلد الزامی است.";
    },
    numberLimitRule(value) {
      const numeric = Number(value);
      if (!Number.isFinite(numeric) || numeric < 1) {
        return "تعداد معتبر وارد کنید.";
      }
      return numeric <= this.maxNumber || `حداکثر تعداد قابل مرجوعی ${this.maxNumber} است.`;
    },
    toNumber(value) {
      const numeric = Number(value);
      return Number.isFinite(numeric) && numeric > 0 ? numeric : null;
    },
    fillFormFromQuery() {
      const { basket_id, basket_item_id, section_id, section_name, number } =
        this.$route.query;

      this.form.basket_id = basket_id;
      this.form.basket_item_id = basket_item_id;
      this.form.section_id = section_id;
      this.form.section_name = section_name || null;
      this.maxNumber = this.toNumber(number) || 1;
      this.form.number = Math.min(this.maxNumber, this.form.number || 1);

      if (
        !this.form.basket_id ||
        !this.form.basket_item_id ||
        !this.form.section_id ||
        !this.form.section_name
      ) {
        this.ready = false;
        this.$toast.error("اطلاعات لازم برای ثبت مرجوعی در دسترس نیست.");
      }
    },
    submit() {
      if (!this.ready) {
        this.$toast.error("امکان ثبت مرجوعی وجود ندارد.");
        return;
      }

      if (!this.$refs.form.validate()) {
        return;
      }

      const payload = {
        ...this.form,
        number: Number(this.form.number),
      };

      this.loading = true;
      this.$reqApi("shop/return-product/add", payload)
        .then(() => {
          this.$toast.success("درخواست مرجوعی ثبت شد.");
          this.$router.push("/profile/orders");
        })
        .catch(() => {
          this.$toast.error("ثبت مرجوعی انجام نشد.");
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
