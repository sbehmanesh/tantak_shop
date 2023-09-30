<template>
    <v-form v-model="valid" >
        <v-row no-gutters>
            <v-col class="col-12">
                <RangeSlider v-model="form.range" :min="0" :max="200" lable="قیمت"/>
            </v-col>
            <v-col class="col-12 text-center">
                <v-btn icon large @click="restFilter">
                    <v-icon>mdi-refresh</v-icon>
                </v-btn>
                <v-btn @click="addFilter" class="primary" large style="letter-spacing:0" >
                    فیلتر
                </v-btn>
            </v-col>
        </v-row>
    </v-form>
</template>

<script>
import RangeSlider from '../Form/RangeSlider.vue';
export default {
    components: { RangeSlider},
    data:()=>({
        loading:false,
        valid:true,
        form:{
            range:[0,200],
        }
    }),
    methods:{
        restFilter(){
            this.$store.dispatch("base/setProductListFilter", {});
        },
        addFilter(){
            let filter = this.$store.state.base.product_list.filter
            for(let key in this.form){
                if(!filter[key]){
                    filter[key] = this.form[key]
                }else{
                    filter[key] = this.form[key]
                }
            }
            this.$store.dispatch("base/setProductListFilter", filter);
        }

    }
}
</script>