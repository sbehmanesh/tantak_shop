<template>
  <v-card class="elevation-0">
    <v-card
      class="d-flex py-3 elevation-0"
      style="overflow-x: auto; overflow-y: hidden !important"
    >
      <v-col
        v-for="(x, i) in story"
        :key="i"
        cols="8"
        md="3"
        class="d-flex justify-center align-center"
      >
        <v-avatar>
          <v-icon color="grey lighten-1" size="35">{{ x.icon }}</v-icon>
        </v-avatar>
        <div class="mr-3">
          <b class="font_12">
            {{ x.title }}
          </b>
          <br />

          <small>
            {{ x.des }}
          </small>
        </div>
      </v-col>
    </v-card>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      story: [
        {
          title: "پرداخت در محل برای تهران",
          des: "پرداخت در محل",
          icon: "credit_card",
        },
        {
          title: "تحویل فوری و سریع",
          des: "ارسال سریع و روزانه سفارشات",
          icon: "timer",
        },
        {
          title: "  ضمانت اصالت کالا ",
          des: "تفکیک شفاف کالای فیک از اصلی",
          icon: "verified",
        },
        {
          title: "مشاوره  خرید",
          des: "مشاوره و پشتیبانی خرید",
          icon: "call",
        },
      ],
    };
  },
  mounted() {
    let res = this.$store.state.base.landing_page.data;

    console.log("res >>>>", res);
  },
};
</script>
