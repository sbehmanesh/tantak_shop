<template>
    <div>
        <v-card 
        nuxt
        :to="this.type == 'product'? '/product/'+ this.data.slug:'/blog/'+ encodeURI(this.data.slug)"
        @click="redirectPage"
        class="elevation-0 pl-2 pl-sm-6 rounded-0 transparent" 
        :width="max_width"
        >
            <v-img :aspect-ratio="1" :src="$getImage($resizeImage(data.main_picture_path))" :alt="data.name">
    
            <!-- top img -->
            <div 
            v-if="data.has_whole_sell == 1 && data.has_single_sell == 0"
            class="d-flex align-center justify-start" 
            style="position:absolute; width: 100%;top:0 ;opacity: 0.85;"
            >
                <div class="primary whited--text font_12 py-1 px-2 mt-3">فروش فله</div>
            </div>
            <!-- top img end -->
    
    
            </v-img>
            <v-card-title 
            class="pa-0 mt-3 "
            :class="[$vuetify.breakpoint.mdAndUp?'font_16':'font_14']"
            >{{data.name || data.title}}</v-card-title>
        </v-card>
    </div>
</template>

<script>
export default {
    props:{
        data:{
            type:Object,
            required:true
        },
        width:{
            type:String,
            default:null
        },
        type:{
            type:String,
            required:true
        }
    },
    data:()=>({
    }),
    computed:{
        max_width(){
            if(this.width) return 'auto'
            return this.$vuetify.breakpoint.smAndUp?'300px':'170px'
        },
    },
    mounted(){
    },
    methods:{
        redirectPage(){
            if(this.type == 'product'){
                this.$router.push('/product/'+ this.data.slug)
            }
            if(this.type == 'post'){
                this.$router.push('/blog/'+ encodeURI(this.data.slug))
            }
        }
    }
}
</script>