<template>
  <div>
    <v-expansion-panels v-model="panel">
      <v-expansion-panel>
        <v-expansion-panel-header> منو </v-expansion-panel-header>

        <v-expansion-panel-content>
          <v-col class="py-1 pr-0" cols="12" v-for="item in items" :key="item.title">
            <v-col
              class="py-1 pr-0"
              cols="12"
              v-for="child in item.items"
              :key="child.title"
            >
              <v-btn
                :color="child.route == select ? 'primary' : 'grey darken-2'"
                @click="goTo(child.route)"
                text
              >
                <v-icon v-bind:class="{ coloronhover: child.hover }">
                  {{ child.icon }}
                </v-icon>
                <span
                  v-text="child.title"
                  class="text-right font_14 pr-3"
                  :class="{ coloronhover: child.hover }"
                ></span>
              </v-btn>
            </v-col>
          </v-col>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-dialog v-model="logouteDialog" :width="$vuetify.breakpoint.mdAndUp ? 380 : 470">
      <v-card class="pa-5">
        <span class="mb-2 font_xxxl font_bold"> میخواهید خارج شوید؟ </span>
        <v-row class="pa-3">
          <v-col cols="6">
            <amp-button
              text="خروج"
              class="w-max"
              color="error"
              @click="logout()"
              :disabled="loading"
            />
          </v-col>
          <v-col cols="6">
            <amp-button
              text="انصراف"
              color="secondary"
              class="w-max"
              @click="logouteDialog = false"
              :disabled="loading"
            />
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      items: [
        {
          active: true,
          items: [],
          title: "منو",
          route: "",
        },
      ],
      hover: false,
      logouteDialog: false,
      path: "",
      test3: "",
      select: "",
      panel: [0, 1],
    };
  },
  // computed: {
  //   classObject: function (child) {
  //     return {
  //       'test': this.hover && child.route == path,
  //       // "text-danger": this.error && this.error.type === "fatal",
  //     };
  //   },
  // },
  mounted() {
    this.loadMenu();
    this.getRoute();
  },
  methods: {
    // classObject(value) {
    //   return {
    //     'test': value.route == this.path,
    //     'test2': value.hover
    //   }
    // },
    loadMenu() {
      let user_menu = [
        {
          title: "پروفایل",
          icon: "account_circle",
          route: "/profile",
          hover: false,
        },
        // {
        //   title: "سفارش ها",
        //   icon: "local_mall",
        //   route: "/profile/orders",
        //   hover: false,
        // },
        // {
        //   title: "دیدگاه ها",
        //   icon: "comment",
        //   route: "/profile/comments",
        //   hover: false,
        // },
        {
          title: "سفارش ها",
          icon: "local_mall",
          route: "/profile/orders",
          hover: false,
        },
        {
          title: "دیدگاه ها",
          icon: "comment",
          route: "/profile/comments",
        },
        {
          title: "تیکت ها",
          icon: "help",
          route: "/profile/tickets",
          hover: false,
        },
        {
          title: "علاقه مندی ها",
          icon: "mdi-heart",
          route: "/profile/favorites",
          hover: false,
        },
        {
          title: "آدرس های من",
          icon: "share_location",
          route: "/profile/my-address",
          hover: false,
        },
        {
          title: "کیف پول من",
          icon: "account_balance_wallet",
          route: "/profile/my-wallet",
          hover: false,
        },
        {
          title: "پرداخت ها",
          icon: "account_balance",
          route: "/profile/my-payment",
          hover: false,
        },
      ];
      this.items[0].items = user_menu;
    },
    goTo(value) {
      this.$router.push(value);
      this.select = value;
      this.panel = 1;
    },
    logout() {
      this.loading = true;
      this.$store.dispatch("auth/logout");
    },
    getRoute() {
      for (let i = 0; i < this.items[0].items.length; i++) {
        const route = this.items[0].items[i].route;
        if (this.$route.fullPath == route) {
          this.path = route;
        }
      }
    },
  },
};
</script>
<style scoped>
.coloronhover {
  /* color: var(--color-hover) !important; */
  color: #2d58ae;
}
.test::before {
  content: "";
  position: absolute;
  right: 0;
  width: 4px;
  height: 46px;
  background-color: #2d58ae !important;
}
.test2::before {
  content: "";
  position: absolute;
  right: 0;
  width: 4px;
  height: 46px;
  background-color: #2d58ae !important;
}
</style>
