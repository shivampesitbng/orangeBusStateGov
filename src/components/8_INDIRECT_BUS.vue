<template>
  <div>
    <v-container fluid id="main">
      <v-card class="white lighten-4 elevation-3">
        <p>indirect bus</p>
        <!--li v-for="bus in buses_arr">
          {{bus.no}}
          <button @click="route_to_show_bus_route(bus)">route</button>
        </li-->
      </v-card>
    </v-container>

    <!-- footer -->
      <v-bottom-nav
        absolute
        shift
        value="true"
        style="background:rgba(0,0,0,0.45);height:55px"
        id="home_footer"
        @click="go_to_direct_bus"
        elevation-3
      >

        <v-btn dark style="color:#fff" >
          <p style="margin-top:17.5%;">Direct Bus</p>
        </v-btn>


      </v-bottom-nav>
    <!-- footer ends -->

  </div>
</template>

<script>

import {mapMutations} from 'vuex'
import {mapGetters} from 'vuex'

export default{
  data(){
    return{

    }
  },
  methods:{
    ...mapMutations([

    ]),
    go_to_direct_bus(){
      //console.log("going to direct_bus");
      this.$router.push("/direct_bus");
    },
    get_waypoints(src,dest,get_route_src_wp,get_route_wp_dest){
      //console.log("get_indirect_bus -> "+ src.name + " to " + dest.name);
      this.$http.get('city_route_matrix/'+src.name+'.json')
        .then(response=>{
          return response.json();
        })
        .then(waypoints=>{
          //console.log(waypoints);
          //console.log(Object.keys(waypoints));
          for(let i in Object.keys(waypoints)){
            //console.log(Object.keys(waypoints)[i]);
            this.$http.get('city_route_matrix/'+Object.keys(waypoints)[i]
              +'/'+dest.name+'.json')
              .then(response=>{
                return response.json();
              })
              .then(wp_dest_route=>{
                //console.log(wp_dest_route);
                if(wp_dest_route != null){
                  console.log("waypoints->" + Object.keys(waypoints)[i]);
                }
              })
          }
        })
    },

  },
  computed:{
    ...mapGetters([
      'selected_source','selected_destination'
    ]),

  },
  beforeMount(){
    this.get_waypoints(this.$store.state.selected_source,
      this.$store.state.selected_destination);
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s
}

.fade-enter, .fade-leave-active {
  opacity: 0
}

#manipulate {
    position:absolute;
    width:100%;
    background:#063;
    bottom:0px;
    right:25%;
    left:50%;
    margin-left:-150px;
}
</style>
