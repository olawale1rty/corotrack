//home

//api call
var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://covid-193.p.rapidapi.com/statistics",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "covid-193.p.rapidapi.com",
		"x-rapidapi-key": "b71a1c1557msh4e99012ed146dd9p1a3d1djsnbf14b7e620f1"
	}
}

$.ajax(settings).done(function (response) {

    let list = response.response.sort((a, b) => (a.country> b.country) ? 1 : -1)
    list_slice = list.slice(215)
    const date = new Date();
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
   
	list_slice.forEach((input)=>{
      
    	var row = document.createElement('tr');
    	row.classList.add('row');

    	var country = document.createElement('td');
    	country.classList.add('country');
    	country.innerHTML = Object.values(input)[0]

    	let cases = Object.values(input)[1]

    	var newCases = document.createElement('td');
    	newCases.classList.add('newCases');
    	newCases.innerHTML = Object.values(cases)[0]

    	var activeCases = document.createElement('td');
    	activeCases.classList.add('activeCases');
    	activeCases.innerHTML = Object.values(cases)[1]

    	var criticalCases = document.createElement('td');
    	criticalCases.classList.add('criticalCases');
    	criticalCases.innerHTML = Object.values(cases)[2]

    	var recordedCases = document.createElement('td');
    	recordedCases.classList.add('recordedCases');
    	recordedCases.innerHTML = Object.values(cases)[3]

    	var totalCases = document.createElement('td');
    	totalCases.classList.add('totalCases');
    	totalCases.innerHTML = Object.values(cases)[4]

    	let death = Object.values(input)[2]

    	var newDeaths = document.createElement('td');
    	newDeaths.classList.add('newDeaths');
    	newDeaths.innerHTML = Object.values(death)[0]

    	var totalDeaths = document.createElement('td');
    	totalDeaths.classList.add('totalDeaths');
    	totalDeaths.innerHTML = Object.values(death)[1]

    	let test2 = Object.values(input)[3]

    	var test = document.createElement('td');
    	test.classList.add('test');
    	test.innerHTML = Object.values(test2)[0]

    	var day = document.createElement('td');
    	day.classList.add('day');
        //date format
        let part =Object.values(input)[4].split('-');
        let  newDate = new Date(Number(part[0]),Number(part[1])-1, Number(part[2]));
        let month = months[newDate.getMonth()]
        let dat = newDate.getDate()
        let year = newDate.getFullYear()
    	day.innerHTML = month + " " + dat + "th " + year

    	var time = document.createElement('td');
    	time.classList.add('time');

        function formatDate(date_in) {
          let diff = new Date() - date_in; // the difference in milliseconds

          if (diff < 1000) { // less than 1 second
            return 'right now';
          }

          let sec = Math.floor(diff / 1000); // convert diff to seconds
          if (sec < 60) {
            return (sec == 1) ? sec + ' second ago' : sec + ' seconds ago' ;
          }

          let min = Math.floor(diff / 60000); // convert diff to minutes
          if (min < 60) {
            return (min == 1) ? min + ' minute ago' :  min + ' minutes ago' ;
          }

          let hour = Math.floor(diff / 3600000); // convert diff to hours
          if (hour < 60) {
            return  (hour == 1) ? hour + ' hour ago' :  hour + ' hours ago' ;
          }

          // format the date
          // add leading zeroes to single-digit day/month/hours/minutes
          let d = date_in;
          d = [
            '0' + d.getDate(),
            '0' + (d.getMonth() + 1),
            '' + d.getFullYear(),
            '0' + d.getHours(),
            '0' + d.getMinutes()
          ].map(component => component.slice(-2)); // take last 2 digits of every component

          // join the components into date
          return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
        }

        d_time = Date.parse(Object.values(input)[5])
        time.innerHTML = formatDate(new Date(d_time))



    	row.appendChild(country);
    	row.appendChild(newCases);
    	row.appendChild(activeCases);
    	row.appendChild(criticalCases);
    	row.appendChild(recordedCases);
    	row.appendChild(totalCases);
    	row.appendChild(newDeaths);
    	row.appendChild(totalDeaths);
    	row.appendChild(test);
    	row.appendChild(day);
    	row.appendChild(time);

    	let table = document.querySelector(".my_table_body");
    	table.appendChild(row);
    	
        Maps(Object.values(input)[0], Object.values(cases)[0], Object.values(cases)[1], Object.values(cases)[2], Object.values(cases)[3], Object.values(cases)[4], Object.values(death)[0], Object.values(death)[1], Object.values(test2)[0], Object.values(input)[4], Object.values(input)[5])
	})

});


