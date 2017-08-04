<template>
  <div>
    <button @click="sel_day('M')">M</button>
    <button @click="sel_day('T')">T</button>
    <button @click="sel_day('W')">W</button>
    <button @click="sel_day('TH')">TH</button>
    <button @click="sel_day('F')">F</button>
    <button @click="sel_day('S')">S</button>
    <button @click="sel_day('SU')">SU</button>
  </div>
</template>

<script>

import {mapGetters} from 'vuex'

export default{
  data(){
    return{

    }
  },
  methods:{
    sel_day(day){
      console.log("@@@@@@@@@@@@@" + day + "@@@@@@@@@@@@");
      this.$store.state.selected_date.day_in_week = day;
    }
  },
  computed:{
    ...mapGetters([
      'selected_date'
    ])
  },
  beforeMount(){

  }
}
</script>

<style scoped>
</style>
