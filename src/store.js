import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({

  //state
  state :{

    //test variable
    test_var : 'testing if gettting variable from store or not' ,

    //flag -> which input box is selected -> source 'or' destination
    source_input_selected : false ,
    destination_input_selected : false ,

    //objects -> details of selected source & destination
    selected_source : {
      //hash_val : -1 ,
      //index_in_hash : -1 ,
      name : 'City Name'
    },
    selected_destination : {
      //hash_val : -1 ,
      //index_in_hash : -1 ,
      name : 'City Name'
    },

    //selected bus -> details
    selected_bus_detail :{
      no : '',
      route_name : '',
      route : []
    },



    //objects -> details of selected date & time
    selected_date : {
      selected_day : -1 ,
      selected_month : -1 ,
      selected_year : -1 ,
      day_in_week : 'W' // by default to test further
    },
    selected_time : {
      selected_day : -1 ,
      selected_month : -1 ,
      selected_year : -1
    },

    //array of objects -> to show details of recent searche(s).
    recent_searches :  [],

    time_sum_frm_origin_to_src : -1 ,


  },
  //state end

  //getters
  getters :{
    test_var : state => {
      return state.test_var;
    },

    // getting source & destination ame -> for all component
    selected_source : state => {
      return state.selected_source;
    },
    selected_destination : state => {
      return state.selected_destination;
    },

    // getting date & time ame -> for filter component
    selected_date : state => {
      return state.selected_date;
    },
    selected_time : state => {
      return state.selected_time;
    },

    //selected_bus_details
    selected_bus_detail : state => {
      return state.selected_bus_detail;
    },

    //travel time origin to source
    time_sum_frm_origin_to_src : state => {
      return state.time_sum_frm_origin_to_src;
    }


  },
  //getters

  //mutations
  mutations :{
    test_function : state => {
      state.test_var += 'changing test_var to check if mapMutations if working'
    },

    /* call fucntion onclick -> if source 'or' destination is selected => to change above flags
      cz we have to change it from direct & indirect bus screen also , it should be accessible
      from everwhere */
    select_source_input : state => {
      state.source_input_selected = true ;
      state.destination_input_selected = false ;
      //console.log("from store => source is selected");
    },
    select_destination_input : state => {
      state.source_input_selected = false ;
      state.destination_input_selected = true ;
      //console.log("from store => destination is selected");
    },

    //select date & time function -> cz we have to change it from filter also
    select_date : state => {

    },
    select_time : state => {

    }

  }
  //mutations ends

});
