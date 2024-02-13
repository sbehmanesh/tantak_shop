<template>
      <v-card class="pa-3" v-if="showCard">
        <div class="d-flex justify-space-between">
          <v-card-title>ثبت درخواست جدید</v-card-title>
        </div>
        <v-form v-model="valid" @submit.prevent="insertTicket()" class="px-3 pb-4">
          <amp-input text="موضوع" v-model="title" rules="require" />
          <amp-select text="دسته بندی" :items="groupItem" v-model="ticket_group_id" rules="require" />
          <amp-textarea text="متن درخواست" v-model="form.text" rules="require" />
          <amp-button :disabled="!valid || loading" text="ثبت" color="primary" type="submit" class="mt-3" />
          <amp-button :disabled="loading" text="انصراف" color="secondary" class="mt-3" @click="closeCard" />
        </v-form>
      </v-card>
  </template>
  <script>
  export default {
    props: {
        showCard: {
        required: true,
      },
      groupItem: {
        type: Array,
      },
    },
    data() {
      return {
        valid: false,
        loading: false,
        title: '',
        ticket_group_id: '',
        form: {
          text: '',
        },
      }
    },
    mounted() {
        this.loadgroups()
    },
    methods: {
        
    closeCard() {
      this.$emit('input', false)
    },
    loadgroups() {
      this.loading = true;
      this.$reqApi("/ticketgroup")
        .then((response) => {
            console.log(response, 'iiiiiiiiiii')
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
        });
    },
      insertTicket() {
        if (this.ticket_group_id) {
          this.loading = true
          this.$reqApi('/ticket/insert', {
            title: this.title,
            ticket_group_id: this.ticket_group_id,
          })
            .then((response) => {
              this.loading = true
              this.form.ticket_id = response.id
              this.$reqApi('/ticketmessage/insert', this.form)
                .then((response) => {
                  this.$toast.success('پیغام با موفقیت ارسال شد')
                  this.form.text = ''
                  this.title = ''
                  this.ticket_group_id = ''
                  this.closeCard()
                  this.$emit('loadTickets')
                  this.loading = false
                })
                .catch((error) => {
                  this.form.text = ''
                  this.loading = false
                })
            })
            .catch((error) => {
              this.loading = false
            })
        }else{
          this.$toast.error('لطفا دسته بندی را انتخاب کنید')
        }
      },
    },
  }
  </script>
  