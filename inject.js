function triggerAutoSelectAndInput(inputValue, delay) {
    const event = new CustomEvent('autoSelectAndInput', {
        detail: { inputValue, delay }
    });
    window.dispatchEvent(event);
}

// Inject the function into the webpage's context
const script = document.createElement('script');
script.textContent = '(' + triggerAutoSelectAndInput.toString() + ')();';
(document.head || document.documentElement).appendChild(script);
script.remove();
