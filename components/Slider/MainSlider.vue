<template>
    <div>
        <v-hover v-slot="{hover}">
          <v-carousel cycle v-model="current_item"  height="auto" hide-delimiters :show-arrows="false">
            <v-carousel-item v-for="(slide,index) in slider_item" :key="index">
              <v-img contain :aspect-ratio="20/9" :src="slide.image" :alt="slide.title" ></v-img>
            </v-carousel-item>
            <!-- slider control -->
            <v-fade-transition>
              <div v-if="hover" class="d-flex flex-column justify-center align-center my-16 mx-10" style="position:absolute;z-index:1;bottom:0">
                <div class="d-flex">
                  <div 
                  v-for="(slide,index) in slider_item" 
                  :key="index"
                  :class="['rounded-circle', current_item == index && 'blackd'] " 
                  style="width:8px;height:8px;margin: 4px; border: 1px solid black !important;">
                  </div>
                </div>
                <div>
                  <v-icon @click="current_item--" class="ma-2" size="32" color="blackd">mdi-arrow-right</v-icon>
                  <v-icon @click="current_item++" class="ma-2" size="32" color="blackd">mdi-arrow-left</v-icon>
                </div>
              </div>
            </v-fade-transition>
            <!-- slider control end -->
          </v-carousel>
        </v-hover>
    </div>
</template>

<script>
export default {
  props:{
    slider_item:{
      type:Array,
      default:()=>{
        return [{ image: "", title: "", link: "" }]
      }
    }
  },
  data:()=>({
    // slider_item:[
    //   {
    //     image:"/image/slider1.jpg",
    //     title:"title"
    //   },
    //   {
    //     image:"/image/slider2.jpg",
    //     title:"title"
    //   },
    //   {
    //     image:"/image/slider3.jpg",
    //     title:"title"
    //   },
    //   {
    //     image:"/image/slider4.jpg",
    //     title:"title"
    //   },
    // ],
    current_item:0,
  }),
}
</script>