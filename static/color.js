// List of all states in map for iteration
var stateList = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New_Hampshire","New_Jersey","New_Mexico","New_York","North_Carolina","North_Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode_Island","South_Carolina","South_Dakota","Tennesse","Texas","Utah","Vermont","Virginia","Washington","West_Virginia","Wisconsin","Wyoming", "DC"]
var svg = null;
var states = null;
var statesMap = null;
var male = true;

function colorMap(info, dataSet = stdev[10]){
  //Get all states
  svg = document.getElementById("map").contentDocument;
  states = svg.getElementsByTagName("*");

  document.getElementById("info").textContent = dataSet['type'];
  
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
    var life = data['Life Expectancy'][i][dataSet['type']];
    var stdevv = dataSet['stdev'];
    var mean = dataSet['avg'];
    var zscore = (life - mean)/stdevv;
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
    

}
// Look this is a stats project not a compsci project and this was suppost to be fast LOL
// Will look for better solution later not my fault js is weird
var button1985 = document.getElementById("tray-1985");
var button1990 = document.getElementById("tray-1990");
var button1995 = document.getElementById("tray-1995");
var button2000 = document.getElementById("tray-2000");
var button2005 = document.getElementById("tray-2005");
var button2010 = document.getElementById("tray-2010");
function a(){colorMap(null, stdev[0])};
function b(){colorMap(null, stdev[2])};
function c(){colorMap(null, stdev[4])};
function d(){colorMap(null, stdev[6])};
function e(){colorMap(null, stdev[8])};
function f(){colorMap(null, stdev[10])};
function g(){colorMap(null, stdev[1])};
function h(){colorMap(null, stdev[3])};
function i(){colorMap(null, stdev[5])};
function j(){colorMap(null, stdev[7])};
function k(){colorMap(null, stdev[9])};
function l(){colorMap(null, stdev[11])};

function apply_button(){ 
  if(male){
    button1985.addEventListener("click", a);
    button1990.addEventListener("click", b);
    button1995.addEventListener("click", c);
    button2000.addEventListener("click", d);
    button2005.addEventListener("click", e);
    button2010.addEventListener("click", f);
  } else {
    button1985.addEventListener("click", g);
    button1990.addEventListener("click", h);
    button1995.addEventListener("click", i);
    button2000.addEventListener("click", j);
    button2005.addEventListener("click", k);
    button2010.addEventListener("click", l);
  }
}

function remove_button(){

  if(!male){
    button1985.removeEventListener("click", a);
    button1990.removeEventListener("click", b);
    button1995.removeEventListener("click", c);
    button2000.removeEventListener("click", d);
    button2005.removeEventListener("click", e);
    button2010.removeEventListener("click", f);
  } else {
    button1985.removeEventListener("click", g);
    button1990.removeEventListener("click", h);
    button1995.removeEventListener("click", i);
    button2000.removeEventListener("click", j);
    button2005.removeEventListener("click", k);
    button2010.removeEventListener("click", l);
  }
}

var mf = document.getElementById("mf");
mf.addEventListener("click", ()=>{
  if(male){
    remove_button();
    male = false;
    apply_button();
    mf.textContent = "Female"
  } else {
    remove_button();
    male = true;
    apply_button();
    mf.textContent = "Male"
  }
});

window.onload = colorMap;
apply_button();
