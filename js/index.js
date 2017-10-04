$(document).ready(function() {
  var alarmBeep = $("#alarm-sound")[0];

  //initial state sets work and break times, timer toggle
  var workTime = 25;
  var breakTime = 5;
  var counter = 0;
  var toggle = 0;
  var whatTime = "work";
  var ticker;
  //timer adjust handlers change initial state
  $("#work-up").click(function() {
    if (toggle === 0) {
      workTime += 1;
      counter = 0;
      $("#work-length").text(workTime);
      if (whatTime == "work"){$("#timer").text(workTime + ":" + "00");}
    }
  });

  $("#work-down").click(function() {
    if (toggle === 0) {
      if (workTime > 1) {
        workTime -= 1;
        counter = 0;
      }
      $("#work-length").text(workTime);
      if (whatTime == "work"){ $("#timer").text(workTime + ":" + "00"); }
    }
  });

  $("#break-up").click(function() {
    if (toggle === 0) {
      breakTime += 1;
      counter = 0;
      $("#break-length").html(breakTime);
       if (whatTime == "break"){ $("#timer").text(breakTime + ":" + "00"); }
    }
  });

  $("#break-down").click(function() {
    if (toggle === 0) {
      if (breakTime > 1) {
        breakTime -= 1;
        counter = 0;
      }
      $("#break-length").html(breakTime);
      if (whatTime == "break"){ $("#timer").text(breakTime + ":" + "00"); }
    }
  });

  //click handler starts or stops timer
  $("#start-button").click(function() {
    if (whatTime == "work") {
      $("#title").text("Work Time!");
    } else if (whatTime == "break") {
      $("#title").text("Break Time!");
    }
    //initialize counter
    if (counter === 0 && whatTime == "work") {
      counter = workTime * 60;
    } else if (counter === 0 && whatTime == "break") {
      counter = breakTime * 60;
    }
    
    //start/pause toggle
    if (toggle === 0) {
      ticker = setInterval(doroDown, 1000);
      toggle = 1;
    } else if (toggle == 1) {
      clearInterval(ticker);
      toggle = 0;
    }
  });
  //timer increments counter down and updates display
  //counts down, plays sound at 0 and changes to next time
  //clicking a second time pauses timer
  //
  function doroDown() {
    //increment counter and update display
    counter -= 1;
    var mins = Math.floor(counter / 60);
    var secs = counter % 60;
    if (secs < 10){ secs = "0" + secs }
    $("#timer").text(mins + ":" + secs);
    
    //play beep at countdown and change timer
    if (counter === 0) {
      if (whatTime == "work") {
        whatTime = "break";
        alarmBeep.play();
        setTimeout(function() {
          alarmBeep.pause();
          alarmBeep.currentTime = 0;
        }, 2000);
        counter = breakTime * 60;
        $("#title").text("Work Time!");
        
      } else if (whatTime == "break") {
        whatTime = "work";
        alarmBeep.play();
        setTimeout(function() {
          alarmBeep.pause();
          alarmBeep.currentTime = 0;
        }, 2000);
        counter = workTime * 60;
        $("#title").text("Work Time!");
      }
    }
  }

  //reset button stops clock and resets initial state to default values
  $("#reset-button").click(function() {
    clearInterval(ticker);
    workTime = 25;
    breakTime = 5;
    counter = 0;
    whatTime = "work";
    $("#work-length").text(workTime);
    $("#break-length").text(breakTime);
    $("#timer").text(workTime + ":" + "00");
    $("#title").text("Pomodoro Clock");
  });
});