<template>
  <!-- @submit.prevent="insertTicketMessage" -->
  <v-form class="pa-0">
    <v-row>
      <v-col cols="9" class="pr-6">
        <AmpInput v-model="form.text" />
      </v-col>
      <v-col cols="3" class="d-flex justify-center">
        <AmpButton
          cClass="pa-4"
          height="40"
          width="150"
          color="primary"
          text="ارسال"
          @click="insertTicketMessage"
      /></v-col>
    </v-row>
  </v-form>
</template>
<script>
export default {
  data() {
    return {
      send_loading: false,
      form: {
        text: '',
        ticket_id: this.$route.params.id,
      },
    }
  },
  methods: {
    insertTicketMessage() {
      this.send_loading = true
      this.$reqApi('/ticketmessage/insert', this.form)
        .then((response) => {
          this.$toast.success('پیغام با موفقیت ارسال شد')
          this.form.text = ''
          this.send_loading = false
          this.$emit('getTicketMessage')
        })
        .catch((error) => {
          this.send_loading = false
        })
    },
  },
}
</script>
<style scoped>
.fixed-ticket-input {
  background-color: white;
  max-width: 400px;
  width: 100%;
  position: fixed;
  bottom: 44px;
  padding: 12px 8px;
}

.theme--light.v-btn.v-btn--disabled.v-btn--has-bg {
  background-color: rgb(0 0 0 / 0%) !important;
}
</style>
