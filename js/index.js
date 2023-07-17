// Target html elements
var $body = document.getElementsByTagName("body")[0];
var $yearsYoung = document.getElementById("yearsYoung");
var $pendingMessage = document.getElementsByClassName("pending-message")[0];
var birthday = new Date("1975-07-19T12:00:00Z");

// Instantiate a new BirthdayBoy object
var ihab = new BirthdayBoy("Ihab", birthday);

// Set the message 
$pendingMessage.innerHTML = ihab.generatePendingMessage();

// If it's the birthday day, add a special class to the body
if (ihab.isBirthday()) {
    $body.className = "happy-birthday";
    $yearsYoung.innerHTML = ihab.getAge() - 1;
}

// The BirthdayBoy Class
// takes a name and date object as paramaters 
function BirthdayBoy(name, bday) {
    this.name = name;
    this.bday = bday;

    var today = new Date();

    // Returns true if today is the birthday
    this.isBirthday = function () {
        if (today.getDate() === this.bday.getDate() && today.getMonth() === this.bday.getMonth()) {
            return true;
        }
        return false;
    }

    // Returns age in years
    this.getAge = function () {
        return today.getFullYear() - this.bday.getFullYear();
    }

    // Creates days left till bday message
    this.generatePendingMessage = function () {
        var bdayInDays = getDayOfYear(this.bday);
        var todayInDays = getDayOfYear(today);
        var daysLeft = bdayInDays - todayInDays;
        daysLeft = daysLeft < 0 ? 365 + daysLeft : daysLeft;

        message = "<h1>" + daysLeft;
        message += " " + (daysLeft > 1 ? "days" : "day") + " left until " + this.name + "'s birthday!</h1>";
        message += "<h3>Check back " + (daysLeft > 1 ? "in " + daysLeft + " days" : "tomorrow") + "</h3>"
        return message;
    }

    // Helper function to get the day of the year
    function getDayOfYear(date) {
        var start = new Date(date.getFullYear(), 0, 0);
        var day = Math.ceil((date - start) / (1000 * 60 * 60 * 24));
        return day;
    }
}