//save stuff with browser?
  
const maxIncidents = 20;
const outputArray = [];
const incObject = {};
let incidentsVisibleNum = 1;
const collapseStates = {};

function printInitial (num) {
    if (num > 1) {
        let newIncDiv = document.createElement('div');
        
        newIncDiv.style.display = "none";
        
        document.getElementById("incidentContainer").appendChild(newIncDiv);
        newIncDiv.id = `incident${num}Group`;
        
        newIncDiv.innerHTML =
        `<h3>Incident ${num}</h3>
        <button id="inc${num}CollapseBtn"class="incCollapseBtnAll"><img src="https://img.icons8.com/?size=15&id=39942&format=png&color=000000"></button>
        <div id="inc${num}AfterCheckbox">
            <div>
    	        <div>
                    <label for="penalty-${num}.1">Penalty:</label>
                    <select name="penalty-${num}.1" id="penalty-${num}.1">
                        <option selected value> ---</option>
                        <option value="Involved">Involved</option>
                        <option value="NFA">NFA</option>
                        <option value="Racing incident">Racing incident</option>
                        <option value="Warning">Warning</option>
                        <option value="2 points">2 points</option>
                        <option value="4 points">4 points</option>
                        <option value="6 points">6 points</option>
                        <option value="8 points">8 points</option>
                        <option value="Other...">Other...</option>
                    </select>
                    <input placeholder="Driver name" type="text" id="driverName-${num}.1">
                    <button id="inc${num}AddDriver" class="driversBtn incButtons">+</button>
                    <input placeholder="Describe penalty" type="text" id="otherDeets-${num}.1" class="otherDeets" size="41" style="display:none">
                </div>
    	        <div id="inc${num}driver2" style="display: none">
    	            <label for="penalty-${num}.2">Penalty:</label>
                    <select name="penalty-${num}.2" id="penalty-${num}.2">
                        <option selected value> ---</option>
                        <option value="Involved">Involved</option>
                        <option value="NFA">NFA</option>
                        <option value="Racing incident">Racing incident</option>
                        <option value="Warning">Warning</option>
                        <option value="2 points">2 points</option>
                        <option value="4 points">4 points</option>
                        <option value="6 points">6 points</option>
                        <option value="8 points">8 points</option>
                        <option value="Other...">Other...</option>
                    </select>
                    <input placeholder="Driver 2 name" type="text" id="driverName-${num}.2">
                    <button id="inc${num}RemoveDriver2" class="driversBtn incButtons">-</button>
                    <input placeholder="Describe penalty" type="text" id="otherDeets-${num}.2" class="otherDeets" size="42" style="display:none">
                </div>
                <textarea placeholder="Reasoning" id="reasoning-${num}" class="reasoning" spellcheck="true" rows="3" cols="54"></textarea>
            </div>    
        </div>`;
    }
}

function toggleIncVisibility(num) {
    let sectionId = `inc${num}CollapseBtn`;
    document.getElementById(sectionId).addEventListener("click", function() {
        document.getElementById(sectionId).classList.toggle("collapsed");
        document.querySelector(`#inc${num}AfterCheckbox`).style.display = 
            collapseStates[`inc${num}CollapseState`] ? "block" : "none";
        
        // Toggle the state
        collapseStates[`inc${num}CollapseState`] = !collapseStates[`inc${num}CollapseState`];
    });
}

function addingRemoving2ndDrivers(num) {
    const driver2 = document.querySelector(`#inc${num}driver2`);
    ["AddDriver", "RemoveDriver2"].forEach((action, index) => {
        document.querySelector(`#inc${num}${action}`).addEventListener('click', () => {
            driver2.style.display = index === 0 ? "block" : "none";
        });
    });
}

// Set up incident's add/remove buttons, used to determine which version of the output displays
function createDriver2Togs (num) {
    document.querySelector(`#inc${num}AddDriver`).addEventListener('click', () => {
        incObject[`inc${num}Driver2Tog`] = true;
    });
    
    document.querySelector(`#inc${num}RemoveDriver2`).addEventListener('click', () => {
        incObject[`inc${num}Driver2Tog`] = false;
    });
}


