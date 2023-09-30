<template>
    <v-row no-gutters>
        <v-col class="col-12 col-md-8">
            <CommentContent  :comment="all_comment"/>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col class="col-12 col-md-4">
            <CommentForm :target_id="target_id" :target_type="target_type" @updateComment="updateComment"/>
        </v-col>
    </v-row>
</template>

<script>
import CommentForm from './CommentForm.vue';
import CommentContent from './CommentContent.vue';
export default {
    components: { CommentForm, CommentContent },
    props:{
        target_id:{
            type:String,
            required:true,
        },
        target_type:{
            type:String,
            required:true,
        },
        comment:{
            type:Array
        }
    },
    data:()=>({
        all_comment:[]
    }),
    mounted(){
        this.all_comment = this.comment
    },
    methods:{
        updateComment(res){
            
            this.all_comment.unshift(res)

        }
    }
}
</script>