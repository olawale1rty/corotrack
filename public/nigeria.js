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
	
	let list = response.sort((a, b) => (a.States> b.States) ? 1 : -1);

	list.forEach((input)=>{

		var row = document.createElement('tr');
    	row.classList.add('row');

    	var state = document.createElement('td');
    	state.classList.add('states');
    	state.innerHTML = Object.values(input)[1]


    	var cases = document.createElement('td');
    	cases.classList.add('cases');
    	cases.innerHTML = Object.values(input)[2]

    	var admission = document.createElement('td');
    	admission.classList.add('admission');
    	admission.innerHTML = Object.values(input)[3]

    	var discharged = document.createElement('td');
    	discharged.classList.add('discharged');
    	discharged.innerHTML = Object.values(input)[4]

    	var deaths = document.createElement('td');
    	deaths.classList.add('deaths');
    	deaths.innerHTML = Object.values(input)[5]

    

    	row.appendChild(state);
    	row.appendChild(cases);
    	row.appendChild(admission);
    	row.appendChild(discharged);
    	row.appendChild(deaths);
    
    	let table = document.querySelector(".my_table_body");
    	table.appendChild(row);
    	
        // Maps(Object.values(input)[0], Object.values(cases)[0], Object.values(cases)[1], Object.values(cases)[2], Object.values(cases)[3], Object.values(cases)[4], Object.values(death)[0], Object.values(death)[1], Object.values(test2)[0], Object.values(input)[4], Object.values(input)[5])
	})	
});