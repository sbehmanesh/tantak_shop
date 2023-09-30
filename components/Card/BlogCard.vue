<template>
    <div>
        <v-card 
        nuxt
        :to="'/blog/'+encodeURI(data.slug)"
        class="elevation-0 ml-2 ml-sm-6 rounded-0 transparent" 
        :width="max_width"
        >
            <v-img :aspect-ratio="1" :src="$getImage($resizeImage(data.main_picture_path), blog = true)" :alt="data.alt">
    <!-- <div>{{ data.main_picture_path }}}</div> -->
            <!-- top img -->
            <!-- <div class="d-flex align-center justify-start" style="position:absolute; width: 100%;top:0 ;">
                <div class="error whited--text py-1 px-3 mt-3">70%</div>
            </div> -->
            <!-- top img end -->
    
            <!-- bottom img -->
            <!-- <div class="d-flex align-center justify-end" style="position:absolute; width: 100%;bottom:0 ;">
                <div class="error whited--text py-1 px-3 mt-3">70%</div>
            </div> -->
            <!-- bottom img end -->
    
            </v-img>
            <v-card-title 
            style="min-height:32px;max-height:32px ;overflow: hidden;" 
            class="pa-0 mt-3"
            :class="[$vuetify.breakpoint.mdAndUp?'font_16':'font_14']"
            >{{data.title}}</v-card-title>
            <v-card-text 
            style="min-height:88px;max-height:88px ;overflow: hidden;" 
            class="pa-0 text-justify font_12">
            {{summery}}
            </v-card-text>
            <v-card-text class="pa-0 mt-3 d-flex justify-space-between">
    
            <!-- price with discount -->
            <div class="text--disabled" >
                <div class="d-flex align-center justify-center">
                    <span class="font_12">{{data.comment_count}}</span>
                    <v-icon class="px-1" size="15">mdi-message-reply</v-icon>
                </div>
            </div>
            <div class="font_12">
                {{$jmoment(data.publish_at).format('jYYYY/jMM/jDD')}}
            </div>
            <!-- price with discount end -->
    
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    props:{
        data:{
            type:Object,
            default:{}
        },
        width:{
            type:String,
            default:null
        },
    },
    mounted(){
    },
    computed:{
        max_width(){
            if(this.width) return 'auto'
            return this.$vuetify.breakpoint.smAndUp?'300px':'240px'
        },
        summery(){
            if(this.data.excerpt) return this.data.excerpt
            if(this.data.content) return this.data.content.replace( /(<([^>]+)>)/ig, '').replace(/&nbsp;/g,'')
            return ""
        }
    },
    methods:{
    }
}
</script>