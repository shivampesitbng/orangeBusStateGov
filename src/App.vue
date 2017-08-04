<template>
  <div id="app" class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
<vue-progress-bar></vue-progress-bar>
    <!-- header -->
      <header class="mdl-layout__header">
        <div class="mdl-layout__header-row">
          <router-link to="/">
            <div id="company-logo-and-name-div">
              <img id="company-logo" src="./assets/company_logo.png" alt="orange bus">
              <span id="company-name" class="mdl-layout-title">Orange Bus</span>
            </div>
          </router-link>
        </div>
      </header>
    <!-- header ends -->

    <!-- nav-drawer -->
    <div class="mdl-layout__drawer">
      <span class="mdl-layout-title">Orange Bus</span>
      <nav class="mdl-navigation">
        <router-link class="mdl-navigation__link" to="/" @click.native="hideMenu"><i class="material-icons">&#xE88A;</i> Home</router-link>
        <!--router-link class="mdl-navigation__link" to="/post" @click.native="hideMenu"><i class="material-icons">&#xE242;</i> Trip Planner</router-link-->
        <!--router-link class="mdl-navigation__link" to="/post" @click.native="hideMenu"><i class="material-icons">&#xE569;</i> Nearby Stops</router-link-->
        <!--router-link class="mdl-navigation__link" to="/post" @click.native="hideMenu"><i class="material-icons">&#xE55F;</i> Track Bus</router-link-->
        <router-link class="mdl-navigation__link" to="/post" @click.native="hideMenu"><i class="material-icons">&#xE86D;</i> How to Use ?</router-link>
        <router-link class="mdl-navigation__link" to="/post" @click.native="hideMenu"><i class="material-icons">&#xE873;</i> About Us</router-link>
        <!--router-link class="mdl-navigation__link" to="/post" @click.native="hideMenu"><i class="material-icons">&#xE873;</i> Contact Us</router-link-->
      </nav>
    </div>
    <!-- nav-drawer ends -->


    <!-- main -->
      <main id="main-app">
        <transition name="fade" mode="out-in" v-on:after-enter="" appear>
          <router-view></router-view>
        </transition>
      </main>


    <!-- main ends -->


    <!-- footer -->
      <!--v-bottom-nav
        absolute
        shift
        value="true"
        :class="{
          'blue-grey': e2 === 1,
          'teal': e2 === 2,
          'brown lighten-1': e2 === 3,
          'brown': e2 === 4,
        }"
        style=""
        id="home_footer"
      >

        <v-btn dark @click.native="e2 = 1" :value="e2 === 1" style="color:#fff">
          <span>Find Buses</span>
          <v-icon>&#xE530;</v-icon>
        </v-btn>
        <v-btn dark @click.native="e2 = 2" :value="e2 === 2" style="color:#fff">
          <span>Trip Planner</span>
          <v-icon>&#xE242</v-icon>
        </v-btn>
        <v-btn dark @click.native="e2 = 3" :value="e2 === 3" style="color:#fff">
          <span>Nearby stop</span>
          <v-icon>&#xE569</v-icon>
        </v-btn>
        <v-btn dark @click.native="e2 = 4" :value="e2 === 4" style="color:#fff">
          <span>Track Bus</span>
          <v-icon>&#xE55F</v-icon>
        </v-btn>

      </v-bottom-nav-->
    <!-- footer ends -->

  </div>
</template>

<script>



require('material-design-lite')
import Firebase from 'firebase'

import {mapGetters} from 'vuex'

let config = {
  apiKey: "AIzaSyA_PTPpIB1tNl-kRZG3JRXwjDZB3jN8ZfY",
  authDomain: "orangebusv1-38083.firebaseapp.com",
  databaseURL: "https://orangebusv1-38083.firebaseio.com",
  projectId: "orangebusv1-38083",
  storageBucket: "orangebusv1-38083.appspot.com",
  messagingSenderId: "1004962777996"
};
Firebase.initializeApp(config)


export default {
  name: 'app' ,
  data(){
    return{
      e2: 1,
    }
  },
  methods : {
    hideMenu: function () {
     document.getElementsByClassName('mdl-layout__drawer')[0].classList.remove('is-visible')
     document.getElementsByClassName('mdl-layout__obfuscator')[0].classList.remove('is-visible')
    },
    load_recent_log(){
      this.$Progress.start();
      // Retrieve the object from storage
      let x = localStorage.getItem('recent_log');
       let y = JSON.parse(x);
      for(let i in y){
        console.log("/////////////////"+ y[i]);
        this.$store.state.recent.push(y[i]);
      }
      this.$Progress.finish();
    },
    today_day(){

      let d = new Date();
      let dv = d.getDay();
      console.log(dv);
      if(dv == 0){
        this.$store.state.selected_date.day_in_week = "SU";
      }else if(dv == 1){
        this.$store.state.selected_date.day_in_week = "M";
      }else if(dv == 2){
        this.$store.state.selected_date.day_in_week = "TU";
      }else if(dv == 3){
        this.$store.state.selected_date.day_in_week = "W";
      }else if(dv == 4){
        this.$store.state.selected_date.day_in_week = "TH";
      }else if(dv == 5){
        this.$store.state.selected_date.day_in_week = "F";
      }else if(dv == 6){
        this.$store.state.selected_date.day_in_week = "SA";
      }
      console.log("Todays Day -> "+ this.$store.state.selected_date.day_in_week);

    }
  },
  computed:{
    ...mapGetters([
      'recent','selected_date'
    ]),

  },
  beforeMount(){
    this.load_recent_log();
    this.today_day();
  }
}


</script>

<style >

@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
@import url('https://code.getmdl.io/1.2.1/material.blue-red.min.css');

body {
  margin: 0;
  background : url('./assets/bg.png') ;
  background-size:     cover;
/*  background-position: center center;*/
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

#pb{

}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}

#company-logo{
  height:25px;
  width:25px;
}

#company-logo, #company-name{
  display:inline;
}

#company-name{
  vertical-align:-10%;
}

#company-logo-and-name-div,a{
  color:#fff;
  text-decoration: none;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s
}

.fade-enter, .fade-leave-active {
  opacity: 0
}

.mdl-layout__header {
  background-color:#2c3e50;
}
</style>
