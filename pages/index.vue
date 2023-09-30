<template>
  <div>
    <!-- loading -->
    <!-- <Loading v-if="loading"/> -->
    <!-- loading end -->
    <div>text
      <!-- slider -->
      <!-- <MainSlider :slider_item="this.$store.state.base.main_slider" /> -->
      <!-- slider end -->

      <!-- product slider -->
      <!-- <ProductSlider
        v-if="(discounted_products && discounted_products.length != 0)"
        :infinite="false" 
        :products="discounted_products"
        title="تخفیفات شگفت انگیز"
      /> -->
      <!-- product slider end -->

      <!-- banner circle mobile -->
      <!-- <div v-if="$vuetify.breakpoint.xs" class="mt-5 mt-md-10">
        <BannerCardCircle :banners="product_categories" />
      </div> -->
      <!-- banner circle mobile end -->

      <!-- product slider -->
      <!-- <ProductSlider
        v-if="most_sold_products"
        :products="most_sold_products"
        title="محصولات پرفروش"
        url="/product"
      /> -->
      <!-- product slider end -->

      <!-- banner tabs -->
      <!-- <BannerTabs :tabs="product_categories" /> -->
      <!-- banner tabs end -->

      <!-- product slider -->
      <!-- <ProductSlider
        v-if="new_products"
        :products="new_products"
        title="محصولات جدید گل قند"
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
  </div>
</template>

<script>
import MainSlider from "~/components/Slider/MainSlider.vue";
import ProductSlider from "~/components/Slider/ProductSlider.vue";
import BlogSlider from "~/components/Slider/BlogSlider.vue";
import BannerTabs from "~/components/Tab/BannerTabs.vue";
import BannerCardCircle from "~/components/Card/BannerCardCircle.vue";
export default {
  components: {
    MainSlider,
    ProductSlider,
    BlogSlider,
    BannerTabs,
    BannerCardCircle,
  },
  data: () => ({
    title: "ایوان",
    decoded_uri: null,
    seo: {
      name: "",
      description: "",
      keywords: [],
    },
    loading: false,
    most_sold_products: null,
    product_categories: null,
    discounted_products: null,
    new_products: null,
    new_posts: null,
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
  //           "گل قند,ادویه,عرقیجات,ادویه اصل,بهترین ادویه,زندگی سالم,ادویه خالص,",
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
  // mounted() {
  //   this.$store.dispatch("setPageTitle", this.title);
  //   if (this.$store.state.base.landing_page.data) {
  //     this.getLandingPageData();
  //   }
  // },
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
  },
};
</script>
