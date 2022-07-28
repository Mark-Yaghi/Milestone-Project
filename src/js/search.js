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
let makeReturnBool;
let modelReturnBool;

let goodInputs = false;


btnReviewSubmit.addEventListener("click", e => {

        e.preventDefault();

        makeSearchTerm = vehicleMake.value;
        makeSearchTerm = makeSearchTerm.trim();

        modelSearchTerm = vehicleModel.value;
        modelSearchTerm = modelSearchTerm.trim();

        reviewMakeSubmit(makeSearchTerm);
        reviewModelSubmit(modelSearchTerm);


                if (makeReturnBool == false )
                 {

                     // alert("Please ensure a make name has been entered.");
                        goodInputs = false;

                        vehicleMake.focus();
                        makeSearchTerm = vehicleMake.value;
                        makeSearchTerm = makeSearchTerm.trim();   
                
                        reviewMakeSubmit(makeSearchTerm);
                       
                }

                else if(modelReturnBool == false)
                        {
                          
                         //  alert("Please ensure a model name has been entered.");
                           goodInputs = false;
                           vehicleModel.focus();
                           modelSearchTerm = vehicleModel.value;
                           modelSearchTerm = modelSearchTerm.trim();
                           reviewModelSubmit(modelSearchTerm);
                          

                        }

                else {
                        //This is where we create the parameters to send to the API, by appending the make then model to the endpoint  

                        fetch(`https://automotive-car-specs.p.rapidapi.com/cars/specs/${makeSearchTerm}/${modelSearchTerm}`, options)

                                .then(response => {
                                        if (response.ok) {
                                                return response.json();
                                        }
                                        else {
                                                searchResults.innerText = "Sorry, I couldn't find the vehicle/model you asked for. Please try again.";
                                                return false;
                                        }
                                })

                                .then(data => {

                                        if (data) {
                                                let vehicleDescription =
                                                {
                                                        makeName: data[0].make,
                                                        modelName: data[0].model,
                                                        engineType: data[0].engine_modification,
                                                        year: data[0].year,
                                                        powerTrain: data[0].powertrain_architecture,
                                                        body: data[0].body_type,
                                                        seats: data[0].number_of_seats,
                                                        doors: data[0].number_of_doors,
                                                        weight: data[0].kerb_weight,
                                                        fuelCapacity: data[0].fuel_tank_capacity,
                                                        cityMileage: data[0].urban_fuel_consumption,
                                                        highwayMileage: data[0].extra_urban_fuel_consumption,
                                                        combinedMileage: data[0].combined_fuel_consumption,
                                                        fuelType: data[0].fuel_type,
                                                        acceleration: data[0].acceleration,
                                                        topSpeed: data[0].top_speed,
                                                        power: data[0].power,
                                                        torque: data[0].torque,
                                                        enginePosition: data[0].engine_location,
                                                        engineDisplacement: data[0].engine_displacement,
                                                        cylinders: data[0].number_of_cylinders,
                                                        engineType: data[0].position_of_cylinders,
                                                        valves: data[0].number_of_valves_per_cylinder,
                                                        fuelSystem: data[0].fuel_system,
                                                        aspiration: data[0].engine_aspiration,
                                                        driveWheels: data[0].drive_wheel,
                                                        noOfGears: data[0].number_of_gears,
                                                        frontBrakes: data[0].front_brakes,
                                                        rearBrakes: data[0].rear_brakes,
                                                }
                                                Clear();                         // Clear the screen to prepare for incoming data to be displayed.

                                                searchResults.innerHTML += `Here are the specifications of the ${vehicleDescription.year} ${vehicleDescription.makeName} ${vehicleDescription.modelName} : <br>Body: ${vehicleDescription.body}; <br>Doors: ${vehicleDescription.doors}; <br>Seats: ${vehicleDescription.seats}; <br>Curb Weight: ${vehicleDescription.weight} kg / ${(vehicleDescription.weight * 2.2.toPrecision(1))} lbs; 
                                <hr id="hr"><br><span class=bold>ENGINE INFORMATION:</span><br>
                                Engine Type: ${vehicleDescription.engineType}; <br>Powertrain: ${vehicleDescription.powerTrain}; <br>Engine Position:${vehicleDescription.enginePosition}; <br>Cylinders: ${vehicleDescription.cylinders}; <br>Engine Displacement: ${vehicleDescription.engineDisplacement};
                                Valves per Cylinder ${vehicleDescription.valves}; <br>Aspiration: ${vehicleDescription.aspiration};<br>Power: ${vehicleDescription.power}hp; <br>Torque: ${vehicleDescription.torque} lb/ft;                                                                                                    
                                <hr id="hr"> <br><br>DRIVE / BRAKING  SYSTEM:<br>
                                Drive Wheels: ${vehicleDescription.driveWheels}; <br>Number of Gears: ${vehicleDescription.noOfGears}; <br>Front Brakes: ${vehicleDescription.frontBrakes};<br> Rear Brakes: ${vehicleDescription.rearBrakes};
                                <hr id="hr"><br><br> FUEL SYSTEM: <br>Fuel System Type: ${vehicleDescription.fuelSystem};<br>Fuel Type: ${vehicleDescription.fuelType}; <br>Fuel Capacity:  ${vehicleDescription.fuelCapacity} liters; <br>City Mileage: ${vehicleDescription.cityMileage} l/100km; Highway Mileage: ${vehicleDescription.highwayMileage} l/100km; Combined Mileage: ${vehicleDescription.combinedMileage} l/100km;
                                <hr id="hr"><br><br>PERFORMANCE: <br>Acceleration: ${vehicleDescription.acceleration} seconds; <br>Top Speed ${vehicleDescription.topSpeed} kph<hr id="hr">`;

                                        }

                                })
                                .catch(exception => { searchResults.innerText = exception; })// Promise style catch, to be used after .then() statements.   

                                .finally(() => { searchResults.innerText += " \n\nSearch Request complete." }, (console.log(" \n\nSearch Request complete.")));// Promise style finally, to be used after .then() and .catch() statements, will run regardless of if the catch fires.         
               
                                goodInputs = true;
                 }

      
});

