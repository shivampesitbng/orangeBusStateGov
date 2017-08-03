<template>
  <div>
    <v-container fluid id="main">
      <v-card class="white lighten-4 elevation-3">

        <!--p>direct bus</p-->

        <li v-for="bus in direct_buses">
          {{bus.no}}
          <button @click="get_bus_route(bus)">route</button>
        </li>

        <p v-if="direct_bus_flg == false && direct_bus_flg_2==true">NO DIRECT BUS ON THIS ROUTE !</p>

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

    }
  },
  methods:{
    ...mapMutations([
      'get_bus_route'
    ]),

    /*** go to indirect_bus ***/
    go_to_indirect_bus(){
      //console.log("goign to indirect bus");
      this.$router.push('/indirect_bus');
    },
    /*** go to indirect_bus ends ***/

  },
  computed:{
    ...mapGetters([
      'direct_buses','direct_bus_flg','direct_bus_flg_2','selected_source','selected_destination'
    ])
  },
  beforeMount(){

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
