<template>
  <v-container class="margin" fluid>
    <v-row
      style="display: flex; justify-content: center; align-items: center"
      class="pa-8 d-flex align-center center-div"
      align="center"
    >
      <v-col
        cols="12"
        md="6"
        sm="12"
        class="d-flex align-center"
        align="center"
        justify="center"
      >
        <v-card elevation="0" class="mr my-auto">
          <h2>خطای 404 - چیزی که دنبالش هستی انگار گم شده.</h2>
          <p>برگرد به سایت و جستجو رو امتحان کن.</p>
          <div class="d-flex justify-center">
            <amp-button
              color="success"
              :text="'مشاهده صفحه اصلی' + ' (' + time + ')'"
              @click="$router.push('/')"
            />
          </div>
        </v-card>
        <!-- <h2>خطای 404 - اینجا خبر خاصی نیست</h2> -->
      </v-col>
      <v-col cols="12" md="6" sm="6" class="d-flex justify-center">
        <img class="" src="/image/bot2.gif" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: "empty",
  data: () => ({
    time: 3,
    timeInterval: null,
  }),
  mounted() {
    document.getElementById("landing-parent").style.display = "none";
    this.time = 4;
    this.timeInterval = setInterval(() => {
      if (this.time > 0) {
        this.time -= 1;
      } else {
        clearInterval(this.timeInterval);
      }
    }, 1000);
  },
};
</script>
<style scoped>
.margin {
  margin-top: 60px;
}
@media only screen and (min-width: 600px) {
  .margin {
    margin-top: 165px;
    /* margin-right: 20px; */
  }
  .mr {
    margin-right: 280px;
  }
}
</style>
