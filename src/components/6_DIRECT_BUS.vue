<template>

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
          for(var i in buses_up){
            console.log(buses_up[i]+"-UP"); //** buses-up
          }
          //
          //console.log("_pehle -> "+bus_route);
          let x = bus_route.indexOf("-");
          //console.log("index of '-' ->" + x);
          var str2 = bus_route.slice(x+1);
          //console.log(str2);
          var str1 = bus_route.slice(0,x);
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
                  console.log(buses_dn[i]+"-DN"); //** buses-dn
                }
              })
            }
        })
    }
  },
  computed:{
    ...mapGetters([
      'selected_source','selected_destination'
    ])
  },
  beforeMount(){
    this.get_bus_routes(this.get_buses_on_route);
  },
}

</script>
<style scoped>
</style>
