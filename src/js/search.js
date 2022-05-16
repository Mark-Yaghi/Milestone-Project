const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'automotive-car-specs.p.rapidapi.com',
		'X-RapidAPI-Key': 'bf60d9b039msh13d125cc25c6fd3p13371bjsn4072f169f409'
	}
};


let btnReviewSubmit = document.querySelector("#btnReviewSubmit");
let btnClear = document.querySelector("#btnClear");
let vehicleMake = document.querySelector("#vehicleMake");
let vehicleModel = document.querySelector("#vehicleModel");
let vehicleYear = document.querySelector("#vehicleYear");
let searchResults = document.querySelector("#searchResults");
let makeSearchTerm;
let modelSearchTerm;
let yearSearchTerm;
let makeReturnBool = false;
let modelReturnBool=false;


btnReviewSubmit.addEventListener("click", e => {

     e.preventDefault();


         makeSearchTerm = vehicleMake.value;
         makeSearchTerm = makeSearchTerm.trim();

         modelSearchTerm = vehicleModel.value;
         modelSearchTerm = modelSearchTerm.trim();
      
         reviewMakeSubmit(makeSearchTerm);
        

         reviewModelSubmit(modelSearchTerm);
        

       //This is where we create the parameters to send to the API, by appending the make then model to the endpoint  

       fetch(`https://automotive-car-specs.p.rapidapi.com/cars/specs/${makeSearchTerm}/${modelSearchTerm}`, options)
      // .then(response => response.json())
      // .then(response => console.log(response))

      .then(response =>
        {
          if (response.ok)
            {
              return response.json();
            }
          else
            {
              searchResults.innerText = "Sorry, I couldn't find the vehicle/model you asked for. Please try again.";
              return false;
            }
        })

        .then(data =>
        { // In these braces, you have your JSON data. Create object with relevant properties and assign the JSON data to them

            if (data)
            {                       
              let vehicleDescription = 
                {
                  makeName: data[0].make,
                  modelName:data[0].model,
                  engineType:data[0].engine_modification,
                  year:data[0].year,
                  powerTrain: data[0].powertrain_architecture,
                  body:data[0].body_type,
                  seats: data[0].number_of_seats,
                  doors: data[0].number_of_doors,                  
                  weight: data[0].kerb_weight,
                  fuelCapacity:data[0].fuel_tank_capacity,
                  cityMileage:data[0].urban_fuel_consumption,
                  highwayMileage:data[0].extra_urban_fuel_consumption,
                  combinedMileage:data[0].combined_fuel_consumption,
                  fuelType:data[0].fuel_type,
                  acceleration:data[0].acceleration,
                  topSpeed:data[0].top_speed,
                  power:data[0].power,
                  torque:data[0].torque,
                  enginePosition:data[0].engine_location,
                  engineDisplacement:data[0].engine_displacement,
                  cylinders:data[0].number_of_cylinders,
                  engineType:data[0].position_of_cylinders,
                  valves:data[0].number_of_valves_per_cylinder,
                  fuelSystem:data[0].fuel_system,
                  aspiration:data[0].engine_aspiration,
                  driveWheels:data[0].drive_wheel,
                  noOfGears:data[0].number_of_gears,
                  frontBrakes:data[0].front_brakes,
                  rearBrakes:data[0].rear_brakes,                          
                }
                   Clear();                         // Clear the screen to prepare screen for next data return
               
            searchResults.innerText = `Here are the specifications of the ${vehicleDescription.year} ${vehicleDescription.makeName} ${vehicleDescription.modelName} : \nBody: ${vehicleDescription.body}; \nDoors: ${vehicleDescription.doors}; \nSeats: ${vehicleDescription.seats}; \nCurb Weight: ${vehicleDescription.weight} kg; 
            \n\nENGINE INFORMATION:
            \n Engine Type: ${vehicleDescription.engineType}; \nPowertrain: ${vehicleDescription.powerTrain}; \nEngine Position:${vehicleDescription.enginePosition}; \nCylinders: ${vehicleDescription.cylinders}; \nEngine Displacement: ${vehicleDescription.engineDisplacement};
            Valves per Cylinder ${vehicleDescription.valves}; \nAspiration: ${vehicleDescription.aspiration};\nPower: ${vehicleDescription.power}hp; \nTorque: ${vehicleDescription.torque} lb/ft;                                                                                                    
             \n\nDRIVE / BRAKING  SYSTEM:
             \nDrive Wheels: ${vehicleDescription.driveWheels}; \nNumber of Gears: ${vehicleDescription.noOfGears}; \nFront Brakes: ${vehicleDescription.frontBrakes};\n Rear Brakes: ${vehicleDescription.rearBrakes};
             \n\n FUEL SYSTEM: \nFuel System Type: ${vehicleDescription.fuelSystem};\nFuel Type: ${vehicleDescription.fuelType}; \nFuel Capacity:  ${vehicleDescription.fuelCapacity} liters; \nCity Mileage: ${vehicleDescription.cityMileage} l/100km; Highway Mileage: ${vehicleDescription.highwayMileage} l/100km; Combined Mileage: ${vehicleDescription.combinedMileage} l/100km;
              \n\nPERFORMANCE: \nAcceleration: ${vehicleDescription.acceleration}; \nTop Speed ${vehicleDescription.topSpeed} `;
              
        }                                

        })
        .catch(exception => {searchResults.innerText = exception; })// Promise style catch, to be used after .then() statements.   
                            
        .finally(() => {searchResults.innerText += " \n\nSearch Request complete."}, (console.log(" \n\nSearch Request complete.")));// Promise style finally, to be used after .then() and .catch() statements, will run regardless of if the catch fires.         
    

 });

