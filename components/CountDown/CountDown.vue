<template>
    <v-row no-gutters class="justify-space-around align-center">
        <v-col class="text-center d-flex flex-column">
            <span>
                {{sec}}
            </span>
            <span class="font_12 " >ثانیه</span>
        </v-col>
        <v-col class="text-center">:</v-col>
        <v-col class="text-center d-flex flex-column">
            <span>
                {{min}}
            </span>
            <span class="font_12" >دقیقه</span>
        </v-col>
        <v-col class="text-center">:</v-col>
        <v-col class="text-center d-flex flex-column">
            <span>
                {{hr}}
            </span>
            <span class="font_12" >ساعت</span>
        </v-col>
        <v-col class="text-center">:</v-col>
        <v-col class="text-center d-flex flex-column">
            <span>
                {{day}}
            </span>
            <span class="font_12" >روز</span>
        </v-col>
    </v-row>
</template>

<script>
export default {
    props:{
        end_time:{
            type:String,
            required:true
        }
    },
    data:()=>({
        timer: {
            time: 0,
            interval: null,
        },
        sec:null,
        min:null,
        hr:null,
        day:null
    }),
    mounted(){
        let end = this.$jmoment(this.end_time,'YYYY-MM-DD HH:mm:ss').format('x')
        let start = this.$jmoment().format('x')  
        const time_sec = Math.floor((end - start)/1000)
        this.timer.time = time_sec
        this.startTime()

    },
    beforeDestroy() {
        if (this.timer.interval) {
        clearInterval(this.timer.interval)
        }
    },
    methods:{
        startTime() {
            if (this.timer.interval) {
                clearInterval(this.timer.interval)
            }
            this.timer.interval = setInterval(() => {
            if (this.timer.time > 0) {
                this.sec = Math.floor((this.timer.time)%60) 
                this.min = Math.floor(((this.timer.time)/60)%60) 
                this.hr  = Math.floor((this.timer.time)/(60*60)%24)
                this.day = Math.floor((this.timer.time)/(60*60*24))
                this.timer.time -= 1
            } else {
                clearInterval(this.timer.interval)
            }
            }, 1000)
        }
    }
}
</script>