audios = ['a-chams.mp3', 'ad-douha.mp3', 'al-aadiate.mp3', 'al-aalaa.mp3', 'al-asr.mp3', 'al-balad.mp3', 'al-bayinah.mp3', 'al-charh.mp3', 'al-codr.mp3', 'al-coriya.mp3', 'al-fadjr.mp3', 'al-falaq.mp3', 'al-fiil.mp3', 'al-ghaashiyah.mp3', 'al-houmazah.mp3', 'al-ikhlas.mp3', 'al-kaafiroun.mp3', 'al-kawthar.mp3', 'al-kouraiche.mp3', 'al-layl.mp3', 'al-maaoun.mp3', 'al-massad.mp3', 'al-naas.mp3', 'al-zalzalah.mp3', 'an-nasr.mp3', 'at-takaathur.mp3', 'at-tiin.mp3', 'fatiha.mp3', 'iqra.mp3']

function createLi(){
	var li; 
	var i;
	var audioName;  
	var sourateNumber;  
	for (i = 0; i < audios.length; i++){
		li = document.createElement('li');
		audioName = document.createAttribute("audiourl"); // Create a "audiaurl" attribute
		sourateNumber = document.createAttribute("artist");
		audioName.value = audios[i];  		// Set the value of the attribute
		sourateNumber.value = "Sourate " + i // TODO:: SHOULD MODIFY IT AFTER
		li.setAttributeNode(audioName);	// Add the audioName attribute to <li>
		li.setAttributeNode(sourateNumber);
		li.innerHTML = audios[i];
		// Add new item to task list
		document.querySelector('.playlist').append(li);
		}
}

// inner variables
var song;
var tracker = $('.tracker');
var volume = $('.volume');
// initialization - first element in playlist
initAudio($('.playlist li:first-child'));
// set volume
song.volume = 0.8;
// initialize the volume slider
volume.slider({
    range: 'min',
    min: 1,
    max: 100,
    value: 80,
    start: function(event,ui) {},
    slide: function(event, ui) {
        song.volume = ui.value / 100;
    },
    stop: function(event,ui) {},
});
// empty tracker slider
tracker.slider({
    range: 'min',
    min: 0, max: 10,
    start: function(event,ui) {},
    slide: function(event, ui) {
        song.currentTime = ui.value;
    },
    stop: function(event,ui) {}
});
function initAudio(elem) {
    var url = elem.attr('audiourl');
    var title = elem.text();
   // var cover = elem.attr('cover');
    var artist = elem.attr('artist');
    $('.player .title').text(title);
    $('.player .artist').text(artist);
    //$('.player .cover').css('background-image','url(data/' + cover+')');;
    song = new Audio('data/' + url);
    // timeupdate event listener
    song.addEventListener('timeupdate',function (){
        var curtime = parseInt(song.currentTime, 10);
        tracker.slider('value', curtime);
    });
    $('.playlist li').removeClass('active');
    elem.addClass('active');
}
function playAudio() {
    song.play();
    tracker.slider("option", "max", song.duration);
    $('.play').addClass('hidden');
    $('.pause').addClass('visible');
}
function stopAudio() {
    song.pause();
    $('.play').removeClass('hidden');
    $('.pause').removeClass('visible');
}
// play click
$('.play').click(function (e) {
    e.preventDefault();
    playAudio();
});
// pause click
$('.pause').click(function (e) {
    e.preventDefault();
    stopAudio();
});
// forward click
$('.fwd').click(function (e) {
    e.preventDefault();
    stopAudio();
    var next = $('.playlist li.active').next();
    if (next.length == 0) {
        next = $('.playlist li:first-child');
    }
    initAudio(next);
});
// rewind click
$('.rew').click(function (e) {
    e.preventDefault();
    stopAudio();
    var prev = $('.playlist li.active').prev();
    if (prev.length == 0) {
        prev = $('.playlist li:last-child');
    }
    initAudio(prev);
});
// show playlist
$('.pl').click(function (e) {
    e.preventDefault();
    $('.playlist').fadeIn(300);
});
// playlist elements - click
$('.playlist li').click(function () {
    stopAudio();
    initAudio($(this));
}); 