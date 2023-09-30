<template>
    <v-dialog 
    v-model="value"
    persistent 
    max-width="900px"
    >
        <v-card class="pa-3" v-if="basket" >
            <v-row no-gutters class="align-center justify-center">
                <span class="font_20 pa-4">اطلاعات سفارش</span>
            </v-row>
            <v-row no-gutters>
                <v-col class="col-12 col-md-4 pa-3">
                    <span>نام و نام خانوادگی :</span>
                    <span>{{basket.first_name + ' ' + (basket.last_name || "")}}</span>
                </v-col>
                <v-col class="col-12 col-md-8 pa-3">
                    <span>آدرس :</span>
                    <span>{{basket.address}}</span>
                </v-col>
                <v-col class="col-12 col-md-4 pa-3">
                    <span>شماره همراه :</span>
                    <span>{{basket.phone}}</span>
                </v-col>
                <v-col class="col-12 col-md-4 pa-3">
                    <span>کد پستی :</span>
                    <span>{{basket.postal_code}}</span>
                </v-col>
                <v-col class="col-12 col-md-4 pa-3">
                    <span>روش ارسال :</span>
                    <span>پیشتاز</span>
                </v-col>
                <v-col class="col-12 col-md-4 pa-3">
                    <span>مجموع قیمت سبد :</span>
                    <span>{{Number(basket.price).toLocaleString()+" تومان"}}</span>
                </v-col>
                <v-col class="col-12 col-md-4 pa-3">
                    <span>هزینه پست :</span>
                    <span>{{Number(post_price || pay_at_delivery_price).toLocaleString()+" تومان"}}</span>
                </v-col>
                <v-col v-if="discount_price || Product_discount_price" class="col-12 col-md-4 pa-3 error--text">
                    <span>تخفیف :</span>
                    <span>{{(Number(discount_price) + Number(Product_discount_price)).toLocaleString()+" تومان"}}</span>
                </v-col>
                <v-col class="col-12 col-md-4 pa-3">
                    <span>قابل پرداخت :</span>
                    <span>{{(
                    Number(basket.price) + 
                    Number(post_price) - 
                    Number(discount_price) - 
                    Number(Product_discount_price)
                    ).toLocaleString()+" تومان"}}</span>
                </v-col>
                <v-col
                v-for="item in basket.items" 
                :key="item.id" 
                class="col-12 elevation-2"
                >
                    <v-row 
                    v-if="item.type != 'mixture'"
                    class="align-center flex-wrap"
                    no-gutters
                    >
                        <v-col class="flex-grow-0">
                            <v-img :src="$getImage($resizeImage(item.product.main_picture_path))" width="80px"></v-img>
                        </v-col>
                        <v-col class="pa-3 x">
                            <span>{{item.product.name}}</span>
                            <span class="font_12 text--secondary mr-3">{{item.text}}</span>
                            <span 
                            v-if="item.type == 'single_sell'"
                            class="font_12 text--secondary mr-3"
                            >{{
                            'تعداد : '+item.number
                            }}</span>
                            <span 
                            v-if="item.type == 'whole_sell'"
                            class="font_12 text--secondary mr-3"
                            >{{
                            'مقدار : '+item.number+' '+item.product.base_whole_sell_unit
                            }}</span>
                        </v-col>
                        <v-col v-if="item.stock_lack_items" class="error--text pa-3 flex-grow-1">
                            <span>موجودی جدید</span>
                            <span>{{item.remained_stock}}</span>
                        </v-col>
                        <v-col v-if="item.price_changed_items" class="error--text pa-3 flex-grow-1">
                            <span>قیمت جدید</span>
                            <span>{{Number(item.new_price).toLocaleString()}}</span>
                        </v-col>
                    </v-row>
                    <v-row 
                    v-if="item.type == 'mixture'"
                    class="align-center flex-wrap"
                    no-gutters
                    >
                        <v-col class="flex-grow-0">
                            <v-img :src="$getImage(item.product)" width="80px"></v-img>
                        </v-col>
                        <v-col class="pa-3 x">
                            <span>{{item.mixture_basket.description}}</span>
                            <span class="font_12 text--secondary mr-3">
                                {{
                                'تعداد/مقدار : '+item.number+' '+
                                item.mixture_basket.items[0].product.base_whole_sell_unit
                                }}
                            </span>
                        </v-col>
                        <v-col v-if="item.stock_lack_items" class="error--text pa-3 flex-grow-1">
                            <span>موجودی جدید</span>
                            <span>{{item.remained_stock}}</span>
                        </v-col>
                        <v-col v-if="item.price_changed_items" class="error--text pa-3 flex-grow-1">
                            <span>قیمت جدید</span>
                            <span>{{Number(item.new_price).toLocaleString()}}</span>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col v-if="basket.need_update_error"
                class="error--text pa-3 text-center"
                >
                    سبد نیاز به بروز رسانی دارد
                </v-col>
                <v-col class="col-12 d-flex align-center justify-center mt-3">
                    <v-btn
                    :loading="loading" 
                    type="submit" 
                    @click="pay" 
                    class="success mx-2 " 
                    style="letter-spacing:0" 
                    :disabled="basket.need_update_error"
                    large>
                        پرداخت
                    </v-btn>
                    <v-btn  class="error mx-2" @click="closeDialog" style="letter-spacing:0" large>
                        بستن
                    </v-btn>
                </v-col>
            </v-row>
        </v-card>

        <!-- otp for existin users -->
        <FinalOTP v-if="basket" v-model="otpDialog" :phone="basket.phone" @OTPSuccess="OTPSuccess"/>
        <!-- otp for existin users end -->

    </v-dialog>
