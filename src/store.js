import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import VueResource from 'vue-resource'
import VueProgressBar from 'vue-progressbar'

Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px'
});

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


    recent : [] ,

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

    //direct_buses *selected*
    direct_buses : [],

    //direct_bus_flg to check -> if there is direct bus or not
    direct_bus_flg : false,

    //direct_bus_flg to check -> if there is direct bus is checked or not
    direct_bus_flg_2 : false,

    indirect_arr : [],

    //direct_bus_flg to check -> if there is indirect bus or not
    indirect_bus_flg : false,

    indirect_bus_flg2 : false,


    arrival_time:[],

    // bus destail ->  route , dist ,time
    bus_route : [],
    bus_dist : [],
    bus_time :[],
    clock_time:[],

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

    show : true ,
    show2: true ,
    show3 : true,

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

    show : state=>{
      return state.show
    },
    show2 : state=>{
        return state.show2
    },
    show3 : state=>{
        return state.show3
    },

    //arr of direct buses
    direct_buses : state => {
      return state.direct_buses;
    },
    //arr of direct dist between stop
    bus_dist : state => {
      return state.bus_dist;
    },
    //arr of direct time between stop
    bus_time : state => {
      return state.bus_time;
    },
    //clock time -> origin clock time + offset time from origin to src
    clock_time : state => {
      return state.clock_time;
    },


    //check if direct bus is or not
    direct_bus_flg : state => {
      return state.direct_bus_flg;
    },

    //check if direct bus is checked or not
    direct_bus_flg_2 : state => {
      return state.direct_bus_flg_2;
    },

    indirect_bus_flg : state => {
      return state.indirect_bus_flg;
    },
    indirect_bus_flg2: state => {
      return state.indirect_bus_flg2;
    },

    indirect_arr : state => {
      return state.indirect_arr;
    },

    //bus_route
    bus_route : state => {
      return state.bus_route;
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
    },

    arrival_time : state =>{
      return state.arrival_time;
    },

    //recent
    recent : state => {
      return state.recent ;
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
    find_bus(state){

    //  document.getElementById('main-app').style.display="none";

      state.direct_buses = [] ;
      state.direct_bus_flg = false;
      state.direct_bus_flg_2 = false;







      //console.log("going to direct bus");
      if( state.selected_source.name == 'City Name'  ||
         state.selected_destination.name == 'City Name'){
        console.log("source or destination cannot be empty"); //** snackbar
      }else if( state.selected_source.name ==
         state.selected_destination.name){
        console.log("source & destination cannot be same"); //** snackbar
      }else{
          state.show = false;

       let z = {
          day_in_week : state.selected_date.day_in_week
        }




        let src =  state.selected_source.name;
        let dest =  state.selected_destination.name;

        /*** get bus route ***/
        //Vue.Progress.start();

        Vue.http.get('city_route_matrix/'+src+'/'+dest+'.json')
          .then(response=>{
          //  Vue.Progress.finish();
            return response.json();
          },response=>{
          //  Vue.Progress.fail()
          })
          .then(route=>{
            //console.log("CHECK IF NULL $$$$$$"+route);
            for(let i in route){
              console.log(route[i]);
              //console.log(state.check_day);
              //console.log(state.get_bus_on_this_route);
              //console.log(check_day);
              //console.log(get_bus_on_this_route);
            //  get_bus_on_this_route(route[i]);


              console.log("route -> "+ route[i]);
              Vue.http.get('buses_on_route/'+route[i]+'.json')
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
                            if(Object.keys(day)[k] ===  state.selected_date.day_in_week){
                              console.log("show_only this bus -> "+bus);
                              Vue.http.get('bus_type/'+bus+'.json')
                                .then(response=>{
                                  return response.json();
                                })
                                .then(b_type=>{
                                  console.log(b_type);
                                  let bus_obj = {
                                    no: bus,
                                    route : route[i],
                                    type : b_type[0]
                                  }
                                   state.direct_bus_flg = true;
                                  console.log("cnt");
                                   state.direct_buses.push(bus_obj);
                                })

                            }
                             state.direct_bus_flg_2 = true;
                          }
                          console.log( state.direct_buses);

                        })
                    //},
                    /*** check if day matches ENDS -> if yes -> push_to_store ***/


                  }

                })


            }
            //console.log("route -> " + route);
            if(route == null)
               state.direct_bus_flg_2 = true;

            router.push("/direct_bus"); /*** go to direct bus ***/
            state.show = true ;
      //      document.getElementById('main-app').style.display="block";


          })
        /*** get bus route ENDS ***/
        /***** recent ****/
        let recent_obj = {
          id:  state.selected_source.name+"-"+state.selected_destination.name+"-"+state.selected_date.day_in_week,
          src : state.selected_source,
          dest: state.selected_destination,
          date : z,
        }
        let flg_recent =false;
        if(state.recent.length == 0){
          state.recent.push(recent_obj);
          console.log(state.recent);
        }else{
          for(let r in state.recent){
            console.log(recent_obj.id + " "+ state.recent[r].id);
            if(recent_obj.id == state.recent[r].id){
              console.log(recent_obj.id + " !!!!!!!!!!!! "+ state.recent[r].id);
              flg_recent =true;
              state.recent.splice(r, 1)
              state.recent.push(recent_obj);
              console.log(state.recent);
            }
          }
          if(flg_recent ==false){
            state.recent.push(recent_obj);
            console.log(state.recent);
          }
        }

        // Put the object into storage
        localStorage.setItem('recent_log', JSON.stringify(state.recent));


        /***** recent ends ****/

      }

    },
    /*** find bus ENDS ***/



    get_indirect_bus_function(state){


      /************************* FIND INDIRECT BUS ******************************/
        console.log("now finding ---- indirect bus -----");

          state.indirect_arr = [];

        let src =  state.selected_source.name;
        let dest =  state.selected_destination.name;

        state.indirect_bus_flg = false;
        state.indirect_bus_flg2 = false;

        let tmp_str = '';
        let tmp_str2 = 'gfgboss:P';

        Vue.http.get('city_route_matrix/'+src+'.json')
          .then(response=>{
            return response.json();
          })
          .then(wp=>{
            for(let k1 in Object.keys(wp)){

              console.log(Object.keys(wp)[k1]);
              Vue.http.get('city_route_matrix/'+src+'/'+Object.keys(wp)[k1]+'.json')
                .then(response=>{
                  return response.json();
                })
                .then(route1 => {
                  console.log("route1->"+route1);
                  for(let k2 in route1){
                    console.log(route1[k2]);
                    Vue.http.get('city_route_matrix/'+Object.keys(wp)[k1]+
                      '/'+dest+'.json')
                      .then(response=>{
                        return response.json();
                      })
                      .then(route2=>{ //confirm_wp is route2
                        for(let k3 in route2){
                          console.log(route2[k3]);
                          if(route2 != null && route1[k2] != route2[k3] ){
                            console.log("X------confirm_wp-----X " +
                              Object.keys(wp)[k1] + " <---> "
                                + route1[k2] + " <---> " + route2[k3]);
                           //
                           let route1_str,route2_str;
                           Vue.http.get('bus_routes/'+
                             route1[k2]+'.json')
                            .then(response=>{
                              return response.json();
                            })
                              .then(stops1=>{
                                  route1_str = '';
                                  for(let k4 in stops1){
                                      route1_str+=stops1[k4];
                                  }
                                  console.log(route1_str);
                                  Vue.http.get('bus_routes/'+
                                    route2[k3]+'.json')
                                    .then(response=>{
                                      return response.json();
                                    })
                                    .then(stops2=>{
                                      route2_str='';
                                      for(let k5 in stops2){
                                        route2_str+=stops2[k5];
                                      }
                                      console.log(route2_str);

                                      //
                                      if((route1_str.indexOf(src)!=-1
                                          && route1_str.indexOf(dest)!=-1)
                                          || (route2_str.indexOf(src)!=-1 &&
                                            route2_str.indexOf(dest)!=-1)){
                                                console.log("$$$$ oh no $$$$");

                                      }else{
                                        console.log("### these are indirect routes ###");
                                        console.log("^^^^^Details Indirect Routes -> "
                                          + src +" -> "+ Object.keys(wp)[k1] +" => " +
                                            route1[k2] + " | " + Object.keys(wp)[k1] +" -> " +
                                              dest + " => " + route2[k3]);



                                        //
                                        Vue.http.get('buses_on_route/'+
                                          route1[k2]+'.json')
                                          .then(response=>{
                                            return response.json();
                                          })
                                          .then(bus1=>{
                                            console.log("%%% bus1 -> "+bus1);

                                            for(let b1 in bus1){
                                              Vue.http.get('bus_day_&_time_from_origin/'+
                                                bus1[b1]+'.json')
                                                .then(response=>{
                                                  return response.json();
                                                })
                                                .then(sch1=>{

                                                  console.log(Object.keys(sch1));
                                                  for(let s1 in Object.keys(sch1)){
                                                    console.log(Object.keys(sch1)[s1]);
                                                    if(Object.keys(sch1)[s1] ==
                                                      state.selected_date.day_in_week){
                                                        /** time **/

                                                        console.log(sch1[state.selected_date.day_in_week]);

                                                        /** time **/
                                                        Vue.http.get('buses_on_route/'+
                                                          route2[k3]+'.json')
                                                          .then(response=>{
                                                            return response.json();
                                                          })
                                                          .then(bus2=>{
                                                            console.log("%%% bus2 -> "+bus2);

                                                            for(let b2 in bus2){
                                                              console.log(bus2[b2]);
                                                              Vue.http.get('bus_day_&_time_from_origin/'+
                                                                bus2[b2]+'.json')
                                                                .then(response=>{
                                                                  return response.json();
                                                                })
                                                                .then(sch2=>{
                                                                  console.log(Object.keys(sch2));
                                                                  for(let s2 in Object.keys(sch2)){
                                                                    console.log(Object.keys(sch2)[s2]);
                                                                    if(Object.keys(sch2)[s2] ==
                                                                      state.selected_date.day_in_week){


                                                                        Vue.http.get('bus_routes/'+
                                                                          route1[k2]+'.json')
                                                                          .then(response=>{
                                                                            return response.json();
                                                                          })
                                                                          .then(r1=>{
                                                                            console.log(r1);
                                                                            let mrk_wp = -1 ;
                                                                            for(let k10 in r1){
                                                                              console.log(r1[k10]);
                                                                              if(r1[k10]==Object.keys(wp)[k1]){
                                                                                mrk_wp = k10 ;
                                                                                console.log(mrk_wp);

                                                                                Vue.http.get('travel_time_between_stops_on_route/'
                                                                                  +route1[k2] +'.json')
                                                                                  .then(response=>{
                                                                                    return response.json();
                                                                                  })
                                                                                  .then(t1=>{

                                                                                    console.log(t1);
                                                                                    let sum_t1 = 0;
                                                                                    for(let k11=0; k11<mrk_wp ; k11++){
                                                                                      console.log(t1[k11]);
                                                                                      sum_t1 = sum_t1 + t1[k11];

                                                                                    }
                                                                                    console.log(sum_t1);
                                                                                    //origin + sum_t1
                                                                                    let clock_time_sum = 0;
                                                                                    clock_time_sum = sum_t1 ;
                                                                                    for(let k12 in sch1[Object.keys(sch1)[s1]]){
                                                                                      console.log(sch1[Object.keys(sch1)[s1]][k12]); //origin


                                                                                      //add - find new time

                                                                                      let ta =sch1[Object.keys(sch1)[s1]][k12].split(":");
                                                                                      console.log(ta[0] + " ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ "+ta[1]);
                                                                                      let p1  = Math.floor(ta[1])+Math.floor(clock_time_sum);
                                                                                      console.log("p1"+p1);
                                                                                      ta[0]=Math.floor(ta[0])+Math.floor(p1/60);
                                                                                      ta[1]=p1%60;
                                                                                      //console.log(ta[0] + " final^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ "+ta[1]);

                                                                                      if(Math.floor(ta[0]) > 23){
                                                                                        ta[0] = Math.floor(ta[0]) - 24 ;
                                                                                      }
                                                                                      console.log(ta[0] + " final^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ "+ta[1]);

                                                                                      ta[1]=ta[1].toString();
                                                                                      console.log(ta[1].length);
                                                                                      if(ta[1].length == 1)
                                                                                        ta[1] = "0"+ta[1] ;
                                                                                      let a_t = ta[0]+":"+ta[1];
                                                                                      console.log("!!!!!! new time-> !!!!!!"+ a_t); //final time
                                                                                      //state.arrival_time.push(a_t);
                                                                                      /** check if this final time is < arrival time **/
                                                                                      for(let k13 in sch2[Object.keys(sch2)[s2]]){
                                                                                        console.log(sch2[Object.keys(sch2)[s2]][k13]);
                                                                                        let ta2 =sch2[Object.keys(sch2)[s2]][k13].split(":");
                                                                                        if((ta[0] < ta2[0]) || (ta[0] == ta2[0] && ta[1]<ta2[1])){


                                                                                          tmp_str += bus1[b1]+"-"+Object.keys(wp)[k1]+"-"+bus2[b2];
                                                                                          console.log(tmp_str);


                                                                                          console.log(tmp_str2);
                                                                                          if(tmp_str.indexOf(tmp_str2)==-1){


                                                                                            tmp_str2 = bus1[b1]+"-"+Object.keys(wp)[k1]+"-"+bus2[b2];

                                                                                            Vue.http.get('bus_type/'+bus1[b1]+'.json')
                                                                                              .then(response=>{
                                                                                                return response.json();
                                                                                              })
                                                                                              .then(b_type1=>{
                                                                                                console.log(b_type1[0]);

                                                                                                Vue.http.get('bus_type/'+bus2[b2]+'.json')
                                                                                                  .then(response=>{
                                                                                                    return response.json();
                                                                                                  })
                                                                                                  .then(b_type2=>{
                                                                                                    console.log(b_type2[0]);

                                                                                                    //to dom -> tada =>
                                                                                                    let indirect_set = {
                                                                                                      bus_1:{
                                                                                                        no : bus1[b1],
                                                                                                        route: route1[k2],
                                                                                                        wp : Object.keys(wp)[k1],
                                                                                                        f : 1 ,
                                                                                                        a_t : a_t,
                                                                                                        type:b_type1[0]
                                                                                                      },
                                                                                                      bus_2:{
                                                                                                        no : bus2[b2],
                                                                                                        route:route2[k3],
                                                                                                        wp : Object.keys(wp)[k1],
                                                                                                        f : 2,
                                                                                                        type:b_type2[0]
                                                                                                      }
                                                                                                    }
                                                                                                    state.indirect_bus_flg = true;
                                                                                                    state.indirect_arr.push(indirect_set);
                                                                                                    //to dom ends
                                                                                                  //  router.push("/indirect_bus");
                                                                                                  })

                                                                                              })



                                                                                          }
                                                                                        }
                                                                                      }
                                                                                    }

                                                                                  })

                                                                              }
                                                                            }
                                                                          })



                                                                    }
                                                                  }
                                                                })
                                                            }
                                                          })
                                                    }
                                                  }
                                                })
                                            }
                                          })
                                        //

                                      }
                                      state.indirect_bus_flg2 =true;
                                      //

                                    })
                              })

                           //
                          }
                        }


                      })
                  }
                })

            }

            console.log("line no -> 545 SERIOUSLY !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

          })
      /************************* FIND INDIRECT BUS ENDS *************************/


    },



    /************************ FIND BUS ENDS - Direct Bus **********************/




    /********************** BUS (INDIRECT) DETAIL ********************************/

    get_bus_route(state,bus){
        state.show2 = false
        console.log("777777777777777777777 -> "+ state.show2);
      console.log(bus.no + " $$$$$ " + bus.route);

      state.bus_route = [];
      state.bus_dist = [];
      state.bus_time = [];
      let got_src = false , got_dest = false;
      let mrk_src = -1 ,mrk_dest = -1 ;
      let clock_time_sum = 0;
      state.arrival_time = [];

      let usr_src = state.selected_source.name;
      let usr_dest=state.selected_destination.name;

      if(bus.f == 1){
        usr_src = state.selected_source.name;
        usr_dest = bus.wp;
      }else if(bus.f==2){
        usr_src = bus.wp;
        usr_dest = state.selected_destination.name;
      }


      /************ bus routes ***********/
      Vue.http.get('bus_routes/'+bus.route+ '.json') //bus.route is name of route
        .then(response=>{
          return response.json();
        })
        .then(route=>{
          console.log(route);
          for(let i in route){
            //console.log(route[i]); //stops in route
            console.log(route[i]+ " XXXXX "+ state.selected_source.name);
            if(route[i] == usr_src){
              console.log("S -> " +route[i]);
              state.bus_route.push("S -> " +route[i]);
              got_src = true;
              mrk_src = i ;
              console.log("marked src -> "+ mrk_src);
              continue;
            }else if(route[i] == usr_dest){
              console.log("D -> "+route[i]);
              state.bus_route.push("D -> " +route[i]);
              got_dest = true;
              mrk_dest = i ;
              console.log("marked dest -> "+ mrk_dest);
              continue;
            }
            //
            if(got_src == true && got_dest == false){
              console.log(route[i]);
              state.bus_route.push(route[i]);
            }else if(got_src == true && got_dest == true){
              break;
            }
            //
          }

          /**** distance_between_stops_on_route ****/

          Vue.http.get('distance_between_stops_on_route/'
            +bus.route+'.json')
            .then(response=>{
              return response.json();
            })
            .then(dist=>{
              console.log("dist-> "+ dist);
              let dist_sum = 0;
              console.log(mrk_src+ " "+ mrk_dest);
              state.bus_dist.push("0 km");
              for(let i = mrk_src; i < mrk_dest; i++){
                console.log(dist[i]);
                //state.bus_dist.push(dist[i]);
                dist_sum = dist_sum + dist[i];
                state.bus_dist.push(dist_sum+" km ");
              }
            })

          /**** distance_between_stops_on_route ENDS ****/

          /**** time_between_stops_on_route ****/

          Vue.http.get('travel_time_between_stops_on_route/'
            +bus.route+'.json')
            .then(response=>{
              return response.json();
            })
            .then(time=>{
              console.log("time-> "+ time);
              let time_sum = 0;
              state.bus_time.push("0 h 0 m");
              for(let i = mrk_src; i < mrk_dest; i++){
                console.log(time[i]);
                //state.bus_time.push(time[i]);
                time_sum = time_sum + time[i];
                //state.bus_time.push(time_sum+ " min ");
                //time_in_hr = change_min_to_hr(time_sum); //ANKIT FUNC2
                let h  = time_sum / 60 ;
                 h = Math.floor(h);
                let m = time_sum % 60 ;
                let h_m = h+" h "+m+ " m " ;
                state.bus_time.push(h_m);
              }
              //
              clock_time_sum = 0;
              for(let i =0; i<mrk_src ; i++){
                console.log(time[i]);
                clock_time_sum = clock_time_sum + time[i];
                console.log("time taken to reach src from origin -> "+ clock_time_sum);
              }
              //
            })

          /**** time_between_stops_on_route ENDS ****/

          /**** time from origin ****/
          Vue.http.get('bus_day_&_time_from_origin/'
            +bus.no+'/'+state.selected_date.day_in_week+'.json')
            .then(response=>{
              return response.json();
            })
            .then(clock_time=>{
              console.log("clock_time-> "+ clock_time);
              let time_sum = 0;
              for(let i in clock_time){
                console.log(clock_time[i]);
                //new_clock_time = ankit_function(clock_time[i],clock_time_sum);
                  //clock_time[i] is in form 12:30 & clock_time_sum is in min

                /*let h2  = time_sum / 60 ;
                  h2 = Math.floor(h2);
                let m2 = time_sum % 60 ;*/

                let ta =clock_time[i].split(":");
                console.log(ta[0] + " ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ "+ta[1]);
                let p1  = Math.floor(ta[1])+Math.floor(clock_time_sum);
                console.log("p1"+p1);
                ta[0]=Math.floor(ta[0])+Math.floor(p1/60);
                ta[1]=p1%60;
                //console.log(ta[0] + " final^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ "+ta[1]);

                if(Math.floor(ta[0]) > 23){
                  ta[0] = Math.floor(ta[0]) - 24 ;
                }
                console.log(ta[0] + " final^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ "+ta[1]);

                ta[1]=ta[1].toString();
                console.log(ta[1].length);
                if(ta[1].length == 1)
                  ta[1] = "0"+ta[1] ;
                let a_t = ta[0]+":"+ta[1];
                state.arrival_time.push(a_t);

              }
              router.push("/show_bus_route"); //*** bus_route_screen
            })
          /*** time from origin ends ****/

        })
        /********** bus routes ends ********/
      //  state.show2 = true

    },



    /********************* BUS DETAIL (INDIRECT) ENDS *****************************/






    //select date & time function -> cz we have to change it from filter also
    select_date : state => {

    },
    select_time : state => {

    }

  }
  //mutations ends

});
