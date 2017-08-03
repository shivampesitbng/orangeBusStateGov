<template>
  <div>
    <v-container fluid id="main">
      <v-card class="white lighten-4 elevation-3">

        <li v-for="set in indirect_arr" >

          {{set.wp}} |

          <span v-for='bus in set.bus_1.no'>
            {{bus}}
            <button @click="get_bus_route(set.bus_1)">route</button>
          </span> |

          <span v-for='bus in set.bus_2.no'>
            {{bus}}
            <button @click="get_bus_route(set.bus_2)">route</button>
          </span>

        </li>

        <p v-if="indirect_bus_flg == false && indirect_bus_flg2 == true">NO INDIRECT BUS ON THIS ROUTE !</p>

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
  },
  computed:{
    ...mapGetters([
      'indirect_arr','selected_source','selected_destination','indirect_bus_flg','indirect_bus_flg2'
    ]),
  },
  beforeMount(){

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

#main{
  margin-top:-10%;
}

</style>
