<template>
  <v-dialog v-model="tipaxDialog" max-width="600" persistent>
    <v-card>
      <v-card-title class="justify-center align-center">
        ثبت سفارش تیپاکس
        <v-spacer></v-spacer>
        <v-btn icon @click="closeDialog">
          <v-icon> close </v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-form v-model="valid">
          <v-col cols="12">
            <v-row>
              <v-stepper-step step="1" :complete="step > 1"> آدرس مبدا </v-stepper-step>
              <v-stepper-step step="2" :complete="step > 2"> آدرس مقصد </v-stepper-step>
              <v-stepper-step step="3"> اطلاعات ارسال </v-stepper-step>
            </v-row></v-col
          >
          <v-stepper v-model="step" class="elevation-0">
            <!-- ================= STEP 1 : ORIGIN ================= -->

            <v-stepper-content step="1">
              <v-row>
                <v-col cols="12">
                  <amp-select
                    :items="tibaxCity"
                    rules="require"
                    v-model="form.origin.cityId"
                    placeholder="شهر مبدا"
                  />

                  <amp-input
                    rules="require"
                    v-model="form.origin.fullAddress"
                    placeholder="آدرس کامل"
                  />

                  <amp-input isNumber v-model="form.origin.no" placeholder="پلاک" />

                  <amp-input isNumber v-model="form.origin.floor" placeholder="طبقه" />

                  <amp-input isNumber v-model="form.origin.unit" placeholder="واحد" />
                  <amp-input
                    isNumber
                    v-model="form.origin.postalCode"
                    placeholder="کد پستی"
                  />

                  <amp-input v-model="form.origin.phone" placeholder="تلفن" />

                  <amp-input
                    rules="require"
                    v-model="form.origin.mobile"
                    placeholder="موبایل"
                  />

                  <amp-input
                    rules="require"
                    v-model="form.origin.fullName"
                    placeholder="نام و نام خانوادگی"
                  />

                  <amp-textarea
                    v-model="form.origin.description"
                    placeholder="توضیحات مبدا"
                    :rows="2"
                  />
                </v-col>
              </v-row>

              <amp-button
                width="100px"
                class="mt-3"
                text="مرحله بعد"
                color="primary"
                @click="step = 2"
              />
            </v-stepper-content>

            <!-- ================= STEP 2 : DESTINATION ================= -->

            <v-stepper-content step="2">
              <v-row>
                <v-col cols="12">
                  <amp-select
                    :items="tibaxCity"
                    rules="require"
                    v-model="form.destination.cityId"
                    placeholder="شهر مقصد"
                  />

                  <amp-input
                    rules="require"
                    v-model="form.destination.fullAddress"
                    placeholder="آدرس کامل"
                  />

                  <amp-input isNumber v-model="form.destination.no" placeholder="پلاک" />

                  <amp-input
                    isNumber
                    v-model="form.destination.floor"
                    placeholder="طبقه"
                  />

                  <amp-input
                    isNumber
                    v-model="form.destination.unit"
                    placeholder="واحد"
                  />

                  <amp-input
                    isNumber
                    v-model="form.destination.postalCode"
                    placeholder="کد پستی"
                  />

                  <amp-input v-model="form.destination.phone" placeholder="تلفن" />

                  <amp-input
                    rules="require"
                    v-model="form.destination.mobile"
                    placeholder="موبایل"
                  />

                  <amp-input
                    rules="require"
                    v-model="form.destination.fullName"
                    placeholder="نام و نام خانوادگی"
                  />

                  <amp-textarea
                    v-model="form.destination.description"
                    placeholder="توضیحات مقصد"
                    :rows="2"
                  />
                </v-col>
              </v-row>

              <div class="d-flex justify-space-between mt-3">
                <amp-button width="100px" text="بازگشت" color="grey" @click="step = 1" />
                <amp-button
                  width="100px"
                  text="مرحله بعد"
                  color="primary"
                  @click="step = 3"
                />
              </div>
            </v-stepper-content>

            <!-- ================= STEP 3 : SHIPPING INFO ================= -->

            <v-stepper-content step="3">
              <v-row>
                <v-col cols="12">
                  <amp-select
                    :items="services"
                    rules="require"
                    v-model="form.serviceId"
                    placeholder="سرویس ارسال"
                  />
                </v-col>

                <v-col cols="12">
                  <amp-select
                    :items="paymentTypes"
                    rules="require"
                    v-model="form.paymentType"
                    placeholder="نوع پرداخت"
                  />
                </v-col>

                <v-col cols="12">
                  <amp-select
                    :items="pickupTypes"
                    rules="require"
                    v-model="form.pickupType"
                    placeholder="روش جمع‌آوری"
                  />
                </v-col>

                <v-col cols="12">
                  <amp-select
                    :items="distributionTypes"
                    rules="require"
                    v-model="form.distributionType"
                    placeholder="روش تحویل"
                  />
                </v-col>

                <v-col cols="12">
                  <amp-select
                    :items="packTypes"
                    rules="require"
                    v-model="form.packType"
                    placeholder="نوع بسته‌بندی"
                  />
                </v-col>

                <v-col cols="12">
                  <amp-select
                    :items="filteredPackings"
                    rules="require"
                    v-model="form.packingId"
                    placeholder="بسته‌بندی"
                  />
                </v-col>

                <v-col cols="12">
                  <amp-select
                    :items="filteredPackContents"
                    rules="require"
                    v-model="form.packageContentId"
                    placeholder="محتوای بسته"
                  />
                </v-col>

                <v-col cols="12">
                  <amp-textarea
                    v-model="form.description"
                    placeholder="توضیحات سفارش"
                    :rows="2"
                  />
                </v-col>
                <v-col cols="12">
                  <amp-button
                    width="160px"
                    text="ثبت سفارش"
                    color="primary"
                    :disabled="!valid"
                    :loading="loading"
                    @click="submitTipaxOrder"
                /></v-col>
              </v-row>
            </v-stepper-content>
          </v-stepper>
        </v-form>
      </v-card-text>

      <!-- <v-card-actions class="justify-center">
  
        <amp-button width="160px" text="انصراف" color="grey" @click="closeDialog" />
      </v-card-actions> -->
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    tipaxDialog: Boolean,
    selectedBasket: [String, Number],
    tibaxCity: { type: Array, required: true },
  },

  data() {
    return {
      step: 1,
      valid: false,
      loading: false,

      services: [],
      paymentTypes: [],
      pickupTypes: [],
      distributionTypes: [],
      packTypes: [],
      packings: [],
      packContents: [],
      filteredPackings: [],
      filteredPackContents: [],

      form: {
        origin: {
          cityId: null,
          fullAddress: "",
          floor: null,
          unit: null,
          postalCode: "",
          latitude: "",
          longitude: "",
          no: "",
          description: "",
          phone: "",
          fullName: "",
          mobile: "",
        },
        destination: {
          cityId: null,
          fullAddress: "",
          floor: null,
          unit: null,
          postalCode: "",
          latitude: "",
          longitude: "",
          no: "",
          description: "",
          phone: "",
          fullName: "",
          mobile: "",
        },
        description: "",
        serviceId: null,
        paymentType: null,
        pickupType: null,
        distributionType: null,
        packType: null,
        packingId: null,
        packageContentId: null,
      },
    };
  },

  watch: {
    "form.packType"(val) {
      const id = +Number(val);
      console.log("id >>> ", id);
      console.log("this.packings >>> ", this.packings);
      console.log("id >>> ", id);

      this.filteredPackings = this.packings.filter((i) => i.packType === id);
      console.log("filteredPackings >>> ", this.filteredPackings);
      this.filteredPackContents = this.packContents.filter((i) => i.packType === id);
      this.form.packingId = null;
      this.form.packageContentId = null;
    },
  },

  mounted() {
    this.loadTipaxBaseData();
  },

  methods: {
    loadTipaxBaseData() {
      Promise.all([
        this.$reqApi("shop/tipax/list-service"),
        this.$reqApi("shop/tipax/list-payment-type"),
        this.$reqApi("shop/tipax/list-pickup-type"),
        this.$reqApi("shop/tipax/list-distribution-type"),
        this.$reqApi("shop/tipax/get-pack-type"),
        this.$reqApi("shop/tipax/list-packing"),
        this.$reqApi("shop/tipax/list-pack-content"),
      ]).then(
        ([
          services,
          payments,
          pickups,
          distributions,
          packTypes,
          packings,
          packContents,
        ]) => {
          this.services = services.map((x) => ({ text: x.title, value: x.id }));
          this.paymentTypes = payments.map((x) => ({ text: x.title, value: x.id }));
          this.pickupTypes = pickups.map((x) => ({ text: x.title, value: x.id }));
          this.distributionTypes = distributions.map((x) => ({
            text: x.title,
            value: x.id,
          }));

          this.packTypes = packTypes.data.map((x) => ({ text: x.title, value: x.id }));

          this.packings = packings.result.map((x) => ({
            text: x.title,
            packType: x.packType,
            value: x.id,
          }));
          this.packContents = packContents.result.map((x) => ({
            text: x.title,
            packType: x.packType,
            value: x.id,
          }));
        }
      );
    },

    submitTipaxOrder() {
      this.loading = true;

      const payload = {
        basket_id: this.selectedBasket,
        origin: [this.form.origin],
        destination: [this.form.destination],
        description: this.form.description,
        serviceId: this.form.serviceId,
        paymentType: this.form.paymentType,
        pickupType: this.form.pickupType,
        distributionType: this.form.distributionType,
        packType: this.form.packType,
        packingId: this.form.packingId,
        packageContentId: this.form.packageContentId,
      };

      this.$reqApi("tipax/insert-order", payload)
        .then(() => {
          this.$toast.success("سفارش تیپاکس با موفقیت ثبت شد");
          this.closeDialog();
        })
        .catch(() => {
          this.$toast.error("خطا در ثبت سفارش تیپاکس");
          this.closeDialog();
        })
        .finally(() => {
          this.loading = false;
        });
    },

    closeDialog() {
      this.$emit("closeDialog");
    },
  },
};
</script>
