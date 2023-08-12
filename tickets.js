

window.addEventListener("load",clearStorage)

function clearStorage(){
  localStorage.clear();
  localStorage.setItem("totalHours", 1);
  localStorage.setItem("normalHours", 1);
  localStorage.setItem("FAC", "$10");
  localStorage.setItem("ticketcountForeigner Adult", "1");
  CalTotalPayable();

}

// Get a reference to the datepicker input element
const date = document.getElementById('date');

// Get the current date and format it to set as the minimum date
const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();
const minDate = `${yyyy}-${mm}-${dd}`; // Format: YYYY-MM-DD

// Set the minimum date for the datepicker
date.min = minDate;

// Disable past dates in the datepicker
date.addEventListener('focus', () => {
  const options = date.querySelectorAll('option');
  options.forEach(option => {
    if (option.value < minDate) {
      option.disabled = true;
    } else {
      option.disabled = false;
    }
  });
});

const selectedDateCell = document.getElementById('selectedDateCell');

// Set the current date in the table cell when the page loads
selectedDateCell.textContent = `${mm}-${dd}-${yyyy}`;

// Attach an event listener to the datepicker
date.addEventListener('change', updateTableCell);

// Function to update the table cell with the selected date
function updateTableCell(event) {
    const selectedDate = event.target.value; // Get the selected date from the datepicker

    // Update the table cell with the selected date
    selectedDateCell.textContent = selectedDate;
    localStorage.setItem("selectedDate", selectedDate);
}




//Select section

$(document).ready(function () {

    $("#time").select2();

    $("#time").on("change", function () {
      let optSelected = $(this).find("option:selected");
      let selectedTimes = [];
  
      optSelected.each(function () {
          let timeRange = $(this).text();
          selectedTimes.push(timeRange);
      });
  
      if (selectedTimes.length > 0) {
          let combinedTimeRange = combineTimeRanges(selectedTimes);
          updateSummaryTime(combinedTimeRange);
  
          // Calculate the total hours and peak hours
          let totalHours = calculateTotalHours(optSelected);
          let peakHours = countPeakHours(optSelected);
  
          updateDurationRow(totalHours, peakHours);
          updatenewcharge();
      } else {
          // when no options are selected
          updateSummaryTime("Not selected");
          updateDurationRow(0, 0);
          updatenewcharge();
      }
  });
  

    function combineTimeRanges(timeRanges) {
        let startTime = timeRanges[0].split(" - ")[0];
        let endTime = timeRanges[timeRanges.length - 1].split(" - ")[1];
        return startTime + " - " + endTime;
    }

    function updateSummaryTime(combinedTimeRange) {
        let summaryTable = document.getElementById("summary_tbl");
        let timeRow = summaryTable.rows[1]; // since "Time" row is the second row

        let timeCell = timeRow.cells[1];
        timeCell.innerText = combinedTimeRange;
        localStorage.setItem("Time", combinedTimeRange);

    }

});

function calculateTotalHours(optSelected) {
  let totalHours = 0;
  optSelected.each(function () {
      let timeRange = $(this).text();
      let startTime = parseInt(timeRange.split("-")[0]);
      let endTime = parseInt(timeRange.split("-")[1]);
      totalHours += endTime - startTime;
      localStorage.setItem("totalHours", totalHours);
  });
  return totalHours;
}

function countPeakHours(optSelected) {
  let peakHours = 0;
  optSelected.each(function () {
      let optionValue = parseInt($(this).val());
      if ([4, 5, 6, 9, 10, 11].includes(optionValue)) {
          peakHours++;
      }
      localStorage.setItem("peakHours", peakHours);
  });
  return peakHours;
}

function updateDurationRow(totalHours, peakHours) {
  let selectedDurationCell = document.getElementById("book_duration");
  let normalHours = totalHours - peakHours;
  let durationText = `${totalHours} hrs ( ${normalHours < 10 ? "0" + normalHours : normalHours} Normal : ${peakHours < 10 ? "0" + peakHours : peakHours} Peak)`;
  selectedDurationCell.textContent = durationText;

  localStorage.setItem("book_duration", durationText);
  localStorage.setItem("normalHours", normalHours);

}



function CalCharge(categoryName, ticketCount) {
  const totalHours = localStorage.getItem("totalHours");
  const normalHours = localStorage.getItem("normalHours");
  const peakHours = localStorage.getItem("peakHours");
  if (categoryName === "Foreigner Adult") {
      let FAC = "$" + (((normalHours * 10)+(peakHours * 13)) * ticketCount);
      localStorage.setItem("FAC" , FAC);
      console.log(FAC);
      return FAC;
  } else if (categoryName === "Foreigner Child") {
    let FCC = "$" + (((normalHours * 5)+(peakHours * 8)) * ticketCount);
    localStorage.setItem("FCC" , FCC);
    return FCC;
  } else if (categoryName === "SL Adult") {
    let SLAC = "$" + (((normalHours * 4)+(peakHours * 6)) * ticketCount);
    localStorage.setItem("SLAC" , SLAC);
    return SLAC;
  } else if (categoryName === "SL Child") {
    let SLCC = "$" + (((normalHours * 2)+(peakHours * 3)) * ticketCount);
    localStorage.setItem("SLCC" , SLCC);
    return SLCC;
  } else {
    return "Free"
  }
  
}


