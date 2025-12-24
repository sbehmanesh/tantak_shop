<template>
  <div>
    <v-row :no-gutters="$vuetify.breakpoint.smAndDown" class="justify-center">
      <v-col cols="12" md="10" class="">
        <StoryShop />
      </v-col>
      <v-col cols="10" md="10" class="mt-1">
        <Festivals />
      </v-col>
      <v-col cols="12" md="12" class="mt-1 px-0">
        <v-card class="elevation-0">
          <InfrmationsSend />

          <AllProduct v-if="AllProduct.length > 0" :items="AllProduct" />
          <BestProduct v-if="top_products.length > 0" :items="top_products" />

          <ProductSlider
            :loading="loading"
            v-if="new_products"
            :infinite="false"
            :products="new_products"
            title="محصولات جدید"
          />
        </v-card>
      </v-col>
    </v-row>

    <!-- <ProductSlider
      :loading="loading"
      v-if="top_products"
      :products="top_products"
      title="محصولات پرفروش"
      url="/product"
    /> -->

    <!-- <ProductSlider
      :loading="loading"
      v-if="offered_products.length > 0"
      :products="offered_products"
      title="محصولات پیشنهادی"
      url="/product"
    /> -->

    <!-- <FeaturesCards /> -->
  </div>
</template>

<script>
import MainSlider from "~/components/Slider/MainSlider.vue";
import Festivals from "~/components/Slider/Festivals.vue";
import ProductSlider from "~/components/Slider/ProductSlider.vue";
import AllProduct from "~/components/Slider/AllProduct.vue";
import FeaturesCards from "@/components/Card/FeaturesCards.vue";
import BlogSlider from "~/components/Slider/BlogSlider.vue";
import StoryShop from "~/components/Slider/StoryShop.vue";

import BannerTabs from "~/components/Tab/BannerTabs.vue";
import BestProduct from "~/components/Slider/BestProduct.vue";
import BannerCardCircle from "~/components/Card/BannerCardCircle.vue";
import InfrmationsSend from "~/components/Slider/InfrmationsSend.vue";
export default {
  components: {
    MainSlider,
    BestProduct,
    Festivals,
    AllProduct,
    ProductSlider,
    FeaturesCards,
    BlogSlider,
    BannerTabs,
    BannerCardCircle,
    InfrmationsSend,
    StoryShop,
  },
  data: () => ({
    title: "صفحه اصلی",
    main_slider: [],
    festivals: [],
    decoded_uri: null,
    seo: {
      name: "",
      description: "",
      keywords: [],
    },
    loading: false,
    new_products: null,
    new_posts: null,
    // new datas
    social_icons: [
      {
        name: "mdi-facebook",
        route: "",
      },
      {
        name: "mdi-twitter",
        route: "",
      },
      {
        name: "mdi-instagram",
        route: "",
      },
      {
        name: "mdi-whatsapp",
        route: "",
      },
      {
        name: "telegram",
        route: "",
      },
      {
        name: "aparat",
        route: "",
      },
    ],
    new_pro: [],
    AllProduct: [],
    top_products: [],
    offered_products: [],
    setproducts: false,
  }),
  // head() {
  //   return {

  //   return {
  //   return {
  //   return {
  //   return {
  //   return {
  //   return {
  //   return {
  //   return {
  //   return {
  //   return {
  //   return {
  //   return {
  //   return {
  //   return {
  //   return {
  //   return {
  //   return {
  //   return {
  //   return {
  //   return {
  //   return {
  //   return {
  //   return {
  //   return {
  //   return {
  //   return {
  //   return {
  //   return {
  //   return {
  //   return {
  //   return {
  //     meta: [
  //       {
  //         name: "title",
  //         content: this.seo.name,
  //       },
  //       {
  //         name: "og:title",
  //         content: this.seo.name,
  //       },
  //       {
  //         name: "keywords",
  //         content: this.seo.keywords,
  //       },
  //       {
  //         name: "description",
  //         content: this.seo.description,
  //       },
  //       {
  //         name: "og:description",
  //         content:
  //           "این طبیعت توست." +
  //           "|" +
  //           "تن تاک,ادویه,عرقیجات,ادویه اصل,بهترین ادویه,زندگی سالم,ادویه خالص,",
  //       },
  //       {
  //         name: "url",
  //         content: "https://goolghand.com" + this.decoded_uri,
  //       },
  //       {
  //         name: "og:url",
  //         content: "https://goolghand.com" + this.decoded_uri,
  //       },
  //     ],
  //     script: [{ type: "application/ld+json", json: this.structuredData }],
  //   };
  // },
  // created() {
  //   try {
  //     var encoded_uri = this.$route.path;
  //     this.decoded_uri = decodeURI(encoded_uri);
  //   } catch (exception) {}

  //   this.seo.name = "ایوان";
  //   this.seo.keywords.push("ایوان");
  //   this.seo.description = "ایوان";
  // },

  watch: {},
  mounted() {
    this.$store.dispatch("setPageTitle", this.title);
    if (this.$store.state.base.landing_page.data) {
      this.getLandingPageData();
    }
    this.getProducts();
  },
  // watch: {
  //   "this.$store.state.base.landing_page.refresh"() {
  //     this.getLandingPageData();
  //   },

  //   loading() {
  //     this.$store.dispatch("setTopLoader", this.loading);
  //   },
  // },
  methods: {
    getLandingPageData() {
      this.loading = true;
      let res = this.$store.state.base.landing_page.data;
      this.most_sold_products = res.most_sold_products;
      this.product_categories = res.product_categories;
      this.discounted_products = res.discounted_products;
      this.new_products = res.new_products;
      this.new_posts = res.new_posts;
      this.loading = false;
    },

    getProducts() {
      this.loading = true;
      this.$reqApi("/shop/home-page/product-list")
        .then((response) => {
          this.AllProduct = response.product;
          let raw_new_products = response.product;
          raw_new_products.map((x) => {
            this.new_products.push({
              id: x.id,
              main_picture_path: x.main_image,
              price: x.base_price,
              name: x.name,
              slug: x.slug,
            });
          });
          let raw_top_products = response.top_product;
          raw_top_products.map((x) => {
            this.top_products.push({
              id: x.id,
              main_picture_path: x.main_image,
              price: x.base_price,
              name: x.name,
              slug: x.slug,
            });
          });
          if (this.top_products.length < 10) {
            raw_new_products.map((x) => {
              if (this.top_products.length < 10) {
                this.top_products.push({
                  id: x.id,
                  main_picture_path: x.main_image,
                  price: x.base_price,
                  name: x.name,
                  slug: x.slug,
                  available: x.stock_pro != null && x.stock_pro > 0,
                });
              }
            });
          }

          let raw_offered_products = response.offer_product;
          raw_offered_products.map((x) => {
            this.offered_products.push({
              id: x.id,
              main_picture_path: x.main_image,
              price: x.base_price,
              name: x.name,
              slug: x.slug,
            });
          });
          // }

          this.setproducts = true;
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
        });
    },
  },
};
</script>
