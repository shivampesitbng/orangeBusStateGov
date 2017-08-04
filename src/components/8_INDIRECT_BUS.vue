<template>
  <div>
  <transition name="fade">
    <v-container fluid id="main"  v-if="show2">
      <v-card class="white lighten-4 elevation-3">

        <li v-for="set in indirect_arr" >

          <span>
            {{set.bus_1.no}} - {{set.bus_1.type}}
            <button @click="get_bus_route(set.bus_1);">route</button>
          </span>
          <!--span v-for='bus in set.bus_1.no'>
            {{bus}}
            <button @click="get_bus_route(set.bus_1);">route</button>
          </span--> |

          {{set.bus_1.wp}} |

          <span>
            {{set.bus_2.no}} - {{set.bus_2.type}}
            <button @click="get_bus_route(set.bus_2)">route</button>
          </span>
          <!--span v-for='bus in set.bus_2.no'>
            {{bus}}
            <button @click="get_bus_route(set.bus_2)">route</button>
          </span-->

        </li>

      </v-card>
    </v-container>
  </transition >

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
      wp_arr : [] ,
    }
  },
  methods:{
    ...mapMutations([
      'get_bus_route'
    ]),
    go_to_direct_bus(){
      //console.log("going to direct_bus");
      this.$router.push("/direct_bus");
    },
    show_again(){
      this.$store.state.show2 = true
    }
  },
  computed:{
    ...mapGetters([
      'indirect_arr','selected_source','selected_destination','indirect_bus_flg','show2'
    ]),
  },
  beforeMount(){
    this.show_again();
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
#main{
  margin-top:-10%;
}

</style>
