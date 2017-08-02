<template>
  <div>
    time from origin
  </div>
</template>

<script>

import {mapGetters} from 'vuex'
import {mapMutations} from 'vuex'

export default{
  data(){
    return{

    }
  },
  methods:{
    ...mapMutations([

    ]),
    get_bus_time_from_origin(bus,date,time_sum_frm_origin_to_src){
      console.log("get bus time from origin of bus -> "+bus.no);
      this.$http.get('bus_day_&_time_from_origin/'+bus.no+
        '/'+ date.day_in_week+'.json')
        .then(response => {
          return response.json();
        })
        .then(time_from_origin=>{
          console.log(time_from_origin); //  origin_time
          console.log("time sum (origin -> src) -> "+time_sum_frm_origin_to_src);
          for(let i in time_from_origin){
            console.log(time_from_origin[i]);
            //src_time = cal_src_time(time_from_origin[i], time_sum_frm_origin_to_src);
          }
        })
    },
  },
  computed:{
    ...mapGetters([
      'selected_bus_detail','selected_date','time_sum_frm_origin_to_src'
    ])
  },
  beforeMount(){
    this.get_bus_time_from_origin(this.$store.state.selected_bus_detail,
      this.$store.state.selected_date,
        this.$store.state.time_sum_frm_origin_to_src);
  }
}
</script>

<style scoped>

</style>
