<template>
  <v-card class="pa-3">
    <v-col cols="12" class="px-0 pb-0">
      <amp-input
      text="کد  تخفیف دارید؟"
      placeholder="کد تخفیف خود را وارد کنید"
      hide-details
      v-model="discount_code"
      parentClass=""
      />
    </v-col>
    <v-col v-if="discount_code" cols="12" class="px-0 pb-0">
      <amp-button
        @click="getDiscount"
        text="اعمال کد تخفیف"
        color="success"
        height="40"
        width="100%"
      ></amp-button>
    </v-col>
  </v-card>
</template>

<script>
export default {
  data:() => ({
    discount_code:null
  }),
  methods:{
    getDiscount(){
      this.$reqApi('discount/check-code',{code:this.discount_code})
      .then(res => {
        this.$toast.success("کد تخفیف اعمال شد")
        this.$store.dispatch("base/setDiscount",res)
      })
      .catch(error => {
        this.$toast.error("کد تخفیف وجود ندارد")
      })
    }
  }
}
</script>
