<template>
  <div>

    <p v-for="(r,index) in recent.slice().reverse()">
      {{r.src.name}} - {{r.dest.name}} - {{r.date.day_in_week}} -{{index}}
      <button @click="rm_recent(index,recent.length)">remove</button>
    </p>
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
    rm_recent(i,len){
      this.$store.state.recent.splice(len-1-i,1);
      localStorage.setItem('recent_log', JSON.stringify(this.$store.state.recent));
    }
  },
  computed:{
    ...mapGetters([
      'recent'
    ]),

  },

}
</script>

<style scoped>
</style>
