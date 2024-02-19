<template>
  <v-col cols="6" class="pb-0">
    <v-card @click="cardClick" class="rounded-lg">
      <div v-if="ticket.status == 'user'" class="lightprimary pa-2 ">منتظر پاسخ</div>
      <div v-if="ticket.status == 'support'" class="green white--text pa-2">پاسخ داده شده</div>
      <div v-if="ticket.status == 'close'" class="red white--text pa-2">بسته شده</div>
      <div class="d-flex justify-space-between mx-4 pa-2">
        <div class="w-half">موضوع</div>
        <span>{{ ticket.title }}</span>
      </div>
      <div class="d-flex justify-space-between mx-4 pa-2">
        <span class="w-half">دسته بندی</span>
        <span>{{ ticket.group }}</span>
      </div>
      <div class="d-flex justify-space-between mx-4 pa-2">
        <span class="w-half">تاریخ ثبت</span>
        <span>{{ ticket.date }}</span>
      </div>
    </v-card>
  </v-col>
  </template>
  <script>
  export default {
    props: {
      ticket: {
        type: Object,
        require: true,
      },
    },
    methods: {
      cardClick(value) {
        this.$emit('goToPage', value)
      },
    },
  }
  </script>
  