</template>

<script>
import CountryDivisionSelectInput from '../Setting/CountryDivisionSelectInput.vue';
import BasketUpdateForm from './BasketUpdateForm.vue';
import FinalOTP from './FinalOTP.vue';

export default {
    props: {
        value: {
            type: Boolean,
            required: true,
            default: false
        },
    },
    data: () => ({
        price_changed_items:null,
        delivery_method_id:null,
        stock_lack_items:null,
        delivery_method:null,
        otpDialog:false,
        post_price:0,
        pay_at_delivery_price:0,
        loading:false,
        basket: null,
        discount_price:0,
        Product_discount_price:0,

    }),
    watch:{
        '$store.state.base.basket.refresh'(){
            this.basket = this.$store.state.base.basket.data;
        },
        '$store.state.base.discount.refresh'(){
            this.calcDiscountCodePrice()
        }
    },
    mounted(){
        if(this.$store.state.base.basket.data){
            this.basket = this.$store.state.base.basket.data;
            this.fillDeliveryMethod()
            this.calcPostPrice()
            this.calcDiscountCodePrice()
            this.calcProductDiscountPrice()
        }
    },
    methods:{
        closeDialog(){
            this.$emit('input',false )
        },
        pay(){
            this.loading = true
            let form = {}
            let discount = this.$store.state.base.discount.data
            if(discount){
                form['code'] = discount.code
            }
            this.$reqApi("/basket/pay",form)
            .then(res => {
                this.loading = false
                if(res.login_required){
                    this.otpDialog = true
                }else if(res.basket_change_required){
                    this.chackBasketError(res.data)
                    this.calcNeedUpdateBasket()

                }else{
                    window.location.href = res.url
                }
            })
            .catch()
        },
        OTPSuccess(){
            this.otpDialog = true
            this.pay();
        },
        chackBasketError(data){
            if(data.stock_lack_items && data.stock_lack_items.length != 0){
                this.stock_lack_items = data.stock_lack_items
            }
            if(data.price_changed_items && data.price_changed_items.length != 0){
                this.price_changed_items = data.price_changed_items
            }
            this.basket['need_update_error'] = true
        },
        calcNeedUpdateBasket(){
            this.basket.items.forEach((each)=>{
                if(this.stock_lack_items){
                    this.setStockLack(each)
                }
                if(this.price_changed_items){
                    this.setPriceChange(each)
                }
            })
        },
        setStockLack(basket_item){
            this.stock_lack_items.forEach((item)=>{
                if(basket_item.id == item.item_id){
                    basket_item['stock_lack_items'] = true
                    basket_item['remained_stock'] = item.remained_stock
                }
            })
        },
        setPriceChange(basket_item){
            this.price_changed_items.forEach((item)=>{
                if(basket_item.id == item.item_id){
                    basket_item['price_changed_items'] = true
                    basket_item['new_price'] = item.new_price
                }
            })
        },
        fillDeliveryMethod(){
            if(this.$store.state.base.delivery_method){
            this.delivery_method = this.$store.state.base.delivery_method
            }
            if(this.basket && this.basket.delivery_method_id){
                this.delivery_method_id = this.basket.delivery_method_id
            }else{
                this.delivery_method_id = this.delivery_method[0].id
                //call update basket
            }
        },
        calcPostPrice(){
        let selected = this.delivery_method.find((each)=>(each.id == this.delivery_method_id))
        if(selected && selected != undefined){
            if(selected.pay_at_delivery == 1){
                this.post_price = 0
                this.pay_at_delivery_price = Number(selected.base) + (Number(this.basket.total_weight/1000) * Number(selected.ratio))
            }else if(Number(selected.send_free_threshold) <= Number(this.basket.price)){
                this.post_price = 0
            }else{
                this.post_price = Number(selected.base) + (Number(this.basket.total_weight/1000) * Number(selected.ratio))
            }
        }
        let discount = this.$store.state.base.discount.data
        if(discount && discount.code_send_free == 1){
            this.post_price = 0
        }
        },
        calcDiscountCodePrice(){
        let discount = this.$store.state.base.discount.data
        let basket = this.$store.state.base.basket.data

        if(basket.discount != 0) {
            this.discount_price = Number(basket.discount)
            return
        }
        if(!discount) return

        if(discount.type == "percent"){
            this.discount_price = Number(basket.price)*Number(discount.discount)/100
        }
        if(discount.type == "amount"){
            this.discount_price = Number(discount.discount)
        }
        if(
                discount.code_max_discount && 
                discount.code_max_discount != 0 && 
                discount.code_max_discount < this.discount_price
            ){
                this.discount_price = discount.code_max_discount
            }
        if(discount.code_send_free == 1){
            this.post_price = 0
        }
        },
        calcProductDiscountPrice(){
            this.Product_discount_price = Number(this.basket.products_discount) 
        }


    },
    components: { CountryDivisionSelectInput, BasketUpdateForm, FinalOTP }
}
</script>