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

let vinSearchTerm;

btnRecallSubmit.addEventListener("click", e => {

	e.preventDefault();

	vinSearchTerm = vinSearchBar.value;
	vinSearchTerm = vinSearchTerm.trim();

	if(validateVin(vinSearchTerm)==true)	
	{

	
	fetch(`https://cis-vin-decoder.p.rapidapi.com/vinDecode?vin=${vinSearchTerm}`, options)    //   Legit VIN for a Honda Civic --> 5J6RM4H50GL105806
		.then(response => {
			if (response.ok) {
				return response.json();
			}
			else {
				searchResults.innerText = "Sorry, I couldn't find the VIN you asked for. Please try again.";
				return false;
			}
		})

		.then(data => { // In these braces, you have your JSON data. Create object with relevant properties and assign the JSON data to them

			if (data) 
			{
				let recallDescription =                       //  This first object handles the info that needs to be outputted only once (make, model, trim ,vin, etc.)
				{
					makeName: data.brandName,
					modelName: data.modelName,
					year: data.data.ModelYear,
					displacement: data.data.DisplacementL,
					cylinders: data.data.EngineCylinders,
					engineConfig: data.data.EngineConfiguration,
					transmission: data.data.TransmissionStyle,
					buildCity:data.data.PlantCity,
					buildState:data.data.PlantState,
					builtIn: data.data.PlantCountry,
					trimLevel: data.data.Series,
					vin: data.data.VIN,
					body: data.data.VehicleType,
				}

				let recallDetails;
				let engineDisplacement;
				let recallArraySize = data.data.RecallInfo.length;                       //Get the total number of recalls for the submitted VIN

				for (let i = 0; i < recallArraySize; i++) 
				{

					recallDetails =
					{
						recallNumber: data.data.RecallInfo[i].NHTSACampaignNumber,
						recallDate: data.data.RecallInfo[i].ReportReceivedDate,
						recallComponent: data.data.RecallInfo[i].Component,
						recallSummary: data.data.RecallInfo[i].Summary,
						recallConsequence: data.data.RecallInfo[i].Conequence,              // "Conequence is purposely misspelled here; this is how it's spelled on the API server side, so to make it work, it has to be exactly the same spelling."
						recallRemedy: data.data.RecallInfo[i].Remedy,
						recallNotes: data.data.RecallInfo[i].Notes,
					};

					//alert("recall Number:"+recallDetails.recallNumber+recallDetails.recallDate+recallDetails.recallComponent+recallDetails.recallSummary+recallDetails.recallConsequence+recallDetails.recallRemedy+recallDetails.recallNotes);
					//vehicleArray[i].push([recallDetails.recallNumber]);
					//vehicleArray.push([recallDetails.recallNumber,recallDetails.recallDate,recallDetails.recallComponent,recallDetails.recallSummary,recallDetails.recallConsequence,recallDetails.recallRemedy,recallDetails.recallNotes]); //populate the array;     
					//vinRecallDetails.innerText+=`${recallDetails.recallNumber}, ${recallDetails.recallDate}`;   
					// Clear(); // Clear the screen to prepare screen for next data return

					vinRecallDetails.innerHTML += `<span class=bold> Recall Number:</span> ${recallDetails.recallNumber}<br>
					<span class=bold> Recall Date:</span> ${recallDetails.recallDate}<br>
					<span class=bold> Recall Component:</span> ${recallDetails.recallComponent}<br>
					<span class=bold> Recall Summary:</span> ${recallDetails.recallSummary} <br>
					<span class=bold> Recall Consequences:</span> ${recallDetails.recallConsequence}<br>
					<span class=bold> Recall Remedy:</span> ${recallDetails.recallRemedy}<br>
					<span class=bold> Recall Notes:</span> ${recallDetails.recallNotes} <br><br><br>`;
				}

				engineDisplacement = recallDescription.displacement;
				engineDisplacement = Math.round(engineDisplacement * 100) / 100;                     // Get the displacement to display only two decimal places.
				//engineDisplacement = +(engineDisplacement.toPrecision(1));

				vinSearchResults.innerHTML = `Here are the results of your Recall Search on the VIN you entered: The vehicle is a:<span class=bold> ${recallDescription.year}, ${recallDescription.makeName} ${recallDescription.modelName} ${recallDescription.trimLevel} </span>; 
			  the VIN is <span class=bold>${recallDescription.vin}</span>. It is powered by a ${engineDisplacement}L 
			  ${recallDescription.engineConfig} ${recallDescription.cylinders}-cylinder engine mated to a ${recallDescription.transmission}. It is classified as a ${recallDescription.body},
			  and was manufactured in the ${recallDescription.buildCity} factory in ${recallDescription.buildState}, ${recallDescription.builtIn}. There are currently <span class=bold>` + recallArraySize + `</span> recalls on the vehicle you searched. <br><br>
			  To find out more about your vehicle's recall(s), get in touch with <a href="http://www.${recallDescription.makeName}.com" target="_blank">${recallDescription.makeName}</a> .`;
			}

		})
		.catch(exception => { vinSearchResults.innerText = exception; })

		.finally(() => { vinRecallDetails.innerHTML += " \n\nSearch Request complete." }, (console.log(" \n\nSearch Request complete.")));// Promise style finally, to be used after .then() and .catch() statements, will run regardless of if the catch fires.         
	}

	else
	{
		Clear();
	}
});

