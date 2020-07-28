const mainBody = document.querySelector("main");
let dataCopy = [];
let fileterdArray = [];
let selectedFilters = [];
let checkBoxes = [];

// This function loads the data for the plot cards when the page first loaded.
const loadPlotData = (e) => {
  try {
    xhr = new XMLHttpRequest();
    xhr.open("GET", "plot-data.json", true);
    xhr.onload = function () {
      if (this.status === 200) {
        const data = JSON.parse(this.responseText);
        dataCopy = [...data];
        data.forEach((element) => {
          mainBody.innerHTML += `<div class="card" id="${element.id}">
          <div class="img-container">
            <img style = "min-height:356px"
              src="${element.image}"
              class ="plot-image"
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
                PROJECT DETAILS<span style="margin-left:10px"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.1962 5.10211L11.8063 5.69669C12.0646 5.94844 12.0646 6.35554 11.8063 6.60462L6.46714 11.8112C6.20884 12.0629 5.79116 12.0629 5.53561 11.8112L0.193726 6.60462C-0.0645752 6.35286 -0.0645752 5.94577 0.193726 5.69669L0.803756 5.10211C1.0648 4.84767 1.49073 4.85303 1.74628 5.11282L4.90085 8.34014V0.642785C4.90085 0.286575 5.19487 0 5.56034 0H6.43966C6.80513 0 7.09915 0.286575 7.09915 0.642785V8.34014L10.2537 5.11282C10.5093 4.85035 10.9352 4.845 11.1962 5.10211Z" fill="#2D6A4F"/>
                </svg></span>
                
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
  checkBoxList();
};

const checkBoxList = () => {
  checkBoxes = document.getElementsByClassName("checkBox");
  checkBoxes = [...checkBoxes];
  checkBoxes.forEach((element) => {
    element.addEventListener("click", filterAction);
  });
};

const filterAction = () => {
  console.log(dataCopy)
  selectedFilters = [];
  checkBoxes.forEach((element) => {
    if (element.checked) {
      selectedFilters.push(element.value);
    }
  });
  if (selectedFilters.length === 0) {
    console.log("length zero")
    updateUI(dataCopy);
  } else {
    console.log("length not zero");
    fileterdArray = [];
    console.log(selectedFilters)
    selectedFilters.forEach((element) => {
      let result = fileteredItems(element);
      fileterdArray.push(result);
      console.log(fileterdArray)
    });
    fileterdArray = [].concat.apply([],fileterdArray);
    updateUI(fileterdArray);
  }

  // if (checkbox.checked === false) {
  //   let i = selectedFilters.indexOf(checkbox.value);
  //   if (i !== -1) {
  //     selectedFilters.splice(i, 1);
  //   }
  //   if (selectedFilters.length === 0) {
  //     updateUI(dataCopy);
  //   } else {
  //     console.log("none zero called")
  //     selectedFilters.forEach((element) => {
  //       let result = fileteredItems(element);
  //       fileterdArray.push([...result]);
  //     });
  //     updateUI(fileterdArray[0]);
  //   }
  // } else {
  //   selectedFilters.push(checkbox.value);
  //   selectedFilters.forEach((element) => {
  //     let result = fileteredItems(element);
  //     fileterdArray.push([...result]);
  //   });
  //   updateUI(fileterdArray[0]);
  // }
};

const fileteredItems = (place) =>
  dataCopy.filter(function (item) {
    return item.place.includes(place);
  });

const updateUI = (fileteredItems) => {
  console.log(fileteredItems)
  mainBody.innerHTML = ``;
  fileteredItems.forEach((element) => {
    mainBody.innerHTML += `<div class="card" id="${element.id}">
    <div class="img-container">
      <img style = "min-height:356px"
        src="${element.image}"
        class ="plot-image"
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
          PROJECT DETAILS<span style="margin-left:10px"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.1962 5.10211L11.8063 5.69669C12.0646 5.94844 12.0646 6.35554 11.8063 6.60462L6.46714 11.8112C6.20884 12.0629 5.79116 12.0629 5.53561 11.8112L0.193726 6.60462C-0.0645752 6.35286 -0.0645752 5.94577 0.193726 5.69669L0.803756 5.10211C1.0648 4.84767 1.49073 4.85303 1.74628 5.11282L4.90085 8.34014V0.642785C4.90085 0.286575 5.19487 0 5.56034 0H6.43966C6.80513 0 7.09915 0.286575 7.09915 0.642785V8.34014L10.2537 5.11282C10.5093 4.85035 10.9352 4.845 11.1962 5.10211Z" fill="#2D6A4F"/>
          </svg></span>
          
        </button>
        <button class="enquire-btn" id="enquire">ENQUIRE</button>
      </div>
    </div>
  </div>`;
  });
};

loadPlotData();
