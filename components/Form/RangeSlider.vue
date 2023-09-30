<template>
    <v-row no-gutters class="">
        <v-col class="d-flex col-12 pb-3">
            <span>{{lable}}</span>
        </v-col>
        <v-col class="col-5">
            <v-text-field solo dense hide-details    type="number" v-model="range[0]"/>
        </v-col>
        <v-col class="col-2"></v-col>
        <v-col class="col-5">
            <v-text-field solo dense hide-details    type="number" v-model="range[1]"/>
        </v-col>
        <v-col>
            <v-range-slider
            v-model="range"
            :min="min"
            :max="max"
            @input="changeInput"
            >
        
            </v-range-slider>
        </v-col>
    </v-row>
</template>

<script>
export default {
    props:{
        lable:{
            type:String,
            default:"قیمت"
        },
        min:{
            type:Number|String,
            default:0
        },
        max:{
            type:Number|String,
            default:100
        },

        // can have value array like [10,30]
        value:{
            default:null
        },
    },
    data:()=>({
        range:[0,100],
        min_value:null,
        max_value:null
    }),
    mounted(){
        this.value ? this.range = this.value : this.range = [this.min,this.max]
        // this.changeInput()
    },
    methods:{
        changeInput(){
            this.$emit("input",this.range)
        }
    }
}
</script>