<template>
  <div>
    <v-col v-if="festivals.length > 0" cols="12" class="pa-0">
      <v-carousel
        class="rounded-xl"
        interval="8000"
        :height="isMobile ? 220 : 480"
        hide-delimiter-background
        show-arrows-on-hover
        hide-delimiters
      >
        <v-carousel-item
          class="rounded-xl"
          v-for="(festival, index) in festivals"
          :key="index"
        >
          <v-img
            @click.stop="goToFestival(festival.id)"
            :src="$getImage(festival.logo)"
            class="imageCover rounded-xl"
            cover
            :height="isMobile ? 220 : 450"
          >
            <div class="festival-overlay"></div>

            <div class="festival-content" :class="{ mobile: isMobile }">
              <h3 class="festival-title" :class="{ mobile: isMobile }">
                {{ festival.name }}
              </h3>
              <small> جهت مشاهده کلیک کنید </small>
              <br />

              <v-chip class="festival-chip" color="primary " text-color="white" small>
                {{ mapGiftType(festival.type_gift) }}
              </v-chip>

              <p class="festival-date" :class="{ mobile: isMobile }">
                از شروع
                {{ formatDate(festival.start_at) }}
                تا

                {{ formatDate(festival.end_at) }}
              </p>

              <div
                v-if="festival.product"
                class="festival-product-box"
                :class="{ mobile: isMobile }"
              >
                <v-img
                  :src="$getImage(festival.product.main_image)"
                  :height="isMobile ? 30 : 70"
                  :width="isMobile ? 30 : 70"
                  contain
                  class="festival-product-img"
                ></v-img>

                <span class="festival-product-name" :class="{ mobile: isMobile }">
                  {{ festival.product.name }}
                </span>
              </div>
            </div>
          </v-img>
        </v-carousel-item>
      </v-carousel>
    </v-col>
  </div>
</template>

<script>
export default {
  data: () => ({
    festivals: [],
  }),

  methods: {
    getFesrivals() {
      this.$reqApi("shop/festival/public-list")
        .then((res) => {
          this.festivals = res.model.data;
        })
        .catch(() => {});
    },

    formatDate(dateStr) {
      if (!dateStr) return "-";
      return new Date(dateStr).toLocaleDateString("fa-IR");
    },

    mapGiftType(type) {
      const map = {
        cash_walet: "هدیه نقدی",
        credit_wallt: "اعتبار کیف پول",
        coupon: "کوپن تخفیف",
        product_package: "بسته محصول",
        on_product: "روی محصول",
        on_basket: "روی سبد خرید",
      };
      return map[type] || "جشنواره";
    },
    goToFestival(id) {
      this.$router.push(`/lottery?id=${id}`);
    },
  },

  computed: {
    isMobile() {
      return !this.$vuetify.breakpoint.mdAndUp;
    },
  },

  beforeMount() {
    // if (Boolean(this.$store.state.auth.user)) {
      this.getFesrivals();
    // }
  },
};
</script>
<style scoped>
.festival-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1));
}

.festival-content {
  position: absolute;
  bottom: 15px;
  left: 15px;
  color: white;
  z-index: 2;
  max-width: 80%;
}

.festival-content.mobile {
  bottom: 10px;
  left: 10px;
  max-width: 90%;
}

.festival-title {
  font-size: 22px;
  font-weight: bold;
  margin: 0;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
}
.festival-title:hover {
  cursor: pointer;
  color: rgb(243, 118, 241);
}
.festival-title.mobile {
  font-size: 16px;
}

.festival-chip {
  margin: 6px 0;
  font-size: 11px;
  padding: 2px 8px;
}

.festival-date {
  margin: 0;
  font-size: 11px;
}

.festival-date.mobile {
  font-size: 11px;
}

.festival-product-box {
  margin-top: 10px;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(6px);
  padding: 6px 12px;
  border-radius: 8px;
}

.festival-product-box.mobile {
  padding: 4px 8px;
}

/* تصویر محصول */
.festival-product-img {
  border-radius: 6px;
}

/* نام محصول */
.festival-product-name {
  font-size: 13px;
  margin-right: 10px;
}

.festival-product-name.mobile {
  font-size: 11px;
  margin-right: 8px;
}
.imageCover {
}
</style>
