<template>
  <div class="HOME">
    <!-- 3_HOME -->
    <!--p>{{test_var}}</p--> <!-- accessing from mapGetter -->
    <!--button @click="test_function">test_function</button-->


    <v-container fluid >

      <v-card class="white lighten-4 elevation-3 source-destination-input-card">

          <show_selected_source ></show_selected_source>

          <span>
            <v-layout row>

              <v-flex xs9 >
                <div style="width: 100%; margin-top: -10px;margin-bottom:0px;height: 10px; border-bottom: 1px solid grey; ">
                  <span style="font-size: 40px; background-color: #fff; ">

                  </span>
                </div>
              </v-flex>

              <v-flex xs1 >
                <div style="width: 100%; margin-top: -10px;margin-bottom:0px;height: 10px; border-bottom: 1px solid grey; ">
                  <span style="font-size: 40px; background-color: #fff; ">
                    <i class="material-icons" >&#xE0C3;</i>
                  </span>
                </div>
              </v-flex>

              <v-flex xs2 >
                <div style="width: 100%; margin-top: -10px;margin-bottom:0px;height: 10px; border-bottom: 1px solid grey; ">
                  <span style="font-size: 40px; background-color: #fff; ">

                  </span>
                </div>
              </v-flex>

            </v-layout>
          </span>

          <show_selected_destination ></show_selected_destination>

      </v-card >


      <v-btn primary fab  dark style="margin-top:10%;"
        @click="find_bus(get_bus_on_this_route);">
        <v-icon>&#xE409</v-icon>
      </v-btn>


      <show_recent_searches></show_recent_searches>

    </v-container fluid>






  </div>
</template>

<script>

import {mapGetters} from 'vuex'
import {mapMutations} from 'vuex'

import show_selected_source from './3_HOME_components/3.1_show_selected_source'
import show_selected_destination from './3_HOME_components/3.2_show_selected_destination'
import show_recent_searches from './3_HOME_components/3.4_show_recent_searches'




//id
export default {
  name: 'HOME',

  //variables
  data () {
    return {
      test_var_2:'',
    }
  },
  //data ends

  //functions
  methods:{
    ...mapMutations([
      'find_bus','get_bus_on_this_route'
    ]),
    test_method(){
      this.test_var_2 = this.$store.state.test_var ; // accessing from mapGetter
      //console.log(this.test_var_2);
      //console.log(this.$store.state.get_bus_on_this_route);
      //console.log(this.$store.state.check_day);
    },
  },
  //methods ends

  /*self calling functions -> whenever a variable is changed the function responds automatically
    by changing the other variables dependent on the changed one => must return something */
  computed:{
      ...mapGetters([
        'selected_date'
      ]),
  },
  //computed ends

  //functions inside will be called when page is loaded
  beforeMount() {
    //this.test_method();
  },
  //mounted ends

  components: {
    'show_selected_source' : show_selected_source,
    'show_selected_destination' : show_selected_destination,
    'show_recent_searches':show_recent_searches
  }

}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only --> <!-- wow :) -->
<style scoped>
h1, h2 {
}
  font-weight: normal;

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}

.source-destination-input-card{
  margin-top:-10%;
}


</style>
