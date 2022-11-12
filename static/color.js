// List of all states in map for iteration
var stateList = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New_Hampshire","New_Jersey","New_Mexico","New_York","North_Carolina","North_Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode_Island","South_Carolina","South_Dakota","Tennesse","Texas","Utah","Vermont","Virginia","Washington","West_Virginia","Wisconsin","Wyoming", "DC"]
window.onload = function () {
  //Get all states
  var svg = document.getElementById("map").contentDocument;
  var states = svg.getElementsByTagName("*");  
  
  // Construct a hash map
  // hash['state']->['county']->path
  
  var statesMap = new Object();

  for(let j in stateList){
    var state = states[stateList[j]];
    var counties = new Object(); 
    for(var k = 0; k < state.childElementCount; k++){
      counties[state.children[k].children[0].textContent.split(",")[0]] = state.children[k];
    }
    statesMap[stateList[j]] = counties;
  }
  
  for(var i = 0; i < data['Life Expectancy'].length; i++){
    if(typeof data['Life Expectancy'][i].County === 'undefined'){
      continue;
    }
    var state = data['Life Expectancy'][i].State;
    var county = data['Life Expectancy'][i].County;
    try{
    statesMap[state][county].setAttribute("style", "stroke:#000;fill:#000");
    } catch (error) {
      console.log(state + " " + county);
    }
  }
    
};
