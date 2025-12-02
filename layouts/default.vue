<template>
  <v-app>
    <v-main class="background1">
      <!-- header -->
      <HeaderVue />
      <!-- header end -->

      <!-- header -->
      <div
        class="elevation-0"
        style="
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 2;
          border-bottom: 1px solid lightgray;
        "
      >
        <HeaderVue />
      </div>
      <!-- header end -->

      <!-- header mobile -->
      <HeaderMobile />
      <!-- header mobile end -->

      <!-- content -->
      <div>
        <!-- <Loader v-model="$store.state.top_loader" /> -->
        <nuxt />
      </div>
      <!-- content end -->

      <!-- footer content -->
      <FooterVue />
      <!-- footer content end -->

      <!-- footer mobile -->
      <!-- <FooterNavMobile /> -->
      <BottomNavigation v-if="$vuetify.breakpoint.smAndDown" />
      <!-- footer mobile end -->

      <!-- login dialog -->
      <login-dialog
        :value="$store.state.auth.login_dialog"
        @input="(status) => $store.dispatch('auth/loginDialog', status)"
      />
      <!-- login dialog end -->
    </v-main>
  </v-app>
</template>

<script>
import HeaderVue from "~/components/Layout/Header/Header.vue";
import FooterVue from "~/components/Layout/Footer/Footer.vue";
import FooterNavMobile from "~/components/Layout/Footer/FooterNavMobile.vue";
import HeaderMobile from "../components/Layout/Header/HeaderMobile.vue";
import Loader from "~/components/Layout/Loader.vue";
import LoginDialog from "~/components/Auth/LoginDialog.vue";
import BottomNavigation from "@/components/Layout/bottomNavgation.vue";
export default {
  components: {
    HeaderVue,
    FooterVue,
    FooterNavMobile,
    HeaderMobile,
    Loader,
    LoginDialog,
    BottomNavigation,
  },

  beforeMount() {
    document.getElementById("landing-parent").style.display = "none";
    this.parseCookie();
    this.$store.dispatch("setting/getMainSeeting");
    this.$store.dispatch("setting/getMainSlider");
  },
  mounted() {},
  head() {
    return {
      title: this.$store.state.page_title,
    };
  },
  methods: {
    parseCookie() {
      const cookies = {};
      const cookieParis = document.cookie.split(";");
      if (Boolean(cookieParis) && Array.isArray(cookieParis)) {
        for (let i = 0; i < cookieParis.length; i++) {
          let c = cookieParis[i].trim().split("=");
          if (c.length == 2) cookies[c[0]] = unescape(c[1]);
        }
      }
      let token = localStorage.getItem("token");
      if (token && token.length > 5) {
        this.$store.dispatch("auth/getUser");
      }
      // if (cookies.token && !Boolean(this.$store.state.auth.user.token)) {
      //   this.$store.dispatch("auth/nuxtServerInit", cookies).then((res) => {});
      // }
    },
  },
};
</script>
