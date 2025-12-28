<template>
  <div>
    <div v-if="isMobile" class="px-3 px-sm-6 mb-3">
      <v-btn
        block
        @click="toggleDrawer"
        min-width="40"
        class="whited elevation-1 d-flex justify-center align-center rounded pa-0"
      >
        <v-icon size="20" class="ml-2">mdi-filter</v-icon>
        <span>دسته بندی ها</span>
      </v-btn>
    </div>

    <v-navigation-drawer
      v-if="isMobile"
      v-model="drawer"
      temporary
      fixed
      right
      app
      width="100%"
      mobile-breakpoint="0"
      class="product-filter__drawer"
    >
      <div class="pa-4">
        <div class="d-flex justify-end mb-4">
          <v-btn
            @click="toggleDrawer"
            icon
            class="elevation-0 d-flex justify-center align-center"
            style="width: 48px; height: 48px"
          >
            <v-icon size="32">mdi-close</v-icon>
          </v-btn>
        </div>

        <div>
          <div v-if="loading" class="whited pa-3 border12">
            <v-skeleton-loader
              v-for="item in skeletonCount"
              :key="`drawer-skeleton-${item}`"
              type="paragraph"
              class="my-3"
            />
          </div>
          <div v-else class="whited pa-3 border12">
            <ProductFilterMenuItems
              :categories="categories"
              :selected-id="selectedId"
              @select="handleSelect"
            />
          </div>
        </div>
      </div>
    </v-navigation-drawer>

    <v-card
      v-else
      min-width="330"
      class="whited pa-3 border12 mr-md-4 contaienr_mnue"
    >
      <div v-if="loading">
        <v-skeleton-loader
          v-for="item in skeletonCount"
          :key="`desktop-skeleton-${item}`"
          type="paragraph"
          class="my-3"
        />
      </div>
      <ProductFilterMenuItems
        v-else
        :categories="categories"
        :selected-id="selectedId"
        @select="handleSelect"
      />
    </v-card>
  </div>
</template>

<script>
import ProductFilterMenuItems from "./ProductFilterMenuItems.vue";

export default {
  name: "ProductListFilter",
  components: { ProductFilterMenuItems },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    categories: {
      type: Array,
      default: () => [],
    },
    selectedId: {
      type: [Number, String, Object],
      default: null,
    },
  },
  data: () => ({
    drawer: false,
  }),
  computed: {
    isMobile() {
      return !this.$vuetify.breakpoint.mdAndUp;
    },
    skeletonCount() {
      return 7;
    },
  },
  watch: {
    isMobile(value) {
      if (!value) {
        this.drawer = false;
      }
    },
    selectedId() {
      this.$nextTick(() => {
        this.syncActiveGroups();
      });
    },
    categories: {
      handler() {
        this.$nextTick(() => {
          this.syncActiveGroups();
        });
      },
      deep: true,
    },
  },
  mounted() {
    this.syncActiveGroups();
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    handleSelect(item, clear) {
      this.$emit("select", item, clear);
      if (this.isMobile) {
        this.drawer = false;
      }
    },
    syncActiveGroups() {
      if (!Array.isArray(this.categories)) {
        return;
      }

      const selected = this.selectedId;

      const expandMatching = (node) => {
        if (!node || typeof node !== "object") {
          return false;
        }

        let childHasMatch = false;
        if (Array.isArray(node.sub_category) && node.sub_category.length) {
          childHasMatch = node.sub_category.some((child) => expandMatching(child));
        }

        const isCurrent = node.id === selected;
        const shouldOpen = Boolean(isCurrent || childHasMatch);
        this.$set(node, "active", shouldOpen);
        return shouldOpen;
      };

      this.categories?.forEach((node) => {
        expandMatching(node);
      });
    },
  },
};
</script>
