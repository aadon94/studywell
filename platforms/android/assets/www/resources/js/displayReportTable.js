var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        var swFireBase = new Firebase("https://vivid-heat-9475.firebaseIO.com/");

        var users = swFireBase.child('users');
        var userName = users.child(getUserID());
        updateTable();



    },
};

app.initialize();


function drawData(date, time, duration, score, appMessage, userNotes) {
  //var myTable = "Time: "+time + "<br> Duration: " +duration + "<br> Score: " +score +"<br> <br>";
  var sessionTable = "<table class ='tablerep'> <tr> <td class='tr-95kxB'>Date: </td> <td class='tr-95kx'>" +date + "</td> </tr>"
  sessionTable += "<tr> <td class='tr-yw4lB'>Time: </td> <td class='tr-yw4l'>" +time + "</td> </tr>"
  sessionTable += "<tr> <td class='tr-95kxB'>Duration: </td> <td class='tr-95kx'>" +duration + "</td> </tr>"
  sessionTable += "<tr> <td class='tr-yw4lB'>Score: </td> <td class='tr-yw4l'>" +score + "</td> </tr>"
  sessionTable += "<tr> <td class='tr-95kxB'>App Notes: </td> <td class='tr-95kx'>" +appMessage + "</td> </tr>"
  sessionTable += "<tr> <td class='tr-yw4lB'>User Notes: </td> <td class='tr-yw4l'>" +userNotes + "</td> </tr> </table> <br> <br>"

  document.getElementById('content').innerHTML += sessionTable;
  // document.write(myTable);
}

// function drawData(date, time, duration, score, appMessage, userNotes) {
//   //var myTable = "Time: "+time + "<br> Duration: " +duration + "<br> Score: " +score +"<br> <br>";
//   var sessionTable = "<table class ="tablerep"> <tr> <td>Date: </td> <td>" +date + "</td> </tr>"
//   sessionTable += "<tr> <td>Time: </td> <td>" +time + "</td> </tr>"
//   sessionTable += "<tr> <td>Duration: </td> <td>" +duration + "</td> </tr>"
//   sessionTable += "<tr> <td>Score: </td> <td>" +score + "</td> </tr>"
//   sessionTable += "<tr> <td>App Notes: </td> <td>" +appMessage + "</td> </tr>"
//   sessionTable += "<tr> <td>User Notes: </td> <td>" +userNotes + "</td> </tr> </table> <br> <br>"

//   document.getElementById('content').innerHTML += sessionTable;
//   // document.write(myTable);
// }




// Retrieve new posts as they are added to our database
function updateTable() {
    userName.on("child_added", function(snapshot) {
        var newPost = snapshot.val();
        drawData(newPost.date, newPost.time, newPost.duration, newPost.score, newPost.appMessage, newPost.userNotes);
    });
}



// // Retrieve new posts as they are added to our database
// function updateBackupTable() {
//     userName.on("child_added", function(snapshot) {
//         var newPost = snapshot.val();
//         console.log("Duration: " + newPost.duration);
//         console.log("Score: " + newPost.score);
//         console.log("Time " + newPost.time);
//     });
// }