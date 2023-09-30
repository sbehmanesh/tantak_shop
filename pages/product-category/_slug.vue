<template>
  <div>
    <v-card class="mt-4 border12" v-if="$vuetify.breakpoint.mdAndUp">
      <v-breadcrumbs :items="items">
        <template v-slot:divider>
          <v-icon>mdi-chevron-left</v-icon>
        </template>
      </v-breadcrumbs>
    </v-card>
    <!-- loading -->
    <!-- <Loading v-if="loading" /> -->
    <!-- loading end -->
    <v-row class="mt-5 white-back pa-5" style="min-h" v-if="!loading">
      <v-col  cols="12" md="3">
        <v-img
          class="mx-auto"
          :aspect-ratio="1"
          :src="$getImage(category.main_pic_path)"
          width="250"
        >
          <!-- bottom img -->
          <div
            class="d-flex align-center justify-start"
            style="position: absolute; width: 100%; bottom: 0"
          >
            <div  class=" whited py-1 px-3 mt-3 font_14" style="opacity: 65%">
              {{ category.title }}
            </div>
          </div>
          <!-- bottom img end -->
        </v-img>
      </v-col>

      <v-col cols="12" md="9" class="pa-8">
        <div>
          <span class="justify-start font_18">
            <h1 class="font_18 font-weight-regular">
              {{ category.title }}
            </h1>
          </span>
        </div>
        <p class="font_14 mt-3">
          {{ category.seo_description }}
        </p>
      </v-col>
    </v-row>
    <v-row class="mt-10 mt-md-10 white-back pa-2">
      <v-col class="col-12 col-md-12 d-flex flex-column">
        <v-row no-gutters class="pr-2 pr-sm-6">
          <v-col
            class="col-6 col-sm-4 col-md-3 pb-2 pb-sm-6"
            v-for="(product, index) in products"
            :key="index"
          >
            <ProductCard :data="product" width="auto" />
          </v-col>
        </v-row>
        <div class="text-center">
          <v-pagination
            v-if="last_page != 1"
            v-model="current_page"
            :length="last_page"
            class=""
          ></v-pagination>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ProductCard from "@/components/Card/ProductCard.vue";
import BannerCardSquare from "@/components/Card/BannerCardSquare.vue";

export default {
  components: { ProductCard, BannerCardSquare },
  data: () => ({
    loading: false,
    title: "",
    products: [],
    decoded_uri: null,
    seo: {
      name: "",
      description: "",
      keywords: [],
    },
    items: [
      {
        text: "خانه",
        disabled: false,
        to: "/",
      },
      {
        text: "دسته بندی محصولات",
        disabled: true,
        to: "",
      },
      {
        text: "ادویه ساده",
        disabled: true,
        to: "",
      },
    ],
    current_page: 1,
    last_page: 1,
    category: {
      id: "",
      title: "",
      slug: "",
      seo_description: "",
      main_pic_path: "",
    },
  }),
  head() {
    return {
      meta: [
        {
          name: "title",
          content: this.seo.name,
        },
        {
          name: "og:title",
          content: this.seo.name,
        },
        {
          name: "keywords",
          content: this.seo.keywords,
        },
        {
          name: "description",
          content: this.seo.description,
        },
        {
          name: "og:description",
          content:
            "این طبیعت توست." +
            "|" +
            "تن تاک,ادویه,عرقیجات,ادویه اصل,بهترین ادویه,زندگی سالم,ادویه خالص,",
        },
        {
          name: "url",
          content: "https://goolghand.com" + this.decoded_uri,
        },
        {
          name: "og:url",
          content: "https://goolghand.com" + this.decoded_uri,
        },
        // {
        //   name: 'article:published_time',
        //   content: this.business.created_at,
        // },
        // {
        //   name: 'article:modified_time',
        //   content: this.business.modified_time,
        // },
      ],
      // link: [
      //   { rel: 'canonical', href: 'https://rakebi.com' + this.$route.path },
      // ],
      script: [{ type: "application/ld+json", json: this.structuredData }],
    };
  },
  created() {
    try {
      var encoded_uri = this.$route.path;
      this.decoded_uri = decodeURI(encoded_uri);
    } catch (exception) {}

    this.seo.name = this.$route.params.slug;
    this.seo.keywords.push(this.$route.params.slug);
    this.seo.description = this.$route.params.slug;
  },
  mounted() {
    this.category.slug = this.$route.params.slug;
    this.checkPage();

    // this.loadData();
  },

  watch: {
    current_page() {
      this.loadData();

      this.$scrollToTop();
      // بردن صفحه جاری به استور
      this.$store.dispatch("base/setTableInfo", {
        key: this.$router.currentRoute.path,
        page: this.current_page,
      });
    },
    loading() {
      this.$store.dispatch("setTopLoader", this.loading);

      if (!this.loading) {
        this.$scrollToTop();
      }
    },
  },
  methods: {
    loadData() {
      this.loading = true;
      let url = `/product?page=${this.current_page}&row_number=${16}`;
      let form = {
        with_category: true,
        filters: { categories_slug: [this.category.slug] },
      };

      this.$reqApi(url, form)
        .then((res) => {
          this.loading = false;
          this.products = res.model.data;
          this.current_page = res.model.current_page;
          this.last_page = res.model.last_page;
        })
        .catch((error) => {
          this.loading = false;
          this.$router.push("/");
        });

      this.$reqApi("/product-category/show", { slug: this.category.slug })
        .then((res) => {
          this.category.seo_description = res.data.seo_description;
          this.category.title = res.data.title;
          this.title = "دسته بندی " + this.category.title;
          this.$store.dispatch("setPageTitle", this.title);

          this.category.main_pic_path = res.data.main_pic_path;
          this.loading = false;
        })
        .catch((error) => {
          this.$router.push("/");
          this.loading = false;
        });
    },
    checkPage() {
      let stored_page = this.$store.state.base.table_info;

      if (stored_page.key) {
        let current_path = this.$router.currentRoute.path;
        if (
          current_path == stored_page.key &&
          this.current_page != stored_page.page
        ) {
          this.current_page = stored_page.page;
          return;
        }
      }
      this.loadData();
    },
  },
};
</script>