btnClear.addEventListener("click", e => {

        e.preventDefault();
        Clear();

});


function reviewMakeSubmit(makeSearchTerm)
{

        if (makeSearchTerm.length == 0) 
        {
                alert("Please enter a vehicle manufacturer/make.");
                vehicleMake.value = "";
                vehicleMake.focus();
                makeReturnBool = false;
        }
        else if (!/^[A-Za-z0-9 - ]*$/.test(makeSearchTerm)) 
        {
                alert("Please enter a name that only contains letters or numbers.");
                vehicleMake.value = "";
                vehicleMake.focus();
                makeReturnBool = false;
        }
        else 
        {
                vehicleMake.value = vehicleMake.value.toUpperCase();
                makeReturnBool = true;
               // vehicleModel.focus();  //We have a valid name, set focus to the next field
        }

        return makeReturnBool;
}

function reviewModelSubmit(modelSearchTerm)
{

        if (modelSearchTerm.length == 0) 
        {
                alert("Please enter a vehicle model name.");
                vehicleModel.value = "";
                vehicleModel.focus();
                modelReturnBool = false;
        }
        else if (!/^[A-Za-z0-9 - ]*$/.test(modelSearchTerm))
        {

                alert("Please enter a name that only contains letters or numbers.");
                vehicleModel.value = "";
                vehicleModel.focus();
                modelReturnBool = false;
        }
        else 
        {
               
               if(!(Number.isInteger(vehicleModel.value)))
               {
                    alert("Line 189."+vehicleModel.value);   
                   // vehicleModel.value = vehicleModel.value.toUpperCase();
               }
                modelReturnBool = true;
                //vehicleYear.focus();  //We have a valid name, set focus to the next field

        }
       // modelSearchTerm = modelSearchTerm.charAt(0).toUpperCase() + modelSearchTerm.slice(1);                    //capitalize the first letter of the model name
        
        
        return modelReturnBool;
}


function Clear() 
{
        vehicleMake.value = "";
        vehicleMake.focus();
        vehicleModel.value = "";
        searchResults.innerText = "";    //delete the previous results/clear the screen in prep for the next search.
}

