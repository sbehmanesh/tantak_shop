<template>
  <v-app >
    <v-main>
      <nuxt />

    </v-main>
  </v-app>
</template>

<script>
export default {
    beforeMount() {
        document.getElementById("landing-parent").style.display = "none";
    },
}
</script>

