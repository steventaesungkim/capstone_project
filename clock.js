// Creating a military Digital Clock

function showTime(){

    // Date instance
    let date = new Date();

    // 0 - 23 hours
    let hrs = date.getHours(); 
    // 0 - 59 minutes
    let mins = date.getMinutes();
    // 0 - 59 seconds
    let secs = date.getSeconds();

    // Always showing double digits
    hrs = (hrs < 10) ? ("0" + hrs) : hrs;
    mins = (mins < 10) ? ("0" + mins) : mins;
    secs = (secs < 10) ? ("0" + secs) :secs;
    
    // Clock format
    let time = hrs + `:` + mins + `:` + secs;

    // Displaying on body
    const clockElement = document.getElementById('clock');
    clockElement.innertext = time;
    clockElement.textContent = time;

    setTimeout(showTime, 1000);
}

showTime();
