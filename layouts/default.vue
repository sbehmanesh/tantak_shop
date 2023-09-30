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

export default {
  components: {
    HeaderVue,
    FooterVue,
    FooterNavMobile,
    HeaderMobile,
    Loader,
    LoginDialog,
  },

  beforeMount() {
    document.getElementById("landing-parent").style.display = "none";
  },
  mounted() {},
  head() {
    return {
      title: this.$store.state.page_title,
    };
  },
};
</script>

