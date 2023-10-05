<template>
    <div>
        <Loading v-if="!payment"/>
        <v-card 
        v-if="payment && payment.status == 'payed' " 
        max-width="500px" 
        class="mx-auto my-16"
        elevation="16"
        >
            <v-card-title class="align-center justify-center">
                <v-icon class="rounded-circle success pa-4"  size="60" color="white">mdi-check-outline</v-icon>
            </v-card-title>
            <v-card-title class="align-center justify-center">پرداخت موفق</v-card-title>
            <v-card-text class="d-flex align-center justify-center flex-column">
                <div>
                    <span>تاریخ تراکنش : </span>
                    <span>{{$jmoment(payment.created_at).format('HH:mm:ss jYYYY/jMM/jDD')}}</span>
                </div>
                <div class="mt-1">
                    <span>کد پیگیری : </span>
                    <span>{{payment.ref_id}}</span>
                </div>
                <div class="mt-1">
                    <span>شماره سفارش : </span>
                    <span>{{payment.basket.order_number}}</span>
                </div>
                <div class="mt-1">
                    <span>مبلغ : </span>
                    <span>{{Number(payment.price).toLocaleString()}}</span>
                </div>
            </v-card-text>
            <v-card-actions class="align-center justify-center">
                <v-btn 
                style="letter-spacing:unset" 
                color="primary"
                @click="$router.push('/')" 
                text 
                >بازگشت به صفحه اصلی</v-btn>
            </v-card-actions>
        </v-card>
        <v-card 
        v-if="payment && payment.status != 'payed' " 
        max-width="500px" 
        class="mx-auto my-16"
        elevation="16"
        >
            <v-card-title class="align-center justify-center">
                <v-icon class="rounded-circle error pa-4"  size="60" color="white">mdi-alert-circle-outline</v-icon>
            </v-card-title>
            <v-card-title class="align-center justify-center">پرداخت ناموفق</v-card-title>
            <v-card-text class="d-flex align-center justify-center flex-column">
                <div>
                    <span>تاریخ تراکنش : </span>
                    <span>{{$jmoment(payment.created_at).format('HH:mm:ss jYYYY/jMM/jDD')}}</span>
                </div>
                <div class="mt-1">
                    <span>کد پیگیری : </span>
                    <span>{{payment.ref_id}}</span>
                </div>
                <div class="mt-1">
                    <span>شماره سفارش : </span>
                    <span>{{payment.basket.order_number}}</span>
                </div>
                <div class="mt-1">
                    <span>مبلغ : </span>
                    <span>{{Number(payment.price).toLocaleString()}}</span>
                </div>
            </v-card-text>
            <v-card-subtitle class="align-center justify-center text-center mt-0">در صورتی که مبلغ از حساب شما کسر شده است ظرف 48 ساعت به حساب شما برگشت داده خواهد شد</v-card-subtitle>
            <v-card-actions class="align-center justify-center">
                <v-btn 
                style="letter-spacing:unset" 
                color="primary"
                @click="$router.push('/')" 
                text 
                >بازگشت به صفحه اصلی</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import Loading from '~/components/Loading/Loading.vue'
export default {
    data: () => ({
        title: "نتیجه پرداخت",
        id: null,
        payment: null
    }),
    mounted() {
        if (this.$route.params.id) {
            this.id = this.$route.params.id;
            this.paymentResult(this.id);
        }
    },
    methods: {
        paymentResult(id) {
            this.$reqApi("payment/show", { id })
                .then(res => {
                this.payment = res.data;
            })
                .catch(error => { });
        }
    },
    components: { Loading }
}
</script>