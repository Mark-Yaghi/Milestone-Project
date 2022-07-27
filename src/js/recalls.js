const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'cis-vin-decoder.p.rapidapi.com',
		'X-RapidAPI-Key': 'bf60d9b039msh13d125cc25c6fd3p13371bjsn4072f169f409'
	}
};

let btnRecallSubmit = document.querySelector("#btnRecallSubmit");
let btnClear = document.querySelector("#btnClear");
let vinSearchBar = document.querySelector("#vinSearchBar");
let vinSearchResults = document.querySelector("#vinSearchResults");
let vinRecallDetails = document.querySelector("#vinRecallDetails");
let vinSelect = document.querySelector("#vinSelect");
let vinSelectArray=[];
let vinSearchTerm;


btnRecallSubmit.addEventListener("click", e => {

	e.preventDefault();

	vinSearchTerm = vinSearchBar.value;
	vinSearchTerm = vinSearchTerm.trim();

	if (validateVin(vinSearchTerm) == true) {


		vinSearchResults.innerText = "";    //Delete the previous results/clear the screen in prep for the next search.
	    vinSearchResults.innerHTML = "";
	    vinRecallDetails.innerHTML = "";

		fetch(`https://cis-vin-decoder.p.rapidapi.com/vinDecode?vin=${vinSearchTerm}`, options)
			.then(response => {
				if (response.ok) {
					return response.json();
				}
				else {
					searchResults.innerText = "Sorry, I couldn't find the VIN you asked for. Please try again.";
					return false;
				}
			})

			.then(data => {

				if (data) {
					let recallDescription =                       //  This first object handles the info that needs to be outputted only once (make, model, trim ,vin, etc.)
					{
						makeName: data.brandName,
						modelName: data.modelName,
						year: data.data.ModelYear,
						displacement: data.data.DisplacementL,
						cylinders: data.data.EngineCylinders,
						engineConfig: data.data.EngineConfiguration,
						transmission: data.data.TransmissionStyle,
						buildCity: data.data.PlantCity,
						buildState: data.data.PlantState,
						builtIn: data.data.PlantCountry,
						trimLevel: data.data.Series,
						vin: data.data.VIN,
						body: data.data.VehicleType,
					}

					let recallDetails;
					let engineDisplacement;
					let recallArraySize = data.data.RecallInfo.length;                       //Get the total number of recalls for the submitted VIN

					for (let i = 0; i < recallArraySize; i++) {

						recallDetails =
						{
							recallNumber: data.data.RecallInfo[i].NHTSACampaignNumber,
							recallDate: data.data.RecallInfo[i].ReportReceivedDate,
							recallComponent: data.data.RecallInfo[i].Component,
							recallSummary: data.data.RecallInfo[i].Summary,
							recallConsequence: data.data.RecallInfo[i].Conequence,              // "Conequence" is purposely misspelled here; this is how it's spelled on the API server side, so to make it work, it has to be exactly the same spelling.
							recallRemedy: data.data.RecallInfo[i].Remedy,
							recallNotes: data.data.RecallInfo[i].Notes,
						};

						vinRecallDetails.innerHTML += `<span class=bold> Recall Number:</span> ${recallDetails.recallNumber}<br>
					<span class=bold> Recall Date:</span> ${recallDetails.recallDate}<br>
					<span class=bold> Recall Component:</span> ${recallDetails.recallComponent}<br>
					<span class=bold> Recall Summary:</span> ${recallDetails.recallSummary} <br>
					<span class=bold> Recall Consequences:</span> ${recallDetails.recallConsequence}<br>
					<span class=bold> Recall Remedy:</span> ${recallDetails.recallRemedy}<br>
					<span class=bold> Recall Notes:</span> ${recallDetails.recallNotes} 
					<hr id="hr">`;
					}

					engineDisplacement = recallDescription.displacement;
					engineDisplacement = Math.round(engineDisplacement * 100) / 100;                     // Get the displacement to display only two decimal places.


					vinSearchResults.innerHTML = `Here are the results of your Recall Search on the VIN you entered: The vehicle is a:<span class=bold> ${recallDescription.year}, ${recallDescription.makeName} ${recallDescription.modelName} ${recallDescription.trimLevel}</span>; 
			  the VIN is <span class=bold>${recallDescription.vin}</span>. It is powered by a ${engineDisplacement}L 
			  ${recallDescription.engineConfig ??""} ${recallDescription.cylinders}-cylinder engine ${recallDescription.transmission ??""}. It is classified as a ${recallDescription.body},
			  and was manufactured in the ${recallDescription.buildCity} factory in ${recallDescription.buildState}, ${recallDescription.builtIn}. There are currently <span class=bold>` + recallArraySize + `</span> recalls on the vehicle you searched. <br><br>
			  To find out more about your vehicle's recall(s), get in touch with <a href="http://www.${recallDescription.makeName}.com" target="_blank">${recallDescription.makeName}</a> .`;
				}

			})
			.catch(exception => { vinSearchResults.innerText = exception; })

			.finally(() => { vinRecallDetails.innerHTML += " \n\nSearch Request complete." }, (console.log(" \n\nSearch Request complete.")));

			let vinStored = false;
			for(i=0; i<vinSelectArray.length; i++)
			{

				if (vinSelectArray[i]==vinSearchTerm) vinStored=true;
		
			}

			if(vinStored==false)
			{

				vinSelectArray.push(vinSearchTerm);
            	localStorage.VIN = vinSelectArray;
				alert(vinSelectArray.length);
				//var selectValue = document.createElement("select");
				var optionValue = document.createElement("option");
				
				optionValue.value = vinSearchTerm;
				optionValue.text = vinSearchTerm;	//vinSelectArray[i];

				//vinSelect.options.add(new option(optionValue.text,optionValue.value ));
				//selectValue = ;
				vinSelect.appendChild(optionValue);
				
				//alert("vinSelect.Value =  :" + vinSelect);
			}
			
	}	
	else Clear();
	
});

