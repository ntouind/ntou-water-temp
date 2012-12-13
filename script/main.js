var deg_toggle = false; //true = of false = oc
var now_deg = -100;
var hammer = new Hammer( document.documentElement );
var manifest_url = "http://rasengan.im/dorm/manifest.php";
var dormIndex = 1;
var dormName = ["dorm1","dorm2","dorm3"];
var dormFileList = ["./data.php?id=0","./data.php?id=1","./data.php?id=2"];
var retriedTimes = 3;
$(function(){

  setInterval( function(){ main() }, 3000);
  if( typeof( $.cookie('dormIndex')) == 'undefined' || $.cookie('dormIndex') == null)
    $.cookie( 'dormIndex', 1);
  dormIndex = parseInt($.cookie('dormIndex'));

  if( window.location.hash )
    for( i=0 ; i<3 ; i++ )
      if( window.location.hash.substring(1) == dormName[ i ] )
        dormIndex = i;

  switch_dorm('update');
  main();

});

function main(){

  $.get( dormFileList[ dormIndex ], function( data ){
    now_deg = data.deg;
    update_deg();
    update_time();
  }).success ( function(){
    retriedTimes = 0;
  }).error ( function(){

    retriedTimes++ ;

    if( retriedTimes > 4 ){

      now_deg=-100;
      update_deg();
      $("#now_deg time").html('no network connection')
    }
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

    if( deg_toggle ){

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

function switch_dorm( option ){

  switch( option ){
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
  $('#dormName').html("Male Dormitory No" + dormNum );
  $.cookie("dormIndex", dormIndex );
  location.hash = dormName[ dormIndex ];

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

};

$(document.documentElement).keydown(function(e){

  switch( e.keyCode ){
    case 39:
      switch_dorm( 'left' );
      break;
    case 37:
      switch_dorm( 'right' );
      break;
  }

});

