// Initialize Firebase
var config = {
  apiKey: "AIzaSyASjANpV07aeZOn5Tjij3h72mLTtrHGKGE",
  authDomain: "bootcamp-example-a31a7.firebaseapp.com",
  databaseURL: "https://bootcamp-example-a31a7.firebaseio.com",
  projectId: "bootcamp-example-a31a7",
  storageBucket: "bootcamp-example-a31a7.appspot.com",
  messagingSenderId: "727750684324",
  appId: "1:727750684324:web:5650705104087757ab4031"
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

  alert("Buz added");

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
  var busFreq = childSnapshot.val().frequency;
  var firstbusTime = childSnapshot.val().firstTime;

  // calculations

  var timeArr = firstbusTime.split(":");
  var busTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
  var maxMoment = moment.max(moment(), busTime);
  var bMin;
  var bArr;

  if (maxMoment === busTime){
    bArr = busTime.format("hh:mm A");
    bMin = busTime.diff(moment(), "minutes");
  }else{
    var differenceTimes = moment().diff(busTime, "minutes");
      var bRemainder = differenceTimes % busFreq;
      bMin = busFreq - bRemainder;
      bArr = moment().add(bMin, "m").format("hh:mm A");
  }
  console.log("tMinutes:", bMin);
  console.log("tArrival:", bArr);


  // Dom? for html
//  var newRow = $("<tr>").append(
//    $("<td>").text(busName),
//    $("<td>").text(busDest),
//    $("<td>").text(firstbusTime),
//    $("<td>").text(busFreq)
//  );
//
//  $("#Buz-table > tbody").append(newRow);
//
  $("#Buz-table > tbody").append(
    $("<tr>").append(
      $("<td>").text(busName),
      $("<td>").text(busDest),
      $("<td>").text(firstbusTime),
      $("<td>").text(busFreq)
    )
  );
});