<template>
  <v-row class="align-center justify-center pt-5">
    <v-col cols="11" class="">
      <v-card
        class="app rounded-xl pa-3"
        hide-on-scroll
        color=""
        app
        v-if="!$vuetify.breakpoint.mdAndUp"
      >
        <v-row class="justify-space-between align-center">
          <v-btn @click="drawer = !drawer" icon aria-label="منو">
            <v-icon size="">mdi-menu</v-icon>
          </v-btn>
          <v-avatar size="65">
            <v-img contain src="/logo.png" />
          </v-avatar>

          <v-btn @click="drawer = !drawer" icon aria-label="منو">
            <v-icon size="">settings_phone</v-icon>
          </v-btn>
        </v-row>
        <v-navigation-drawer
          v-model="drawer"
          fixed
          app
          right
          temporary
          mobile-breakpoint="0"
          width="350"
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
          <v-list class="mt-4 pr-2">
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
                <v-list-item-content class="pr-2">
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
      </v-card>
    </v-col>
  </v-row>
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
            to: "/product",
          },
          {
            icon: "mdi-information-outline",
            title: "کیف",
            to: "/product",
          },
          {
            icon: "mdi-information-outline",
            title: "لباس",
            to: "/product",
          },
          {
            icon: "mdi-information-outline",
            title: "اکسسوری",
            to: "/product",
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
          to: "/profile",
        },
      ];
    } else {
      this.items = [{ icon: "mdi-login", title: "ورود/ثبت نام", to: "/auth/login" }];
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
        to: "/whole-sale",
      },
      {
        icon: "mdi-store-search",
        title: "شعب و نمایندگی ها",
        to: "/dealership",
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
