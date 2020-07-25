const mainBody = document.querySelector("main");

// This function loads the data for the plot cards when the page first loaded.
const loadPlotData = (e) => {
  try {
    xhr = new XMLHttpRequest();
    xhr.open("GET", "plot-data.json", true);
    xhr.onload = function () {
      if (this.status === 200) {
        const data = JSON.parse(this.responseText);
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

