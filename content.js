// Send message to background script to execute the function
chrome.runtime.sendMessage({
    action: "autoSelectAndInput",
    inputValue: 'Your Input Value',
    delay: 2000
}, function(response) {
    console.log(response.status);
});
