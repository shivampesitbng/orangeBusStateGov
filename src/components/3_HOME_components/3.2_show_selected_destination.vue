<template>
  <!--v-card class="white lighten-4 elevation-0"-->
    <!--v-card-text-->
      <!--v-container fluid-->

        <!--v-card class="white lighten-4 elevation-1"-->
          <router-link to="/search" >
            <v-layout row @click="select_destination_input" v-ripple.mouseover.20 class="button is-primary">
              <v-flex xs4>
                <v-subheader><!-- Skyscrapers icon by Icons8 -->
<img class="icon icons8-Skyscrapers" width="35" height="35" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAB20lEQVRoQ2NkGOKAcYi7n2HUAwMdg6MxgBwDu+/9/k8oRlyVWKkaaFQ1DOaB5FWvGOaGiTGg0yDPjXoALYppEgP4ktGgjIEJp34STPvoniowY6dK4JFtiIvKfAcGZsb6PTcTHGEe6Nv3hqHISYSBEA3yzIB5AOZwRgYGB5BDeJk58uwWBE4iVPoMeAygO5yVkZmBgYmJ4fff3wzeiyPB7iMU8jD5AYkBV/UF4HTOzszK8J/hP8Ovv3/Ajo4wkGP4XGxNagSAk5CUch3YTDEZRQz9Fw4mEpW8iVIEMt1Ha+l/IW5eBk5WVoZ7b1+iWEhuDNDFA2nm220YmBnaGRkYbECu9nWSYJi4+iJDqaMGQ/f+G2D6WpIhyTHQFdkK16OqZ45T/8H13ngDmWAMpFttxygiqREDdPdAeqQiw8zl9xlAdPmUE1SJgfhkX4aFczcztLbGMCxYeZshIVwVhQZFy2gMwJLQaAwg1dCgpDGaB6Dl1mgpREk9MFoKMTAQHlYZLYWw9A9GSyGkltNoKTRaCjEwMNClOT3aFhptC2HvtI2WQqOl0GgpRGBAZHRUAkcAgbqUo/2B0f4ANHmQMzZKt1EJkgc96ayBYE1MZ/eQbN2oB0gOMiprGPIxAADlV2Ve1ycfVAAAAABJRU5ErkJggg=="></v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-text-field
                  name="input-1"
                  label="Destination"
                  id="testing"
                  v-model = "selected_destination.name"
                  readonly="readonly"
                  style="color:rgba(21, 46, 72, 0.93)"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </router-link>
        <!--/v-card-->

      <!--/v-container-->
    <!--/v-card-text-->
  <!--/v-card-->
</template>

<script>

import {mapMutations} from 'vuex'
import {mapGetters} from 'vuex'

export default {
  data(){
    return {

    }
  },
  methods:{
    ...mapMutations([
      'select_destination_input'
    ]),
  },
  computed: {
  ...mapGetters([
    'selected_destination'
  ]),
  }
}
</script>

<style scoped>
.input-group {
  height:50px;
}
</style>
