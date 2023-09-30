<template>
    <v-sheet 
    class="py-5 py-md-10 mt-5 mt-md-10" 
    :style="!$vuetify.breakpoint.mdAndUp && {paddingBottom:'80px !important'}"
    >
        <!-- <v-row no-gutters>
            <v-col class="d-flex flex-column align-center">
                <v-img aspect-ratio="1/1" src="/image/delivery-time-3.png" width="64px" height="64px"></v-img>
                <div class="text-center mt-3 primary--text">تحویل سریع</div>
            </v-col>
            <v-col class="d-flex flex-column align-center">
                <v-img src="/image/item-2.png" width="64px" ></v-img>
                <div class="text-center mt-3 primary--text">زیبا و خاص</div>
            </v-col>
            <v-col class="d-flex flex-column align-center">
                <v-img src="/image/help-1.png" width="64px" ></v-img>
                <div class="text-center mt-3 primary--text">پشتیبانی شبانه‌روزی</div>
            </v-col>
            <v-col class="d-flex flex-column align-center">
                <v-img src="/icon/icons8-pinterest.svg" width="64px" ></v-img>
                <div class="text-center mt-3 primary--text">ضمانت برگشت کالا</div>
            </v-col>
        </v-row> -->
        <v-row no-gutters  class="mb-n5">
            <v-col class="px-3 px-sm-6 mb-5 col-12 col-md-6">
                <!-- <div class="">فروشگاه گل قند ، این طبیعت توست...</div> -->
                <div class="pt-3 blackd--text" v-html="main_setting && main_setting.footer_text"></div>
            </v-col>
            <v-col class="px-3 px-sm-6 mb-5 col-12 col-md-6 d-flex flex-wrap align-center">
                <div class="col-12 col-sm-7 px-0 py-0 mt-md-0 d-flex flex-column" >
                    <div>
                        <span>تلفن تماس : </span>
                        <span class="text--secondary" >{{main_setting && main_setting.phone}}</span>
                    </div>
                    <div class="mt-1">
                        <span>پست الکترونیک : </span>
                        <span class="text--secondary">{{main_setting && main_setting.email}}</span>
                    </div>
                    <div class="mt-1">
                        <span>آدرس : </span>
                        <span class="text--secondary">{{main_setting && main_setting.address}}</span>
                    </div>
                    <div class="mt-1 d-flex flex-wrap">
                        <v-btn 
                        class="elevation-0 d-flex justify-center align-center rounded" 
                        style="min-width:40px;width:55px;height:55px"
                        :href="this.main_setting.instagram"
                        target="_blank"
                        text 
                        >
                            <v-img width="40px" src="/icon/icons8-instagram.svg"></v-img>
                        </v-btn>
                        <v-btn 
                        class="elevation-0 d-flex justify-center align-center rounded" 
                        style="min-width:40px;width:55px;height:55px"
                        :href="this.main_setting.facebook"
                        target="_blank"
                        text 
                        >
                            <v-img width="40px" src="/icon/icons8-facebook.svg"></v-img>
                        </v-btn>
                        <v-btn 
                        class="elevation-0 d-flex justify-center align-center rounded" 
                        style="min-width:40px;width:55px;height:55px"
                        :href="this.main_setting.pintrest"
                        target="_blank"
                        text 
                        >
                            <v-img width="36px" src="/icon/icons8-pinterest.svg"></v-img>
                        </v-btn>
                        <v-btn 
                        class="elevation-0 d-flex justify-center align-center rounded" 
                        style="min-width:40px;width:55px;height:55px"
                        :href="this.main_setting.whatsup"
                        target="_blank"
                        text 
                        >
                            <v-img width="32px" src="/icon/icons8-whatsapp.svg"></v-img>
                        </v-btn>
                        <v-btn 
                        class="elevation-0 d-flex justify-center align-center rounded" 
                        style="min-width:40px;width:55px;height:55px"
                        :href="this.main_setting.youtube"
                        target="_blank"
                        text 
                        >
                            <v-img width="40px" src="/icon/icons8-youtube-logo.svg"></v-img>
                        </v-btn>
                        <v-btn 
                        class="elevation-0 d-flex justify-center align-center rounded" 
                        style="min-width:40px;width:55px;height:55px"
                        :href="this.main_setting.aparat"
                        target="_blank"
                        text 
                        >
                            <v-img width="32px" src="/icon/aparat.svg"></v-img>
                        </v-btn>
                    </div>
                </div>
                <div class="col-12 col-sm-5 d-flex flex-wrap align-center justify-space-around">
                    <v-sheet
                    max-width="150px"
                    max-height="150px" 
                    class=" flex-shrink-0  ma-1"
                    v-html="main_setting && main_setting.samandehi"
                    >
                    </v-sheet>
                    <v-sheet
                    max-width="150px"
                    max-height="150px" 
                    class=" flex-shrink-0  ma-1"
                    v-html="main_setting && main_setting.enamad"
                    >
                    </v-sheet>
                    <v-sheet
                    max-width="150px"
                    max-height="150px" 
                    class=" flex-shrink-0  ma-1"
                    v-html="main_setting && main_setting.etehadieh"
                    >
                    </v-sheet>
                </div>
            </v-col>
            <!-- <v-col class="px-3 px-sm-6 mb-5 col-12  d-flex flex-wrap align-center">
                <div class="col-12 d-flex flex-wrap align-center justify-space-around">
                    <div 
                    class=" flex-shrink-0  ma-1"
                    v-html="main_setting && main_setting.samandehi"
                    >
                    </div>
                    <div 
                    class=" flex-shrink-0  ma-1"
                    v-html="main_setting && main_setting.enamad"
                    >
                    </div>
                    <div 
                    class=" flex-shrink-0  ma-1"
                    v-html="main_setting && main_setting.etehadieh"
                    >
                    </div>
                </div>
            </v-col> -->
        </v-row>
    </v-sheet>
</template>

<script>
export default {
    data() {
    return {
      main_setting:null
    };
  },
  created(){
    this.main_setting =  this.$store.state.base.main_setting
  },
}
</script>