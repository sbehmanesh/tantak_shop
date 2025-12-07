<template>
  <div>
    <!-- loading -->
    <!-- <Loading v-if="loading"/> -->
    <!-- loading end -->

    <v-row :no-gutters="$vuetify.breakpoint.smAndDown" class="justify-center">
      <v-col cols="12">
        <!-- slider -->
        <MainSlider :slider_item="this.$store.state.setting.main_slider" />
        <!-- slider end -->
      </v-col>
    </v-row>
    
    <!-- product slider -->
    <ProductSlider
      :loading="loading"
      v-if="top_products"
      :products="top_products"
      title="محصولات پرفروش"
      url="/product"
    />
    <!-- product slider end -->

    <!-- product slider -->
    <ProductSlider
      :loading="loading"
      v-if="offered_products"
      :products="offered_products"
      title="محصولات پیشنهادی"
      url="/product"
    />
    <!-- product slider end -->

    <!-- product slider -->
    <ProductSlider
      :loading="loading"
      v-if="new_products"
      :infinite="false"
      :products="new_products"
      title="محصولات جدید"
    />
    <!-- product slider end -->

    <FeaturesCards />

    <!-- banner tabs -->
    <!-- <BannerTabs :tabs="product_categories" /> -->
    <!-- banner tabs end -->

    <!-- product slider -->
    <!-- <ProductSlider
      v-if="new_products"
      :products="new_products"
      title="محصولات جدید تن تاک"
      url="/product"
    /> -->
    <!-- product slider end -->

    <!-- Blog slider -->
    <!-- <BlogSlider 
      v-if="new_posts" 
      :posts="new_posts" 
      title="آخرین های نشریه"
      url="/blog"
      /> -->
    <!-- Blog slider end -->
  </div>
</template>

<script>
import MainSlider from "~/components/Slider/MainSlider.vue";
import ProductSlider from "~/components/Slider/ProductSlider.vue";
import FeaturesCards from "@/components/Card/FeaturesCards.vue";
import BlogSlider from "~/components/Slider/BlogSlider.vue";
import BannerTabs from "~/components/Tab/BannerTabs.vue";
import BannerCardCircle from "~/components/Card/BannerCardCircle.vue";
export default {
  components: {
    MainSlider,
    ProductSlider,
    FeaturesCards,
    BlogSlider,
    BannerTabs,
    BannerCardCircle,
  },
  data: () => ({
    title: "صفحه اصلی",
    main_slider: [],
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
    new_products: [],
    top_products: [],
    offered_products: [],
    setproducts: false,
  }),
  // head() {
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
  beforeMount() {},
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
          let raw_new_products = response.product;
          raw_new_products.map((x) => {
              this.new_products.push({
                id: x.id,
                main_picture_path: x.main_image,
                price: x.base_price,
                name: x.name,
                slug: x.slug,
                available: (x.stock_pro != null && x.stock_pro > 0)
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
                available: (x.stock_pro != null && x.stock_pro > 0)
              });
          });
          if(this.top_products.length < 10){
            raw_new_products.map((x) => {
              if(this.top_products.length < 10){
                this.top_products.push({
                  id: x.id,
                  main_picture_path: x.main_image,
                  price: x.base_price,
                  name: x.name,
                  slug: x.slug,
                  available: (x.stock_pro != null && x.stock_pro > 0)
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
                available: (x.stock_pro != null && x.stock_pro > 0)
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
