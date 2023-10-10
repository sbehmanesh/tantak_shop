<template>
  <v-app-bar
    class="app"
    hide-on-scroll
    color="whited"
    app
    v-if="!$vuetify.breakpoint.mdAndUp"
  >
    <!-- first row -->
    <v-row no-gutters class="justify-center align-center px-sm-6">
      <!-- logo -->
      <!-- <v-col class="flex-grow-0"> -->
      <v-btn
        @click="drawer = !drawer"
        min-width="40"
        text
        aria-label="منو"
        class="elevation-0 d-flex justify-center align-center rounded pa-0"
        style="width: 48px; height: 48px"
      >
        <v-icon size="32">mdi-menu</v-icon>
      </v-btn>
      <!-- </v-col> -->
      <!-- logo end -->
      <!-- search -->
      <!-- <v-col> -->
      <div class="px-1 px-sm-3" style="width: 280px">
        <Search />
      </div>
      <!-- </v-col> -->
      <!-- search end -->
    </v-row>
    <!-- first row end -->
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
      right
      temporary
      mobile-breakpoint="0"
      width="280"
      class="pt-4"
    >
      <div class="d-flex justify-center align-center">
        <v-col class="flex-grow-0">
          <v-img
            v-if="$store.state.base.main_setting"
            :src="$getImage($store.state.base.main_setting.logo)"
            width="60"
            height="60"
          ></v-img>
        </v-col>
      </div>
      <v-list class="mt-4">
        <v-list-group v-for="link in group_link" :key="link.title">
          <template v-slot:activator>
            <v-list-item-action>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ link.title }}</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            :to="sub_link.to"
            link
            v-for="sub_link in link.children"
            :key="sub_link.title"
          >
            <!-- <v-list-item-action>
              <v-icon>{{ sub_link.icon }}</v-icon>
            </v-list-item-action> -->
            <v-list-item-content>
              <v-list-item-title>{{ sub_link.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-theme-light-dark</v-icon>
          </v-list-item-action>
          <v-list-item-title>حالت تاریک</v-list-item-title>
          <v-list-item-action>
            <v-switch
              dense
              class="mr-n3"
              v-model="$vuetify.theme.dark"
              flat
            ></v-switch>
          </v-list-item-action>
        </v-list-item> -->
      </v-list>
    </v-navigation-drawer>
  </v-app-bar>
</template>

<script>
import Search from "~/components/Search/Search.vue";
export default {
  data: () => ({
    clipped: true,
    drawer: false,
    fixed: false,
    main_setting: null,
    items: [],
    group_link: [
      {
        icon: "mdi-store",
        title: "فروشگاه",
        children: [
          {
            icon: "mdi-information-outline",
            title: "کفش",
            to: "",
          },
          {
            icon: "mdi-information-outline",
            title: "کیف",
            to: "",
          },
          {
            icon: "mdi-information-outline",
            title: "لباس",
            to: "",
          },
          {
            icon: "mdi-information-outline",
            title: "اکسسوری",
            to: "",
          },
        ],
      },
    ],
    miniVariant: false,
    right: true,
    rightDrawer: false,
  }),
  mounted() {
    if (this.$store.state.auth.user) {
      this.items = [
        {
          icon: "mdi-account-circle-outline ",
          title: "پروفایل",
        },
      ];
    } else {
      this.items = [{ icon: "mdi-login", title: "ورود/ثبت نام", to: "/auth" }];
    }

    this.items.push(
      {
        icon: "mdi-home-outline",
        title: "صفحه اصلی",
        to: "/",
      },
      {
        icon: "mdi-shoe-print",
        title: "فروش عمده و سازمانی",
        to: "",
      },
      {
        icon: "mdi-store-search",
        title: "شعب و نمایندگی ها",
        to: "",
      },
      {
        icon: "mdi-shopping-search",
        title: "پیگیری سفارشات",
        to: "/track",
      }
    );
  },
  methods: {},
  components: { Search },
};
</script>
<style scoped>
.app {
  z-index: 100;
}
</style>
