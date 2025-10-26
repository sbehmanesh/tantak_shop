<template>
    <div>
    <v-col cols="12" class="pa-0">
      <v-carousel
    cycle
    height="450"
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item
     v-for="(slide,index) in slider_item" :key="index"
    >
    <v-img contain :aspect-ratio="20/9" :src="$getImage(slide.image)" :alt="slide.title" ></v-img>
    </v-carousel-item>
  </v-carousel></v-col>






      
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
  mounted(){
    console.log(">>mounted>>>" , this.slider_item);
    
  }
}
</script>