
// range is number of reachable tiles: 
const RANGE_NEAR = 9    // just 9
const RANGE_MEDIUM = 15 // 9 + 6 = 15
const RANGE_FAR = 27    // 9 + 6 + 12 = 27


function addOutputLine (text) {
  // erstelle ein neues div Element
  // und gib ihm etwas Inhalt
  var newDiv = document.createElement("div");
  var newContent = document.createTextNode(text);
  newDiv.appendChild(newContent); // füge den Textknoten zum neu erstellten div hinzu.

  // füge das neu erstellte Element und seinen Inhalt ins DOM ein
  var currentDiv = document.getElementById("div1");
  document.getElementById("outputDiv").insertBefore(newDiv, currentDiv);
}

