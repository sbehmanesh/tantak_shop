<template>
  <div>
    <v-card v-if="basket.address" class="pa-5 address-card" >
      <div class="pb-3">
        <v-icon>pin_drop</v-icon>
        <span class="font_12 gray--text">آدرس تحویل سفارش:</span>
        <span class="font_14">
          {{basket.address}}</span
        >
      </div>
      <div>
        <v-icon>call</v-icon>
        <span class="font_12 gray--text">شماره تماس:</span>
        <span class="font_12">{{basket.phone}}</span>
        <br v-if="$vuetify.breakpoint.smAndDown" />
        <v-icon :class="{ 'mr-10': $vuetify.breakpoint.mdAndUp }">person</v-icon>
        <span class="font_12 gray--text">تحویل گیرنده:</span>
        <span class="font_12">{{basket.first_name + ' ' + (basket.last_name || "")}}</span>
      </div>
      <v-col cols="12" class="align-last-left py-0">
        <div class="pointer"  @click="openDialog">
          <v-icon color="info" size="18">edit</v-icon>
          <span class="info--text font_12">ویرایش آدرس</span>
        </div>
      </v-col>
    </v-card>
    <v-card v-else class="pa-3 pa-md-5 address-card">
      <div class="d-flex justify-space-between aligin-center">
        <div class="font_14 ">آدرسی برای شما ثبت نشده!</div>
        
        <div class="pointer" @click="openDialog">
          <v-icon color="info" size="18">edit</v-icon>
          <span class="info--text font_12">تکمیل مشخصات</span>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  props:{
    basket:{
      type:Object
    }
  },
  methods:{
    openDialog(){
      this.$emit('dialogshow',true)
    }
  }
}
</script>
