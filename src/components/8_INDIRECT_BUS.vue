<template>
  <div>
    <v-container fluid id="main">
      <v-card class="white lighten-4 elevation-3">
        <p>indirect bus</p>

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

    ]),
    go_to_direct_bus(){
      //console.log("going to direct_bus");
      this.$router.push("/direct_bus");
    },
  },
  computed:{
    ...mapGetters([
      'selected_source','selected_destination'
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
