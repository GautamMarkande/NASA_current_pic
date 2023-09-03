const apikey = "pE9fpQcK3lu06gV4VCBA3L3VRumiDyKaw77oDN7y";
const baseUrl = " https://api.nasa.gov/planetary/apod"
const date = document.getElementById("search-input");
const searchBtn = document.getElementById("search");
let currentDate = new Date().toISOString().split("T")[0];
const previusSearches = document.querySelector(".previous_search");
const dates = new Set();
let isDefault = 0;

const arr = [];
let obj={dates:currentDate}
arr.push(JSON.stringify(obj));
localStorage.setItem("searches",arr);

const mainContainer = document.querySelector(".main_container");
//console.log(currentDate);

//searching using date
searchBtn.addEventListener("click",()=>{
   // console.log(date.value)
   isDefault=1;
   saveSearch();
})

function saveSearch(){
    obj={
        dates:date.value
       }
       arr.push(JSON.stringify(obj));
       localStorage.setItem("searches",arr);
       getCurrentImageOfTheDay(date.value);
}
//add list of dates

function addSearchToHistory(date){
    const li = document.createElement("li");
    li.id = "preSearchDate";
    li.innerText = date;
    li.style.cursor = "pointer";
    li.addEventListener("click",(e)=>{
        getCurrentImageOfTheDay(e.target.innerText);
    })
    previusSearches.appendChild(li);
}
//fetching data from api
async function getCurrentImageOfTheDay(currentDate) {
    const response = await fetch(`${baseUrl}?api_key=${apikey}&date=${currentDate}`);
    try{
       
        if(!response.ok){
            throw(new Error("failed respose"))
        }
    }
    catch(error){
        alert("apic" + error);
    }
    const result = await response.json();
    console.log(result);
    getImageOfTheDay(result);  // show data on ui 
    
    
}

// rendering data onto ui
function getImageOfTheDay(result){

    const {title, hdurl,explanation,date} = result;
    currentDate = date;
    if(!dates.has(currentDate) || dates.size===0){  //checking in set if dates is already exsist or not
        dates.add(currentDate);
        addSearchToHistory(currentDate);// if not then add into the list of dates
    }
    mainContainer.innerHTML="";
    mainContainer.innerHTML =`
    <h1 class="heading">${isDefault===0?"Picture of the day" : `Picture On ${date}`} </h1>
        <img src=${hdurl} alt="">
        <h2>${title}</h2>
        <p class="desc">${explanation}</p>

    `
}
getCurrentImageOfTheDay(currentDate); // by default call for current date



   