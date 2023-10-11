<template>
  <div>
    <v-list>
      <v-subheader>دسته بندی</v-subheader>
      <v-list-item-group v-model="active_category" color="primary">
        <v-list-item link value="all">
          <v-list-item-title>همه محصولات</v-list-item-title>
        </v-list-item>
        <v-list-item
          link
          :value="category.slug"
          v-for="category in single_categorys"
          :key="category.slug"
        >
          <v-list-item-title>{{ category.title }}</v-list-item-title>
        </v-list-item>
        <v-list-group
          no-action
          v-for="category in group_categorys"
          :key="category.slug"
        >
          <template v-slot:activator>
            <v-list-item link :value="category.slug">
              <v-list-item-title>{{ category.title }}</v-list-item-title>
            </v-list-item>
          </template>
          <v-list-item
            link
            :value="sub_category.slug"
            v-for="(sub_category, index) in category.children_categories"
            :key="index"
          >
            <v-list-item-title>{{ sub_category.title }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
export default {
  data: () => ({
    categorys: [],
    active_category: "all",
    single_categorys: [
    ],
    group_categorys: [
      {
        slug: "کفش",
        title: "کفش",
        children_categories: [
          {
            slug: "زنانه",
            title: "زنانه",
          },
          {
            slug: "زنانه",
            title: "مردانه",
          },
          {
            slug: "زنانه",
            title: "بچگانه",
          },
        ],
      },
      {
        slug: "کیف",
        title: "کیف",
        children_categories: [
          {
            slug: "زنانه",
            title: "زنانه",
          },
          {
            slug: "زنانه",
            title: "اسپرت",
          },
          {
            slug: "زنانه",
            title: "بچگانه",
          },
        ],
      },
      {
        slug: "لباس",
        title: "لباس",
        children_categories: [
          {
            slug: "زنانه",
            title: "زنانه",
          },
          {
            slug: "زنانه",
            title: "مردانه",
          },
          {
            slug: "زنانه",
            title: "اسپرت",
          },
        ],
      },
      {
        slug: "اکسسوری",
        title: "اکسسوری",
        children_categories: [
          {
            slug: "زنانه",
            title: "زنانه",
          },
          {
            slug: "زنانه",
            title: "مردانه",
          },
          {
            slug: "زنانه",
            title: "بچگانه",
          },
        ],
      },
    ],
  }),
  watch: {
    active_category(value) {
      let filter = this.$store.state.base.product_list.filter;
      if (!/^[0-9]*$/.test(value) && value != undefined) {
        if (value == "all") {
          this.$store.dispatch("base/setProductListFilter", {});
          // در صورتی که فیلتر عوض شود صفحه از اول شروع می شود
          this.$store.dispatch("base/setTableInfo", {
            key: this.$router.currentRoute.path,
            page: 1,
          });
        } else if (
          filter.categories_slug &&
          value == filter.categories_slug[0]
        ) {
          return;
        } else {
          this.setUrlQuery("categories_slug", [value]);
          // در صورتی که فیلتر عوض شود صفحه از اول شروع می شود
          this.$store.dispatch("base/setTableInfo", {
            key: this.$router.currentRoute.path,
            page: 1,
          });
        }
        this.$emit("closeDrawer");
      }
    },
    "$store.state.base.product_list.refresh"() {
      // this.setActiveCategory()
    },
  },
  mounted() {
    // this.getCategorys();
  },
  methods: {
    getCategorys() {
      let res = this.$store.state.base.landing_page.data;

      this.categorys = res.product_categories;
      this.findSingleCategorys(res.product_categories);
      this.findGroupCategorys(res.product_categories);
      this.setActiveCategory();
    },
    findSingleCategorys(categorys) {
      categorys.forEach((item) => {
        if (item.children_categories.length == 0)
          this.single_categorys.push(item);
      });
    },
    findGroupCategorys(categorys) {
      categorys.forEach((item) => {
        if (item.children_categories.length != 0)
          this.group_categorys.push(item);
      });
    },
    setUrlQuery(name, value) {
      let filter = this.$store.state.base.product_list.filter;
      if (!filter[name]) {
        filter[name] = value;
      } else {
        filter[name] = value;
      }
      this.$store.dispatch("base/setProductListFilter", filter);
    },
    setActiveCategory() {
      let filter = this.$store.state.base.product_list.filter;
      if (filter.categories_slug) {
        this.active_category = filter.categories_slug[0];
      } else {
        this.active_category = 1;
      }
    },
  },
};
</script>
