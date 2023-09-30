<template>
  <div :class="$vuetify.breakpoint.mdAndUp ? 'ma-6' : 'ma-3'">
    <v-col cols="12">
    <v-card class="mb-4 border12" v-if="$vuetify.breakpoint.mdAndUp">
      <v-breadcrumbs :items="items">
        <template v-slot:divider>
          <v-icon>mdi-chevron-left</v-icon>
        </template>
      </v-breadcrumbs>
    </v-card>
    <v-card class="py-5 border12" :class="$vuetify.breakpoint.mdAndUp ? 'mt-8' : ''">
      <v-row no-gutters class="pr-2 pr-sm-6" v-if="!loading">
        <v-col
          class="col-6 col-sm-4 col-md-3 pb-2 pb-sm-6"
          v-for="(item, index) in blogs"
          :key="index"
        >
          <BlogCard :data="item" width="auto" />
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
    </v-card>
  </v-col>
  </div>
</template>

<script>
import BlogCard from "~/components/Card/BlogCard.vue";
import Loading from "~/components/Loading/Loading.vue";
export default {
  components: { BlogCard, Loading },
  data: () => ({
    title: "نشریه",
    current_page: 1,
    last_page: 1,
    blogs: null,
    loading: false,
    items: [
      {
        text: "خانه",
        disabled: false,
        to: "/",
      },
      {
        text: "نشریه",
        disabled: true,
        to: "",
      },
    ],
  }),
  watch: {
    current_page() {
      this.getBlogs();
    },
    loading() {
      this.$store.dispatch("setTopLoader", this.loading);
      if (!this.loading) {
        this.$scrollToTop();
      }
    },
  },
  mounted() {
    this.$store.dispatch("setPageTitle", this.title);
    this.getBlogs();
  },
  methods: {
    getBlogs() {
      this.loading = true;
      this.$reqApi("/blog-post?page=" + this.current_page, {
        orderBy: "DESC",
        sortBy: "publish_at",
      }).then((res) => {
        this.blogs = res.model.data;
        this.current_page = res.model.current_page;
        this.last_page = res.model.last_page;
        this.loading = false;
      });
    },
  },
};
</script>
