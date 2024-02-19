<template>
  <v-card class="pa-3 rounded-lg" v-if="showCard">
    <div class="d-flex justify-space-between">
      <v-card-title>ثبت درخواست جدید</v-card-title>
    </div>
    <v-form v-model="valid" @submit.prevent="insertTicket()" class="px-3 pb-4">
      <div class="d-flex">
        <amp-input
          text="موضوع"
          v-model="title"
          rules="require"
          class="col-6 py-0 pr-0"
        />
        <amp-select
          text="دسته بندی"
          :items="groupItem"
          v-model="ticket_group_id"
          rules="require"
          class="col-6 py-0 pl-0"
        />
      </div>
      <amp-textarea text="متن درخواست" v-model="form.text" rules="require" />
      <div class="d-flex justify-end mt-3">
      <amp-button
        :disabled="!valid || loading"
        text="ثبت"
        width="150"
        color="primary"
        type="submit"
      />
      <amp-button
        :disabled="loading"
        text="انصراف"
        width="150"
        color="secondary"
        class="mr-2"
        @click="closeCard()"
      />
    </div>
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
      title: "",
      ticket_group_id: "",
      form: {
        text: "",
      },
    };
  },
  mounted() {},
  methods: {
    closeCard() {
      this.$emit("input", false);
    },
    insertTicket() {
      if (this.ticket_group_id) {
        this.loading = true;
        this.$reqApi("/ticket/insert", {
          title: this.title,
          ticket_group_id: this.ticket_group_id,
        })
          .then((response) => {
            this.loading = true;
            this.form.ticket_id = response.id;
            this.$reqApi("/ticketmessage/insert", this.form)
              .then((response) => {
                this.$toast.success("پیغام با موفقیت ارسال شد");
                this.form.text = "";
                this.title = "";
                this.ticket_group_id = "";
                this.closeCard();
                this.$emit("loadTickets");
                this.loading = false;
              })
              .catch((error) => {
                this.form.text = "";
                this.loading = false;
              });
          })
          .catch((error) => {
            this.loading = false;
          });
      } else {
        this.$toast.error("لطفا دسته بندی را انتخاب کنید");
      }
    },
  },
};
</script>
