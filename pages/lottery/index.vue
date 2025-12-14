<template>
  <v-container class="lottery-page py-8">
    <v-row justify="center" class="ma-0">
      <v-col cols="12" lg="10" class="pa-0 pa-md-3">
        <v-sheet class="hero-banner mb-8" rounded="xl" elevation="4">
          <div class="hero-content">
            <div>
              <p class="hero-label mb-2">فستیوال فروش</p>
              <h1 class="white--text font-weight-black mb-4">
                قرعه‌کشی‌های ویژه جشنواره
              </h1>
              <p class="hero-subtitle">
                همه قرعه‌کشی‌ها و جوایز مرتبط با فستیوالی که انتخاب کرده‌اید در اینجا
                نمایش داده می‌شوند. برای مشاهده جزئیات هر قرعه‌کشی، روی کارت‌ها کلیک کنید.
              </p>
            </div>

            <div class="hero-stat text-center">
              <div class="hero-stat__value">
                {{ data.length ? data.length : "۰" }}
              </div>
              <div class="hero-stat__label">قرعه‌کشی فعال</div>
            </div>
          </div>
          <div class="hero-accent"></div>
        </v-sheet>
      </v-col>

      <v-col cols="12" lg="10" class="pa-0 pa-md-3">
        <transition-group
          name="fade-list"
          tag="div"
          class="d-flex flex-column ga-6"
        >
          <LotteryItem
            v-for="(lottery, index) in data"
            :key="lottery.id"
            :lottery="lottery"
            :index="index"
          />
        </transition-group>

        <v-alert
          v-if="!data.length"
          type="info"
          border="left"
          text
          class="mt-4"
        >
          در حال حاضر قرعه‌کشی فعالی برای این جشنواره یافت نشد.
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LotteryItem from "@/components/Slider/LotteryItem.vue";

export default {
  components: { LotteryItem },

  data: () => ({
    data: [],
  }),

  methods: {
    getListLoterry() {
      this.$reqApi("shop/lottery/public-list", {
        festival_id: this.$route.query.id,
      })
        .then((res) => {
          this.data = res.model.data
        })
        .catch(() => {});
    },
  },

  mounted() {
    this.getListLoterry();
  },
};
</script>

<style scoped>
.lottery-page {
  background: radial-gradient(circle at top, #f8f4ff, #f7f7fb 45%, #ffffff 100%);
  min-height: 100vh;
}

.hero-banner {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #4e54c8, #8f94fb);
  padding: 32px 40px;
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

@media (min-width: 960px) {
  .hero-content {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.hero-subtitle {
  color: rgba(255, 255, 255, 0.85);
  font-size: 1rem;
  max-width: 460px;
  line-height: 1.7;
}

.hero-stat {
  min-width: 180px;
  background: rgba(255, 255, 255, 0.14);
  border-radius: 28px;
  padding: 20px 16px;
  color: #fff;
}

.hero-stat__value {
  font-size: 2.2rem;
  font-weight: 900;
  line-height: 1;
}

.hero-stat__label {
  margin-top: 8px;
  font-size: 0.9rem;
  opacity: 0.85;
}

.hero-accent {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.35), transparent 55%);
  mix-blend-mode: screen;
  pointer-events: none;
}

.hero-label {
  color: rgba(255, 255, 255, 0.92);
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: normal;
}

.fade-list-enter-active,
.fade-list-leave-active {
  transition: all 0.3s ease;
}

.fade-list-enter,
.fade-list-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
