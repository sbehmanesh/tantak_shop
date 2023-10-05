<template>
  <v-row :no-gutters="$vuetify.breakpoint.smAndDown" :class="$vuetify.breakpoint.mdAndUp ? 'my-14' : 'my-6'">
    <v-col cols="1"></v-col>
    <v-col cols="10" :class="$vuetify.breakpoint.mdAndUp ? 'd-flex justify-space-between' : ''">
      <v-card width="360" class="d-flex flex-column align-center py-4 box-shadow-none mt-2">
        <v-icon :size="$vuetify.breakpoint.mdAndUp ? 50 : 46" color="primary">mdi-cube-send</v-icon>
        <div :class="$vuetify.breakpoint.mdAndUp ? 'mt-5' : 'mt-2'">ارسال به سراسر ایران</div>
      </v-card>
      <v-card width="360" class="d-flex flex-column align-center py-4 box-shadow-none mt-2">
        <v-icon :size="$vuetify.breakpoint.mdAndUp ? 42 : 38" color="primary">mdi-check-decagram</v-icon>
        <div :class="$vuetify.breakpoint.mdAndUp ? 'mt-5' : 'mt-2'">تضمین کیفیت</div>
      </v-card>
      <v-card width="360" class="d-flex flex-column align-center py-4 box-shadow-none mt-2">
        <v-icon :size="$vuetify.breakpoint.mdAndUp ? 42 : 38" color="primary">mdi-archive-sync</v-icon>
        <div :class="$vuetify.breakpoint.mdAndUp ? 'mt-5' : 'mt-2'">7 روز ضمانت بازگشت کالا</div>
      </v-card> 
    </v-col>
    <v-col cols="1"></v-col>
  </v-row>
</template>
<script>
export default {
  
}
</script>
