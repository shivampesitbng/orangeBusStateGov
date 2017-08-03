<template>
  <div>
    <v-container fluid id="main">
      <v-card class="white lighten-4 elevation-3">

        <!--p>direct buses route</p-->

        <v-layout row>

          <v-flex xs4 >
            <li v-for="route in bus_route">
              {{route}}
            </li>
          </v-flex>

          <v-flex xs4 >
            <p>dist</p>
            <li v-for="dist in bus_dist">
              {{dist}}
            </li>
          </v-flex>

          <v-flex xs4 >
            <p>time</p>
            <li v-for="time in bus_time">
              {{time}}
            </li>
          </v-flex>

        </v-layout>

      </v-card>
    </v-container>
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
  },
  computed:{
    ...mapGetters([
      'bus_route','bus_dist','bus_time'
    ]),
  },
  beforeMount(){

  }
}
</script>

<style scoped>
</style>
