<template>
  <div>
    <!--p>{{search_city_name}}</p-->
    <v-container fluid id="main">

      <v-card class="white lighten-4 elevation-3" >
        <v-card-text>
          <v-layout row>
            <v-flex xs4>
              <v-subheader>Search</v-subheader>
            </v-flex>
            <v-flex xs8>
              <v-text-field
                name="input-1"
                label="City Name"
                id="testing"
                ref='search'
                type="search"
                v-model="search_city_name"
                @keyup="search_city_function"
              ></v-text-field>
            </v-flex>
          </v-layout>

          <li v-for="city in cities_array" :class="city.class" @click="select_city(city.name)"
            v-ripple.mouseover.20 class="button is-primary">
            {{city.name}}
          </li>

        </v-card-text>
      </v-card>
    </v-container >
  </div>
</template>

<script>

import {mapGetters} from 'vuex'
import {mapMutations} from 'vuex'

import Firebase from 'firebase'



export default {

  data(){
    return {
      search_city_name : '' ,
      cities_array : [],
      city_object : {
        name : '',
        class : '',
      }
    }
  },
  methods : {
    ...mapMutations([

    ]),
    /*show_hide_footer(){
      document.getElementById('home_footer').style.visibility = 'hidden';
    },*/

    search_city_function(){
      //console.log(this.search_city_name[0]);
      if(this.search_city_name[0] == undefined){
        for(let i in this.cities_array){
          this.cities_array[i].class = 'hide_city_name' ;
        }
        return;
      }
      this.$Progress.start();
      this.$http.get('cities_&_stops/' + this.search_city_name[0].toUpperCase() + '.json' )
        .then(response => {
          this.cities_array = [];
          this.$Progress.finish();
          return response.json();
        },response=>{
          this.$Progress.fail()
        })
        .then(cities => {
          //console.log("cities from db -> "+cities);
          for(let city in cities){
            this.city_object = {
              name :  cities[city].toUpperCase(),
              class : ''
            }
            //console.log("pushing in array -> " + this.city_object.name);
            this.cities_array.push(this.city_object);
            //console.log("in city array -> " + this.city_object.name);
          }
          //console.log("what is in city array? -> " + this.cities_array);
          this.search_feature();
        })
    },
    search_feature(){
      for(let i in this.cities_array){
        if(this.cities_array[i].name.indexOf(this.search_city_name.toUpperCase()) != -1){
          this.cities_array[i].class = 'show_city_name' ; //show_city_name is a css class :P
        }else{
          this.cities_array[i].class = 'hide_city_name' ;
        }
      }
    },
    select_city(selected_city_name){
      //console.log(selected_city_name);
      if(this.$store.state.source_input_selected == true && this.$store.state.destination_input_selected == false ){
        this.$store.state.selected_source = {
          name : selected_city_name
        }
      }else if(this.$store.state.source_input_selected == false && this.$store.state.destination_input_selected == true ){
        this.$store.state.selected_destination = {
          name : selected_city_name
        }
      }
      this.$router.push('/');
    }
  },
  computed : {
    ...mapGetters([
      'source_input_selected','destination_input_selected'
    ]),
  },
  beforeMount(){
    if(this.$store.state.source_input_selected == true && this.$store.state.destination_input_selected == false){
      //console.log("from computed => source is selected");
    }
    else if(this.$store.state.source_input_selected == false && this.$store.state.destination_input_selected == true){
      //console.log("from computed => destination is selected");
    }
  },
  mounted(){
    //this.show_hide_footer();
    this.$refs.search.focus();
  },
  firebase : {

  }
}
</script>

<style scoped>
.show_city_name {
  display : block;
}
.hide_city_name{
  display : none;
}
#main{
  margin-top:-10%;
}
</style>
