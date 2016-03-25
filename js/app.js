$().ready(function(){
  resizeCanvas();
  $(window).resize(function(){
    resizeCanvas();
  });
  main();
});

var position = 0;
var fadeTime = 1000;
var intervalTime = 5000;

function main(){
  show();
  setInterval(function(){
    show();
  },intervalTime);
}

function show(){
  var pages = $('#content').children('.page');
  if(position > (pages.length-1)) {
    position = 0;
  }
  var page = $(pages[position]);
  var imageName = page.attr('data-background-image');
  var img = $('<img/>');
  img.attr('src',imageName);
  img.load(function(){
    var prevImg = $('#canvas img');
    var ul = $('#canvas ul');
    if(prevImg.get(0)) {
      ul.fadeOut(fadeTime);
      prevImg.fadeOut(fadeTime, function(){
        $('#canvas').append(img);
        list();
        prevImg.remove();
        position++;
      });
    }else{
      $('#canvas').append(img);
      list();
      position++;
    }
  });
}

function list(){
  var page = $($('#content').children('.page')[position]);
  var list = page.find('ul').clone();
  list.hide();
  $('#canvas').append(list);
  list.fadeIn(fadeTime);
}

function resizeCanvas() {
  var height = $(window).height();
  var width = $(window).width();
  $('#canvas').css("height", height + "px");
  $('#canvas').css("width", width + "px");
}
