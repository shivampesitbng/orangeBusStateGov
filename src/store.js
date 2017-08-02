import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import VueResource from 'vue-resource'

Vue.use(Vuex);
Vue.use(VueResource);

let state_name = 'rajasthan';
Vue.http.options.root='https://orangebusv1-38083.firebaseio.com/'+state_name+ '/';

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

    //direct_buses
    direct_buses : [],

    //direct_bus_flg to check -> if there is direct bus or not
    direct_bus_flg : false,

    //direct_bus_flg to check -> if there is direct bus is checked or not
    direct_bus_flg_2 : false,

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

    //arr of direct buses
    direct_buses : state => {
      return state.direct_buses;
    },

    //check if direct bus is or not
    direct_bus_flg : state => {
      return state.direct_bus_flg;
    },

    //check if direct bus is checked or not
    direct_bus_flg_2 : state => {
      return state.direct_bus_flg_2;
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


    /**************************  FIND BUS - Direct Bus ************************/

    /*** find bus ***/
    find_bus(state,get_bus_on_this_route){

       state.direct_bus_flg = false;
       state.direct_bus_flg_2 = false;
       state.direct_buses = [] ;

      //console.log("going to direct bus");
      if( state.selected_source.name == 'City Name'  ||
         state.selected_destination.name == 'City Name'){
        console.log("source or destination cannot be empty"); //** snackbar
      }else if( state.selected_source.name ==
         state.selected_destination.name){
        console.log("source & destination cannot be same"); //** snackbar
      }else{

        let src =  state.selected_source.name;
        let dest =  state.selected_destination.name;

        /*** get bus route ***/
        Vue.http.get('city_route_matrix/'+src+'/'+dest+'.json')
          .then(response=>{
            return response.json();
          })
          .then(route=>{
            //console.log(route);
            for(let i in route){
              console.log(route[i]);
              //console.log(state.check_day);
              //console.log(state.get_bus_on_this_route);
              //console.log(check_day);
              //console.log(get_bus_on_this_route);
              get_bus_on_this_route(route[i]);
            }
            //console.log("route -> " + route);
            if(route == null)
               state.direct_bus_flg_2 = true;
            router.push("/direct_bus"); /*** go to direct bus ***/
          })
        /*** get bus route ENDS ***/

      }
    },
    /*** find bus ENDS ***/


    /*** get buses on this route ***/
    get_bus_on_this_route(state,route){
      console.log("route -> "+ route);
      Vue.http.get('buses_on_route/'+route+'.json')
        .then(response=>{
          return response.json();
        })
        .then(buses=>{
          console.log(buses);
          for(let j in buses){
            console.log(buses[j]);

            let bus = buses[j];

            //console.log(check_day);
            //check_day(buses[j],route);


            /*** check if day matches -> if yes -> push_to_store ***/
            //check_day(state,bus,route){
              Vue.http.get('bus_day_&_time_from_origin/'+
                bus+'.json')
                .then(response=>{
                  return response.json();
                })
                .then(day=>{
                  console.log(day);
                  console.log(Object.keys(day));
                  for(let k in Object.keys(day)){
                    console.log(Object.keys(day)[k]);
                    //console.log( state.selected_date.day_in_week);
                    if(Object.keys(day)[k] ==  state.selected_date.day_in_week){
                      console.log("show_only this bus -> "+bus);
                      let bus_obj = {
                        no: bus,
                        route : route
                      }
                       state.direct_bus_flg = true;
                      console.log("cnt");
                       state.direct_buses.push(bus_obj);
                    }
                     state.direct_bus_flg_2 = true;
                  }
                  console.log( state.direct_buses);
                })
            //},
            /*** check if day matches ENDS -> if yes -> push_to_store ***/


          }
        })
    },
    /*** get buses on this routes ENDS ***/


    /************************ FIND BUS ENDS - Direct Bus **********************/





    //select date & time function -> cz we have to change it from filter also
    select_date : state => {

    },
    select_time : state => {

    }

  }
  //mutations ends

});
