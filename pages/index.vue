<template>
  <div>
    <!-- loading -->
    <!-- <Loading v-if="loading"/> -->
    <!-- loading end -->

    <v-row :no-gutters="$vuetify.breakpoint.smAndDown">
      <v-col cols="1"></v-col>
      <v-col cols="10">
        <!-- slider -->
        <MainSlider :slider_item="this.main_slider" />
        <!-- slider end -->
      </v-col> 
      <v-col cols="1"></v-col>
    </v-row>

    <!-- product slider -->
    <ProductSlider
      v-if="discounted_products && discounted_products.length != 0"
      :infinite="false"
      :products="discounted_products"
      title="محصولات شگفتانه"
    />
    <!-- product slider end -->

    <!-- banner circle mobile -->
    <!-- <div v-if="$vuetify.breakpoint.xs" class="mt-5 mt-md-10">
        <BannerCardCircle :banners="product_categories" />
      </div> -->
    <!-- banner circle mobile end -->

    <!-- product slider -->
    <ProductSlider
      v-if="most_sold_products"
      :products="most_sold_products"
      title="محصولات پرفروش"
      url="/product"
    />
    <!-- product slider end -->

    <FeaturesCards />

    <!-- banner tabs -->
    <!-- <BannerTabs :tabs="product_categories" /> -->
    <!-- banner tabs end -->

    <!-- product slider -->
    <ProductSlider
      v-if="new_products"
      :products="new_products"
      title="محصولات جدید تن تاک"
      url="/product"
    />
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
    main_slider: [
      {
        image: "/image/slider1.png",
      },
      {
        image: "/image/slider2.png",
      },
    ],
    new_products: [
      {
        main_picture_path: "/image/products/11.png",
        name: "کفش راحتی مردانه بهپوش",
        price: "443000",
      },
      {
        main_picture_path: "/image/products/12.jpg",
        name: "کتانی مردانه چابک",
        price: "349000",
      },
      {
        main_picture_path: "/image/products/13.jpg",
        name: "کفش مردانه ارسام",
        price: "1090000",
      },
      {
        main_picture_path: "/image/products/14.png",
        name: "کتانی زنانه دیزل",
        price: "790000",
      },
      {
        main_picture_path: "/image/products/15.png",
        name: "کتانی راحتی مردانه اورین",
        price: "349000",
      },
      {
        main_picture_path: "/image/products/16.jpg",
        name: "کفش راحتی زنانه آراز",
        price: "663000",
      },
    ],
    discounted_products: [
      {
        main_picture_path: "/image/products/1.jpg",
        name: "کتانی زنانه دیزل",
        before_price: "890000",
        price: "790000",
      },
      {
        main_picture_path: "/image/products/2.jpg",
        name: "کالج جیر مردانه اریک",
        before_price: "790000",
        price: "690000",
      },
      {
        main_picture_path: "/image/products/3.jpg",
        name: "کفش راحتی مردانه والنتی",
        before_price: "890000",
        price: "800000",
      },
      {
        main_picture_path: "/image/products/4.jpg",
        name: "کتانی مردانه اسیکس 23",
        before_price: "400000",
        price: "349000",
      },
      {
        main_picture_path: "/image/products/5.png",
        name: "کتانی مردانه ایر فورس",
        before_price: "700000",
        price: "649000",
      },
      {
        main_picture_path: "/image/products/6.jpg",
        name: "کتانی زنانه دنیز",
        before_price: "890000",
        price: "800000",
      },
    ],
    most_sold_products: [
      {
        main_picture_path: "/image/products/11.png",
        name: "کفش راحتی مردانه بهپوش",
        price: "443000",
      },
      {
        main_picture_path: "/image/products/12.jpg",
        name: "کتانی مردانه چابک",
        price: "349000",
      },
      {
        main_picture_path: "/image/products/13.jpg",
        name: "کفش مردانه ارسام",
        price: "1090000",
      },
      {
        main_picture_path: "/image/products/14.png",
        name: "کتانی زنانه دیزل",
        price: "790000",
      },
      {
        main_picture_path: "/image/products/15.png",
        name: "کتانی راحتی مردانه اورین",
        price: "349000",
      },
      {
        main_picture_path: "/image/products/16.jpg",
        name: "کفش راحتی زنانه آراز",
        price: "663000",
      },
    ],
    decoded_uri: null,
    seo: {
      name: "",
      description: "",
      keywords: [],
    },
    loading: false,
    // most_sold_products: null,
    product_categories: null,
    // discounted_products: null,
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
  mounted() {
    this.$store.dispatch("setPageTitle", this.title);
    // this.$store.dispatch("setting/getMainSlider");
    if (this.$store.state.base.landing_page.data) {
      this.getLandingPageData();
    }
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
  },
};
</script>
