
$(document).ready(function(){
    $('.search_select_box select').selectpicker();
})
checkWidth();

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
    $("#dropdownMenu_Services_dropdown").removeClass("active");
    $(".addIcon4").removeClass("active");
    $("#dropdownMenu_ShopTires_dropdown").removeClass("active");
    $(".addIcon2").removeClass("active");

}

$("#dropdownMenu_ShopTires_nav").on("click", toggleShopTireDropDown);
function toggleShopTireDropDown(){
    if($("#dropdownMenu_Services_dropdown").hasClass("active")){
        $("#dropdownMenu_Services_dropdown").toggleClass("active");
        $(".addIcon4").toggleClass("active");
    }

    $("#dropdownMenu_ShopTires_dropdown").toggleClass("active");
    $(".addIcon2").toggleClass("active");
    
}

$("#dropdownMenu_Services_nav").on("click", toggleServicesDropDown);
function toggleServicesDropDown(){
    if($("#dropdownMenu_ShopTires_dropdown").hasClass("active")){
        $("#dropdownMenu_ShopTires_dropdown").toggleClass("active");
        $(".addIcon2").toggleClass("active");
    }
    $("#dropdownMenu_Services_dropdown").toggleClass("active");
    $(".addIcon4").toggleClass("active");
    
}

$("#dropdownMenu_Services_nav_tireservices_nav").on("click", toggleTireServicesDropdown);
function toggleTireServicesDropdown() {
    if($("#dropdownMenu_Services_nav_options.automotive").hasClass("active")){
        $("#dropdownMenu_Services_nav_options.automotive").toggleClass("active");
    $(".addIcon8").toggleClass("active");
    }
    
    $("#dropdownMenu_Services_nav_options.tires").toggleClass("active");
    $(".addIcon6").toggleClass("active");
    

    
}
$("#dropdownMenu_Services_nav_automotiveservices_nav").on("click", toggleAutomotiveServicesDropdown);
function toggleAutomotiveServicesDropdown() {

    if($("#dropdownMenu_Services_nav_options.tires").hasClass("active")){
        $("#dropdownMenu_Services_nav_options.tires").toggleClass("active");
    $(".addIcon6").toggleClass("active");
    }

    $("#dropdownMenu_Services_nav_options.automotive").toggleClass("active");
    $(".addIcon8").toggleClass("active");
}



//Search By Change
let searchBySelect = document.getElementById('searchBy');
let searchByLicenseDiv = document.getElementById('formSearchByLicense');
let searchByTireSizeDiv = document.getElementById('formSearchByTireSize');
function populateLicenseForm(){
    console.log("Event Triggered ",searchBySelect.value)
    if(searchBySelect.value == "license"){
        fetchStates();
        $("#states").attr("required", true)
        $("#licensePlate").attr("required", true)
        $("#widths").attr("required", false)
        $("#profiles").attr("required", false)
        $("#wheelSizees").attr("required", false)
        searchByLicenseDiv.style.display = "flex";
        searchByTireSizeDiv.style.display = "none";
        
    }
    else{
        $("#widths").attr("required", true)
        $("#profiles").attr("required", true)
        $("#wheelSizees").attr("required", true)
        $("#states").attr("required", false)
        $("#licensePlate").attr("required", false)
        searchByLicenseDiv.style.display = "none";
        searchByTireSizeDiv.style.display = "flex";
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

//Media Query
function checkWidth() {
    var windowWidth = $(window).width();
    if (windowWidth <= 500) {
      $("#hero_description").html(`Ensuring your vehicle’s safety.`);
      $("#hero_headline").html(`Experts in <span>tire, alignment, and brake services</span>.`)
      $("#hero_buttons").html(`<a href="" class="primary_button">Shop Tires</a>`)
    } else {
        $("#hero_description").html(`We offer comprehensive services to ensure your vehicle stays safe, reliable, and ready for the road.`);
        $("#hero_headline").html(`Expert <span>tire, alignment, and brake services</span> all in <span>one place</span>.`)
        $("#hero_buttons").html(`<a href="" class="primary_button">Shop Tires</a>
                    <a href="" class="secondary_button">Make An Appointment</a>`)
    }
  }

  // Initial check on page load
  checkWidth();

  // Listen for window resize events
  $(window).on('resize', checkWidth);

//   $(".dropdown").removeClass("dropup");