//create Listeners so other field opens if other option is selected in penalty dropdown
function penaltyInputListeners(num) {
    document.getElementById(`penalty-${num}.1`).addEventListener('input', () => {
        document.getElementById(`otherDeets-${num}.1`).style.display =
            document.getElementById(`penalty-${num}.1`).value === "Other..." ? "block" : "none";
    });
    
    document.getElementById(`penalty-${num}.2`).addEventListener('input', () => {
        document.getElementById(`otherDeets-${num}.2`).style.display =
            document.getElementById(`penalty-${num}.2`).value === "Other..." ? "block" : "none";
    });
}

// Create the Output text.
function updateOutput () {
    
    for (let i = 1; i <= maxIncidents; i++) {
        const penalty1Pre = document.getElementById(`penalty-${i}.1`).value;
        const driver1Name = document.getElementById(`driverName-${i}.1`).value;
        const otherDeets1 = document.getElementById(`otherDeets-${i}.1`).value;
        const penalty2Pre = document.getElementById(`penalty-${i}.2`).value;
        const driver2Name = document.getElementById(`driverName-${i}.2`).value;
        const otherDeets2 = document.getElementById(`otherDeets-${i}.2`).value;
        const reasoning = document.getElementById(`reasoning-${i}`).value;

        let penalty1 = penalty1Pre === "Other..." ? otherDeets1 : penalty1Pre;
        let penalty2 = penalty2Pre === "Other..." ? otherDeets2 : penalty2Pre;
        
        document.getElementById(`otherDeets-${i}.1`).style.display = penalty1Pre === "Other..." ? "block" : "none";
        document.getElementById(`otherDeets-${i}.2`).style.display = penalty2Pre === "Other..." ? "block" : "none";
    
        if (!penalty1) {
            outputArray[i] = "";
            continue;
        }
        
        let baseText;
        switch (document.getElementById("format").value) {
            case "format1":
                baseText = `**Inc ${i}) - ${penalty1}`;
                if (["NFA", "Racing incident"].includes(penalty1)) {
                    outputArray[i] = `${i > 1 ? 
                    "\r\n\r\n" : ""}${baseText}** ${reasoning}`;
                } else if (incObject[`inc${i}Driver2Tog`]) {
                    outputArray[i] = `${i > 1 ? 
                    "\r\n\r\n" : ""}${baseText} ${driver1Name}, ${penalty2} ${driver2Name}** ${reasoning}`;
                } else {
                    outputArray[i] = `${i > 1 ? 
                    "\r\n\r\n" : ""}${baseText} ${driver1Name}** ${reasoning}`;
                }
                break;
            case "format2":
                baseText = `INC${i} - ${penalty1}`;
                if (["NFA", "Racing incident"].includes(penalty1)) {
                    outputArray[i] = `${i > 1 ? 
                    "\r\n\r\n" : ""}${baseText} - ${reasoning}`;
                } else if (incObject[`inc${i}Driver2Tog`]) {
                    outputArray[i] = `${i > 1 ? 
                    "\r\n\r\n" : ""}${baseText} ${driver1Name}, ${penalty2} ${driver2Name} - ${reasoning}`;
                } else {
                    outputArray[i] = `${i > 1 ? 
                    "\r\n\r\n" : ""}${baseText} ${driver1Name} - ${reasoning}`;
                }
                break;
            case "format3":
                baseText = `Inc ${i} - ${penalty1}`;
                if (["NFA", "Racing incident"].includes(penalty1)) {
                    outputArray[i] = `${i > 1 ? 
                    "\r\n" : ""}${baseText} - ${reasoning}`;
                } else if (incObject[`inc${i}Driver2Tog`]) {
                    outputArray[i] = `${i > 1 ? 
                    "\r\n" : ""}${baseText} ${driver1Name}, ${penalty2} ${driver2Name} - ${reasoning}`;
                } else {
                    outputArray[i] = `${i > 1 ? 
                    "\r\n" : ""}${baseText} ${driver1Name} - ${reasoning}`;
                }
                break;
            case "format4":
                baseText = `**Inc ${i} - ${penalty1}`;
                if (["NFA", "Racing incident"].includes(penalty1)) {
                    outputArray[i] = `${i > 1 ? 
                    "\r\n" : ""}${baseText}** ${reasoning}`;
                } else if (incObject[`inc${i}Driver2Tog`]) {
                    outputArray[i] = `${i > 1 ? 
                    "\r\n" : ""}${baseText} ${driver1Name}, ${penalty2} ${driver2Name}** ${reasoning}`;
                } else {
                    outputArray[i] = `${i > 1 ? 
                    "\r\n" : ""}${baseText} ${driver1Name}** ${reasoning}`;
                }
        }
        
    }
        
    //length of output
    // console.log(outputArray.join("").length-1);
}

