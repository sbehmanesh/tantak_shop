<template>
  <v-app>
    <v-main v-if="show_body">
      <!-- header -->
      <HeaderVue />
      <!-- header end -->

      <!-- header mobile -->
      <HeaderMobile />
      <!-- header mobile end -->
      <v-container>
        <v-row class="mt-2">
          <v-col cols="12" md="12">
            <v-card class="rounded-lg elevation-0">
              <Loader v-model="$store.state.top_loader" />
              <nuxt />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import HeaderVue from "~/components/Layout/Header/Header.vue";
import FooterVue from "~/components/Layout/Footer/Footer.vue";
import FooterNavMobile from "~/components/Layout/Footer/FooterNavMobile.vue";
import HeaderMobile from "../components/Layout/Header/HeaderMobile.vue";
import Loader from "@/components/Layout/Loader.vue";
export default {
  data: () => ({
    show_body: false,
  }),
  beforeMount() {
    document.getElementById("landing-parent").style.display = "none";
    if (Boolean(this.$store.state.auth.user)) {
      this.$store.dispatch("setting/getCitisTibax");
    }
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

    Loader,
  },
};
</script>