btnClear.addEventListener("click", e => {

        e.preventDefault();
        Clear();
});

function reviewMakeSubmit(makeSearchTerm) {

         //makeReturnBool = false;


        if (makeSearchTerm.length == 0) {
                alert("Please enter a vehicle manufacturer/make.");
                vehicleMake.value = "";
                vehicleMake.focus();
                makeReturnBool = false;
        }
        else if (!/^[A-Za-z - ]*$/.test(makeSearchTerm)) {
                alert("Please enter a name that only contains letters.");
                vehicleMake.value = "";
                vehicleMake.focus();
                makeReturnBool = false;
        }
        else {
                vehicleMake.value = vehicleMake.value.toUpperCase();
                makeReturnBool = true;
        }

        return makeReturnBool;
}

function reviewModelSubmit(modelSearchTerm) {

        // modelReturnBool = false;

        if (modelSearchTerm.length == 0) {
                alert("Please enter a vehicle model name.");
                vehicleModel.value = "";
                vehicleModel.focus();
                modelReturnBool = false;
        }
        else if (!/^[A-Za-z0-9 - ]*$/.test(modelSearchTerm)) {

                alert("Please enter a name that only contains letters or numbers.");
                vehicleModel.value = "";
                vehicleModel.focus();
                modelReturnBool = false;
        }
        else {

                if (!(Number.isInteger(vehicleModel.value))) {
                        vehicleModel.value = vehicleModel.value.toUpperCase();
                }
                modelReturnBool = true;

        }

        return modelReturnBool;
}

function Clear() {
        vehicleMake.value = "";
        vehicleMake.focus();
        vehicleModel.value = "";
        searchResults.innerText = "";    //Delete the previous results/clear the screen in prep for the next search.
}