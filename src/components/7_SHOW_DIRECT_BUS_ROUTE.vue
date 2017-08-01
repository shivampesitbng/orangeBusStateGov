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
          //console.log("show_route -> "+show_route);
          if(show_route == null){

            //
            //console.log("_pehle -> "+bus_route);
            let x = bus.route_name.indexOf("-");
            //console.log("index of '-' ->" + x);
            let str2 = bus.route_name.slice(x+1);
            //console.log(str2);
            let str1 = bus.route_name.slice(0,x);
            //console.log(str1);
            var str3 = str2 + '-' + str1;
            //console.log("_baad me -> "+str3);
            //

            this.$http.get('bus_routes/'+str3+'.json')

              .then(response => {
                return response.json();
              })
              .then(show_route=>{
                console.log(show_route);

                //
                let x = bus.no.indexOf("-");
                let str = bus.no.slice(x+1);
                //console.log("str -> "+str);

                if(str == 'UP'){
                  //console.log("UP");
                  let src_flg = false , dest_flg = false ;
                  for(let r in show_route){
                    if(this.$store.state.selected_source.name == show_route[r]){
                      console.log("source -> " + show_route[r]);
                      this.stop_name_arr.push("source -> " + show_route[r]);
                      src_flg = true;
                      continue;
                    }
                    if(this.$store.state.selected_destination.name == show_route[r]){
                      console.log("destination -> " + show_route[r]);
                      this.stop_name_arr.push("destination -> " + show_route[r]);
                      dest_flg = true;
                      continue;
                    }
                    if(src_flg == true && dest_flg == true)
                      break;
                    if(src_flg == true){
                      console.log(show_route[r]);
                      this.stop_name_arr.push(show_route[r]);
                    }
                  }
                }else if(str == 'DN'){
                  //console.log("DN");
                  let src_flg = false , dest_flg = false ;
                  for(let r = show_route.length-1; r >= 0; r-- ){
                    if(this.$store.state.selected_source.name == show_route[r]){
                      console.log("source -> " + show_route[r]);
                      this.stop_name_arr.push("source -> " + show_route[r]);
                      src_flg = true;
                      continue;
                    }
                    if(this.$store.state.selected_destination.name == show_route[r]){
                      console.log("destination -> " + show_route[r]);
                      this.stop_name_arr.push("destination -> " + show_route[r]);
                      dest_flg = true;
                      continue;
                    }
                    if(src_flg == true && dest_flg == true)
                      break;
                    if(src_flg == true){
                      console.log(show_route[r]);
                      this.stop_name_arr.push(show_route[r]);
                    }
                  }
                }
                return ;
              })
          }
          else if(show_route != null){
            //
            let x = bus.no.indexOf("-");
            let str = bus.no.slice(x+1);
            //console.log("str -> "+str);

            if(str == 'UP'){
              //console.log("UP");
              let src_flg = false , dest_flg = false ;
              for(let r in show_route){
                if(this.$store.state.selected_source.name == show_route[r]){
                  console.log("source -> " + show_route[r]);
                  this.stop_name_arr.push("source -> " + show_route[r]);
                  src_flg = true;
                  continue;
                }
                if(this.$store.state.selected_destination.name == show_route[r]){
                  console.log("destination -> " + show_route[r]);
                  this.stop_name_arr.push("destination -> " + show_route[r]);
                  dest_flg = true;
                  continue;
                }
                if(src_flg == true && dest_flg == true)
                  break;
                if(src_flg == true){
                  console.log(show_route[r]);
                  this.stop_name_arr.push(show_route[r]);
                }
              }
            }else if(str == 'DN'){
              //console.log("DN");
              let src_flg = false , dest_flg = false ;
              for(let r = show_route.length; r >= 0; r-- ){
                if(this.$store.state.selected_source.name == show_route[r]){
                  console.log("source -> " + show_route[r]);
                  this.stop_name_arr.push("source -> " + show_route[r]);
                  src_flg = true;
                  continue;
                }
                if(this.$store.state.selected_destination.name == show_route[r]){
                  console.log("destination -> " + show_route[r]);
                  this.stop_name_arr.push("destination -> " + show_route[r]);
                  dest_flg = true;
                  continue;
                }
                if(src_flg == true && dest_flg == true)
                  break;
                if(src_flg == true){
                  console.log(show_route[r]);
                  this.stop_name_arr.push(show_route[r]);
                }
              }
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

<style scoped>
#main{
  margin-top:-10%;
}
</style>
