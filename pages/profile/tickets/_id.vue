<template>
  <div class="h-100 py-5 px-14">
    <div v-if="loading" class="d-flex justify-center py-6">
      <v-progress-circular :size="50" :width="7" indeterminate color="red200" />
    </div>
    <div>
      <div class="ma-2 d-flex justify-end">
        <amp-button
          v-if="close_ticket == false"
          text="بستن تیکت"
          height="30"
          width="150"
          color="primary"
          @click="openDialog()"
          :loading="loading"
        />
        <amp-button
          v-else
          text="باز کردن تیکت"
          height="30"
          width="150"
          color="primary"
          @click="closeTicket(false)"
          :loading="loading"
        />
      </div>
      <!-- کارد پیام ها -->
      <v-card
        v-if="!texts.length"
        class="lightred200 ma-3 d-flex align-center justify-center"
        height="90"
      >
        <v-icon>comment</v-icon>
        <div class="mr-2 mt-n1">پیغامی برای نمایش وجود ندارد</div>
      </v-card>
      <Message
        v-else
        v-for="(message, i) in texts"
        :key="i"
        :message="message"
        :cardClass="
          message.user_id != $store.state.auth.user.id
            ? 'rounded-tl-0  lightprimary'
            : 'rounded-tr-0 lightgray'
        "
      />
    </div>

    <!-- کارد فیکس پایین صفحه برای ثبت پیام -->
    <ticket-messaging
      v-if="close_ticket == false"
      :ticket_id="this.form.ticket_id"
      @getTicketMessage="getTicketMessage()"
    />

    <v-dialog
      style="z-index: 111111"
      max-width="380"
      persistent
      v-model="close_ticket_dialog"
    >
      <v-card class="px-2 py-5">
        <v-card-text>
          <div class="font_18">از بستن این درخواست اطمینان دارید؟</div>
        </v-card-text>
        <v-card-actions class="d-block">
          <amp-button
            block
            text="بله"
            class="mb-2"
            color="error"
            @click="closeTicket(true)"
            :loading="loading"
            :disabled="loading"
          />
          <amp-button
            block
            text="انصراف"
            color="secondary"
            class="ma-0"
            @click="closeDialog"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import Message from "~/components/Tickets/Message.vue";
import ReplyMessage from "~/components/Tickets/ReplyMessage.vue";
import TicketMessaging from "@/components/Tickets/TicketMessaging.vue";
export default {
  components: { Message, ReplyMessage, TicketMessaging },
  layout: "profile",
  data() {
    return {
      loading: false,
      user_id: this.$store.state.auth.user.id,
      form: {
        text: "",
        ticket_id: "",
      },
      texts: [],
      ticket_dialog: false,
      subject: "",
      ticket_group_id: "",
      close_ticket_dialog: false,
      close_ticket: false,
    };
  },
  mounted() {
    this.getTicket();
  },
  methods: {
    getTicket() {
      this.loading = true;
      this.$reqApi("/ticket/show", {
        id: this.$route.params.id,
      })
        .then((response) => {
          this.subject = response.model.title;
          this.ticket_group_id = response.model.ticket_group_id;
          if (response.model.status == "close") {
            this.close_ticket = true;
          }
          this.form.ticket_id = response.model.id;
          this.loading = false;
          this.getTicketMessage();
        })
        .catch((error) => {
          this.loading = false;
        });
    },
    getTicketMessage() {
      this.$reqApi("/ticketmessage", {
        ticket_id: this.$route.params.id,
        sortBy: "created_at",
        orderBy: "ASC",
        paginate: true,
        paginate_num: 1,
        page: 1,
        row_number: 100,
      })
        .then((response) => {
          this.texts = response.model.model.data.map((x) => ({
            user_id: x.user_id,
            id: x.id,
            user: x.first_name + " " + x.last_name,
            text: x.text,
            created_at: this.$toJalali(x.created_at),
            // time: jmoment(x.created_at).format("HH:mm"),
            // date: jmoment(x.created_at).format("jYYYY/jMM/jDD"),
          }));
        })
        .catch((error) => {});
    },
    openDialog() {
      this.close_ticket_dialog = true;
    },
    closeDialog() {
      this.close_ticket_dialog = false;
    },
    closeTicket(x) {
      let form = {};
      if (x == true) {
        this.close_ticket == true;
        form = {
          id: this.$route.params.id,
          ticket_group_id: this.ticket_group_id,
          status: "close",
          title: this.subject,
        };
      } else {
        this.close_ticket = false;
        if (
          this.texts &&
          this.texts[this.texts.length - 1].userId ==
            this.$store.state.auth.user.id
        ) {
          form = {
            id: this.$route.params.id,
            ticket_group_id: this.ticket_group_id,
            status: "user",
            title: this.subject,
          };
        } else {
          form = {
            id: this.$route.params.id,
            ticket_group_id: this.ticket_group_id,
            status: "support",
            title: this.subject,
          };
        }
      }
      this.$reqApi("/ticket/update", form)
        .then((response) => {
          this.close_ticket_dialog = false;
          this.$toast.success("تیکت با موفقیت بسته شد");
          this.getTicket();
        })
        .catch((error) => {});
    },
  },
};
</script>
