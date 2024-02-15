<template>
  <div class="pa-6">
    <div class="d-flex justify-end">
    <amp-button text="ثبت تیکت جدید" color="primary" height="40" width="150" class="ml-3" @click="ShowInserCard()" />
  </div>
    <!-- کارد ثبت تیکت -->
    <TicketInsertCard :showCard="showCard" :groupItem="ticket_group_items" />
    <!-- کاردهای تیکت های ثبت شده -->
    <TicketCards
      v-for="(ticket, i) in tickets"
      :key="i"
      :ticket="ticket"
      @goToPage="goTo(ticket.id)"
      class="mt-3"
    />
  </div>
</template>
<script>
import TicketInsertCard from "@/components/Card/TicketInsertCard.vue";
import TicketCards from "@/components/Card/TicketCards.vue";
export default {
  layout: "profile",
  components: { TicketInsertCard, TicketCards },
  data() {
    return {
      showCard: false,
      ticket_group_items: [],
      tickets: [],
    };
  },
  mounted() {
    this.loadTicketGroup();
    this.loadTickets();
  },
  methods: {
    ShowInserCard() {
      this.showCard = true;
    },

    loadTicketGroup() {
      this.$reqApi("/ticketgroup")
        .then((res) => {
          res.model.data.map((x) => {
            this.ticket_group_items.push({ text: x.name, value: x.id });
          });
        })
        .catch((err) => {
          return err;
        });
    },
    loadTickets() {
      this.loading = true;
      //   this.$reqApi("/ticket", { row_number: 30, filters: this.rootBody })
      this.$reqApi("/ticket")
        .then((response) => {
          console.log(response, "rrrrrrrrrrrrrrr");
          this.tickets = response.model.data.map((x) => ({
            id: x.id,
            title: x.title,
            status: x.status,
            date: this.$toJalali(x.created_at),
            group: this.setGroup(x.ticket_group_id),
          }));
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
        });
    },
    setGroup(id) {
      let text = "نامشخص";
      this.ticket_group_items.map((x) => {
        if (x.value == id) {
          text = x.text;
        }
      });
      return text;
    },
    goTo(id) {
      this.$router.push('/profile/tickets/' + id)
    },
  },
};
</script>
