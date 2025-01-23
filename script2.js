//save stuff with browser?

let incsVisibleNum = 1;

function printInitial (num) {
//Add new incident HTML to the DOM
    if (num > 1) {
        let newIncDiv = document.createElement('div');
        
        newIncDiv.style.display = "none";
        
        document.getElementById("incidentContainer").appendChild(newIncDiv);
        newIncDiv.id = `incident${num}Group`;
        
        newIncDiv.innerHTML =
        `<h3 class="incidentTitle">Incident ${num}</h3>
        <button id="inc${num}CollapseBtn"class="incCollapseBtnAll"><img src="./right-arrow.png" style="height:15px; width:15px; transform:rotate(90deg)"></button>
        <div id="inc${num}AfterCheckbox">
            <div id="inc${num}driver1" class="incDriverRows">
                <label for="penalty-${num}.1">Penalty:</label>
                <select name="penalty-${num}.1" id="penalty-${num}.1">
                    <option selected value> ---</option>
                    <option value="2 points">2 points</option>
                    <option value="4 points">4 points</option>
                    <option value="6 points">6 points</option>
                    <option value="8 points">8 points</option>
                    <option value="Racing incident">Racing incident</option>
                    <option value="NFA">NFA</option>
                    <option value="Warning">Warning</option>
                    <option value="Involved">Involved</option>
                    <option value="Other...">Other...</option>
                </select>
                <input placeholder="Driver name" type="text" id="driverName-${num}.1" size="17">
                <button id="inc${num}AddDriver" class="driversBtn incButtons">+</button>
                <input placeholder="Describe penalty" type="text" id="otherDeets-${num}.1" class="otherDeets" size="32" style="display:none">
            </div>
            <div id="inc${num}driver2" class="incDriverRows" style="display: none">
                <label for="penalty-${num}.2">Penalty:</label>
                <select name="penalty-${num}.2" id="penalty-${num}.2">
                    <option selected value> ---</option>
                    <option value="2 points">2 points</option>
                    <option value="4 points">4 points</option>
                    <option value="6 points">6 points</option>
                    <option value="8 points">8 points</option>
                    <option value="Racing incident">Racing incident</option>
                    <option value="NFA">NFA</option>
                    <option value="Warning">Warning</option>
                    <option value="Involved">Involved</option>
                    <option value="Other...">Other...</option>
                </select>
                <input placeholder="Driver 2 name" type="text" id="driverName-${num}.2" size="17">
                <button id="inc${num}RemoveDriver2" class="driversBtn incButtons">-</button>
                <input placeholder="Describe penalty" type="text" id="otherDeets-${num}.2" class="otherDeets" size="32" style="display:none">
            </div>
            <textarea placeholder="Reasoning" id="reason-${num}" class="reasoning" spellcheck="true" rows="5" cols="54"></textarea>  
        </div>`;
    }
}

const collapseStates = {};
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
    // const driver2 = document.querySelector(`#inc${num}driver2`);
    ["AddDriver", "RemoveDriver2"].forEach((action, index) => {
        document.querySelector(`#inc${num}${action}`).addEventListener('click', () => {
            document.querySelector(`#inc${num}driver2`).style.display = index === 0 ? "flex" : "none";
        });
    });
}

const incObject = {};
function createDriver2Togs (num) {
// Set up incident's add/remove buttons, used to determine which version of the output displays
    document.querySelector(`#inc${num}AddDriver`).addEventListener('click', () => {
        incObject[`inc${num}Driver2Tog`] = true;
    });
    
    document.querySelector(`#inc${num}RemoveDriver2`).addEventListener('click', () => {
        incObject[`inc${num}Driver2Tog`] = false;
    });
}

function penaltyInputListeners(num) {
//create Listeners so other field opens if other option is selected in penalty dropdown
    document.getElementById(`penalty-${num}.1`).addEventListener('input', () => {
        document.getElementById(`otherDeets-${num}.1`).style.display =
            document.getElementById(`penalty-${num}.1`).value === "Other..." ? "flex" : "none";
    });
    
    document.getElementById(`penalty-${num}.2`).addEventListener('input', () => {
        document.getElementById(`otherDeets-${num}.2`).style.display =
            document.getElementById(`penalty-${num}.2`).value === "Other..." ? "flex" : "none";
    });
}

