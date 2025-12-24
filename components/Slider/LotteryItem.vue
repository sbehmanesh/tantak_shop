<template>
  <v-card class="pa-4" outlined elevation="1">
    <!-- Header -->
    <div class="d-flex justify-space-between align-center mb-4">
      <div>
        <h3 class="font-weight-bold">قرعه‌کشی شماره {{ index + 1 }}</h3>
        <p class="grey--text">
          زمان: <strong>{{ formatTime(lottery.time) }}</strong>
        </p>
      </div>

      <v-chip color="blue" text-color="white">
        {{ lottery.people_number_use }} نفر شرکت کرده‌اند
      </v-chip>
    </div>

    <p class="mt-1 mb-4">{{ lottery.description }}</p>

    <v-expansion-panels multiple>
      <!-- Wallets -->
      <v-expansion-panel v-if="lottery.wallets?.length">
        <v-expansion-panel-title>
          <v-icon class="ml-2">mdi-wallet</v-icon>
          جوایز کیف‌پول
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <PrizeSection :items="walletsFormatted" />
        </v-expansion-panel-text>
      </v-expansion-panel>

      <!-- Coupons -->
      <v-expansion-panel v-if="lottery.coupons?.length">
        <v-expansion-panel-title>
          <v-icon class="ml-2">mdi-ticket-percent</v-icon>
          کوپن‌ها
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <PrizeSection :items="couponsFormatted" />
        </v-expansion-panel-text>
      </v-expansion-panel>

      <!-- Not system products -->
      <v-expansion-panel v-if="lottery.not_system_products?.length">
        <v-expansion-panel-title>
          <v-icon class="ml-2">mdi-gift-open</v-icon>
          جوایز غیر سیستمی
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <PrizeSection :items="nspFormatted" />
        </v-expansion-panel-text>
      </v-expansion-panel>

      <!-- System products -->
      <v-expansion-panel v-if="lottery.product_var_coms?.length">
        <v-expansion-panel-title>
          <v-icon class="ml-2">mdi-package-variant</v-icon>
          محصولات سیستمی
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <PrizeSection :items="productsFormatted" />
        </v-expansion-panel-text>
      </v-expansion-panel>

      <!-- Packages -->
      <v-expansion-panel v-if="lottery.packages?.length">
        <v-expansion-panel-title>
          <v-icon class="ml-2">mdi-package</v-icon>
          پکیج‌ها
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <PrizeSection :items="packagesFormatted" />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
import PrizeSection from "@/components/Slider/PrizeSection.vue";

export default {
  props: {
    lottery: {
      default: false,
      required: true,
    },
    index: {
      default: false,
      required: true,
    },
  },
  components: { PrizeSection },

  computed: {
    walletsFormatted() {
      return this.lottery.wallets.map((w) => ({
        title: w.lotterygable_id === "cash" ? "کیف‌پول نقدی" : "کیف‌پول اعتباری",
        value: w.number.toLocaleString() + " تومان",
        winners: w.person_win,
      }));
    },

    couponsFormatted() {
      return this.lottery.coupons.map((c) => ({
        title: c.for_title,
        value:
          c.type === "percentage" ? `%${c.value}` : `${c.value.toLocaleString()} تومان`,
        winners: c.person_win,
        desc: c.description,
      }));
    },

    nspFormatted() {
      return this.lottery.not_system_products.map((p) => ({
        title: p.value,
        value: p.number + " عدد",
        winners: p.person_win,
      }));
    },

    productsFormatted() {
      return this.lottery.product_var_coms.map((p) => ({
        title: "محصول سیستمی",
        value: `${p.price.toLocaleString()} تومان`,
        winners: p.person_win,
      }));
    },

    packagesFormatted() {
      return this.lottery.packages.map((p) => ({
        title: p.name,
        value: p.package_number,
        winners: p.person_win,
        image: p.logo,
      }));
    },
  },

  methods: {
    formatTime(t) {
      return new Date(t).toLocaleString("fa-IR");
    },
  },
};
</script>