function CalTotalPayable() {
  const FAC = localStorage.getItem("FAC");
  const FCC = localStorage.getItem("FCC");
  const SLAC = localStorage.getItem("SLAC");
  const SLCC = localStorage.getItem("SLCC");

  const totalPayable = (
    (FAC ? parseFloat(FAC.substring(1)) : 0) +
    (FCC ? parseFloat(FCC.substring(1)) : 0) +
    (SLAC ? parseFloat(SLAC.substring(1)) : 0) +
    (SLCC ? parseFloat(SLCC.substring(1)) : 0)
  );

  console.log(totalPayable);

  const totalPayableCell = document.getElementById("tot_pay");
  totalPayableCell.textContent = "$" + totalPayable;

  localStorage.setItem("totalPayable", totalPayableCell.textContent);
}


 
let spanID;

  const STable = document.getElementById("summary_tbl");

const minusButtons = document.querySelectorAll(".minus-btn");

      minusButtons.forEach(button => {
          button.addEventListener("click", () => {
              const parentDiv = button.parentNode;
              const paragraphTag = parentDiv.querySelector("span");
              spanID = paragraphTag.id;
              console.log(spanID);

              const sparentDiv = button.parentNode.parentNode;
              const categoryNameElement = sparentDiv.querySelector('label');
              const categoryName = categoryNameElement.textContent.trim();
              console.log(categoryName);

              decTicketCount();
              localStorage.setItem(`ticketcount${categoryName}` , paragraphTag.innerText);
              updateSummaryTable(categoryName);
              CalTotalPayable();
          });
      });

const plusButtons = document.querySelectorAll(".plus-btn");

      plusButtons.forEach(button => {
          button.addEventListener("click", () => {
              const parentDiv = button.parentNode;
              const paragraphTag = parentDiv.querySelector("span");
              spanID = paragraphTag.id;
              console.log(spanID);

              const sparentDiv = button.parentNode.parentNode;
              const categoryNameElement = sparentDiv.querySelector('label');
              const categoryName = categoryNameElement.textContent.trim();
              console.log(categoryName);

              incTicketCount();
              localStorage.setItem(`ticketcount${categoryName}` , paragraphTag.innerText);
              updateSummaryTable(categoryName);
              CalTotalPayable();
          });
      });

function decTicketCount() {
  if (parseInt(window[spanID].innerText) > 0) {
    window[spanID].innerText = parseInt(window[spanID].innerText) - 1;
    
  }
}

function incTicketCount() {
  window[spanID].innerText = parseInt(window[spanID].innerText) + 1;
}


function updateSummaryTable(categoryName) {
  const summaryTable = document.getElementById("summary_tbl");
  const rows = summaryTable.querySelectorAll("tr");
  let foundRow = null;

  // Look for an existing row with the given categoryName
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const cells = row.getElementsByTagName("td");
    const span = cells[0].querySelector("span");
    if (cells.length === 2 && span && span.innerText === categoryName) {
      foundRow = row;
      break;
    }
  }

  if(parseInt(window[spanID].innerText) > 0){

      if (foundRow) {
            // If a row exists, update the charge
            const ticketCount = parseInt(document.getElementById(spanID).innerText);
            const charge = CalCharge(categoryName, ticketCount);
            const updatedcategoryName = ticketCount + `<span>${categoryName}</span>`;
            foundRow.cells[1].innerText = charge;
            foundRow.cells[0].innerHTML = updatedcategoryName;
        } else {
            // If no row exists, add a new row before the Total Payable row
            const newRow = summaryTable.insertRow(rows.length - 1);
            const categoryCell = newRow.insertCell(0);
            const chargeCell = newRow.insertCell(1);
            
            const ticketCount = parseInt(document.getElementById(spanID).innerText);
            categoryCell.innerHTML = ticketCount + ` <span>${categoryName}</span>` ;
            const charge = CalCharge(categoryName, ticketCount);
            chargeCell.innerText = charge;
        }
      }  else {
        const ticketCount = parseInt(document.getElementById(spanID).innerText);
        const charge = CalCharge(categoryName, ticketCount);
        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
          const cells = row.getElementsByTagName("td");
          if (cells.length === 2) {
            const span = cells[0].querySelector("span");
            if (span && span.textContent === categoryName) {
              summaryTable.deleteRow(i);
              break;
            }
          }
        }
      }
    }

    function updatenewcharge() {
      const summaryTable = document.getElementById("summary_tbl");
      const rows = summaryTable.querySelectorAll("tr");
    
      rows.forEach(row => {
        const cells = row.getElementsByTagName("td");
        if (cells.length === 2) {
          const span = cells[0].querySelector("span");
          
    
          // Check if the span element exists before proceeding
          if (span) {
            const categoryName = span.textContent.trim();
            
            // Retrieve the ticket count from localStorage
            const ticketCountKey = `ticketcount${categoryName}`;
            const ticketCount = parseInt(localStorage.getItem(ticketCountKey));
    
            // Calculate the charge using the retrieved ticket count
            const charge = CalCharge(categoryName, ticketCount);
            cells[1].innerText = charge;
          }
        }
      });
    
      CalTotalPayable();
    }

const continuebtn= document.getElementById('continue');

continuebtn.addEventListener ("click",()=>{
  let summaryTable= document.getElementById("summary_tbl");
  localStorage.setItem("summaryTable",summaryTable.innerHTML);
});

continuebtn.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = './details.html';
});

