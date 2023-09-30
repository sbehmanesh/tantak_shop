<template>
    <div>
      <v-responsive>
        <v-row>
          <v-col class="flex-grow-0" v-if="$vuetify.breakpoint.mdAndUp">
            <v-item-group v-model="current_item"  mandatory>
              <v-row no-gutters class="flex-column">
                <v-col 
                v-for="(slide,index) in slider_item" 
                :key="index"
                class="col-12 flex-grow-0 pb-3">
                  <v-item v-slot="{ active, toggle }">
                    <v-img 
                    :color="active ? 'primary' : ''"
                    @click="toggle"
                    width="70px"
                    aspect-ratio="1" 
                    :src="$getImage($resizeImage(slide.image))" 
                    :alt="slide.title" 
                    ></v-img>
                  </v-item>
                </v-col>
              </v-row>
            </v-item-group>
          </v-col>
          <v-col>
            <v-carousel 
            v-model="current_item"  
            height="auto" 
            hide-delimiters
            show-arrows-on-hover
            >
              <v-carousel-item v-for="(slide,index) in slider_item" :key="index">
                <v-img aspect-ratio="1" :src="$getImage($resizeImage(slide.image))" :alt="slide.title" ></v-img>
              </v-carousel-item>
              <template v-slot:prev="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on" class="ma-2" size="32" color="white">mdi-arrow-right</v-icon>
              </template>
              <template v-slot:next="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on" class="ma-2" size="32" color="white">mdi-arrow-left</v-icon>
              </template>
              <!-- slider control -->
              <v-fade-transition>
                <div 
                class="d-flex flex-column justify-center align-center py-6 px-10" 
                style="position:absolute;z-index:1;bottom:0;width:100%">
                  <div class="d-flex">
                    <div 
                    v-for="(slide,index) in slider_item" 
                    :key="index"
                    :class="['rounded-circle', current_item == index && 'white'] " 
                    style="width:12px;height:12px;margin: 4px; border: 1px solid black !important;">
                    </div>
                  </div>
                </div>
              </v-fade-transition>
              <!-- slider control end -->
            </v-carousel>
          </v-col>
        </v-row>
      </v-responsive>
    </div>
</template>

<script>
export default {
  props:{
    slider_item:{
      type:Array
    }
  },
  data:()=>({
    // slider_item:[
    //   {
    //     src:"/image/product1.jpg",
    //     alt:"alt"
    //   },
    //   {
    //     src:"/image/product2.jpeg",
    //     alt:"alt"
    //   },
    //   {
    //     src:"/image/product3.jpeg",
    //     alt:"alt"
    //   },
    //   {
    //     src:"/image/product4.jpg",
    //     alt:"alt"
    //   },
    // ],
    current_item:0,
  }),
  mounted(){
  },
}
</script>