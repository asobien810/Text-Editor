let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.querySelector("#fontName");
let fontSizeRef = document.querySelector("#fontSize");
let writingArea = document.querySelector("#text-input");
let linkButton = document.querySelector("#createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");

// List of fonts list
let fontList = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Garamond",
    "Georgia",
    "Courier New",
    "cursive"
];

// Initial Settings
const initializer = () => {
    // Function calls for highlighting buttons
    // No highlights for link, unlink, lists, undo, redo, since they are one-time operations
    highlighter(alignButtons, true);
    highlighter(spacingButtons, true);
    highlighter(formatButtons, false);
    highlighter(scriptButtons, true);

    //create options for font names
    fontList.map(value => {
        let option = document.createElement("option")
        option.value = value
        option.innerHTML = value
        fontName.appendChild(option)
    });

    //fontSize allows only till 7
    for(let i = 1; i <= 7; i++){
        let option = document.createElement("option")
        option.value = i
        option.innerHTML = i
        fontSizeRef.appendChild(option)
    }

    //default size
    fontSizeRef.value = 3
};

//main logic
const modifyText = (command, defaultUi, value) => {
    //execCommand executes command on selected text
    document.execCommand(command, defaultUi, value);
}

//for basic operations which don't need value parameter
optionsButtons.forEach((button) => {
    button.addEventListener("click", () => {
        modifyText(button.id, false, null)
    })
})

// options that require value parameter 
advancedOptionButton.forEach((button) => {
    button.addEventListener("click",() =>{
        modifyText(button.id, false, button.value)
    } )
})

//link
linkButton.addEventListener("click", () => {
    let userLink = prompt("Enter a URL")
    //if link has http then pass directly else add https
    if(/http/i.test(userLink)){
        modifyText(linkButton.id, false, userLink)
    }else {
        userLink = "http://" + userLink
        modifyText(linkButton.id, false, userLink) 
    }
})
// Highlight clicked button
const highlighter = (className, needsRemoval) => {
    className.forEach((button) => {
        button.addEventListener("click", () => {
            // NeedsRemoval = true means only one button should be highlighted, and others would be normal
            if (needsRemoval) {
                let alreadyActive = false;

                // If the currently clicked button is already active
                if (button.classList.contains("active")) {
                    alreadyActive = true;
                }

                // Remove highlight from other buttons
                highlighterRemover(className);
                if (!alreadyActive) {
                    // Highlight clicked button
                    button.classList.add("active");
                }
            } else {
                // If other buttons can be highlighted
                button.classList.toggle("active");
            }
        });
    });
};

// Remove highlight from all buttons
const highlighterRemover = (className) => {
    className.forEach((button) => {
        button.classList.remove("active");
    });
};

document.addEventListener("DOMContentLoaded", function () {
    initializer();
});
