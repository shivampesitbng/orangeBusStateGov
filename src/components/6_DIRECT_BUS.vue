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
          console.log("bus routes -> " + bus_routes);
          //callback -> get_buses_on_route
          callback_get_buses_on_route(bus_routes);
        });
    },
    get_buses_on_route(x){
      console.log("calling -> get_buses_on_route -> " + x)
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
