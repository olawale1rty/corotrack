//button
search_button_1 = () => {
    document.querySelector(".js-submit").addEventListener('click',function(){
        var userInput = document.querySelector('.js-search').value;
        search.Search(userInput);
    });

};

search_button_2 = () => {
    document.querySelector(".js-search").addEventListener('keypress',function(e){
        // if the key ENTER is pressed...
        if(e.which === 13) {
            var userInput = document.querySelector('.js-search').value;
            search.Search(userInput);
        }
    });
}
search_button_1();
search_button_2();

let search = {};
//api 

search.Search = (Query) => {
  var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://nigeria-covid-19.p.rapidapi.com/api/states",
  "method": "GET",
  "headers": {
    "x-rapidapi-host": "nigeria-covid-19.p.rapidapi.com",
    "x-rapidapi-key": "b71a1c1557msh4e99012ed146dd9p1a3d1djsnbf14b7e620f1"
  }
}

$.ajax(settings).done(function (response) {
    console.log(response);
  
    let list = response.sort((a, b) => (a.States> b.States) ? 1 : -1);

    list.forEach((input)=>{
      
      let state = Object.values(input)[1];
      let cases = Object.values(input)[2]; 
      let admission = Object.values(input)[3];
      let discharged = Object.values(input)[4];
      let deaths = Object.values(input)[5];
    
      if (state === Query){
          google.charts.load('current', {
            'packages':['geochart'],
            'mapsApiKey': 'AIzaSyDdQBEfXOPS9BWK08zAi47AqvgyYHZ5_gw'
          });
          google.charts.setOnLoadCallback(drawRegionsMap);

          function drawRegionsMap() {
              var data = google.visualization.arrayToDataTable([
                ['State', 'No_of_cases'],
                [state, cases],
                // ["Nigeria", 8, 9,  9876],
                // [countries, newC, activeC,  totalC],
                // [countries, newC, activeC,  totalC],
                // [countries, newC, activeC,  totalC],
                
              ]);

          var options = {};

          var chart = new google.visualization.GeoChart(document.getElementById('barchart_values_8'));

          chart.draw(data, options);
          }
          // google.charts.load("current", {packages:["corechart"]});
          // google.charts.setOnLoadCallback(drawChart);
          // function drawChart() {
          //   var data = google.visualization.arrayToDataTable([
          //     ["State", "All", { role: "style" } ],
          //     // ["No_of_cases", cases, "color: black"],
          //     // ["No_on_admission", admission, "color: blue"],
          //     // ["No_discharged", discharged, "color: red"],
          //     // ["No_of_deaths", deaths, "color: brown"]
           
          //   ]);
          //   var view = new google.visualization.DataView(data);
          //   view.setColumns([0, 1,
          //                    { calc: "stringify",
          //                      sourceColumn: 1,
          //                      type: "string",
          //                      role: "annotation" },
          //                    2]);

          //   var options = {
          //     title: "",
          //     width: 400,
          //     height: 300,
          //     bar: {groupWidth: "50%"},
          //     legend: { position: "none" },
          //   };
          //   var chart = new google.visualization.BarChart(document.getElementById("barchart_values_8"));
          //   chart.draw(view, options);
          // }
        }
    });
  });
}
