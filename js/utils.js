

function addOutputLine (text) {
  // erstelle ein neues div Element
  // und gib ihm etwas Inhalt
  var newDiv = document.createElement("div");
  var newContent = document.createTextNode(text);
  newDiv.appendChild(newContent); // füge den Textknoten zum neu erstellten div hinzu.

  // füge das neu erstellte Element und seinen Inhalt ins DOM ein
  var currentDiv = document.getElementById("div1");
  document.body.insertBefore(newDiv, currentDiv);
}

