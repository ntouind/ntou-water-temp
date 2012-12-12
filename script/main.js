var deg_toggle = false; //true = of false = oc
var now_deg = -100;
var hammer = new Hammer(document.documentElement);
var manifest_url = "http://rasengan.im/dorm/manifest.php";
var dormIndex = 1;
var dormFileList = ["./data.php?id=0","./data.php?id=1","./data.php?id=2"];

$(function(){
  if (typeof($.cookie('dormIndex')) == 'undefined' || $.cookie('dormIndex') == null){
    $.cookie('dormIndex',1);
  }
  dormIndex = $.cookie('dormIndex');
  switch_dorm('update');
  setInterval( function(){ main() }, 3000);
  main();
});

function main(){
  $.get(dormFileList[dormIndex], function(data){
    now_deg = data.deg;
    update_deg();
    update_time();
  });
}

function toggle_type(){
  deg_toggle = !deg_toggle;
  update_deg();
}

function update_deg(){
  if(now_deg == -100){
    $("#now_deg typ").html("");
    $("#now_deg deg").html("No Data");
    $("#now_deg deg").addClass("gray").removeClass("green");
  }else{
    $("#now_deg deg").removeClass("gray").addClass("green");
    if(deg_toggle){
      $("#now_deg typ").html("℉");
      $("#now_deg deg").html((now_deg*(9/5)+32).toFixed(2));
    }else{
      $("#now_deg typ").html("℃");
      $("#now_deg deg").html(now_deg.toFixed(2));
    }
  }
}

function update_time(){
    var d = new Date();
    var curr_hour = d.getHours();
    var a_p = "AM ";
    var s = d.getMonth() + "/" + d.getDate();
    if( curr_hour < 12 ){ a_p = " AM "; }else{ a_p = " PM "; }
    if( curr_hour == 0 ){ curr_hour = 12; }
    if( curr_hour > 12 ){ curr_hour = curr_hour - 12; }
    s = s + a_p + curr_hour + ":" + d.getMinutes() + ":" + d.getSeconds();
    $("#now_deg time").html(s)
}

function switch_dorm(option){
  switch(option){
    case 'left':
      if( dormIndex + 1 <= 2 )
        dormIndex++;
      break;
    case 'right':
      if( dormIndex - 1 >= 0 )
        dormIndex--;
      break;
  }
  main();
  var dormNum = dormIndex;
  dormNum++;
  $('#dormName').html("Male Dormitory No" + dormNum);
}

hammer.onswipe = function(ev) {
  switch( ev.direction ) {
    case 'left':
      switch_dorm( 'left' );
      break;
    case 'right':
      switch_dorm( 'right' );
      break;
  }
  $.cookie("dormIndex", dormIndex);
};

$(document.documentElement).keydown(function(e){
  switch(e.keyCode){
  case 39:
    switch_dorm( 'left' );
    break;
  case 37:
    switch_dorm( 'right' );
    break;
  }
});

