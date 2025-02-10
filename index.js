
$(document).ready(function(){
    $('.search_select_box select').selectpicker();
})

//Lenis Scrolling
const lenis = new Lenis({
    autoRaf: true,
  });
  
  // Listen for the scroll event and log the event data
  lenis.on('scroll', (e) => {
    console.log(e);
  });

//Nav Bar

const middleSection = document.getElementById("subheader-middle");
let lastScrollY = window.scrollY;
let ticking = false;
const scrollThreshold = 1; // Prevents minor scroll triggers

function handleScroll() {
    if (window.scrollY > scrollThreshold) {
        middleSection.classList.add("hidden");
    } else if (window.scrollY === 0) {
        middleSection.classList.remove("hidden");
    }

    lastScrollY = window.scrollY;
    ticking = false;
}

document.addEventListener("scroll", () => {
    if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
    }
});


$(".hamBtn").on("click", toggleHamMenu);
function toggleHamMenu(){
    $("#hamBtn").toggleClass("active");
    $(".dropDownMenu").toggleClass("active")
    $("body").toggleClass("active");

}


//Search By Change
let searchBySelect = document.getElementById('searchBy');
let searchByLicenseDiv = document.getElementById('formSearchByLicense');
let searchByTireSizeDiv = document.getElementById('formSearchByTireSize');
function populateLicenseForm(){
    console.log("Event Triggered ",searchBySelect.value)
    if(searchBySelect.value == "license"){
        fetchStates();
        searchByLicenseDiv.style.display = "block";
        searchByTireSizeDiv.style.display = "none";
        
    }
    else{
        searchByLicenseDiv.style.display = "none";
        searchByTireSizeDiv.style.display = "block";
    }
}
searchBySelect.addEventListener('change', populateLicenseForm)




//Search By License Logic
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
        
        statesSelect.appendChild(option)
    });
    $('.search_select_box select').selectpicker('refresh');

}

//fetchStates();

//Search By Tires Logic
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




//Submit Form

let form = document.forms['tireSearch'];

document.querySelector("form").onsubmit = function (e) {
    e.preventDefault();  // Prevent default form submission
    let url;


    if(searchBySelect.value == "license"){
        let state = this.states.value.trim(); // Get and sanitize the state value
        let licensePlate = this.licensePlate.value;
        
        if (!state) {
            alert("Please select a state before continuing.");
            return;
        }
        url = `#!search?license=${licensePlate}&license_ready=true&state=${state}&location_id=23406&search_by=license`;
    } else{
        let widthSize = widthSelect.value;
        let profileSize = profileSelect.value;
        let wheelSize = wheelSizeSelect.value;
        url = `#!results?width=${widthSize}&height=${profileSize}&rim=${wheelSize}&order_by=best_match&display=full&location_id=23406&season_id=all&search_by=size&page=1`;
    }


    let redirectUrl = `http://127.0.0.1:3002/tires.html${url}`;


    window.location.href = redirectUrl; // Redirect user
};

//Search By Tire Size
