<template>
  <div class="mt-4">
    <v-col v-if="basket.need_update_error"
    class="error--text pa-3 text-center col-12"
    >
      سبد نیاز به بروز رسانی دارد
    </v-col>
    <div  v-for="item in basket.items" :key="item.id">
      <v-row v-if="item.type != 'mixture'">
        <v-col class="flex-grow-0">
            <v-img
              aspect-ratio="1"
              :src="$getImage($resizeImage(item.product.main_picture_path))"
              :width="$vuetify.breakpoint.mdAndUp ? 140 : 110"
            ></v-img>
        </v-col>
        <v-col >
          <v-row>
            <v-col >
              <div class="pb-2 d-flex justify-space-between align-center">
                <span 
                  >{{item.product.name}}</span
                >
                <v-btn
                v-if="$route.name == 'basket'"
                icon
                aria-label="حذف از سبد"
                :loading="(loading && loading_id == item.id)"
                >
                  <v-icon 
                  @click="deleteBasketItem(item.id)"
                  size="24" 
                  color="error" 
                    >delete</v-icon>
                </v-btn>
                <!-- <v-chip class="pr-2 mr-1 customchip">
                  <span class="font_12">14%</span>
                </v-chip> -->
              </div>
              <div >
                <span class="font_12 gray--text">{{item.text}}</span>
                <br />
                <span 
                v-if="item.type == 'single_sell'"
                class="font_12 gray--text"
                >{{
                  'تعداد : '+item.number
                }}</span>
                <span 
                v-if="item.type == 'whole_sell'"
                class="font_12 gray--text"
                >{{
                  'مقدار : '+item.number+' '+item.product.base_whole_sell_unit
                }}</span>
              </div>
            </v-col>
            <v-col cols="12" v-if="item.stock_lack_items" class="error--text flex-grow-1">
              <span>موجودی جدید</span>
              <span>{{item.remained_stock}}</span>
            </v-col>
            <v-col cols="12" v-if="item.price_changed_items" class="error--text flex-grow-1">
              <span>قیمت جدید</span>
              <span>{{Number(item.new_price).toLocaleString()}}</span>
            </v-col>
            <!-- <v-col  class="pt-0 flex-grow-0" :class="{ 'pt-2': $vuetify.breakpoint.mdAndUp }">
              <div class="custom-border pa-2 border10 align-last-center"
                :class="{
                  'width100': $vuetify.breakpoint.smAndDown,
                  'float-left': $vuetify.breakpoint.smAndDown,
                }">
                <v-icon size="20" color="cuccess" class="pr-1">add</v-icon>
                <span class="font_14 error--text" :class="{ 'pr-3': $vuetify.breakpoint.mdAndUp }">1</span>
                <span class="font_10 pl-4" v-if="$vuetify.breakpoint.mdAndUp"
                  >مورد</span
                >
                <v-icon size="20" color="error" v-if="$vuetify.breakpoint.mdAndUp"
                  >delete</v-icon
                >
                <v-icon
                  size="20"
                  color="error"
                  v-if="$vuetify.breakpoint.smAndDown"
                  >remove</v-icon
                >
              </div>
            </v-col> -->
          </v-row>
          <div :class="{'pt-8': $vuetify.breakpoint.mdAndUp }">
            <span>{{clacPrice(item).toLocaleString()}} ریال</span>
            <br v-if="$vuetify.breakpoint.smAndDown" />
            <!-- <span
              class="error--text font_10"
              :class="{ 'mr-4': $vuetify.breakpoint.mdAndUp }"
              >قیمت پس از تخفیف:
            </span> -->
            <!-- <span class="error--text">38.000 ریال</span> -->
          </div>
        </v-col>
        <v-col cols="12" class="pa-0 pb-3">
          <v-divider></v-divider>
        </v-col>
      </v-row>
      <v-row v-if="item.type == 'mixture'">
        <v-col class="flex-grow-0">
            <v-img
              aspect-ratio="1"
              :src="$getImage(null)"
              :width="$vuetify.breakpoint.mdAndUp ? 140 : 110"
            ></v-img>
        </v-col>
        <v-col >
          <v-row>
            <v-col >
              <div class="pb-2 d-flex justify-space-between align-center">
                <span
                  >{{item.mixture_basket.description}}</span
                >
                <v-btn
                v-if="$route.name == 'basket'"
                icon
                aria-label="حذف از سبد"
                :loading="(loading && loading_id == item.id)"
                >
                  <v-icon 
                  @click="deleteBasketItem(item.id)"
                  size="24" 
                  color="error" 
                    >delete</v-icon>
                </v-btn>
                <!-- <v-chip class="pr-2 mr-1 customchip">
                  <span class="font_12">14%</span>
                </v-chip> -->
              </div>
              <div >
                <span 
                v-for="each in item.mixture_basket.items" 
                :key="each.id"
                v-text="each.product.name +' - '+each.number+'% ,'" 
                class="font_12 gray--text"
                >
                </span>
                <br />
                <span 
                class="font_12 gray--text"
                >{{
                  'تعداد/مقدار : '+item.number+' '+
                item.mixture_basket.items[0].product.base_whole_sell_unit
                }}</span>
              </div>
            </v-col>
            <v-col cols="12" v-if="item.stock_lack_items" class="error--text flex-grow-1">
              <span>موجودی جدید</span>
              <span>{{item.remained_stock}}</span>
            </v-col>
            <v-col cols="12" v-if="item.price_changed_items" class="error--text flex-grow-1">
              <span>قیمت جدید</span>
              <span>{{Number(item.new_price).toLocaleString()}}</span>
            </v-col>
            <!-- <v-col  class="pt-0 flex-grow-0" :class="{ 'pt-2': $vuetify.breakpoint.mdAndUp }">
              <div class="custom-border pa-2 border10 align-last-center"
                :class="{
                  'width100': $vuetify.breakpoint.smAndDown,
                  'float-left': $vuetify.breakpoint.smAndDown,
                }">
                <v-icon size="20" color="cuccess" class="pr-1">add</v-icon>
                <span class="font_14 error--text" :class="{ 'pr-3': $vuetify.breakpoint.mdAndUp }">1</span>
                <span class="font_10 pl-4" v-if="$vuetify.breakpoint.mdAndUp"
                  >مورد</span
                >
                <v-icon size="20" color="error" v-if="$vuetify.breakpoint.mdAndUp"
                  >delete</v-icon
                >
                <v-icon
                  size="20"
                  color="error"
                  v-if="$vuetify.breakpoint.smAndDown"
                  >remove</v-icon
                >
              </div>
            </v-col> -->
          </v-row>
          <div :class="{ 'pt-8': $vuetify.breakpoint.mdAndUp }">
            <span>{{Number(item.price).toLocaleString()}} ریال</span>
            <br v-if="$vuetify.breakpoint.smAndDown" />
            <!-- <span
              class="error--text font_10"
              :class="{ 'mr-4': $vuetify.breakpoint.mdAndUp }"
              >قیمت پس از تخفیف:
            </span> -->
            <!-- <span class="error--text">38.000 ریال</span> -->
          </div>
        </v-col>
        <v-col cols="12" class="pa-0 pb-3">
          <v-divider></v-divider>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    basket:{
      type:Object
    }
  },
  data:()=>({
    loading:false,
    loading_id:null
  }),
  mounted(){
  },
  methods:{
    deleteBasketItem(id){
      this.loading = true
      this.loading_id = id
      this.$reqApi('/basket-item/delete',{id})
      .then(res => {
        this.loading= false
        this.loading_id = null
        this.$toast.success("با موفقیت حذف شد")
        this.$store.dispatch("base/getBasket")
      }).catch(err => {
        this.loading= false
        this.loading_id = null
        this.$toast.error("محصول حذف نشد")

      })
    },
    clacPrice(item){
      if(item.type == 'single_sell') return Number(item.price)
      return Number(item.price)*Number(item.number)
    }
  }
}
</script>
