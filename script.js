document.querySelector("#menu").addEventListener("click", function () {
    this.classList.toggle("fa-times");
    document.querySelector(".navbar").classList.toggle("nav-toggle")
});

window.addEventListener("scroll", function () {
    document.querySelector("#menu").classList.remove("fa-times")
    document.querySelector(".navbar").classList.remove("nav-toggle")

});

// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["Software Engineer", "Fronted development", "web designing", "Graphic Designer", "web development"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .twitter', { interval: 1000 });
srtop.reveal('.home .telegram', { interval: 600 });
srtop.reveal('.home .instagram', { interval: 600 });
srtop.reveal('.home .dev', { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });


// form validation
const submitBtn = document.getElementById('submitBtn');
const nameerror = document.getElementById("nameerror");
const nameEmail = document.getElementById("nameEmail");
const numberError = document.getElementById("numberError");
const overlay = document.getElementById("overlay");



function validatename() {
    let name = document.getElementById("name").value.trim();
    if (name.length == 0) {
        nameerror.innerHTML = "Name is required please enter your full name";
        nameerror.previousElementSibling.classList.add("ri-close-circle-fill");
        return false;
    }
    if (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
        nameerror.innerHTML = "error! please enter your first and last name";
        nameerror.previousElementSibling.classList.add("ri-close-circle-fill");
        return false;

    }
    nameerror.innerHTML = "";
    nameerror.previousElementSibling.classList.remove("ri-close-circle-fill");
    nameerror.previousElementSibling.classList.add("ri-checkbox-circle-fill");
    return true;

}

function validateemail() {
    let email = document.getElementById("email").value;
    if (email.length == 0) {
        nameEmail.innerHTML = "Email is required please enter your Email id";
        nameEmail.previousElementSibling.classList.add("ri-close-circle-fill");
        return false;
    }
    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        nameEmail.innerHTML = "error! please enter @gmail.com";
        nameEmail.previousElementSibling.classList.add("ri-close-circle-fill");
        return false;

    }
    nameEmail.innerHTML = "";
    nameEmail.previousElementSibling.classList.remove("ri-close-circle-fill");
    nameEmail.previousElementSibling.classList.add("ri-checkbox-circle-fill");
    return true;
}

function validatenumber() {
    let pohneNumber = document.getElementById("number").value;
    if (pohneNumber.length == 0) {
        numberError.innerHTML = "Number is required please enter your valid mobile number";
        numberError.previousElementSibling.classList.add("ri-close-circle-fill");
        return false;
    }
    if (!pohneNumber.match(/^[0-9]+$/)) {
        numberError.innerHTML = "error! please enter 10 digit phone number";
        numberError.previousElementSibling.classList.add("ri-close-circle-fill");
        return false;

    }
    numberError.innerHTML = "";
    numberError.previousElementSibling.classList.remove("ri-close-circle-fill");
    numberError.previousElementSibling.classList.add("ri-checkbox-circle-fill");
    return true;
}




function formsubmit() {
    event.preventDefault();
    if (validatename() && validateemail() && validatenumber() == true) {
        overlay.classList.add("active");
    };
    var  a = document.getElementById("name").value;
    document.getElementById("uservalue").innerHTML = "Hii ! " + a;

}
window.addEventListener("keypress", () => {
    if (validatename() && validateemail() && validatenumber()) {
    };

});

function closepopup() {
    overlay.classList.remove("active")
}


