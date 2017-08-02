get_route_src_wp(src,wp,get_route_wp_dest,dest){
  //console.log(src + " -> " + wp);
  this.$http.get('city_route_matrix/'+src+
    '/'+wp+'.json')
    .then(response=>{
      return response.json();
    })
    .then(routes=>{
      //console.log(routes);
      console.log("----------- " +src+ " -> " +wp+ " ------------");
      for(let i in routes){
        console.log(routes[i]);
      }
      get_route_wp_dest(wp,dest);
    })
},
get_route_wp_dest(wp,dest){
  //console.log(wp + " -> " + dest);
  this.$http.get('city_route_matrix/'+wp+
    '/'+dest+'.json')
    .then(response=>{
      return response.json();
    })
    .then(routes=>{
      //console.log(routes);
      console.log("----------- " +wp+ " -> " +dest+ " -----------");
      for(let i in routes){
        console.log(routes[i]);
      }
    })
}
