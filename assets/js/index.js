dayjs.extend(window.dayjs_plugin_advancedFormat)

var saveBtn = $('.saveBtn');
var time09 = $('#hour-9');
var time10 = $('#hour-10');
var time11 = $('#hour-11');
var time12 = $('#hour-12');
var time13 = $('#hour-13');
var time14 = $('#hour-14');
var time15 = $('#hour-15');
var time16 = $('#hour-16');
var time17 = $('#hour-17');

var timeArray = [
  time09,
  time10,
  time11,
  time12,
  time13,
  time14,
  time15,
  time16,
  time17
];

function timeCheck() {
  var todayTime = $('#currentDay');
  todayTime.html(dayjs().format('dddd, MMMM Do, YYYY <br> HH:mm:ss'));

  var currentTime = dayjs().format('kk');

  for (var i = 0; i < timeArray.length; i++) {
    timeArray[i].removeClass('future past present');

    if (currentTime > timeArray[i].data('hour')) {
      timeArray[i].addClass('past');
    } else if (currentTime == timeArray[i].data('hour')) {
      timeArray[i].addClass('present');
    } else {
      timeArray[i].addClass('future');
    }
  }
}

function comeON () {
  for (var el of timeArray){
    el.val(localStorage.getItem('Block ' + el.data('hour')))
  }
};

function submission (event) {
  event.preventDefault();

  var btnClicked = $(event.currentTarget);
  var textArea = btnClicked.siblings('textarea')
  var dataDiv = btnClicked.parent('div');
  var timeData = dataDiv.data('hour');
 
  localStorage.setItem('Block ' +  timeData, textArea.val());

}

comeON();
timeCheck();
setInterval(timeCheck, 1000);

saveBtn.click(submission);