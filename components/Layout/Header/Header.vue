<template>
  <v-row
    v-if="$vuetify.breakpoint.mdAndUp"
    no-gutters
    class="py-2 align-center background2"
    style="position: relative; z-index: 1"
  >
    <v-col cols="12" class="pa-0">
      <v-row no-gutters class="align-center px-3">
        <!-- logo -->
        <v-col class="flex-grow-0 pa-0">
          <!-- <v-img
          v-if="main_setting"
          :src="$getImage(main_setting.logo)"
          width="50"
          height="50"
          alt="logo"
        ></v-img> -->
          <v-img contain src="/logo.png" width="110" class="pointer"></v-img>
        </v-col>

        <v-col cols="7" class="flex-grow-0 pa-0 mr-6">
          <Search />
        </v-col>
        <v-spacer></v-spacer>

        <!-- search end -->

        <!-- icons -->
        <v-col class="flex-grow-0 pa-0 d-flex align-center">
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
            small
            v-if="!$store.state.auth.user"
            @click="$router.push('/auth/login')"
            outlined
            color="grey"
          >
            <v-icon color="grey"> account_circle</v-icon>
            ورود / ثبت نام
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
          <v-menu :close-on-content-click="false" offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                color="primary"
                icon
                @click="mybaskets"
                v-bind="attrs"
                v-on="on"
                style="width: 36px; height: 36px"
                min-width="unset"
              >
                <v-icon size="24" color="primary">shopping_basket</v-icon>
              </v-btn>
            </template>
          </v-menu>
        </v-col>
        <!-- icons end -->
      </v-row>
    </v-col>
    <v-col cols="12" class="py-0">
      <v-row class="align-center pr-5 pb-1">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              :disabled="disabeld_menu_filter"
              :color="disabeld_menu_filter ? 'primary' : 'grey darken-3'"
              text
              v-bind="attrs"
              v-on="on"
            >
              <v-icon small class="ml-1">list</v-icon>
              <small><b> دسته بندی </b> </small>
            </v-btn>
          </template>
          <v-card min-width="950px" class="pa-3">
            <v-row class="">
              <v-col cols="2" v-for="(item, index) in group_categorys" :key="index">
                <v-btn class="rounded-0" small text>
                  <div
                    style="border-right: 4px solid blue !important ; height: 16px"
                  ></div>
                  <small class="mr-1">
                    <b>
                      {{ item.title }}
                    </b>
                  </small>
                </v-btn>
                <div v-for="(x, i) in item.sub_category">
                  <v-btn @click="gotoCategory(x)" :key="i" small text>
                    <small class="grey--text">
                      {{ x.title }}
                    </small>
                    <v-icon
                      v-if="x?.sub_category?.length > 0"
                      class="mr-1"
                      size="14"
                      color="grey"
                    >
                      arrow_left</v-icon
                    >
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-menu>
        <v-btn
          :color="selected_menu == x.value ? 'primary' : 'grey darken-3'"
          v-for="(x, i) in menu_item"
          :key="i"
          @click="menuActions(x.value)"
          text
          class="mx-2"
        >
          <v-icon small class="ml-1"> {{ x.icon }}</v-icon>
          <small
            ><b>
              {{ x.text }}
            </b>
          </small>
        </v-btn>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import AmpButton from "~/components/Base/AmpButton.vue";
import Search from "~/components/Search/Search.vue";
export default {
  components: { AmpButton, Search },
  data() {
    return {
      menu_item: [
        { text: "صفحه اصلی", value: "/", icon: "home" },
        { text: "پیگیری سفارش", value: "/track", icon: "forward_to_inbox" },
        { text: "فروشگاه", value: "/product", icon: "shopping_bag" },
        { text: " فروش عمده و سازمانی", value: "/whole-sale", icon: "receipt" },
      ],
      selected_menu: "/",
      basket_menu: false,
      disabeld_menu_filter: false,
      basket: null,
      main_setting: null,
      loginDialog: false,
      group_categorys: [],
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
    this.loadCategory();
  },
  methods: {
    setMainSetting(settings) {
      settings?.forEach((item) => {
        if (item.key == "main_setting") this.main_setting = JSON.parse(item.value);
      });
    },
    goToBasket() {
      this.$router.push("/basket");
      this.basket_menu = false;
    },
    menuActions(value) {
      this.$router.push(value);
      this.disabeld_menu_filter = false;
      this.selected_menu = value;
    },
    loadCategory() {
      this.$reqApi("/shop/category", {
        row_number: 30000,
      })
        .then((res) => {
          res.model.data.map((x) => {
            if (x.parent_id == null) {
              this.group_categorys.push({
                slug: x.slug,
                title: x.name,
                id: x.id,
                sub_category: this.findParentCategory(res.model.data, x.id),
              });
            }
          });
          console.log("group_categorys >>", this.group_categorys);
        })
        .catch((err) => {
          return err;
        });
    },
    findParentCategory(data, id) {
      if (id) {
        let children = [];
        data?.forEach((element) => {
          if (element.parent_id == id) {
            children.push({
              title: element.name,
              slug: element.slug,
              id: element.id,
              parent_id: element.parent_id,
              show: false,
              sub_category: this.findParentCategory(data, element.id),
            });
          }
        });
        return children;
      }
    },
    gotoCategory(item) {
      this.$router.push(`/product?filter_id=${item.id}`);
      this.disabeld_menu_filter = true;
      this.selected_menu = "";
    },
    mybaskets() {
      this.selected_menu = "";
      this.$router.push("/profile/orders");
    },
  },
};
</script>
