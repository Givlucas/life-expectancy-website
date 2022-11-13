// List of all states in map for iteration
var stateList = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New_Hampshire","New_Jersey","New_Mexico","New_York","North_Carolina","North_Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode_Island","South_Carolina","South_Dakota","Tennesse","Texas","Utah","Vermont","Virginia","Washington","West_Virginia","Wisconsin","Wyoming", "DC"]
var svg = null;
var states = null;
var statesMap = null;
window.onload = function () {
  //Get all states
  svg = document.getElementById("map").contentDocument;
  states = svg.getElementsByTagName("*");  
  
  // Construct a hash map
  // hash['state']->['county']->path
  
  statesMap = new Object();

  for(let j in stateList){
    var state = states[stateList[j]];
    var counties = new Object(); 
    for(var k = 0; k < state.childElementCount; k++){
      counties[state.children[k].children[0].textContent.split(",")[0]] = state.children[k];
    }
    statesMap[stateList[j]] = counties;
  }

  // iterate through each data object and color by name
  for(var i = 0; i < data['Life Expectancy'].length; i++){
    if(typeof data['Life Expectancy'][i].County === 'undefined'){
      continue;
    }
    var state = data['Life Expectancy'][i].State;
    var county = data['Life Expectancy'][i].County;
    var life = data['Life Expectancy'][i]['Male life expectancy, 2010 (years)'];
    var stdev = 2.48646241663112;
    var mean = 76.1;
    var zscore = (life - mean)/stdev;
    var scale = 65;
    var scaled = 255 - parseInt(zscore * scale);
    if(zscore < 0) {
      zscore = zscore * -1;
      scaled = 255 -parseInt(zscore * scale);
      hex = scaled.toString(16);
      if (hex.length < 2){
        hex = "0" + hex;
      }
      var color = "#FF"+hex+hex; 
    } else {
      hex = scaled.toString(16);
      if (hex.length < 2){
        hex = "0" + hex;
      }
      var color = "#"+hex+"FF"+hex;
    }
    try{
    statesMap[state][county].setAttribute("style", "stroke:#000;fill:"+color+";");
    } catch (error) {
      console.log(error);
    }
  }
    
};
