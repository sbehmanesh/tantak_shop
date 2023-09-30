<template>
    <div style="height:100%" class="d-flex align-center justify-center py-4">
        <div v-if="!user"  >
            <span>برای اینکه دیدگاه بگذارید 
                <span 
                class="primary--text" 
                style="cursor:pointer"
                @click="$store.dispatch('auth/loginDialog',true)"
                >وارد شوید</span>
            </span>
        </div>
        <v-form ref="form" v-if="user" v-model="valid" @submit.prevent="addComment">
            <v-row no-gutters class=" pa-3 pa-md-6" style="height:100%">
                <!-- <v-col class="col-12">
                    <amp-input text="نام و نام خانوادگی" outlined label="نام و نام خانوادگی"></amp-input>
                </v-col> -->
                <!-- <v-col class="col-12">
                    <amp-input text="ایمیل" outlined label="ایمیل" type="email" rules="email"></amp-input>
                </v-col> -->
                <v-col class="col-12">
                    <amp-textarea v-model="content" rules="require"  text="دیدگاه خود را بنویسید" label="دیدگاه خود را بنویسید" ></amp-textarea>
                </v-col>
                <v-col class=" d-flex align-center justify-center mt-3">
                    <v-btn type="submit" class="primary " :disabled="!valid" style="letter-spacing:0" large>
                        ارسال دیدگاه
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
    </div>
</template>
<script>
export default {
    props:{
        target_id:{
            type:String,
            required:true,
        },
        target_type:{
            type:String,
            required:true,
        }
    },
    data:()=>({
        valid:false,
        content:'',
        user:null
    }),
    mounted(){
        if(this.$store.state.auth.user)
            this.user = this.$store.state.auth.user
    },
    methods:{
        addComment(){
            let form = {
                target_id:this.target_id,
                user_id:this.user.id,
                target_type:this.target_type,
                content:this.content
            }
            this.$reqApi('/comment/insert',form)
            .then(res => {
                this.$refs.form.reset()
                this.$toast.success("نظر شما با موفقیت ثبت شد")
                this.$emit('updateComment',res)
            })
            .catch(error => this.$toast.error("متاسفانه نظر ثبت نشد"))
        }
    }
}
</script>