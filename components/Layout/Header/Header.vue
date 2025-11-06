<template>
  <v-row
    v-if="$vuetify.breakpoint.mdAndUp"
    no-gutters
    class="py-2 background2"
    style="position: relative; z-index: 1"
  >
    <!-- first row -->
    <v-row no-gutters class="col-12 align-center px-3 px-sm-6">
      <!-- logo -->
      <v-col class="flex-grow-0">
        <!-- <v-img
          v-if="main_setting"
          :src="$getImage(main_setting.logo)"
          width="50"
          height="50"
          alt="logo"
        ></v-img> -->
        <v-img src="/logo.png" width="200" class="pointer"></v-img>
      </v-col>
      <!-- logo end -->

      <!-- menu option -->
      <v-col>
        <v-row no-gutters class="align-center">
          <v-col class="flex-grow-0 font_16">
            <v-btn
              height="50"
              min-width="80"
              elevation="0"
              style="letter-spacing: unset"
              text
              nuxt
              :exact-path="false"
              to="/"
              class="mr-2"
            >
              صفحه اصلی
            </v-btn>
          </v-col>
          <v-col class="flex-grow-0">
            <v-menu offset-y open-on-hover transition="slide-y-transition">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  height="50"
                  min-width="80"
                  elevation="0"
                  style="letter-spacing: unset"
                  v-bind="attrs"
                  v-on="on"
                  text
                  nuxt
                  to="/product"
                >
                  فروشگاه
                </v-btn>
              </template>
              <!-- <v-row no-gutters class="flex-column background2">
                <v-btn
                  height="50"
                  min-width="100%"
                  elevation="0"
                  style="letter-spacing: unset"
                  text
                > کفش
                </v-btn>
                <v-btn
                  height="50"
                  min-width="100%"
                  elevation="0"
                  style="letter-spacing: unset"
                  text
                >
                  کیف
                </v-btn>
                <v-btn
                  height="50"
                  min-width="100%"
                  elevation="0"
                  style="letter-spacing: unset"
                  text
                >
                  لباس
                </v-btn>
                <v-btn
                  height="50"
                  min-width="100%"
                  elevation="0"
                  style="letter-spacing: unset"
                  text
                >
                  اکسسوری
                </v-btn>
              </v-row> -->
            </v-menu>
          </v-col>
          <v-col class="flex-grow-0">
            <v-btn
              height="50"
              min-width="80"
              elevation="0"
              style="letter-spacing: unset"
              color="primary"
              text
              to="/dealership"
            >
              شعب و نمایندگی ها
            </v-btn>
          </v-col>

          <v-col class="flex-grow-0">
            <v-btn
              height="50"
              min-width="80"
              elevation="0"
              style="letter-spacing: unset"
              color="primary"
              text
              to="/whole-sale"
            >
              فروش عمده و سازمانی
            </v-btn>
          </v-col>

          <v-col class="flex-grow-0">
            <v-btn
              height="50"
              min-width="80"
              elevation="0"
              style="letter-spacing: unset"
              text
              @click="$router.push('/track')"
            >
              پیگیری سفارشات
            </v-btn>
          </v-col>
          <!-- <v-col class="flex-grow-0">
            <v-btn
              height="50"
              min-width="80"
              elevation="0"
              style="letter-spacing: unset"
              text
              nuxt
              :to="!$store.state.auth.user ? '/auth' : '/profile'"
            >
              <span v-if="!$store.state.auth.user"> ورود/ثبت نام </span>
              <span v-else> پروفایل </span>
            </v-btn>
          </v-col> -->
        </v-row>
      </v-col>
      <!-- menu option end -->

      <!-- search -->
      <v-col class="flex-grow-0">
        <div class="px-1 px-sm-3" style="min-width: 400px">
          <Search />
        </div>
      </v-col>
      <!-- search end -->

      <!-- icons -->
      <v-col class="flex-grow-0 d-flex align-center">
        <!-- <v-btn
          text
          aria-label="تم رنگی"
          @click="$vuetify.theme.dark = !$vuetify.theme.dark"
          class="pa-0 elevation-0 d-flex justify-center align-center rounded"
          style="width: 36px; height: 36px"
          min-width="unset"
        >
          <v-icon v-if="!$vuetify.theme.dark" size="24"
            >mdi-brightness-3</v-icon
          >
          <v-icon v-if="$vuetify.theme.dark" size="24" color="primary"
            >mdi-theme-light-dark</v-icon
          >
        </v-btn> -->
        <v-btn
          v-if="!$store.state.auth.user"
          text
          aria-label="ورود"
          class="elevation-0 d-flex justify-center align-center rounded"
          style="width: 36px; height: 36px"
          min-width="unset"
          @click="$router.push('/auth/login')"
        >
          <v-icon size="26" color="primary">mdi-account-outline</v-icon>
        </v-btn>

        <v-menu v-if="$store.state.auth.user" offset-y :nudge-width="150">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              text
              aria-label="پروفایل"
              class="elevation-0 d-flex justify-center align-center rounded"
              style="width: 36px; height: 36px"
              min-width="unset"
              v-bind="attrs"
              v-on="on"
            >
              <v-img
                class="rounded-circle"
                :src="$getImage($store.state.auth.user.avatar)"
                width="30"
              ></v-img>
              <!-- <v-icon color="primary" size="24">mdi-account-outline</v-icon> -->
            </v-btn>
          </template>
          <v-card class="pa-4">
            <v-row class="pointer" @click="$router.push('/profile')">
              <img :src="$getImage($store.state.auth.user.avatar)" width="50" />
              <div class="pr-1 pt-3">
                {{
                  $store.state.auth.user.first_name
                    ? $store.state.auth.user.first_name
                    : $store.state.auth.user.username
                }}
                <v-icon class="mr-8">mdi-chevron-left</v-icon>
              </div>
            </v-row>
            <div class="mt-4 pointer" @click="$store.dispatch('auth/logout')">
              <v-icon>mdi-logout</v-icon>
              <span class="pr-3">خروج</span>
            </div>
          </v-card>
        </v-menu>
      </v-col>
      <!-- icons end -->
    </v-row>
    <!-- first row end -->
  </v-row>
</template>

<script>
import AmpButton from "~/components/Base/AmpButton.vue";
import Search from "~/components/Search/Search.vue";
export default {
  components: { AmpButton, Search },
  data() {
    return {
      basket_menu: false,
      basket: null,
      main_setting: null,
      loginDialog: false,
    };
  },
  watch: {
    "$store.state.base.basket.refresh"() {
      this.basket = this.$store.state.base.basket.data;
    },
  },
  mounted() {
    if (this.$store.state.base.basket.data) {
      this.basket = this.$store.state.base.basket.data;
    }
    if (this.$store.state.base.landing_page.data) {
      let res = this.$store.state.base.landing_page.data;
      this.setMainSetting(res.settings);
    }
  },
  methods: {
    setMainSetting(settings) {
      settings.forEach((item) => {
        if (item.key == "main_setting") this.main_setting = JSON.parse(item.value);
      });
    },
    goToBasket() {
      this.$router.push("/basket");
      this.basket_menu = false;
    },
  },
};
</script>
