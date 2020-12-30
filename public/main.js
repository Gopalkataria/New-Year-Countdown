// js code lives here

function newYearCountLeft() {
	// const newy = new Date(2020, 11, 30, 16, 03, 30, 1); // for debugging purposes
	const newy = new Date(2021, 0, 1);
	const nowy = new Date();
	const diffrenceMilliseconds = 0 - (nowy - newy);

	if (diffrenceMilliseconds > 0) {
		var seconds, minutes, hours, days;
		seconds = Math.floor(diffrenceMilliseconds / 1000);

		minutes = Math.floor(seconds / 60);
		seconds -= minutes * 60;

		hours = Math.floor(minutes / 60);
		minutes -= hours * 60;

		days = Math.floor(hours / 24);
		hours -= days * 24;

		return { days: days, hours: hours, minutes: minutes, seconds: seconds };
	} else {
		return false;
	}
}

function updateFeilds(timeLeft) {
    if (timeLeft.days == 0) {
        document.getElementById("days").innerText = "";
    } else {
         document.getElementById("days").innerText = timeLeft.days + " days";

    }
    if (timeLeft.hours == 0) {
        document.getElementById("hours").innerText = "" ;
    } else {
        document.getElementById("hours").innerText = timeLeft.hours + " hours";

    }
    if (timeLeft.minutes == 0) {
        document.getElementById("minutes").innerText = "";
    } else {
        document.getElementById("minutes").innerText = timeLeft.minutes + " minutes";

    }
    document.getElementById("seconds").innerText = timeLeft.seconds + " seconds";

}

const quote = document.getElementById("quote-box");
const count = document.getElementById("main-count");

function makeVisible(element) {
	element.style.visibility = "visible";
	element.style.display = "block";
}
function makeInvisible(element) {
	element.style.visibility = "hidden";
	element.style.display = "none";
}

var refreshCount = window.setInterval(() => {
	if (newYearCountLeft()) {
		// time to new year
		updateFeilds(newYearCountLeft());
		makeVisible(count);
        makeInvisible(quote);
        console.info("updated time");
    } else {
			makeVisible(quote);
        makeInvisible(count);
        console.info("Happy new year");
			window.clearInterval(refreshCount);
		}
}, 500);

async function randomQuote() {
	const response = await fetch("https://api.quotable.io/random");
	const data = await response.json();
	console.log(`${data.content} —${data.author}`);
	return data;
}

window.setTimeout(() => {

    fetch("https://api.quotable.io/random?tags=inspirational|success|friendship|love|wisdom|happiness")
        .then((response) => response.json())
        .then((quote) => {

            document.getElementById("quote").innerHTML = `${quote.content}`;
            document.getElementById("author").innerText = ` —${quote.author}`;
            console.log(quote.tags)
        });
}, 2000);
