<template>
  <div>

  <transition name="fade">
    <v-container fluid id="main"  v-if="show2">
      <v-card class="white lighten-4 elevation-3">

        <!--p>direct bus</p-->

        <li v-for="bus in direct_buses">
          {{bus.no}}
          <button @click="get_bus_route(bus)">route</button>
        </li>

        <p v-if="direct_bus_flg == false && direct_bus_flg_2==true">NO DIRECT BUS ON THIS ROUTE !</p>

      </v-card>
    </v-container>
</transition >

  <transition name="fade">
    <!-- footer -->
      <v-bottom-nav
        v-if="this.$store.state.indirect_bus_flg"
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
      <v-bottom-nav
        v-else
        absolute
        shift
        value="true"
        style="background:rgba(0,0,0,0.45);height:55px"
        id="home_footer"

        elevation-3
      >

        <v-btn dark style="color:#fff;" v-if="show3">
          <p style="margin-top:8%;">
            No Indirect-Bus Found !
            <br>
            Status May Change !
          </p>
        </v-btn>


      </v-bottom-nav>

      </transition >
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
      //document.getElementById('main-app').style.display="none";
      this.$router.push('/indirect_bus');
      //document.getElementById('main-app').style.display="block";
    },
    /*** go to indirect_bus ends ***/
    show_again(){
      this.$store.state.show2 = true
    }
  },
  computed:{
    ...mapGetters([
      'direct_buses','direct_bus_flg','direct_bus_flg_2','selected_source','selected_destination','indirect_bus_flg',
      'show2','show3'
    ])
  },
  beforeMount(){
    this.show_again();
  },
}

</script>
<style scoped>
#main{
  margin-top:-10%;
}



.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}

</style>
