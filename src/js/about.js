let btnCommentSubmit = document.querySelector("#btnCommentSubmit");
let btnClear = document.querySelector("#btnClear");
let formChkBx = document.querySelector("#formChkBx");
let aboutForm = document.querySelector("#aboutForm");

let firstName=document.querySelector("#firstName");
let lastName = document.querySelector("#lastName");
let address = document.querySelector("#address");
let pCode = document.querySelector("#pCode");
let mainPhone = document.querySelector("#mainPhone");
let cellPhone = document.querySelector("#cellPhone");
let email = document.querySelector("#email");
let commentArea = document.querySelector("#commentArea");

let contactInfoArray=[];

let tempFName;
let tempLName;
let tempAddress;
let tempPCode;
let tempMainPhone;
let tempCellPhone;
let tempEmail;
let tempCommentArea;

formChkBx.addEventListener("change", e => {
   
   e.preventDefault();
   
    alert("in the add event listner");

  
     if(formChkBx.checked)
     {
        alert("in the checkbox if");
        document.getElementById("aboutForm").classList.remove("hidden");
     }
     else{

        alert("in the checkbox else");
        document.getElementById("aboutForm").classList.add("hidden");
     }

});

btnCommentSubmit.addEventListener("click", e => {

    e.preventDefault();


tempFName=firstName.value;
tempFName=tempFName.trim();

tempLName=lastName.value;
tempLName=tempLName.trim();

tempAddress = address.value;
tempAddress = tempAddress.trim();

tempPCode = pCode.value;
tempPCode = tempPCode.trim();

tempMainPhone = mainPhone.value;
tempMainPhone = tempMainPhone.trim();

tempCellPhone = cellPhone.value;
tempCellPhone = tempCellPhone.trim();

tempEmail = email.value;
tempEmail = tempEmail.trim();

tempComments = commentArea.value;
tempComments = tempCommentArea.trim();

/**/if(!verifyName(tempFName)==true)
{
    alert("Please enter a first name with 20 characters or less consisting of only letters or a hyphen.");
    firstName.value="";
    firstName.focus();
}

if(!verifyName(tempLName)==true)
{
    alert("Please enter a last name with 20 characters or less consisting of only letters or a hyphen.");
    lastName.value="";
    lastName.focus();
}

if(!verifyAddress(tempAddress)==true)
{
    alert("Please enter an address with at least 10 characters consisting of only letters,numbers, or a hyphen.");
    address.value="";
    address.focus();   
}

if(!verifyPCode(tempPCode)==true)
{
    alert("Please enter a postal code with 6 characters in the format X1X1X1.");
    pCode.value="";
    pCode.focus();  
}

if(!verifyPhone(tempMainPhone))
{
    alert("Please enter a main phone number with 10 numbers only.");
    mainPhone.value="";
    mainPhone.focus();
}

if(!verifyPhone(tempCellPhone))
{
    alert("Please enter a mobile phone number with 10 numbers only.");
    cellPhone.value="";
    cellPhone.focus();
}

if(!(tempEmail.includes("@")))
{
    alert("Please enter a valid email containing the '@' symbol.");
    email.value="";
    email.focus();
}

contactInfoArray.push(tempFName, tempLName,tempAddress,tempPCode, tempMainPhone, tempCellPhone,tempEmail,tempComments);
alert("contact info array:"+contactInfoArray );

});

btnClear.addEventListener("click", e=> {

clearFields();

});

function clearFields()
{
 firstName.value="";
 //document.querySelectorAll.value=""; 
 lastName.value="";
 address.value="";
 pCode.value="";
 mainPhone.value="";
 cellPhone.value="";
 email.value="";
 commentArea.value="";
 firstName.focus();
}

function verifyName(tempName)
{
    
    let returnBool = false;
        let validLength;
        validLength=tempName.length;
    
        if(validLength<21 && tempName!="")   
        {
            if( /^[A-Za-z-\s]*$/.test(tempName) ) //check to make sure the user entered ONLY letters (upper and lower case) or a hyphen. No other characters acceptable. 
            {
               // output("line 165 character test: "+ /^[A-Za-z-\s]*$/.test(userName) );
                returnBool=true;
            }
            else
            {
                returnBool=false;      
            }
        }
        else
        {
            returnBool=false;
        }  
          return  returnBool;  

}

function verifyAddress(address)
{
    let validAddress=false;
   
    if(address.length>=10 && (checkAddress(address))==true)  // check to see if the client entered the correct number of characters. If so, call the checkVin function.
    {    
       address=address.toUpperCase();
       alert("The address you entered: "+address+" is a valid address." );
       validAddress=true;                             
    }
       
    else if (address.length<10 || (checkAddress(address)==false))        // if they've entered anything less than 10 characters, let them know, and set flag to false to make them try again.
    {                  
      alert("The address you entered does not have at least 10 characters. It has "+address.length+" characters.");                  
      validAddress=false;     
    }     
    
    return validAddress;   
}

function checkAddress(address)
{
    return /^[A-Za-z0-9 -/:,]*$/.test(address);   //check to make sure the user entered ONLY letters (upper and lower case) and numbers, and only certain characters              
}    
 
function verifyPCode(tempPCode)
{
let validPCode=false;


    if(!(tempPCode.length==6))
    {
       pCode.value="";
       pCode.focus();
       validPCode=false;
    }
    else if(/^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i.test(tempPCode) )  ///^[ABCEGHJ-NPRSTVXY][0-9][ABCEGHJ-NPRSTV-Z][0-9][ABCEGHJ-MNPRSTV-Z][0-9]$/
    {
        pCode.value=pCode.value.toUpperCase();
        validPCode = true;
    }
    return validPCode;
 }

 function verifyPhone(tempPhone)
 {
    let validPhone=false;

    if(!(tempPhone.length==10))
    {
        validPhone=false;
    }

    else if(/^[0-9]{10}$/.test(tempPhone))
    {
        validPhone=true;
    }
    return validPhone;
 }