for (let i = 1; i<=maxIncidents; i++) {
    printInitial(i);
    toggleIncVisibility(i);
    incObject[`inc${i}Driver2Tog`] = false;
    createDriver2Togs(i);
    addingRemoving2ndDrivers(i);
    penaltyInputListeners(i);
}

//Collapse all button functionality
document.getElementById("collapseAll").addEventListener('click', () => {
    for (let i = 1; i <= maxIncidents; i++) {
    document.querySelector(`#inc${i}AfterCheckbox`).style.display = "none";
    document.getElementById(`inc${i}CollapseBtn`).classList.add("collapsed");
    collapseStates[`inc${i}CollapseState`] = true;
    }
});

//Incident Visibility
document.querySelector("#addIncident").addEventListener('click', () => {
        incidentsVisibleNum++;
        document.querySelector(`#incident${incidentsVisibleNum}Group`).style.display = "block";
        document.querySelector(`#inc${incidentsVisibleNum}AfterCheckbox`).style.display = "block";
        document.getElementById('collapseAll').style.display = "inline-block";
    if (incidentsVisibleNum < maxIncidents) {
        document.querySelector("#removeIncident").style.display = "inline-block";
        document.querySelector("#addIncident").style.display = "inline-block";
        document.getElementById(`otherDeets-${incidentsVisibleNum}.1`).style.display = "none";
        document.getElementById(`otherDeets-${incidentsVisibleNum}.2`).style.display = "none";
        } else {
            document.querySelector("#addIncident").style.display = "none";
        }
});

document.querySelector("#removeIncident").addEventListener('click', () => {
        document.querySelector(`#incident${incidentsVisibleNum}Group`).style.display = "none";
        incidentsVisibleNum--;
        if (incidentsVisibleNum < 2) {
            document.querySelector("#removeIncident").style.display = "none";
            document.querySelector("#addIncident").style.display = "inline-block";
            document.getElementById('collapseAll').style.display = "none";
        } else {
            document.querySelector("#addIncident").style.display = "inline-block";
        }
        [`penalty-${incidentsVisibleNum+1}.1`, `driverName-${incidentsVisibleNum+1}.1`,
        `penalty-${incidentsVisibleNum+1}.2`, `driverName-${incidentsVisibleNum+1}.2`,
        `otherDeets-${incidentsVisibleNum+1}.1`, `otherDeets-${incidentsVisibleNum+1}.2`].forEach(event =>
        (document.getElementById(event).value = ""));
        outputArray.pop();
});

//Update the outputArray whenever input is created
// document.body.addEventListener('focusout', updateTextarea);
// document.body.addEventListener('input', updateTextarea);

//update textarea
function updateTextarea () {
    updateOutput();
    const output = document.getElementById("output");
    output.style.display = "block";
    output.value = "";
    output.value = outputArray.join("");
    document.getElementById('copyButton').style.display = "block";
}

// Reveal, clear, and add text to preview textarea & show copy button
document.getElementById("preview").addEventListener('click', () => {
    updateTextarea ();
});

document.getElementById("format").addEventListener('input', () => {
    updateTextarea ();
});


//Copy
document.getElementById('copyButton').addEventListener('click', function() {

    // Get the text from the <p> tag
    let notes = document.getElementById('output');
    let textToCopy = output.value;
    
    // Create a temporary textarea element to hold the text to copy
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = textToCopy;
    
    // Append the textarea to the body (it has to be added to the DOM to be selected)
    document.body.appendChild(tempTextArea);
    
    // Select the text
    tempTextArea.select();
    tempTextArea.setSelectionRange(0, 99999); // For mobile devices
    
    // Copy the text to the clipboard
    document.execCommand('copy');
    
    // Remove the temporary textarea
    document.body.removeChild(tempTextArea);
    
    document.querySelector('#copyButton').innerText = "Copied to clipboard!";
    
    // Hide the message after 1300ms
    setTimeout(() => {
        document.querySelector('#copyButton').innerText = "Copy";
        }, 1300);
});