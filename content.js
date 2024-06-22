// Function to automatically select the first item in multiple dropdowns with a delay and set a value for a text field
function autoSelectAndInput(inputValue, delay) {
    const dropdownSelectors = ['#server', '#gameChar'];
    const textFieldSelector = '#itemCode';

    // Function to select the first item in a dropdown
    function selectFirstItem(dropdownSelector, callback) {
        var dropdown = document.querySelector(dropdownSelector);
        if (dropdown) {
            dropdown.selectedIndex = 0; // Selects the first option
            var event = new Event('change'); // Create a new 'change' event
            dropdown.dispatchEvent(event); // Dispatch the event to trigger any event listeners
        }
        if (callback) {
            setTimeout(callback, delay); // Call the callback function after the delay
        }
    }

    // Function to set the input value for the text field
    function setInputValue() {
        var textField = document.querySelector(textFieldSelector);
        if (textField) {
            textField.value = inputValue;
            var inputEvent = new Event('input'); // Create a new 'input' event
            textField.dispatchEvent(inputEvent); // Dispatch the event to trigger any event listeners
        }
    }

    // Loop through each dropdown selector with delays
    (function loop(i) {
        if (i < dropdownSelectors.length) {
            selectFirstItem(dropdownSelectors[i], function() {
                loop(i + 1); // Proceed to the next dropdown after the delay
            });
        } else {
            setInputValue(); // Set the input value after processing all dropdowns
        }
    })(0);
}

// Listen for messages from the background script or the console
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "autoSelectAndInput") {
        autoSelectAndInput(request.inputValue, request.delay);
        sendResponse({status: "done"});
    }
});
