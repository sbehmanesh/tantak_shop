<template>
  <v-app >
    <v-main class="background2">

      <!-- content -->
      <nuxt />
      <!-- content end -->

    </v-main>
  </v-app>
</template>

<script>
import HeaderVue from '~/components/Layout/Header/Header.vue';
import FooterVue from '~/components/Layout/Footer/Footer.vue';
import FooterNavMobile from '~/components/Layout/Footer/FooterNavMobile.vue';
import HeaderMobile from '../components/Layout/Header/HeaderMobile.vue';
export default {
    data: () => ({}),
    beforeMount() {
        document.getElementById("landing-parent").style.display = "none";
    },
    head() {
        return {
            title: this.$store.state.page_title,
        };
    },
    components: { HeaderVue, FooterVue, FooterNavMobile, HeaderMobile }
}
</script>

