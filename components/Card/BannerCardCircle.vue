    <template>
    <div>
        <div class="d-flex px-2 overflow-auto">
            <div class="col-3 d-flex flex-column justify-center pa-1 " style="cursor: pointer;" v-for="(banner,index) in banners" :key="index">
                <v-img 
                :aspect-ratio="1"
                @click="goToCategoryPage(banner)" 
                :src="$getImage(banner.main_pic_path)" 
                :alt="banner.alt" width="100%" 
                class="rounded-circle"
                >
                </v-img>
                <div class="mt-3 font_12 text-center" style="">{{banner.title}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        banners:{
            type:Array
        }
    },
    data:() =>({
        banner_items:[
            {src:"/image/banner1.jpg",alt:"alt",text:"عسل"},
            {src:"/image/banner2.jpg",alt:"alt",text:"دمنوش"},
            {src:"/image/banner3.jpg",alt:"alt",text:"ادویه"},
            {src:"/image/banner4.jpg",alt:"alt",text:"گیاهان دارویی"},
        ]
    }),
    methods:{
    goToCategoryPage(item) {
      let slug = item.id;
      if (item.slug) {
        slug = item.slug;
      }
      this.$router.push("/product-category/" + slug);
    },
    }
    
}
</script>