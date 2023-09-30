<template>
  <div>
    <div class="d-flex flex-wrap justify-center">
      <div
        class="col-6 col-sm-3"
        @click="goToCategoryPage(banner)"
        style="cursor: pointer"
        v-for="(banner, index) in banners"
        :key="index"
      >
        <v-img
          :aspect-ratio="1"
          :src="$getImage(banner.main_pic_path)"
          :alt="banner.alt"
        >
          <!-- bottom img -->
          <div
            class="d-flex align-center justify-start"
            style="position: absolute; width: 100%; bottom: 0"
          >
            <div class="whited py-1 px-3 mt-3 font_14" style="opacity: 65%">
              {{ banner.title }}
            </div>
          </div>
          <!-- bottom img end -->
        </v-img>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    banners: {
      type: Array,
    },
  },
  data: () => ({
    banner_items: [],
  }),
  methods: {
    goToCategoryPage(item) {
      let slug = item.id;
      if (item.slug) {
        slug = item.slug;
      }
      this.$router.push("/product-category/" + slug);
    },
  },
};
</script>