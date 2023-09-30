<template>
  <v-app-bar class="app"  hide-on-scroll  color="whited" app v-if="!$vuetify.breakpoint.mdAndUp">
    <!-- first row -->
    <v-row no-gutters class=" align-center px-sm-6">
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
      <div class="px-1 px-sm-3" style="max-width: 450px">
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
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-group v-for="link in group_link" :key="link.title">
          <template v-slot:activator>
            <v-list-item-action>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="link.title" />
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
              <v-list-item-title v-text="sub_link.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item>
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
        </v-list-item>
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
        icon: "mdi-information-outline",
        title: "درباره گل قند",
        children: [
          {
            icon: "mdi-information-outline",
            title: "قصه گل قند",
            to: "/our-story",
          },
          {
            icon: "mdi-information-outline",
            title: "تیم گل قند",
            to: "/our-team",
          },
          {
            icon: "mdi-information-outline",
            title: "نشونی گل قند",
            to: "/contact-us",
          },
          {
            icon: "mdi-information-outline",
            title: "کارگاه",
            to: "/workshop",
          },
        ],
      },
    ],
    miniVariant: false,
    right: true,
    rightDrawer: false,
  }),
  mounted() {
    this.setDamnooshsazLink();
    if (this.$store.state.auth.user) {
      this.items = [
        {
          icon: "mdi-account-circle-outline ",
          title: "پروفایل",
          to: "/profile",
        },
      ];
    } else {
      this.items = [{ icon: "mdi-login", title: "ورود/ثبت نام", to: "/auth" }];
    }

    this.items.push(
      {
        icon: "mdi-home-outline",
        title: "ایوان",
        to: "/",
      },
      {
        icon: "mdi-apps",
        title: "راسته بازار",
        to: "/product",
      },
      {
        icon: "mdi-file-outline",
        title: "نشریه",
        to: "/blog",
      },
      {
        icon: "mdi-file-outline",
        title: "پیگیری سفارشات",
        to: "/profile/orders/track",
      },
      {
        icon: "mdi-file-outline",
        title: "قوانین و مقررات",
        to: "/terms-and-conditions",
      }
    );
  },
  methods: {
    setDamnooshsazLink() {
      if (this.$store.state.base.mixture_type.length != 0) {
        let object = {
          icon: "mdi-information-outline",
          title: "ترکیب ساز",
          children: [],
        };

        this.$store.state.base.mixture_setting.settings.forEach((each) => {
          object.children.push({
            icon: "mdi-information-outline",
            title: each.name,
            to: "/damnooshsaz/" + each.slug,
          });
        });

        this.group_link.push(object);
      }
    },
  },
  components: { Search },
};
</script>
<style scoped>
.app {
  z-index: 100;
}
</style>