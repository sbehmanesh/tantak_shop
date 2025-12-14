<template>
  <v-card class="lottery-card" elevation="6">
    <div class="lottery-card__header">
      <div class="lottery-card__title">
        <p class="lottery-label mb-1">
          قرعه‌کشی
        </p>
        <h3 class="font-weight-black mb-2">
          قرعه‌کشی شماره
          <span class="accent-number">{{ index + 1 }}</span>
        </h3>
        <p class="lottery-card__description">
          {{ lottery.description }}
        </p>
      </div>

      <div class="lottery-card__meta">
        <v-chip class="lottery-chip" color="deep-purple lighten-5" text-color="deep-purple darken-3">
          <v-icon left small class="ml-1">mdi-clock-outline</v-icon>
          {{ formatTime(lottery.time) }}
        </v-chip>
        <v-chip class="lottery-chip" color="teal lighten-5" text-color="teal darken-3">
          <v-icon left small class="ml-1">mdi-account-multiple</v-icon>
          {{ lottery.people_number_use.toLocaleString() }} شرکت‌کننده
        </v-chip>
      </div>
    </div>

    <v-divider class="my-6"></v-divider>

    <div class="lottery-card__panels">
      <v-expansion-panels multiple flat>
        <v-expansion-panel
          v-if="lottery.wallets?.length"
          class="lottery-panel"
        >
          <v-expansion-panel-title>
            <v-icon class="ml-2">mdi-wallet</v-icon>
            جوایز کیف‌پول
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <PrizeSection :items="walletsFormatted" />
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel
          v-if="lottery.coupons?.length"
          class="lottery-panel"
        >
          <v-expansion-panel-title>
            <v-icon class="ml-2">mdi-ticket-percent</v-icon>
            کوپن‌ها
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <PrizeSection :items="couponsFormatted" />
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel
          v-if="lottery.not_system_products?.length"
          class="lottery-panel"
        >
          <v-expansion-panel-title>
            <v-icon class="ml-2">mdi-gift-open</v-icon>
            جوایز غیر سیستمی
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <PrizeSection :items="nspFormatted" />
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel
          v-if="lottery.product_var_coms?.length"
          class="lottery-panel"
        >
          <v-expansion-panel-title>
            <v-icon class="ml-2">mdi-package-variant</v-icon>
            محصولات سیستمی
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <PrizeSection :items="productsFormatted" />
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel
          v-if="lottery.packages?.length"
          class="lottery-panel"
        >
          <v-expansion-panel-title>
            <v-icon class="ml-2">mdi-package</v-icon>
            پکیج‌ها
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <PrizeSection :items="packagesFormatted" />
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
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

<style scoped>
.lottery-card {
  border-radius: 28px;
  padding: 32px;
  border: none;
  background: #ffffff;
  box-shadow: 0 20px 45px rgba(104, 117, 245, 0.15) !important;
}

.lottery-card__header {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

@media (min-width: 960px) {
  .lottery-card__header {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.lottery-card__description {
  color: #4f4f62;
  line-height: 1.8;
  margin: 0;
  max-width: 540px;
}

.accent-number {
  color: #7a5af8;
}

.lottery-card__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: flex-start;
}

.lottery-chip {
  font-weight: 600;
  border-radius: 999px;
}

.lottery-card__panels ::v-deep .v-expansion-panel-header {
  font-weight: 600;
}

.lottery-panel {
  border: 1px solid #f0f0ff;
  border-radius: 18px;
  margin-bottom: 12px;
  overflow: hidden;
  background: #fbfbff;
}

.lottery-panel + .lottery-panel {
  margin-top: 8px;
}

.lottery-label {
  color: #6a3df6;
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: normal;
}

.lottery-panel ::v-deep .v-expansion-panel-text {
  margin-top: 12px;
  border-top: 1px solid #ecebff;
  padding-top: 16px;
}
</style>
