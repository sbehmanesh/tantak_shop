<template>
  <div>
    <v-dialog width="650" persistent :value="value">
      <v-card
        class="center-div-justify"
      >
        <!-- <img
          src="/logo.png"
          class="ld-logo"
          :class="{ 'mt-2': $vuetify.breakpoint.smAndDown }"
          :width="$vuetify.breakpoint.mdAndUp ? '90' : '60'"
        /> -->

        <div class="ld-main_card rounded-xl pa-4" >
          <v-icon large @click="closeDialog" color="beauty" class="float-left"> mdi-close </v-icon>

          <OTPPhoneForm v-model="username" v-if="!Boolean(username)" />
          <OTPCodeForm v-model="username" v-if="Boolean(username)" :reload_page="reload_page" />
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import OTPCodeForm from '@/components/Auth/OTPCodeForm.vue'
import OTPPhoneForm from '@/components/Auth/OTPPhoneForm.vue'
export default {
  components: { OTPCodeForm, OTPPhoneForm },
  props: {
    value: {
      required: true,
    },
    reload_page: {
      default:true
    },
  },
  data: () => ({
    valid: false,
    loading: false,
    username: '',
  }),
  beforeCreate(){
    if(this.$store.state.auth.user) this.$emit('input', false)
  },
  methods: {
    closeDialog() {
      this.$emit('input', false)
      this.username = ''
    },
  },
}
</script>

<style>
/* .ld-main_card {
  border-radius: 30px;
  border: 3px solid #8e005e;
} */
.ld-logo {
  top: 12px;
  right: 45%;
  position: absolute;
}
</style>