btnClear.addEventListener("click", e => {

	e.preventDefault();
	Clear();

});

function Clear() {
	vinSearchBar.value = "";
	vinSearchBar.focus();
	vinSearchResults.innerText = "";    //delete the previous results/clear the screen in prep for the next search
	vinSearchResults.innerHTML = "";
	vinRecallDetails.innerHTML = "";
}
// <--------------------------------------------BELOW IS THE CODE TO VERIFY THE VIN ENTERED ------------------------------------------>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


function validateVin(vinSearchTerm) {
	// Real VIN for testing from a Ford Escape:   1FMCU9DZ8MUB12974       1fmcu9dz8mub12974 ;         fake 17 char vin: 0fmcu9di8muo12974   Legit Honda civic VIN--> 5J6RM4H50GL105806
												// 2C4RDGEG5LR152215  <-- 2020 Grand Caravan GT     1G1ZB5ST8JF268064 <-- 2018 Chevy Malibu LS      1VWAS7A37FC040502 <-- 2015 VW Passat S
	let vinBool = false;     
	vinSearchTerm = vinSearchBar.value;
	vinSearchTerm = vinSearchTerm.trim();


	if (vinSearchTerm.length == 17 && (checkVin(vinSearchTerm) == true))  // check to see if the client entered the correct number of characters. If so, call the checkVin function.
	{
		vinSearchTerm = vinSearchTerm.toUpperCase();
		alert("The VIN you entered:" + vinSearchTerm + " is a valid VIN.");
		vinSearchBar.value = vinSearchBar.value.toUpperCase();
		vinBool = true;
	}

	else if (vinSearchTerm.length != 17 || (checkVin(vinSearchTerm) == false))        // if they've entered anything other than exactly 17 characters, let them know, and set flag to false to make them try again.
	{
		alert("The VIN you entered: " + vinSearchTerm.toUpperCase() + " does not have 17 characters. It has " + vinSearchTerm.length + " characters. Or you may have entered characters other than letters and numbers. Please enter a VIN with exactly 17 characters.");

		Clear();
		vinBool = false;
	}
  
	return vinBool;
}

function checkVin(vinSearchTerm) {
	return /^[A-HJ-NPR-Za-hj-npr-z0-9]*$/.test(vinSearchTerm);   //check to make sure the user entered ONLY letters (upper and lower case) and numbers. No 0 (zero) i, I, o, O or other characters acceptable.                   
 
}
