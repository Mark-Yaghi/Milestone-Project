
let btnRecallSubmit = document.querySelector("#btnRecallSubmit");

let btnClear = document.querySelector("#btnClear");
let vinSearchBar = document.querySelector("#vinSearchBar");
let vinSearchResults = document.querySelector("#vinSearchResults");
let pictureDiv=document.querySelector("#pictureDiv");
let vinSearchTerm;

btnRecallSubmit.addEventListener("click",e=> 
{

        e.preventDefault();
        vinSearchTerm = vinSearchBar.value;
        vinSearchTerm= vinSearchTerm.trim();

        vinSearchResults.innerText="";

        if(vinSearchTerm.length==0)
        {
            alert("Please enter a 17 character VIN to search.");
            clrButton();
        }
       /* else if(validateVin(vinSearchTerm)!=true)    
         {            
            alert("The VIN you entered:" +vinSearchTerm+ " is not a valid VIN. Please enter a valid VIN." );
            clrButton();
         }   */

        else
        {
            clrButton();  //clear the screen to make room for new search results   
           // vinSearchTerm=vinSearchTerm.toUpperCase();  // <<---Enable this line for VIN error checking; disable to use Pokemon API.
            vinSearchTerm=vinSearchTerm.toLowerCase();  // <<---Enable this line for the Pokemon API, disable to use VIN error checking. 
           
         fetch(`https://pokeapi.co/api/v2/pokemon/${vinSearchTerm}`) // Specify your API endpoint here.
               .then(response =>
                {
                  if (response.ok)
                    {
                      return response.json();
                    }
                  else
                    {
                      vinSearchResults.innerText = "Sorry, I couldn't find the name/character you asked for. Please try again.";
                      return false;
                    }
                })

                .then(data =>
                { // In these braces, you have your JSON data. Create object with relevant properties and assign the JSON data to them

                    if (data)
                    {                       
                      let characterDescription = 
                        {
                          speciesName: data.species.name,
                          type1: data.types[0].type.name,
                          type2: data.types.length > 1 ? data.types[1].type.name : "",   //ternary or inline if statement
                          weight: data.weight,
                          height: data.height,
                          baseExperience: data.base_experience,
                          spritesPic:data.sprites.other.dream_world.front_default,          //get the relevant character's picture
                        }

                        var img = document.createElement("img");        //create an image variable;
                        img.src=(characterDescription.spritesPic);      //give it the source/address;
                        var src=document.getElementById("pictureDiv");    //create an element to point to the div
                        src.appendChild(img);                              //put the pic in there


                        if (characterDescription.type2.length == 0)   //The purpose of this is simply for better output display. If type two is empty, we omit its position and the comma ahead of it.
                        {
                           vinSearchResults.innerText = `Here are the characteristics of ${characterDescription.speciesName.toUpperCase()} : \nDescription: ${characterDescription.type1}; \nWeight: ${characterDescription.weight}; \nHeight: ${characterDescription.height}; \nBase Experience: ${characterDescription.baseExperience}.`;
                        }
                        else  //otherwise, display type2 in the proper format.
                        {
                           vinSearchResults.innerText = `Here are the characteristics of ${characterDescription.speciesName.toUpperCase()}:  \nDescriptions: ${characterDescription.type1}, ${characterDescription.type2}; \nWeight: ${characterDescription.weight}; \nHeight: ${characterDescription.height}; \nBase Experience: ${characterDescription.baseExperience}.`;
                        }
                    }                                  

                })
                .catch(exception => {vinSearchResults.innerText = exception; })// Promise style catch, to be used after .then() statements.   
                                    
                .finally(() => { vinSearchResults.innerText += " \n\nSearch Request complete."}, (console.log(" \n\nSearch Request complete.")));// Promise style finally, to be used after .then() and .catch() statements, will run regardless of if the catch fires.                        
              /*  */  
        }
});

btnClear.addEventListener("click", clrButton());

function clrButton()
{
    vinSearchBar.value = "";
    vinSearchBar.focus();
    vinSearchResults.innerText = "";    //delete the previous results/clear the screen in prep for the next search.
    pictureDiv.innerText="";
}

 // <--------------------------------------------BELOW IS THE CODE TO VERIFY THE VIN ENTERED ------------------------------------------>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


 /* function validateVin (vinSearchTerm)
  {
                     // Real VIN for testing from a Ford Explorer Sport:   1FMCU9DZ8MUB12974       1fmcu9dz8mub12974 ;         fake 17 char vin: 0fmcu9di8muo12974
    
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
           
             clrButton();
             vinBool=false;
          }                          
         
         return vinBool;
  }
    
function checkVin(vinSearchTerm)
  {
    
   return  /^[A-HJ-NPR-Za-hj-npr-z0-9]{17},*$/.test(vinSearchTerm);   //check to make sure the user entered ONLY letters (upper and lower case) and numbers. No 0 (zero) i, I, o, O or other characters acceptable.                   
  }*/
    