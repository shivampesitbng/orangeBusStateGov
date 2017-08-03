<template>
  <div>
    
    <p v-for="r in recent.slice().reverse()">
      {{r.src.name}} - {{r.dest.name}} - {{r.date.day_in_week}}
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