const outputArray = [];
function updateTextarea (incsVisibleNum) {
// Create the text for the Output array and print it to the page
    
    for (let i = 1; i <= incsVisibleNum; i++) {
        const p1 = document.getElementById(`penalty-${i}.1`).value;
        const d1 = document.getElementById(`driverName-${i}.1`).value;
        const p2 = document.getElementById(`penalty-${i}.2`).value;
        const d2 = document.getElementById(`driverName-${i}.2`).value;
        const reason = document.getElementById(`reason-${i}`).value;

        let p1Final = p1 === "Other..." ? document.getElementById(`otherDeets-${i}.1`).value : p1;
        let p2Final = p2 === "Other..." ? document.getElementById(`otherDeets-${i}.2`).value : p2;
        
        document.getElementById(`otherDeets-${i}.1`).style.display = p1 === "Other..." ? "block" : "none";
        document.getElementById(`otherDeets-${i}.2`).style.display = p2 === "Other..." ? "block" : "none";
    
        if (!p1Final) {
            outputArray[i] = "";
            continue;
        }

        let titleText = `${i > 1 ? "\r\n\r\n" : ""}**Inc ${i}) -`;
        let noDrivers = ` ${p1Final}**`;
        let singleDriver = ` ${d1} ${p1Final}**`
        let bothDrivers = ` ${d1} ${p1Final}, ${d2} ${p2Final}**`
        let reasonText = ` ${reason}`
        switch (document.getElementById("format").value) {
            case "format1":
                break;
            case "format2":
                titleText = `${i > 1 ? "\r\n\r\n" : ""}INC${i} -`
                noDrivers = ` ${p1Final}`
                singleDriver = ` ${d1} ${p1Final}`
                bothDrivers = ` ${d1} ${p1Final}, ${d2} ${p2Final}`
                reasonText = ` - ${reason}`
                break;
            case "format3":
                titleText = `${i > 1 ? "\r\n" : ""}Inc ${i} -`
                noDrivers = ` ${p1Final}`
                singleDriver = ` ${d1} ${p1Final}`
                bothDrivers = ` ${d1} ${p1Final}, ${d2} ${p2Final}`
                reasonText = ` - ${reason}`
                break;
            case "format4":
                titleText = `${i > 1 ? "\r\n" : ""}**Inc ${i} -`
        }

        if (["NFA", "Racing incident", "Involved"].includes(p1Final)) {
            outputArray[i] = titleText + noDrivers + reasonText;
        } else if (incObject[`inc${i}Driver2Tog`]) {
            outputArray[i] = titleText + bothDrivers + reasonText;
        } else {
            outputArray[i] = titleText + singleDriver + reasonText;
        }
    }

    const output = document.getElementById("output");
    output.style.display = "block";
    output.value = "";
    output.value = outputArray.join("");
    
    document.getElementById('copyButton').style.display = "block";
        
    //length of output
    // console.log(outputArray.join("").length-1);
}

function driverNameVisibility (num) {
//add or remove driver name from incident row based on penalty dropdown selection
    const dropdown1 = document.getElementById(`penalty-${num}.1`);
    const dropdown2 = document.getElementById(`penalty-${num}.2`);   
    dropdown1.addEventListener('input', () => {
        if (["NFA", "Racing incident", "Involved"].includes(dropdown1.value)) {
            document.getElementById(`driverName-${num}.1`).style.opacity = "0"
            document.getElementById(`driverName-${num}.1`).setAttribute("tabindex", "-1")
        } else {
            document.getElementById(`driverName-${num}.1`).style.opacity = "1"
            document.getElementById(`driverName-${num}.1`).setAttribute("tabindex", "0");
        }
    })
    dropdown2.addEventListener('input', () => {
        if (["NFA", "Racing incident", "Involved"].includes(dropdown2.value)) {
            document.getElementById(`driverName-${num}.2`).style.opacity = "0"
            document.getElementById(`driverName-${num}.2`).setAttribute("tabindex", "-1")
        } else {
            document.getElementById(`driverName-${num}.2`).style.opacity = "1"
            document.getElementById(`driverName-${num}.2`).setAttribute("tabindex", "0");
        }
    })
}

printInitial(1);
toggleIncVisibility(1);
incObject[`inc1Driver2Tog`] = false;
createDriver2Togs(1);
addingRemoving2ndDrivers(1);
penaltyInputListeners(1);
driverNameVisibility(1)

document.querySelector("#addIncident").addEventListener('click', () => {
//Add incident button function
    incsVisibleNum++;
    printInitial(incsVisibleNum);
    toggleIncVisibility(incsVisibleNum);
    incObject[`inc${incsVisibleNum}Driver2Tog`] = false;
    createDriver2Togs(incsVisibleNum);
    addingRemoving2ndDrivers(incsVisibleNum);
    penaltyInputListeners(incsVisibleNum);
    driverNameVisibility(incsVisibleNum)
    document.querySelector(`#incident${incsVisibleNum}Group`).style.display = "block";
    document.querySelector(`#inc${incsVisibleNum}AfterCheckbox`).style.display = "block";
    document.getElementById('collapseAll').style.display = "inline-block";
    document.querySelector("#removeIncident").style.display = "inline-block";
    document.getElementById('inc1CollapseBtn').style.display = "inline-block"
});

document.querySelector("#removeIncident").addEventListener('click', () => {
//Remove incident button functionality
    if (collapseStates[`inc${incsVisibleNum}CollapseState`]) {
        collapseStates[`inc${incsVisibleNum}CollapseState`] = false;
        document.getElementById(`inc${incsVisibleNum}CollapseBtn`).classList.toggle("collapsed")
    }
    let container = document.getElementById("incidentContainer");
    let child = document.getElementById(`incident${incsVisibleNum}Group`)
    container.removeChild(child)
    incsVisibleNum--;
    if (incsVisibleNum < 2) {
        document.querySelector("#removeIncident").style.display = "none";
        document.getElementById('collapseAll').style.display = "none";
        document.getElementById('inc1CollapseBtn').style.display = "none"
        document.getElementById("inc1AfterCheckbox").style.display = "block";
        if (collapseStates[`inc1CollapseState`]) {
            collapseStates[`inc1CollapseState`] = false;
            document.getElementById(`inc1CollapseBtn`).classList.toggle("collapsed")
        }
    }
    outputArray.pop();
});

// Reveal, clear, and add text to preview textarea & show copy button
document.getElementById("preview").addEventListener('click', () => {
    updateTextarea(incsVisibleNum);
});

document.getElementById("format").addEventListener('input', () => {
    updateTextarea(incsVisibleNum);
});

document.getElementById("collapseAll").addEventListener('click', () => {
    //Collapse all button functionality
        for (let i = 1; i <= incsVisibleNum; i++) {
        document.querySelector(`#inc${i}AfterCheckbox`).style.display = "none";
        document.getElementById(`inc${i}CollapseBtn`).classList.add("collapsed");
        collapseStates[`inc${i}CollapseState`] = true;
        }
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