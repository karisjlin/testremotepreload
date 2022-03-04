
function runPreload() {
// add your code or functions here and it will be executed
// as soon as the preload is added
    alert("Hello from a preload");
    FSBL.Clients.Logger.log("Init context and intent listeners");

    const contextHandler = (context) => {
        const {ticker = null} = context.id;
        if(ticker) {
            FSBL.Clients.Logger.log(`Received contest: `, context);
            window.location.href = `https://finance.yahoo.com/chart/${ticker}`;
        } else {
            FSBL.Clients.Logger.error("context does not have a ticker key");
        }
    };

    fdc3.addIntentListener("ViewChart", contextHandler);
    fdc3.addContextListener("fdc3.instrument", contextHandler);
}

// this code ensures that the FSBL library has been initialized
if (window.FSBL && FSBL.addEventListener) {
    FSBL.addEventListener("onReady", runPreload);
} else {
    window.addEventListener("FSBLReady", runPreload);
}
