<template>
  <v-sheet class="pb-8 pb-md-8 mt-5 mt-md-10">
    <v-col class="pr-3 pr-sm-6 overflow-hidden">
      <!-- Skeleton -->
      <v-row no-gutters v-if="loading" class="justify-center">
        <v-skeleton-loader
          v-for="i in $vuetify.breakpoint.mdAndUp ? 6 : 2"
          :key="i"
          class="mx-auto"
          :width="$vuetify.breakpoint.mdAndUp ? 240 : 140"
          type="card, text"
        />
      </v-row>

      <!-- Carousel -->
      <v-card v-else class="secondary darken-1">
        <v-col cols="12" md="12" class="text-center font_18 primary--text">
          <b class="font_18 primary--text"> محصولات پر تخفیف </b>
        </v-col>
        <v-carousel hide-delimiter-background show-arrows-on-hover height="auto">
          <v-carousel-item v-for="(slide, slideIndex) in slides" :key="slideIndex">
            <v-col cols="12" class="mb-4">
              <v-row class="pa-5">
                <v-col v-for="(product, index) in slide" :key="index" cols="12" md="3">
                  <ProductCardMain
                    :data="product"
                    :infinite="infinite"
                    :cardHeight="$vuetify.breakpoint.mdAndUp ? 380 : 306"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-carousel-item>
        </v-carousel>
      </v-card>
    </v-col>
  </v-sheet>
</template>

<script>
import ProductCardMain from "../Card/ProductCardMain.vue";

export default {
  components: { ProductCardMain },
  props: {
    title: String,
    url: String,
    products: {
      type: Array,
      required: true,
    },
    infinite: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    slides() {
      if (!Array.isArray(this.products)) return [];
      console.log("sss");
      console.log("sss");
      console.log("sss");
      console.log("sss");

      const size = 8;
      const result = [];

      for (let i = 0; i < this.products.length; i += size) {
        result.push(this.products.slice(i, i + size));
      }

      return result;
    },
  },
};
</script>

<style scoped>
.product-slider__card-wrapper {
  position: relative;
}
.product-slider__badge {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
  pointer-events: none;
}
</style>
