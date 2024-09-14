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
        <v-menu :close-on-content-click="false" v-model="basket_menu" offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              text
              aria-label="سبد خرید"
              class="elevation-0 d-flex justify-center align-center rounded"
              @click="basket_menu = true"
              v-bind="attrs"
              v-on="on"
              style="width: 36px; height: 36px"
              min-width="unset"
            >
              <v-badge
                :value="basket && basket.items.length != 0"
                :content="basket ? basket.items.length : ''"
                class="text-center"
                color="error"
                overlap
                left
                dot
                bordered
                transition="slide-x-transition"
              >
                <v-icon size="24" color="primary">mdi-cart-outline</v-icon>
              </v-badge>
            </v-btn>
          </template>
          <v-card
            v-if="basket && basket.items.length != 0"
            width="300"
            class="pa-1"
          >
            <v-col v-for="item in basket.items" :key="item.id" cols="12">
              <div
                v-if="item.type != 'mixture'"
                class="d-flex justify-space-between"
              >
                <div class="font_14">{{ item.product.name }}</div>
                <div>
                  <!-- <v-icon color="success" class="border-success"> add </v-icon> -->
                  <span class="mx-2 font_12 text--secondary">{{
                    item.text
                  }}</span>
                  <span
                    v-if="item.type == 'single_sell'"
                    class="font_12 text--secondary mr-3"
                    >{{ "تعداد : " + item.number }}</span
                  >
                  <span
                    v-if="item.type == 'whole_sell'"
                    class="font_12 text--secondary mr-3"
                    >{{
                      "مقدار : " +
                      item.number +
                      " " +
                      item.product.base_whole_sell_unit
                    }}</span
                  >
                  <!-- <v-icon color="error" class="border-error"> delete </v-icon> -->
                </div>
              </div>
              <div
                v-if="item.type == 'mixture'"
                class="d-flex justify-space-between"
              >
                <div class="font_14">{{ item.mixture_basket.description }}</div>
                <div class="font_12 flex-grow-1 px-3 text--secondary">
                  {{ item.text }}
                </div>
                <div>
                  <!-- <v-icon color="success" class="border-success"> add </v-icon> -->
                  <span class="mx-2 font_12 text--secondary">
                    {{
                      "تعداد/مقدار : " +
                      item.number +
                      " " +
                      item.mixture_basket.items[0].product.base_whole_sell_unit
                    }}
                  </span>
                  <!-- <v-icon color="error" class="border-error"> delete </v-icon> -->
                </div>
              </div>
            </v-col>

            <v-col cols="12" class="text-left">
              <amp-button
                text="تکمیل خرید"
                color="success"
                height="32"
                @click="goToBasket"
              ></amp-button>
              <amp-button
                text="بستن"
                color="error"
                height="32"
                @click="basket_menu = false"
              ></amp-button>
            </v-col>
          </v-card>
          <v-card v-else width="300" class="pa-1">
            <v-card-text class="text-center">سبد خرید خالی است</v-card-text>
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
        if (item.key == "main_setting")
          this.main_setting = JSON.parse(item.value);
      });
    },
    goToBasket() {
      this.$router.push("/basket");
      this.basket_menu = false;
    },
  },
};
</script>
