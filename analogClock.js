const hourHand = document.getElementById("hour-hand");
const minHand = document.getElementById("minute-hand");
const secHand = document.getElementById("second-hand");

const runClock = () => {
  const date = new Date();

  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  const hourRotate = 30 * hour + minute / 2;
  const minuteRotate = 6 * minute;
  const secondRotate = 6 * second;

  hourHand.style.transform = `rotate(${hourRotate}deg)`;
  minHand.style.transform = `rotate(${minuteRotate}deg)`;
  secHand.style.transform = `rotate(${secondRotate}deg)`;
};
setInterval(runClock, 1000);

const timeDisplay = () => {
  let ampm;
  const timeLabel = document.getElementById("timeLabel");
  const date = new Date();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  if (hours >= 12) {
    ampm = "PM";
  } else {
    if (hours == 12) {
      ampm = "AM";
    }
    ampm = "AM";
  }

  timeLabel.innerHTML = `${hours}:${minutes}:${ampm}`;
};
setInterval(timeDisplay, 1000);

const dateDisplay = () => {
  const dateLabel = document.getElementById("dateLabel");
  const currentDate = new Date();

  const options = {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  };
  const dateString = currentDate.toLocaleDateString("en-IN", options);

  dateLabel.innerHTML = dateString;
};
dateDisplay();

// Function to set the alarm
let flag = false;
let alarmTimeout;

function setAlarm() {
  const alarmTimeInput = document.getElementById("timeInput");
  const alarmSetTo = document.getElementById("alarmSetTo");
  const alarmSound = document.getElementById("alarmSound");
  const alarmSuccess = document.getElementById("alarmSuccess");

  const currentTime = new Date();
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();

  const alarmTime = alarmTimeInput.value;

  if (alarmTime == "") {
    alert("Please select TIME for ALARM");
    return;
  } else if (flag == true) {
    alert("Let the PREVIOUS ALARM RING then you can set a new ALARM");
    return;
  } else {
    const [alarmHours, alarmMinutes] = alarmTime.split(":");

    let alarmInMilliseconds =
      (alarmHours - currentHours) * 60 * 60 * 1000 +
      (alarmMinutes - currentMinutes) * 60 * 1000;

    if (alarmInMilliseconds < 0) {
      alarmInMilliseconds += 24 * 60 * 60 * 1000;
    }

    alarmTimeout = setTimeout(() => {
      flag = false;

      alarmSound.play();
      alarmSuccess.innerHTML = "Alarm sounded";
    }, alarmInMilliseconds);

    alarmSetTo.innerHTML = `Alarm set for ${alarmTime}`;
    alert(`Alarm is set to ${alarmTime}`);
  }
  flag = true;
}

const stopAlarm = () => {
  const alarmSound = document.getElementById("alarmSound");
  const alarmSuccess = document.getElementById("alarmSuccess");
  const alarmSetTo = document.getElementById("alarmSetTo");
  const alarmTimeInput = document.getElementById("timeInput");

  if (alarmTimeout) {
    alarmSound.pause();
    alarmTimeInput.value = "";
    alarmSetTo.innerHTML = `Alarm set for ${alarmTimeInput.value}`;
    alarmSuccess.innerHTML = "";

    alert("Alarm stopped");
    window.location.reload();
  } else {
    alert("First set an ALARM then STOP the ALARM...");
  }
}