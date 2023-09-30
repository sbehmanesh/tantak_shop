<template>
  <div>
    <v-card class="mt-4 border12" v-if="$vuetify.breakpoint.mdAndUp">
      <v-breadcrumbs :items="items">
        <template v-slot:divider>
          <v-icon>mdi-chevron-left</v-icon>
        </template>
      </v-breadcrumbs>
    </v-card>
    <v-row class="mt-5 white-back pa-5">
      <v-col cols="12" class="pa-md-8">
        <div>
          <span class="justify-start font_18">
            {{ category.tag }}
          </span>
        </div>
      </v-col>
    </v-row>
    <v-row v-if="data.length == 0" class="mt-5 white-back pa-5">
      <v-col cols="12" class="pa-md-8">
        <div>
          <span class="justify-start font_18"> نتیجه ای یافت نشد </span>
        </div>
      </v-col>
    </v-row>
    <v-row v-if="data.length != 0" class="mt-10 mt-md-10 white-back pa-2">
      <v-col class="col-12 col-md-12 d-flex flex-column">
        <v-row no-gutters class="pr-2 pr-sm-6">
          <v-col
            class="col-6 col-sm-4 col-md-3 pb-2 pb-sm-6"
            v-for="(item, index) in data"
            :key="index"
          >
            <TagCard
              v-if="item.target"
              :type="item.target_type"
              :data="item.target"
              width="auto"
            />
            <!-- <BlogCard 
            v-else
            :data="item.target" 
            width="auto" 
            /> -->
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
import BlogCard from "~/components/Card/BlogCard.vue";
import TagCard from "~/components/Card/TagCard.vue";

export default {
  components: { ProductCard, BannerCardSquare, BlogCard, TagCard },
  data: () => ({
    loading: false,
    title: "",
    data: [],
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
      tag: "",
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
            "گل قند,ادویه,عرقیجات,ادویه اصل,بهترین ادویه,زندگی سالم,ادویه خالص,",
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

    this.seo.name = this.$route.params.tag;
    this.seo.keywords.push(this.$route.params.tag);
    this.seo.description = this.$route.params.tag;
  },
  mounted() {
    this.category.tag = this.$route.params.tag;
    this.loadData();
  },

  watch: {
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
      let url = `/keyword?page=${this.current_page}&row_number=${16}`;
      let form = {
        filters: {
          value: this.category.tag,
          // target_type: "product"
        },
      };

      this.$reqApi(url, form)
        .then((res) => {
          this.loading = false;
          this.data = res.model.data;
          this.current_page = res.model.current_page;
          this.last_page = res.model.last_page;
        })
        .catch((error) => {
          this.loading = false;
        });
    },
  },
};
</script>