// Inject the custom function into the webpage
const script = document.createElement('script');
script.src = chrome.runtime.getURL('inject.js');
(document.head || document.documentElement).appendChild(script);
script.onload = function () {
    script.remove();
};

// Listen for custom event to send message to background script
window.addEventListener('autoSelectAndInput', function (event) {
    const { inputValue, delay } = event.detail;
    chrome.runtime.sendMessage({
        action: "autoSelectAndInput",
        inputValue: inputValue,
        delay: delay
    }, function (response) {
        console.log(response.status);
    });
});
