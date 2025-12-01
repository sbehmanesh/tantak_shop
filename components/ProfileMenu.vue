<template>
  <v-card outlined height="100%" class="rounded-lg py-4 mx-auto">
    <v-list class="">
      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <div class="text-right black--text" v-text="item.title"></div>
          </v-list-item-content>
        </template>

        <v-list-item
          :to="child.route"
          exact
          v-for="child in item.items"
          :key="child.title"
        >
          <v-list-item-content
            class="mr-n8 pointer"
            :class="{ test: child.hover }"
            @click="goTo(child.route)"
            @mouseenter="child.hover = true"
            @mouseleave="child.hover = false"
          >
            <div>
              <v-icon v-bind:class="{ coloronhover: child.hover }">
                {{ child.icon }}
              </v-icon>
              <span
                v-text="child.title"
                class="text-right font_14 pr-3"
                :class="{ coloronhover: child.hover }"
              ></span>
            </div>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content
            class="mr-n8 pointer"
            :class="{ test: hover }"
            @click="logouteDialog = true"
            @mouseenter="hover = true"
            @mouseleave="hover = false"
          >
            <div>
              <v-icon :class="{ coloronhover: hover }">logout</v-icon>
              <span class="text-right font_14 pr-3" :class="{ coloronhover: hover }"
                >خروج</span
              >
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>

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
  </v-card>
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
          title: "پیشخوان",
          route: "",
        },
      ],
      hover: false,
      logouteDialog: false,
      path: "",
      test3: "",
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
