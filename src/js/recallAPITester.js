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

	 
		validateVin(vinSearchTerm);
	   

fetch(`https://cis-vin-decoder.p.rapidapi.com/vinDecode?vin=${vinSearchTerm}`, options)    //5J6RM4H50GL105806
.then(response =>
	{
	  if (response.ok)
		{
		  return response.json();
		}
	  else
		{
		  searchResults.innerText = "Sorry, I couldn't find the VIN you asked for. Please try again.";
		  return false;
		}
	})

	.then(data =>
	{ // In these braces, you have your JSON data. Create object with relevant properties and assign the JSON data to them

		if (data)
		{   
			
		

		  let recallDescription =//   for(i=0;i<data[i]; i++)
			{
			  makeName: data.brandName,
			  modelName:data.modelName,
			  year:data.data.ModelYear,
			  builtIn:data.data.PlantCountry,
			  trimLevel: data.data.Series,
			  vin:data.data.VIN,
			  body:data.data.VehicleType,
			                        
			}
                let vehicleArray=[];
				let recallDetails;
				
				let recallArraySize = data.data.RecallInfo.length;
				alert("RecallArray Size:" +recallArraySize);
				//type1: data.types[0].type.name,
				//type2: data.types.length > 1 ? data.types[1].type.name : "",   //ternary or inline if statement

				for(let i=0; i<recallArraySize; i++)
				{
				
					recallDetails=
					{
						recallNumber:data.data.RecallInfo[i].NHTSACampaignNumber,
						recallDate:data.data.RecallInfo[i].ReportReceivedDate,
						recallComponent:data.data.RecallInfo[i].Component,
						recallSummary:data.data.RecallInfo[i].Summary,
						recallConsequence:data.data.RecallInfo[i].Conequence,
						recallRemedy:data.data.RecallInfo[i].Remedy,
						recallNotes:data.data.RecallInfo[i].Notes,/**/ 
						
					};
					

					alert("recall Number:"+recallDetails.recallNumber+recallDetails.recallDate+recallDetails.recallComponent+recallDetails.recallSummary+recallDetails.recallConsequence+recallDetails.recallRemedy+recallDetails.recallNotes);
					//vehicleArray[i].push([recallDetails.recallNumber]);
					//vehicleArray[i].push([recallDetails.recallNumber,recallDetails.recallDate,recallDetails.recallComponent,recallDetails.recallSummary,recallDetails.recallConsequence,recallDetails.recallRemedy,recallDetails.recallNotes]); //populate the array;     
					//vinRecallDetails.innerText=`${recallDetails.recallNumber}, ${recallDetails.recallDate}`;              
				}     
				
				
				let count=0;
				do
				{
					count++;
					vinRecallDetails.innerText=`${recallDetails.recallNumber}, ${recallDetails.recallDate}`; 

				}while (count<recallArraySize);
				
				
				//profileArray.push(vehicleArray); 

                //for(y=0; y<recallArraySize; y++)
				//{

 				//		vinSearchResults.innerText = `\nHeres the test NHTSA numbers: ${vehicleArray[y]}`;

				//}
			      
			  // Clear();                         // Clear the screen to prepare screen for next data return
		
		
		 
		      vinSearchResults.innerText = `Here are the results of your Recall Search on the VIN you entered: \nThe vehicle is a: ${recallDescription.year}, ${recallDescription.makeName} ${recallDescription.modelName} ${recallDescription.trimLevel}; the VIN is ${recallDescription.vin}. It is a ${recallDescription.body}.
			  There are currently `+recallArraySize+` recalls on the vehicle you searched.`;
		
		
		  /*	   
		Here are the specifications of the ${recallDescription.year} ${vehicleDescription.makeName} ${vehicleDescription.modelName} : \nBody: ${vehicleDescription.body}; \nDoors: ${vehicleDescription.doors}; \nSeats: ${vehicleDescription.seats}; \nCurb Weight: ${vehicleDescription.weight} kg; 
		\n\nENGINE INFORMATION:
		Engine Type: ${vehicleDescription.engineType}; \nPowertrain: ${vehicleDescription.powerTrain}; \nEngine Position:${vehicleDescription.enginePosition}; \nCylinders: ${vehicleDescription.cylinders}; \nEngine Displacement: ${vehicleDescription.engineDisplacement};
		Valves per Cylinder ${vehicleDescription.valves}; \nAspiration: ${vehicleDescription.aspiration};\nPower: ${vehicleDescription.power}hp; \nTorque: ${vehicleDescription.torque} lb/ft;                                                                                                    
		 \n\nDRIVE / BRAKING  SYSTEM:
		 Drive Wheels: ${vehicleDescription.driveWheels}; \nNumber of Gears: ${vehicleDescription.noOfGears}; \nFront Brakes: ${vehicleDescription.frontBrakes};\n Rear Brakes: ${vehicleDescription.rearBrakes};
		 \n\n FUEL SYSTEM: \nFuel System Type: ${vehicleDescription.fuelSystem};\nFuel Type: ${vehicleDescription.fuelType}; \nFuel Capacity:  ${vehicleDescription.fuelCapacity} liters; \nCity Mileage: ${vehicleDescription.cityMileage} l/100km; Highway Mileage: ${vehicleDescription.highwayMileage} l/100km; Combined Mileage: ${vehicleDescription.combinedMileage} l/100km;
		  \n\nPERFORMANCE: \nAcceleration: ${vehicleDescription.acceleration}; \nTop Speed ${vehicleDescription.topSpeed} `;
		*/  



	}                                

	})
	//.catch(exception => {vinSearchResults.innerText = exception; })// Promise style catch, to be used after .then() statements.   
						
	//.finally(() => {vinSearchResults.innerText += " \n\nSearch Request complete."}, (console.log(" \n\nSearch Request complete.")));// Promise style finally, to be used after .then() and .catch() statements, will run regardless of if the catch fires.         


});

