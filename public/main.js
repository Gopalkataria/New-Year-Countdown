// js code lives here

function newYearCountLeft() {
	const newy = new Date(2020, 11, 30, 16, 03, 30, 1); // for debugging purposes
	// const newy = new Date(2021, 0, 1);
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
		document.getElementById("hours").innerText = "";
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

function getParameterByName(name, url = window.location.href) {
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return  null ;
	if (!results[2]) return "";
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}
const toParameter = getParameterByName("to");
const fromParameter = getParameterByName("from");
const relParameter = getParameterByName("r");
if (toParameter !== null) {
	document.getElementById("greetings").innerText = "Happy New Year " + toParameter;
}
if ((relParameter == "f") | fromParameter !== null | (relParameter == "cf") && toParameter !== null) {
	makeInvisible(document.getElementById("online-quote"));
	makeInvisible(document.getElementById("quote-disclaimer"));

	var sender = fromParameter ;
	if (sender ==  null ) {
		makeInvisible(document.getElementById("credits"));
		sender = "Gopal Kataria";;
	}
	if (relParameter == "f" || fromParameter !== null ) {
		document.getElementById("main-para").innerText = `
	Hello ${toParameter},

	Finally, the year 2020 has come to an end. This year was no less than a roller-coaster ride, with the pandemic affecting our lives in numerous ways. It's apparent that while there has been a lot of awful experiences this past year, there has been good as well. Time at home with family, finding new hobbies, being out in nature.

	Every ending marks a new beginning. Keep your spirits and determination unshaken, accompanied by courage, faith and great effort. May you achieve everything you desire for this upcoming year.

	Hope to see you soon.

	- ${sender}
	`;
	}
	if (relParameter == "cf") {
		document.getElementById("main-para").innerText = `
	Hello ${toParameter},

	Finally, the year 2020 has come to an end. This year was no less than a roller-coaster ride, with the pandemic affecting our lives in numerous ways. It's apparent that while there has been a lot of awful experiences this past year, there has been good as well. Time at home with family, finding new hobbies, being out in nature.

	As we step into another year I’d like to thank you for lifting me up every time when I am down and encouraging me to move forward. I wish you to look forward to the upcoming year with confidence and courage, giving wings to your dreams! Live your life to the fullest extent

	Hope to see you soon.

	- ${sender}
	`;
	}
}

window.setTimeout(() => {
	fetch(
		"https://api.quotable.io/random?tags=inspirational|success|friendship|love|wisdom|happiness"
	)
		.then((response) => response.json())
		.then((quote) => {
			document.getElementById("quote").innerHTML = `${quote.content}`;
			document.getElementById("author").innerText = ` —${quote.author}`;
			console.log(quote.tags);
		});
}, 2000);




window.history.replaceState({}, document.title, "/" + "");