function Maps(countries, newC, activeC, criticalC, recordedC, totalC, newD, totalD, totalT, date, time){

    // google.charts.load('current', {
    //     'packages':['geochart'],
    //     'mapsApiKey': 'AIzaSyDdQBEfXOPS9BWK08zAi47AqvgyYHZ5_gw'
    // });
    // google.charts.setOnLoadCallback(drawRegionsMap);

    // function drawRegionsMap() {
    //     var data = google.visualization.arrayToDataTable([
    //       ['Country', 'New Cases', 'Active Cases',  'Total Cases'],
    //       ["Ghana", 5, 1457,  766],
    //       ["Nigeria", 8, 9,  9876],
    //       // [countries, newC, activeC,  totalC],
    //       // [countries, newC, activeC,  totalC],
    //       // [countries, newC, activeC,  totalC],
          
    //     ]);

    // var options = {};

    // var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    // chart.draw(data, options);
    // }

    //bar chat
    if (countries === "All"){
        google.charts.load("current", {packages:["corechart"]});
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
          var data = google.visualization.arrayToDataTable([
            ["Country", "All", { role: "style" } ],
            
            ["Active cases", activeC, "color: black"],
            ["New cases", newC, "color: blue"],
            ["Critical cases", criticalC, "color: red"],
            ["Recovered cases", recordedC, "color: brown"],
            ["Total cases", totalC, "color: grey"],
            ["New deaths", newD, "color: purple"],
            ["Total Deaths", totalD, "color: orange"]
          ]);
          var view = new google.visualization.DataView(data);
          view.setColumns([0, 1,
                           { calc: "stringify",
                             sourceColumn: 1,
                             type: "string",
                             role: "annotation" },
                           2]);

          var options = {
            title: "",
            width: 400,
            height: 300,
            bar: {groupWidth: "50%"},
            legend: { position: "none" },
          };
          var chart = new google.visualization.BarChart(document.getElementById("barchart_values"));
          chart.draw(view, options);
        }
    }

    
    if (countries === "Africa"){
        google.charts.load("current", {packages:["corechart"]});
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
          var data = google.visualization.arrayToDataTable([
            ["Country", "All", { role: "style" } ],
            
            ["Active cases", activeC, "color: black"],
            ["New cases", newC, "color: blue"],
            ["Critical cases", criticalC, "color: red"],
            ["Recovered cases", recordedC, "color: brown"],
            ["Total cases", totalC, "color: grey"],
            ["New deaths", newD, "color: purple"],
            ["Total Deaths", totalD, "color: orange"]
          ]);
          var view = new google.visualization.DataView(data);
          view.setColumns([0, 1,
                           { calc: "stringify",
                             sourceColumn: 1,
                             type: "string",
                             role: "annotation" },
                           2]);

          var options = {
            title: "",
            width: 400,
            height: 300,
            bar: {groupWidth: "50%"},
            legend: { position: "none" },
          };
          var chart = new google.visualization.BarChart(document.getElementById("barchart_values_2"));
          chart.draw(view, options);
        }
    }

    if (countries === "Asia"){
        google.charts.load("current", {packages:["corechart"]});
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
          var data = google.visualization.arrayToDataTable([
            ["Country", "All", { role: "style" } ],
            
            ["Active cases", activeC, "color: black"],
            ["New cases", newC, "color: blue"],
            ["Critical cases", criticalC, "color: red"],
            ["Recovered cases", recordedC, "color: brown"],
            ["Total cases", totalC, "color: grey"],
            ["New deaths", newD, "color: purple"],
            ["Total Deaths", totalD, "color: orange"]
          ]);
          var view = new google.visualization.DataView(data);
          view.setColumns([0, 1,
                           { calc: "stringify",
                             sourceColumn: 1,
                             type: "string",
                             role: "annotation" },
                           2]);

          var options = {
            title: "",
            width: 400,
            height: 300,
            bar: {groupWidth: "50%"},
            legend: { position: "none" },
          };
          var chart = new google.visualization.BarChart(document.getElementById("barchart_values_3"));
          chart.draw(view, options);
        }
    }

    if (countries === "Europe"){
        google.charts.load("current", {packages:["corechart"]});
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
          var data = google.visualization.arrayToDataTable([
            ["Country", "All", { role: "style" } ],
            
            ["Active cases", activeC, "color: black"],
            ["New cases", newC, "color: blue"],
            ["Critical cases", criticalC, "color: red"],
            ["Recovered cases", recordedC, "color: brown"],
            ["Total cases", totalC, "color: grey"],
            ["New deaths", newD, "color: purple"],
            ["Total Deaths", totalD, "color: orange"]
          ]);
          var view = new google.visualization.DataView(data);
          view.setColumns([0, 1,
                           { calc: "stringify",
                             sourceColumn: 1,
                             type: "string",
                             role: "annotation" },
                           2]);

          var options = {
            title: "",
            width: 400,
            height: 300,
            bar: {groupWidth: "50%"},
            legend: { position: "none" },
          };
          var chart = new google.visualization.BarChart(document.getElementById("barchart_values_4"));
          chart.draw(view, options);
        }
    }

    if (countries === "Oceania"){
        google.charts.load("current", {packages:["corechart"]});
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
          var data = google.visualization.arrayToDataTable([
            ["Country", "All", { role: "style" } ],
            
            ["Active cases", activeC, "color: black"],
            ["New cases", newC, "color: blue"],
            ["Critical cases", criticalC, "color: red"],
            ["Recovered cases", recordedC, "color: brown"],
            ["Total cases", totalC, "color: grey"],
            ["New deaths", newD, "color: purple"],
            ["Total Deaths", totalD, "color: orange"]
          ]);
          var view = new google.visualization.DataView(data);
          view.setColumns([0, 1,
                           { calc: "stringify",
                             sourceColumn: 1,
                             type: "string",
                             role: "annotation" },
                           2]);

          var options = {
            title: "",
            width: 400,
            height: 300,
            bar: {groupWidth: "50%"},
            legend: { position: "none" },
          };
          var chart = new google.visualization.BarChart(document.getElementById("barchart_values_5"));
          chart.draw(view, options);
        }
    }

    if (countries === "North-America"){
        google.charts.load("current", {packages:["corechart"]});
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
          var data = google.visualization.arrayToDataTable([
            ["Country", "All", { role: "style" } ],
            
            ["Active cases", activeC, "color: black"],
            ["New cases", newC, "color: blue"],
            ["Critical cases", criticalC, "color: red"],
            ["Recovered cases", recordedC, "color: brown"],
            ["Total cases", totalC, "color: grey"],
            ["New deaths", newD, "color: purple"],
            ["Total Deaths", totalD, "color: orange"]
          ]);
          var view = new google.visualization.DataView(data);
          view.setColumns([0, 1,
                           { calc: "stringify",
                             sourceColumn: 1,
                             type: "string",
                             role: "annotation" },
                           2]);

          var options = {
            title: "",
            width: 400,
            height: 300,
            bar: {groupWidth: "50%"},
            legend: { position: "none" },
          };
          var chart = new google.visualization.BarChart(document.getElementById("barchart_values_6"));
          chart.draw(view, options);
        }
    }

    if (countries === "South-America"){
        google.charts.load("current", {packages:["corechart"]});
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
          var data = google.visualization.arrayToDataTable([
            ["Country", "All", { role: "style" } ],
            
            ["Active cases", activeC, "color: black"],
            ["New cases", newC, "color: blue"],
            ["Critical cases", criticalC, "color: red"],
            ["Recovered cases", recordedC, "color: brown"],
            ["Total cases", totalC, "color: grey"],
            ["New deaths", newD, "color: purple"],
            ["Total Deaths", totalD, "color: orange"]
          ]);
          var view = new google.visualization.DataView(data);
          view.setColumns([0, 1,
                           { calc: "stringify",
                             sourceColumn: 1,
                             type: "string",
                             role: "annotation" },
                           2]);

          var options = {
            title: "",
            width: 400,
            height: 300,
            bar: {groupWidth: "50%"},
            legend: { position: "none" },
          };
          var chart = new google.visualization.BarChart(document.getElementById("barchart_values_7"));
          chart.draw(view, options);
        }
    }
}