btnClear.addEventListener("click", e => {

	e.preventDefault();
	Clear();

});

function Clear() 
{
       
	   vinSearchBar.value = "";
        vinSearchBar.focus();
       
        vinSearchResults.innerText = "";    //delete the previous results/clear the screen in prep for the next search.
}


// <--------------------------------------------BELOW IS THE CODE TO VERIFY THE VIN ENTERED ------------------------------------------>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


 function validateVin (vinSearchTerm)
  {
                     // Real VIN for testing from a Ford Explorer Sport:   1FMCU9DZ8MUB12974       1fmcu9dz8mub12974 ;         fake 17 char vin: 0fmcu9di8muo12974   5J6RM4H50GL105806
    
         let vinBool=false;
         vinSearchTerm = vinSearchBar.value;
         vinSearchTerm=vinSearchTerm.trim();
        
         
          if(vinSearchTerm.length==17 && checkVin(vinSearchTerm)==true)  // check to see if the client entered the correct number of characters. If so, call the checkVin function.
          {    
            vinSearchTerm=vinSearchTerm.toUpperCase();
             alert("The VIN you entered:" +vinSearchTerm+ " is a valid VIN." );
             vinBool=true;
               
          }
             
          else if (vinSearchTerm.length!=17)        // if they've entered anything other than exactly 17 characters, let them know, and set flag to false to make them try again.
          {                       
            alert("The VIN you entered: "+vinSearchTerm.toUpperCase()+" does not have 17 characters. It has "+vinSearchTerm.length+" characters. Or you may have entered characters other than letters and numbers. Please enter a VIN with exactly 17 characters.");
           
             Clear();
             vinBool=false;
          }                          
         
         return vinBool;
  }
    
function checkVin(vinSearchTerm)
  {
    
   return  /^[A-HJ-NPR-Za-hj-npr-z0-9]{17},*$/.test(vinSearchTerm);   //check to make sure the user entered ONLY letters (upper and lower case) and numbers. No 0 (zero) i, I, o, O or other characters acceptable.                   
 /* */
}