btnClear.addEventListener("click", e => {

	e.preventDefault();
	Clear();

});

vinSelect.addEventListener("change", e =>{                //trying to set this up so that it will store previously used VINs, and allow a user to click on a vin and search for it again.

	e.preventDefault();
	if(vinSelect.count==0)
	{
		alert("There are no VINs currently saved. Please enter a VIN in the Vin Search Bar.");
		vinSearchBar.focus();

	}
	
	// Store	
	//localStorage.setItem("vin", vinSelectArray);
	
	else
	{ 		
		console.log(vinSelect.value);
		vinSearchBar.value = vinSelect.value ;//vinSelect.value;
	}
});

function Clear() {
	vinSearchBar.value = "";
	vinSearchBar.focus();
	vinSearchResults.innerText = "";    //Delete the previous results/clear the screen in prep for the next search.
	vinSearchResults.innerHTML = "";
	vinRecallDetails.innerHTML = "";
	vinSelect.value = "";
}
// <--------------------------------------------BELOW IS THE CODE TO VERIFY THE VIN ENTERED ------------------------------------------>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


function validateVin(vinSearchTerm) {

	let vinBool = false;
	vinSearchTerm = vinSearchBar.value;
	vinSearchTerm = vinSearchTerm.trim();


	if (vinSearchTerm.length == 17 && (checkVin(vinSearchTerm) == true))  // Check to see if the client entered the correct number of characters. If so, call the checkVin function.
	{
		vinSearchTerm = vinSearchTerm.toUpperCase();
		alert("The VIN you entered:" + vinSearchTerm + " is a valid VIN.");
		vinSearchBar.value = vinSearchBar.value.toUpperCase();
		vinBool = true;
	}

	else if (vinSearchTerm.length != 17 || (checkVin(vinSearchTerm) == false))        // If they've entered anything other than exactly 17 characters, let them know, and set flag to false to make them try again.
	{
		alert("The VIN you entered: " + vinSearchTerm.toUpperCase() + " does not have 17 characters. It has " + vinSearchTerm.length + " characters. Or you may have entered characters other than letters and numbers. Please enter a VIN with exactly 17 characters.");

		Clear();
		vinBool = false;
	}

	return vinBool;
}

function checkVin(vinSearchTerm) {
	return /^[A-HJ-NPR-Za-hj-npr-z0-9]*$/.test(vinSearchTerm);   //Check to make sure the user entered ONLY letters (upper and lower case) and numbers. No 0 (zero) i, I, o, O or other characters acceptable.                   
}


window.onload = () =>{
	console.log(localStorage.VIN);
	console.log(vinSelect);
	let importArray = localStorage.VIN.split(',');
	console.log(importArray);
	for (i=0; i< importArray.length; i++)
	{
		console.log(i + ": "+importArray[i]);
		var optionValue = document.createElement("option");
		
		optionValue.value = importArray[i];
		optionValue.text = importArray[i];	//vinSelectArray[i];
		console.log(optionValue);
		//vinSelect.options.add(new option(optionValue.text,optionValue.value ));
		//selectValue = ;
		vinSelect.appendChild(optionValue);
		//vinSelect = vinSelectArray[i];

		//document.getElementById("vinSelect").value= localStorage.vinSelectArray[i];
		//document.getElementById("vinSelect").add(i,(localStorage.vinSelectArray[i]));
		//vinSelect.options.add(new Option(localStorage.vinSelectArray[i], i))
		//vinSelect.options.add(new option(optionValue.value, optionValue.text));
	
	}	
	// Retrieve
	//document.getElementById("result").innerHTML = localStorage.lastname;


};            // When the window loads, automatically call the loadSelect() to populate the select drop down.



