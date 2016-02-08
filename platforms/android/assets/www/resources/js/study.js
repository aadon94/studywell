/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
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
        console.log('hit');
        //monitorSensors();
        var statusOn = false;
        document.getElementById('myonoffswitch').onchange = function() {
   	 		if ( document.getElementById('myonoffswitch').checked === false ) {
        		stopMonitorSensors();
    		}
			if ( document.getElementById('myonoffswitch').checked === true ) {
        		monitorSensors();
    		}
		}

    },
};

app.initialize();

function monitorSensors() {
	micIntervalCount = 0;
	micNotStudying = 0;
	accelIntervalCount = 0;
	accelNotStudying = 0;
	statusOn = true;
	accelInterval(); //for testing, remove for actual usage
	micInterval(); //for testing, remove for actual usage
    accelMonSensor = setInterval(accelInterval, 30000); //starts monitoring the sensor every X milliseconds
    micMonSensor = setInterval(micInterval, 30000); //starts monitoring the sensor every X milliseconds

}

function stopMonitorSensors() {
	if (statusOn = true) {
		createSessionScore(micNotStudying, micIntervalCount, accelNotStudying, accelIntervalCount);
		clearInterval(accelMonSensor);
		clearInterval(micMonSensor);
		clearTimeout(accelMonSensor);
		clearTimeout(micMonSensor);
		stopMicInterval();
		stopAccelInterval();
        statusOn = false;
	}
}