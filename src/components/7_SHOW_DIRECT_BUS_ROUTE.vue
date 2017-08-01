<template>
  <div>
    <v-container fluid id="main">
      <v-card class="white lighten-4 elevation-3">
        <li v-for="stop in stop_name_arr">
          {{stop}}
        </li>
      </v-card>
    </v-container>
  </div>
</template>

<script>

import {mapGetters} from 'vuex'
import {mapMutations} from 'vuex'

export default{
  data(){
    return{
      stop_name_arr : [],
    }
  },
  methods :{
    ...mapMutations([

    ]),
    show_bus_route(bus){
      this.stop_name_arr = [];
      //console.log("clicking on -> "+bus.no + " "+bus.route_name);
      this.$http.get('bus_routes/'+bus.route_name+'.json')
        .then(response => {
          return response.json();
        })
        .then(show_route => {

          //
          let x = bus.no.indexOf("-");
          let str = bus.no.slice(x+1);
          //console.log("str -> "+str);

          if(str == 'UP'){
            //console.log("UP");
            for(let r in show_route){
              if(this.$store.state.selected_source.name == show_route[r]){
                console.log("source -> " + show_route[r]);
                this.stop_name_arr.push("source -> " + show_route[r]);
                continue;
              }
              if(this.$store.state.selected_destination.name == show_route[r]){
                console.log("destination -> " + show_route[r]);
                this.stop_name_arr.push("destination -> " + show_route[r]);
                continue;
              }
              console.log(show_route[r]);
              this.stop_name_arr.push(show_route[r]);
            }
          }else if(str == 'DN'){
            //console.log("DN");
            for(let r = show_route.length(); r >= 0; r-- ){
              if(this.$store.state.selected_source.name == show_route[r]){
                console.log("source -> " + show_route[r]);
                this.stop_name_arr.push("source -> " + show_route[r]);
                continue;
              }
              if(this.$store.state.selected_destination.name == show_route[r]){
                console.log("destination -> " + show_route[r]);
                this.stop_name_arr.push("destination -> " + show_route[r]);
                continue;
              }
              console.log(show_route[r]);
              this.stop_name_arr.push(show_route[r]);
            }
          }
        })
    }
  },
  computed : {
    ...mapGetters([
      'selected_bus_detail'
    ]),
  },
  beforeMount(){
    this.show_bus_route(this.$store.state.selected_bus_detail);
  }
}
</script>
