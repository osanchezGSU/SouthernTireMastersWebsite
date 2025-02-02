
$(document).ready(function(){
    $('.search_select_box select').selectpicker();
})


//Search By License
async function fetchStates() {
    try {
        const response = await fetch('search_by_license.json'); // Fetch JSON file
        const data = await response.json(); // Parse JSON response

        populateStates(data.states);
    } catch (error) {
        console.error("Error fetching states:", error);
    }
}

function populateStates(statesArray){
    const statesSelect = document.getElementById("states");
    statesArray.forEach(state => {
        option = document.createElement("option");
        option.value = state;
        option.textContent = state;
        if (state === "GA"){
            option.selected="selected";
        }
        statesSelect.appendChild(option)
    });

}

//fetchStates();

//Search By Tires
const profileSelect = document.getElementById('profiles')
const widthSelect = document.getElementById('widths')
const wheelSizeSelect = document.getElementById('wheelSizes')
profileSelect.disabled = true;
wheelSizeSelect.disabled = true;
var widthSelected = widthSelect.value;
var profileSelected = profileSelect.value;
var wheelSizeSelected = wheelSizeSelect.value;
let tireData;


async function fetchTires() {
    try{
        const response = await fetch('search_by_tire_size.json'); 
        tireData = await response.json();
        populateWidths(tireData.tire_widths);
    }
    catch (error){
        console.error("Error fetching states: ", error);
    }
}

function populateWidths(widthsObj){
   
     Object.keys(widthsObj).forEach(width=> {
        option = document.createElement("option");
        option.value = width;
        option.textContent = width;
        widthSelect.appendChild(option);
      
    });
    $('.search_select_box select').selectpicker('refresh');

}

fetchTires();


function populateProfileSizes(){
    if(widthSelect.value){
        console.log(typeof(widthSelect.value));
        var selectedWidth = widthSelect.value;
        console.log(selectedWidth)
        let profiles = tireData.tire_widths[selectedWidth];
        Object.keys(profiles).forEach(profile => {
            option = document.createElement("option");
            option.value = profile;
            option.textContent = profile;
            profileSelect.appendChild(option);
        })
        profileSelect.disabled = false;
        $('.search_select_box select').selectpicker('refresh');

    } else{
        profileSelect.disabled = true;
    }
    
}
function populateWheelSizes(){
    if(profileSelect.value){
        var selectedProfile = profileSelect.value;
        var selectedWidth = widthSelect.value;
        let wheels = tireData.tire_widths[selectedWidth][selectedProfile];
        wheels.forEach(wheel => {
            option = document.createElement("option");
            option.value = wheel;
            option.textContent = wheel;
            wheelSizeSelect.appendChild(option);
        })
        wheelSizeSelect.disabled = false;
        $('.search_select_box select').selectpicker('refresh');

    } else{
        wheelSizeSelect.disabled = true;
    }
    
}


widthSelect.addEventListener("change", populateProfileSizes);
profileSelect.addEventListener("change", populateWheelSizes);






let form = document.forms['tireSearch'];

document.querySelector("form").onsubmit = function (e) {
    e.preventDefault();  // Prevent default form submission

    let state = this.states.value.trim(); // Get and sanitize the state value
    let licensePlate = this.licensePlate.value;

    let widthSize = widthSelect.value;
    let profileSize = profileSelect.value;
    let wheelSize = wheelSizeSelectSelect.value;


    // if (!state) {
    //     alert("Please select a state before continuing.");
    //     return;
    // }

    // Construct URL with query parameters
    let searchByLicenseURL = '#!search?license=${licensePlate}&license_ready=true&state=${state}&location_id=23406&search_by=license';
    let searchByTireSizeURL = '';
    let redirectUrl = `http://127.0.0.1:3002/tires.html;



    window.location.href = redirectUrl; // Redirect user
};

//Search By Tire Size
