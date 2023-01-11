// Allows the use of the Advanced Format plugin from dayjs
dayjs.extend(window.dayjs_plugin_advancedFormat)

// Global variables for the save buttons and hour blocks
var saveBtn = $('.saveBtn');
var clearBtn = $('#button-85')
var time09 = $('#hour-9');
var time10 = $('#hour-10');
var time11 = $('#hour-11');
var time12 = $('#hour-12');
var time13 = $('#hour-13');
var time14 = $('#hour-14');
var time15 = $('#hour-15');
var time16 = $('#hour-16');
var time17 = $('#hour-17');

// Array of the query selected time blocks
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

// function to pull the data from local storage and placed in the appropriate textbox
function getStorage () {
  for (var el of timeArray){
    el.val(localStorage.getItem('Block ' + el.data('hour')))
  }
};

// function to check the current time and iterate over the timeArray to change the css based on the current time. 
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

// function to save the data that was typed in the text box to local storage
function submission (event) {
  event.preventDefault();

  var btnClicked = $(event.currentTarget);
  var textArea = btnClicked.siblings('textarea')
  var timeData = textArea.data('hour');
 
  localStorage.setItem('Block ' +  timeData, textArea.val());
}

// Call both getStorage and timeCheck
getStorage();
timeCheck();

// Sets the function timeCheck to be ran every second.
setInterval(timeCheck, 1000);

// adds a onClick event to the saveBtn element and runs the function submisson
saveBtn.click(submission);

// clears all data from local storage and for each textarea
clearBtn.click(function() {
  localStorage.clear();
  for (var i = 0; i < timeArray.length; i++) {
    timeArray[i].val('');
  }
});