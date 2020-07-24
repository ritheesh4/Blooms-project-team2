const mainBody = document.querySelector("main");
const arrowRight = document.getElementById("navRight");
const arrowLeft = document.getElementById("navLeft");
const carouselProgress = document.getElementById("carouselProgress");
const pageNumber = document.getElementById('pageNumber');

let rightClick = 0;
let leftClick = 0;
let divisionLength = 3;
arrowLeft.style = 'display:none';
let plotDataLength = 0;


// Checking the status of the right arrow button. If the scroll reached to end, button hides.
const rightArrowStatus = () => {
    if (rightClick === 2){
        leftClick ==0;
        arrowRight.style = 'display:none'
    } else {
        rightClick++;
        console.log(plotDataLength)
        pageNumber.innerHTML =`${3*(rightClick+1)}/${plotDataLength}`
        arrowLeft.style = 'display:block'
        if(leftClick !== 0){
            leftClick--;
        }
    }

  if (rightClick < divisionLength) {
    carouselProgress.style = `width:33.3%; margin-left:${33.33 * rightClick}%;transition: all 700ms;`;
  }
};

const leftArrowStatus = () => {
    if (leftClick === 2) {
        rightClick == 0;
        arrowLeft.style = 'display:none;'
      } else {
        leftClick++;
        pageNumber.innerHTML =`${plotDataLength -(3*(leftClick))}/${plotDataLength}`
        rightClick--;
        arrowRight.style = 'display:block'
      }
  if (leftClick < divisionLength) {
    carouselProgress.style = `width: 33.33%; float:right; margin-right:${
      33.33 * leftClick
    }%;transition: all 700ms;`;
  } 
};

// This function loads the data for the plot cards when the page first loaded.
const loadPlotData = (e) => {
  try {
    xhr = new XMLHttpRequest();
    xhr.open("GET", "plot-data.json", true);
    xhr.onload = function () {
      if (this.status === 200) {
        const data = JSON.parse(this.responseText);
        plotDataLength = data.length;
        pageNumber.innerHTML =`${3}/${plotDataLength}`
        console.log(plotDataLength)
        data.forEach((element) => {
          mainBody.innerHTML += `<div class="card" id="${element.id}">
          <div class="img-container">
            <img
              width="364"
              height="364"
              src="${element.image}"
              alt=""
            />
          </div>
          <div class="details-container">
            <div class="plot-name">${element.plot}</div>
            <ul class="plot-details">
              <li class="place">${element.place}</li>
              <li class="community">${element.community}</li>
              <li class="legal-process">
                Legal Process
                <div class="progress-bar"><div class="progress" style="width:${element.legalPercentage}%"></div></div>
                <div class="process-percentage">${element.legalPercentage}%</div>
              </li>
              <li class="availability">
                Plot Availability
                <ul class="availability-count">
                  <li class="a-count"><div class="available"></div></li>
                  <li class="a-count"><div class="available"></div></li>
                  <li class="a-count"></li>
                  <li class="a-count"></li>
                  <li class="a-count"></li>
                  <li class="a-count"></li>
                  <li class="a-count"></li>
                  <li class="a-count"></li>
                </ul>
              </li>
              <li class="project-status">
                Current Project Status : ${element.projectStatus}
              </li>
            </ul>
            <div class="buttons-container">
              <button class="project-details-btn" id="projectDetails">
                PROJECT DETAILS
              </button>
              <button class="enquire-btn" id="enquire">ENQUIRE</button>
            </div>
          </div>
        </div>`;
        });
      }
    };
    xhr.send();
  } catch {}
};

loadPlotData();

arrowRight.addEventListener("click", function () {
  mainBody.scrollBy(1200, 0);
  rightArrowStatus();
});

arrowLeft.addEventListener("click", function () {
  mainBody.scrollBy(-1200, 0);
  leftArrowStatus();
});
