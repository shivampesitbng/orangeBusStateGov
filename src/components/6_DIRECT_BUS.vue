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

    <!-- footer -->
      <v-bottom-nav
        absolute
        shift
        value="true"
        style="background:rgba(0,0,0,0.45);height:55px"
        id="home_footer"
        @click="go_to_indirect_bus"
        elevation-3
      >

        <v-btn dark style="color:#fff" >
          <p style="margin-top:11%;">Find Indirect Bus</p>
        </v-btn>


      </v-bottom-nav>
    <!-- footer ends -->

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
        route_name : '',
      },
      buses_arr : [],
    }
  },
  methods:{
    ...mapMutations([

    ]),
    go_to_indirect_bus(){
      //console.log("goign to indirect bus");
      this.$router.push('/indirect_bus');
    },
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
        .then(buses_Y => {
          //console.log("Y -> " + buses_Y);
          for(let i in buses_Y){
            //console.log(buses_Y[i]+"-Y"); //** buses-Y
            this.$http.get('bus_day_&_time_from_origin/'+
              buses_Y[i]+'-Y'+'/'+
              this.$store.state.selected_date.day_in_week+
              '.json')
              .then(response=>{
                return response.json();
              })
              .then(bus_day => {
                //console.log("bus_day -> "+bus_day);
                if(bus_day != null){
                  this.bus_obj = {
                    no : buses_Y[i]+"-Y" ,
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

          if(buses_Y == null){
            this.$http.get('buses_on_route/'+str3+'.json')
              .then(response => {
                return response.json();
              })
              .then(buses_Z => {
                //console.log("Z -> "+buses_Z);
                for(let i in buses_Z){
                  //console.log(buses_Z[i]+"-Z"); //** buses-Z
                  this.$http.get('bus_day_&_time_from_origin/'+
                    buses_Z[i]+'-Z'+'/'+
                    this.$store.state.selected_date.day_in_week+
                    '.json')
                    .then(response => {
                      return response.json();
                    })
                    .then(bus_day => {
                      //console.log("bus_day -> "+bus_day);
                      if(bus_day != null){
                        this.bus_obj = {
                          no : buses_Z[i]+"-Z" ,
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

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s
}

.fade-enter, .fade-leave-active {
  opacity: 0
}

</style>
