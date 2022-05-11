let btnReviewSubmit = document.querySelector("#btnReviewSubmit");
let btnClear = document.querySelector("#btnClear");
let vehicleMake = document.querySelector("#vehicleMake");
let vehicleModel = document.querySelector("#vehicleModel");
let vehicleYear = document.querySelector("#vehicleYear");












btnReviewSubmit.addEventListener("click",e=> 
{

        e.preventDefault();
        Submit();

});

btnClear.addEventListener("click",e=> 
{

        e.preventDefault();
        Clear();

});


function Submit()
{

alert("I'm here yo.");

}

function Clear()
{

alert("I'm here too bro.");


}