function showTime() {
    const date = new Date()
    return date.getHours() + " Hrs  " + date.getMinutes() + "Mins  " + date.getSeconds() + " Secs"
}


function showTimeExpired(){
    console.log("Activity B: Your session expired at:  " + showTime())
}


// Async nature of JavaScript
// Main thread creates a child thread for each function call
// Here, line 16 should execute and line 17 should wait for its completion, but it doesnt. Because
// line 17 is executed by Main, line 16 by child
console.log("Activity A:  Triggering activity B at:  " + showTime())
setTimeout(showTimeExpired, 5000)
console.log("Activity A:  Triggering activity B at:  " + showTime() + "  will(should) execute after 5 seconds")