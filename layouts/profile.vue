<template>
  <v-app>
    <v-main class="background1" v-if="show_body">
      <!-- header -->
      <HeaderVue />
      <!-- header end -->

      <!-- header mobile -->
      <HeaderMobile />
      <!-- header mobile end -->
      <v-container>
        <v-row class="mt-6">
          <v-col cols="12" md="3">
            <ProfileMenu />
          </v-col>
          <v-col cols="12" md="9">
            <v-card class="box-shadow-none rounded-lg">
              <Loader v-model="$store.state.top_loader" />
              <nuxt />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <!-- footer content -->
      <FooterVue />
      <!-- footer content end -->

      <!-- footer mobile -->
      <FooterNavMobile />
      <!-- footer mobile end -->
    </v-main>
  </v-app>
</template>

<script>
import HeaderVue from "~/components/Layout/Header/Header.vue";
import FooterVue from "~/components/Layout/Footer/Footer.vue";
import FooterNavMobile from "~/components/Layout/Footer/FooterNavMobile.vue";
import HeaderMobile from "../components/Layout/Header/HeaderMobile.vue";
import ProfileMenu from "@/components/ProfileMenu.vue";
import Loader from "@/components/Layout/Loader.vue";
export default {
  data: () => ({
    show_body: false,
  }),
  beforeMount() {
    document.getElementById("landing-parent").style.display = "none";
    if (!this.$store.state.auth.user) {
      this.$router.push("/");
    } else {
      this.show_body = true;
    }
  },
  head() {
    return {
      title: this.$store.state.page_title,
    };
  },
  components: {
    HeaderVue,
    FooterVue,
    FooterNavMobile,
    HeaderMobile,
    ProfileMenu,
    Loader,
  },
};
</script>
