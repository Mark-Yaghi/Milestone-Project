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
let yearReturnBool=false;



 btnReviewSubmit.addEventListener("click", e => {

     e.preventDefault();


         makeSearchTerm = vehicleMake.value;
         makeSearchTerm = makeSearchTerm.trim();

         modelSearchTerm = vehicleModel.value;
         modelSearchTerm = modelSearchTerm.trim();

        // yearSearchTerm = vehicleYear.value;
        // yearSearchTerm = yearSearchTerm.trim();

         reviewMakeSubmit(makeSearchTerm);
         alert("Back from the function, on line 35." + makeReturnBool);

         reviewModelSubmit(modelSearchTerm);
         alert("Back from the model validation function, on line 38." + modelReturnBool);

       //  reviewYearSubmit(yearSearchTerm);
        // alert("Back from the year validation function, on line 41." + yearReturnBool);


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
                  frontBrakes:data[0].front_brkes,
                  rearBrakes:data[0].rear_brakes,                          
                }


               
            searchResults.innerText = `Here are the specifications of the  ${vehicleDescription.makeName} ${vehicleDescription.modelName} : \nBody: ${vehicleDescription.body}; \nDoors: ${vehicleDescription.doors}; \n Engine Type: ${vehicleDescription.engineType}; \n Powertrain: ${vehicleDescription.powerTrain};
             \nWeight: ${vehicleDescription.weight}kg; 
             Year: ${vehicleDescription.year}; \nFuel Capacity:  ${vehicleDescription.fuelCapacity} liters; \nCity Mileage: ${vehicleDescription.cityMileage}; Highway Mileage: ${vehicleDescription.highwayMileage}; Combined Mileage: ${vehicleDescription.combinedMileage};
               `;
              
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

       // alert("Line 57, in the make function. makeSearchTerm:" + makeSearchTerm);


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
               // alert("You entered a valid name: " + makeSearchTerm);
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
               // alert("You entered a valid name: " + modelSearchTerm);
                vehicleModel.value = vehicleModel.value.toUpperCase();
                modelReturnBool = true;
                //vehicleYear.focus();  //We have a valid name, set focus to the next field

        }
        modelSearchTerm = modelSearchTerm.charAt(0).toUpperCase() + modelSearchTerm.slice(1);                    //capitalize the first letter of the model name
       // alert(" your vehicle model is a: " + makeSearchTerm.toUpperCase() + " " + modelSearchTerm);
        
        return modelReturnBool;
}

function reviewYearSubmit(yearSearchTerm)
{

        let validYear = false;
        
        const dYear=new Date();                                     //create a date object
         let dateYear=(dYear.getFullYear()+1);                   //get this year's 'year' number, and add one to it so that it'll always give us the current year +1; i.e., if this year is 2022, it'll return 2023
                
         if(yearSearchTerm.length!=4)
        {
              alert("Please enter a valid 4-character vehicle model year.");
              vehicleYear.value = "";
              vehicleYear.focus();
              yearReturnBool = false;   
        }
          
        else if((yearSearchTerm<=1900) || (yearSearchTerm>dateYear)|| (isNaN(yearSearchTerm)))
        {
             alert("Bad year entered; please enter a model year for your vehicle between 1900 and "+dateYear+" :");  
             vehicleYear.value="";
             vehicleYear.focus();
        }
      
        else
        {
              alert("Vehicle model year is "+yearSearchTerm);
              yearReturnBool=true;        
        }
        
       return yearReturnBool;

}
function Clear() 
{
        vehicleMake.value = "";
        vehicleMake.focus();
        vehicleModel.value = "";
        vehicleYear.value = "";
        searchResults.innerText = "";    //delete the previous results/clear the screen in prep for the next search.
}

