<template>
  <div>
    <v-card
      class="elevation-0 rounded-0 pa-3 pointer"
      :class="setClaa"
      :width="max_width"
      nuxt
      @click="goToSlug(data.slug)"
      :height="cardHeight"
    >
      <v-img :aspect-ratio="1" :src="$getImage($resizeImage(data.main_image),true)" :alt="data.name">
      <!-- <v-img
        contain
        :aspect-ratio="1"
        cover
        :lazy-src="$getImage(data.main_picture_path)"
        :src="$getImage(data.main_picture_path)"
        :alt="data.name"
        class="image"
      >
        <-- top img -->
        <div
          v-if="data.has_whole_sell == 1 && data.has_single_sell == 0"
          class="d-flex align-center justify-start"
          style="position: absolute; width: 100%; top: 0; opacity: 0.85"
        >
          <div class="primary whited--text font_12 py-1 px-2 mt-3">
            فروش فله
          </div>
        </div>
        <!-- top img end -->

        <!-- bottom img -->
        <div
          v-if="final_discount && price_text != 'ناموجود'"
          class="d-flex align-center justify-end"
          style="position: absolute; width: 100%; bottom: 0"
        >
          <div class="error whited--text font_12 py-1 px-2 mt-3">
            {{ discount_price_percent }}%
          </div>
        </div>
        <!-- bottom img end -->
      </v-img>
      <v-card-title
        class="pa-0 mt-3 height64 align-start break-keep"
        :class="$vuetify.breakpoint.smAndDown ? 'font_14' : 'font_16'"
      >
        {{ data.name }}
      </v-card-title>

      <!-- price with discount -->
      <!-- <v-card-text 
            v-if="final_discount && price_text != 'ناموجود'"
            class="pa-0 mt-3 d-flex justify-space-between"
            >
                <div class="text-decoration-line-through text--disabled" >{{price_text}}</div>
                <div class="error--text font_16">
                    {{discount_price}}
                    <span class="font_12">تومان</span>
                </div>
            </v-card-text> -->
      <v-card-text
        v-if="data.before_price"
        class="pa-0 mt-3 d-flex justify-space-between"
      >
        <div class="text-decoration-line-through primary--text">
          {{ data.before_price }}
        </div>
        <div>
          {{ data.base_price }} تومان
        </div>
      </v-card-text>
      <!-- price with discount end -->

      <!-- price without discount -->
      <v-card-text
        v-if="!data.before_price || price_text == 'ناموجود'"
        class="pa-0 mt-3 d-flex justify-end"
      >
        <div :class="$vuetify.breakpoint.smAndDown ? 'font_14' : 'font_16'">
          <!-- {{ price_text }} -->
          {{ Number(data.base_price).toLocaleString() }}
          <span v-if="price_text != 'ناموجود'" class="font_12">تومان</span>
        </div>
      </v-card-text>
      <v-card-actions class="justify-left px-0">
        <amp-button
          text="خرید"
          textClass="font_12"
          color="primary"
          height="20"
        />
      </v-card-actions>
      <!-- price without discount end -->
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
    },
    width: {
      type: String,
      default: null,
    },
    cardHeight: {
      type: Number,
    },
    hoverAvble: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    final_discount: 0,
    price: 0,
  }),
  computed: {
    max_width() {
      if (this.width) return "auto";
      return this.$vuetify.breakpoint.smAndUp ? "208px" : "170px";
    },
    price_text() {
      if (this.data.has_whole_sell == 1 && this.data.has_single_sell == 1) {
        if (this.data.has_stock_count == 0) return "ناموجود";
        return Number(this.price).toLocaleString();
      }

      if (this.data.has_whole_sell == 0 && this.data.has_single_sell == 1) {
        if (this.data.has_stock_count == 0) return "ناموجود";
        return Number(this.price).toLocaleString();
      }

      if (this.data.has_whole_sell == 1 && this.data.has_single_sell == 0) {
        return (
          "یک " +
          this.data.base_whole_sell_unit +
          " " +
          Number(this.price).toLocaleString()
        );
      }
    },
    setClaa() {
      if (this.hoverAvble) {
        if (this.$vuetify.breakpoint.mdAndUp) {
          return "container_iamge ml-9";
        } else {
          return "container_iamge ml-2";
        }
      } else {
        if (this.$vuetify.breakpoint.mdAndUp) {
          return "ml-9";
        } else {
          return "ml-2";
        }
      }
    },
    discount_price() {
      return (
        Number(this.price) - Number(this.final_discount)
      ).toLocaleString();
    },
    discount_price_percent() {
      let price = Number(this.price);
      let discount = Number(this.final_discount);
      return Math.ceil((discount / price) * 100);
    },
  },
  mounted() {
    this.clacPrice();
    this.clacDiscount();
  },
  methods: {
    clacDiscount() {
      if (this.data.discounted_base_price && this.data.active_discount) {
        if (this.data.active_discount.type == "percent") {
          this.final_discount =
            (Number(this.data.active_discount.combination.price) *
              Number(this.data.active_discount.discount)) /
            100;
        }
        if (this.data.active_discount.type == "amount") {
          this.final_discount = Number(this.data.active_discount.discount);
        }
      }
      if (!this.data.discounted_base_price && this.data.active_discount) {
        if (this.data.active_discount.type == "percent") {
          this.final_discount =
            (Number(this.data.active_discount.combination.price) *
              Number(this.data.active_discount.discount)) /
            100;
        }
        if (this.data.active_discount.type == "amount") {
          this.final_discount = Number(this.data.active_discount.discount);
        }
      }
      if (this.data.discounted_base_price && !this.data.active_discount) {
        this.final_discount =
          Number(this.price) - Number(this.data.discounted_base_price);
      }
      if (!this.data.discounted_base_price && !this.data.active_discount) {
        this.final_discount = 0;
      }
    },
    goToSlug(slug) {
      this.$router.push(`/product/${slug}`);
    },
    clacPrice() {
      if (this.data.active_discount) {
        this.price = this.data.active_discount.combination.price;
        return;
      }
      this.price = this.data.base_price;
    },
  },
};
</script>
<style scoped>
.container_iamge {
  -webkit-transition: 0.2s ease-in-out;
  transition: 0.3s ease-in-out;
}
.container_iamge:hover {
  -webkit-transform: scale(1.2);
  transform: scale(1.2);
}
</style>
