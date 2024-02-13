<template>
    <v-card @click="cardClick" class="mx-3 my-1">
      <div v-if="ticket.status == 'user'" class="lightred200 pa-2 font_size_14">منتظر پاسخ</div>
      <div v-if="ticket.status == 'support'" class="lightgreen pa-2 font_size_14">پاسخ داده شده</div>
      <div v-if="ticket.status == 'close'" class="lightred200 red200--text pa-2 font_size_14">بسته شده</div>
      <div class="d-flex ml-14 pa-2">
        <div class="w-half font_size_14">موضوع:</div>
        <span class="font_size_14">{{ ticket.title }}</span>
      </div>
      <div class="d-flex ml-14 pa-2">
        <span class="w-half font_size_14">دسته بندی:</span>
        <span class="font_size_14">{{ ticket.group }}</span>
      </div>
      <div class="d-flex ml-14 pa-2">
        <span class="w-half font_size_14">تاریخ ثبت:</span>
        <span class="font_size_14">{{ ticket.date }}</span>
      </div>
    </v-card>
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
  