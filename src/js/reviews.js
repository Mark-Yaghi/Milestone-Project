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

         yearSearchTerm = vehicleYear.value;
         yearSearchTerm = yearSearchTerm.trim();

         reviewMakeSubmit(makeSearchTerm);
         
         reviewModelSubmit(modelSearchTerm);
        
         reviewYearSubmit(yearSearchTerm);

         searchResults.innerText="Search Results Go Here."
         
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
        else if (!/^[A-Za-z - ]*$/.test(makeSearchTerm)) 
        {
                alert("Please enter a name that only contains letters.");
                vehicleMake.value = "";
                vehicleMake.focus();
                makeReturnBool = false;
        }
        else 
        {
                vehicleMake.value = vehicleMake.value.toUpperCase();
                makeReturnBool = true;               
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
                vehicleModel.value = vehicleModel.value.toUpperCase();
                modelReturnBool = true; 
        }
        modelSearchTerm = modelSearchTerm.charAt(0).toUpperCase() + modelSearchTerm.slice(1);                    //Capitalize the first letter of the model name
              
        return modelReturnBool;
}

function reviewYearSubmit(yearSearchTerm)
{
        
        const dYear=new Date();                                     //Create a date object
         let dateYear=(dYear.getFullYear()+1);                   //Get this year's 'year' number, and add one to it so that it'll always give us the current year +1; i.e., if this year is 2022, it'll return 2023
                
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
        searchResults.innerText = "";    //Delete the previous results/clear the screen in prep for the next search.
}