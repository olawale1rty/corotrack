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
    "url": "https://covid-193.p.rapidapi.com/statistics?country=" + Query,
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "covid-193.p.rapidapi.com",
      "x-rapidapi-key": "b71a1c1557msh4e99012ed146dd9p1a3d1djsnbf14b7e620f1"
    }
  }

  $.ajax(settings).done(function (response) {
    
      let list = response.response.sort((a, b) => (a.country> b.country) ? 1 : -1)

    list.forEach((input)=>{
      
      let countries = Object.values(input)[0];

      let cases = Object.values(input)[1]; 
      let newC = Object.values(cases)[0];
      let activeC = Object.values(cases)[1];
      let criticalC = Object.values(cases)[2];
      let recordedC = Object.values(cases)[3];
      let totalC = Object.values(cases)[4];

      let death = Object.values(input)[2]; 
      let newD = Object.values(death)[0]; 
      let totalD = Object.values(death)[1];

      let test2 = Object.values(input)[3]; 
      let test = Object.values(test2)[0];

      let date = Object.values(input)[4];
      let time = Object.values(input)[5];

     
          
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
            var chart = new google.visualization.BarChart(document.getElementById("barchart_values_8"));
            chart.draw(view, options);
          }
    });
  });
}
