// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyAewG6k0cUy5jtC8gAKn-fcrPQVLl-lYrw",
  authDomain: "buztable.firebaseapp.com",
  databaseURL: "https://buztable.firebaseio.com",
  projectId: "buztable",
  storageBucket: "buztable.appspot.com",
  messagingSenderId: "886513893761",
  appId: "1:886513893761:web:072a5bd7aef6a6a5d02880",
  measurementId: "G-29R2LM1XRJ"
};

firebase.initializeApp(config);

var database = firebase.database();


$("#add-Buz-btn").on("click", function(event) {
  event.preventDefault();

  // input var
  var busName = $("#Buz-name-input").val().trim();
  var busDest = $("#destination-input").val().trim();
  var firstbusTime = $("#first-Buz-input").val().trim();
  var busFreq = $("#frequency-input").val().trim();

  // temporary
  var newbus = {
    name: busName,
    destination: busDest,
    firstTime: firstbusTime,
    frequency: busFreq
  };

  database.ref().push(newbus);

  console.log(newbus.name);
  console.log(newbus.destination);
  console.log(newbus.firstTime);
  console.log(newbus.frequency);


  $("#Buz-name-input").val("");
  $("#destination-input").val("");
  $("#first-Buz-input").val("");
  $("#frequency-input").val("");
});

//  DOM thing?
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());

  var busName = childSnapshot.val().name;
  var busDest = childSnapshot.val().destination;
  var firstbusTime = childSnapshot.val().firstTime;
  var busFreq = childSnapshot.val().frequency;

  console.log(busName);
  console.log(busDest);
  console.log(firstbusTime);
  console.log(busFreq);

  // calculations
  var firstbusTimeConv = moment(firstbusTime, "hh:mm a").subtract(1, "years");
  var currentTime = moment().format("HH:mm a");
  console.log("Current Time:" + currentTime);
  var busTimeCurrentTimeDiff = moment().diff(moment(firstbusTimeConv), "minutes");
  var timeLeft = busTimeCurrentTimeDiff % busFreq;
  var minutesAway = busFreq - timeLeft;
  var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm a");

  // Dom? for html
  $("#Buz-table > tbody").append("<tr><td>" + busName + "</td><td>" + busDest + "</td><td>" + busFreq + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
});