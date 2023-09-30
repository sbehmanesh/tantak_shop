<template>
  <div>
    <div v-if="blog && !loading" class="background2 px-6 ma-md-6">
      <v-row no-gutters>
        <v-col class="col-12 d-flex justify-center" style="max-height: 50vh">
          <v-img contain :src="$getImage(blog.main_picture_path)" class="mt-4"></v-img>
        </v-col>
        <v-col class="col-12 flex-wrap d-flex justify-space-between align-center mt-6">
          <div >
            <h1 class="font_24 font-weight-regular">{{ blog.title }}</h1>
          </div>
          <div class="d-flex">
            <span class="px-2">
              {{ blog.comment_count }}
              <v-icon size="18">mdi-message-reply</v-icon>
            </span>
            <span>{{ $jmoment(blog.publish_at).format("jYYYY/jMM/jDD") }}</span>
          </div>
        </v-col>
        <v-col
          class="hard-text-style col-12 mt-2 text-justify text--secondary"
          v-html="blog.content"
        ></v-col>
        <v-col v-if="blog.keywords.length != 0" class="col-12 mt-4">
          <v-chip-group column>
            <v-icon color="accent" class="ml-1" large
              >mdi-tag-multiple-outline</v-icon
            >
            <v-chip
              v-for="item in blog.keywords"
              :key="item.id"
              nuxt
              :to="'/tag/'+item.value"
              color="secondary"
              >{{ item.value }}</v-chip
            >
          </v-chip-group>
        </v-col>
        <v-col class="col-12 mt-4">
          <v-divider></v-divider>
          <CommentSection
            :target_id="blog.id"
            target_type="post"
            :comment="blog.comments"
          />
        </v-col>
      </v-row>
    </div>
    <div v-if="blog && !loading">
      <blog-slider v-if="similar_posts.length != 0" :posts="similar_posts" title="مقاله های مشابه" :url="null"/>
      <product-slider v-if="similar_products.length != 0" :products="similar_products" title="محصولات مرتبط" :url="null"/>
    </div>
  </div>
</template>

<script>
import CommentSection from "~/components/Comment/CommentSection.vue";
import BlogSlider from '~/components/Slider/BlogSlider.vue';
import ProductSlider from '~/components/Slider/ProductSlider.vue';
export default {
  components: { CommentSection, BlogSlider, ProductSlider },
  data: () => ({
    title: "بلاگ",
    blog_slug: null,
    loading: false,
    blog: null,
    similar_posts: null,
    similar_products: null,
    decoded_uri: null,
    seo: {
      name: "",
      description: "",
      keywords: [],
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

  watch: {
    loading() {
      this.$store.dispatch("setTopLoader", this.loading);
    },
  },
  created() {
    this.loading = true;

    try {
      var encoded_uri = this.$route.path;
      this.decoded_uri = decodeURI(encoded_uri);
    } catch (exception) {}
    this.$reqApi("/blog-post/show", { slug: this.$route.params.slug }).then(
      (res) => {
        this.blog = res.data;
        this.similar_posts = res.similar_posts;
        this.similar_products = res.similar_products;
        this.seo.name = res.data.title;
        res.data.keywords.forEach((each) => {
          this.seo.keywords.push(each.value);
        });
        if (res.data.seo_description) {
          this.seo.description = res.data.seo_description;
        } else {
          this.seo.description = res.data.content.replace(/(<([^>]+)>)/gi, "");
        }
        this.loading = false;
      }
    );
  },
  mounted() {
    this.$store.dispatch("setPageTitle", this.title);
    
  },
  computed: {
    image() {
      if (this.blog.main_picture_path)
        return this.$getImage(this.blog.main_picture_path);
      return "";
    },
  },
  methods: {
    getBlogdetails() {
      this.$reqApi("/blog-post/show", { slug: this.blog_slug }).then((res) => {
        this.blog = res.data;
      });
    },
  },
};
</script>

<style scoped>
.hard-text-style{
  word-wrap: break-word !important;
}

</style>