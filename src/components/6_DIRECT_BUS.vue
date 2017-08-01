<template>
  <div>
    <v-container fluid id="main">
      <v-card class="white lighten-4 elevation-3">
        <li v-for="bus in buses_arr">
          {{bus.no}}
          <button @click="route_to_show_bus_route(bus)">route</button>
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
      bus_obj :{
        no : '',
        route_name : ''
      },
      buses_arr : []
    }
  },
  methods:{
    ...mapMutations([

    ]),
    get_bus_routes(callback_get_buses_on_route){
      this.$http.get('city_route_matrix/'+
        this.$store.state.selected_source.name + '/' +
          this.$store.state.selected_destination.name + '.json')
        .then(response => {
          return response.json();
        })
        .then(bus_routes => {
          //console.log("bus routes -> " + bus_routes);
          //callback -> get_buses_on_route
          for(let i in bus_routes){
            callback_get_buses_on_route(bus_routes[i]);
          }
        });
    },
    get_buses_on_route(bus_route){
      //console.log("calling -> get_buses_on_route -> " + bus_route);
      this.$http.get('buses_on_route/'+bus_route+'.json')
        .then(response => {
          return response.json();
        })
        .then(buses_up => {
          //console.log("up -> " + buses_up);
          for(let i in buses_up){
            //console.log(buses_up[i]+"-UP"); //** buses-up
            this.$http.get('bus_day_&_time_from_origin/'+
              buses_up[i]+'-UP'+'/'+
              this.$store.state.selected_date.day_in_week+
              '.json')
              .then(response=>{
                return response.json();
              })
              .then(bus_day => {
                //console.log("bus_day -> "+bus_day);
                if(bus_day != null){
                  this.bus_obj = {
                    no : buses_up[i]+"-UP" ,
                    route_name : bus_route
                  } //** bus on that day
                  this.buses_arr.push(this.bus_obj);
                }
              })
          }

          //
          //console.log("_pehle -> "+bus_route);
          let x = bus_route.indexOf("-");
          //console.log("index of '-' ->" + x);
          let str2 = bus_route.slice(x+1);
          //console.log(str2);
          let str1 = bus_route.slice(0,x);
          //console.log(str1);
          var str3 = str2 + '-' + str1;
          //console.log("_baad me -> "+str3);
          //

          if(buses_up == null){
            this.$http.get('buses_on_route/'+str3+'.json')
              .then(response => {
                return response.json();
              })
              .then(buses_dn => {
                //console.log("dn -> "+buses_dn);
                for(let i in buses_dn){
                  //console.log(buses_dn[i]+"-DN"); //** buses-dn
                  this.$http.get('bus_day_&_time_from_origin/'+
                    buses_dn[i]+'-DN'+'/'+
                    this.$store.state.selected_date.day_in_week+
                    '.json')
                    .then(response => {
                      return response.json();
                    })
                    .then(bus_day => {
                      //console.log("bus_day -> "+bus_day);
                      if(bus_day != null){
                        this.bus_obj = {
                          no : buses_dn[i]+"-DN" ,
                          route_name : bus_route
                        } //** bus on that day
                        this.buses_arr.push(this.bus_obj);
                      }
                    })
                }
              })
          }
        })
    },
    route_to_show_bus_route(bus){
       this.$store.state.selected_bus_detail = bus ;
       this.$router.push("/direct_bus_route");
    }
  },
  computed:{
    ...mapGetters([
      'selected_source','selected_destination','selected_date'
    ])
  },
  beforeMount(){
    this.get_bus_routes(this.get_buses_on_route);
  },
}

</script>
<style scoped>
#main{
  margin-top:-10%;
}
</style>
