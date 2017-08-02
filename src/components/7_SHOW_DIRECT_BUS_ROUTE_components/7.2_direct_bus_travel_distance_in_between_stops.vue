<template>
  <div>
    distance
    <li v-for="dist in dist_in_between_stops_arr">{{dist}}</li>
  </div>
</template>

<script>

import {mapGetters} from 'vuex'
import {mapMutations} from 'vuex'

export default {
  data(){
    return{
      dist_in_between_stops_arr : [],
    }
  },
  methods : {
    ...mapMutations([

    ]),
    get_distance_between_stops(bus){

      //
      //console.log("_pehle -> "+bus.no);
      let x = bus.no.indexOf("-");
      //console.log(str2);
      let str1 = bus.no.slice(0,x);
      console.log("ye chahy -> "+str1);
      let str2 = bus.no.slice(x+1);
      console.log(str2);
      //

      console.log("get_distance_between_stops_function -> "+bus.no + " "
        + bus.route_name+ " "
        + bus.route);
      this.$http.get('bus_travel_distance_in_between_stops/'+
        + str1 + '.json')
        .then(response => {
          return response.json();
        })
        .then(dist => {
          console.log(dist);
          if(str2 == 'Y'){
            console.log("--Y--");
            let marked_src = -1 , marked_dest = -1 ;
            for(let i in bus.route){
              //console.log(bus.route[i]);
              if(this.$store.state.selected_source.name == bus.route[i]){
                marked_src = i ;
                console.log("maraked source->"+marked_src);
              }
              if(this.$store.state.selected_destination.name == bus.route[i]){
                marked_dest = i ;
                console.log("maraked destination->"+marked_dest);
              }
            }
            this.dist_in_between_stops_arr.push("0 km");
            let dist_sum = 0;
            for(let i=marked_src ; i<=marked_dest-1 ; i++){
              console.log("dist->"+dist[i]);
              dist_sum = dist_sum + dist[i];
              this.dist_in_between_stops_arr.push(dist_sum+" km");
            }
          }else if(str2 == 'Z'){
            console.log("--Z--");
            let marked_src = -1 , marked_dest = -1 ;
            for(let i=bus.route.length-1 ; i>=0 ; i--){
              //console.log(bus.route[i]);
              if(this.$store.state.selected_source.name == bus.route[i]){
                marked_src = i ;
                console.log("maraked source->"+marked_src);
              }
              if(this.$store.state.selected_destination.name == bus.route[i]){
                marked_dest = i ;
                console.log("maraked destination->"+marked_dest);
              }
            }
            let dist_sum = 0;
            this.dist_in_between_stops_arr.push("0 km");
            for(let i=marked_src-1 ; i>=marked_dest ; i--){
              console.log("dist->"+dist[i]);
              dist_sum = dist_sum + dist[i];
              this.dist_in_between_stops_arr.push(dist_sum+" km");
            }
          }
        })
    }
  } ,
  computed :{
    ...mapGetters([
      'selected_bus_detail'
    ])
  },
  beforeMount()  {
    this.get_distance_between_stops(this.$store.state.selected_bus_detail);
  },
}
</script>

<style scoped>

</style>
