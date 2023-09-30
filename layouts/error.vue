<template>
  <v-app>
    <v-main> </v-main>
  </v-app>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  beforeMount() {
    this.$router.push('/error')
  },
  mounted() {
    setTimeout(() => {
      document.getElementById('landing-parent').style.display = 'none'
    }, 1000)
  },
}
</script>
