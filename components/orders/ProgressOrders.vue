<template>
  <div>
    <v-col
      cols="12"
      @click="$router.push('/profile/orders/'+ order.id)"
      class="pointer"
    >
      <v-row>
        <v-col >
          <v-icon color="success">mdi-progress-helper</v-icon>
          <span class="font_14">{{getStatus(order.status)}}</span>
        </v-col>
        <v-col  class="flex-grow-0">
          <!-- <amp-button text="جزئیات سفارش" /> -->
          <v-icon>mdi-chevron-left</v-icon>
        </v-col>
      </v-row>
    </v-col>
    <v-row class="px-3">
      <span class="font_12 pa-3">{{ this.$toJalali(order.created_at) }}</span>
      <!-- <span class="font_12 pa-3"
        >کد سفارش: {{ new Date(order.created_at).getTime() }}</span
      > -->
      <span class="font_12 pa-3"
        >تعداد اقلام: {{order.items_count }}</span
      >
      <span class="font_12 pa-3"
        >مبلغ: {{ order.price.toLocaleString() }} تومان</span
      >
      <!-- <span class="font_12 pa-3">تخفیف: 30.000 تومان</span> -->
    </v-row>
    <!-- <v-col cols="12" class="px-0">
      <v-divider></v-divider>
    </v-col> -->
    <!-- <v-col cols="12">
      <v-row>
        <v-col cols="8">
          <span class="font_14">مشخصات سفارش</span>
        </v-col>

        <v-col cols="4">
          <div class="pt-4">
            <v-progress-linear
              value="60"
              striped
              color="green"
            ></v-progress-linear>
          </div>
        </v-col>
      </v-row>
    </v-col> -->
    <!-- <v-row class="px-6">
      <v-col cols="2" class="px-0" v-for="item in items" :key="item.id">
        <v-badge
          bottom
          bordered
          offset-x="16"
          offset-y="20"
          color="info"
          :content="item.number"
        >
          <img :src="$getImage(item.product.main_picture_path)" width="120" />
        </v-badge>
      </v-col>
    </v-row> -->
  </div>
</template>
<script>
let jmoment = require("jalali-moment");
export default {
  props: {
    order: {
      type: Object,
    },
  },
  methods: {
    date(value) {
      return jmoment(value).format("jDD jMMMM");
    },
    getStatus(status){
      let status_text = ''
      this.$store.state.static.basket_status.forEach(each => {
        if(each.value == status)status_text = each.text
      });
      return status_text
    }
  },

};
</script>
