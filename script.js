/* =====================================================
   DRIVELUX - CAR RENTAL WEBSITE
===================================================== */


/* ================= MOBILE MENU ================= */

const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", () => {

    navbar.classList.toggle("active");

    if (navbar.classList.contains("active")) {
        menuBtn.textContent = "✕";
    } else {
        menuBtn.textContent = "☰";
    }

});


document.querySelectorAll(".navbar a").forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("active");
        menuBtn.textContent = "☰";

    });

});


/* ================= DARK / LIGHT MODE ================= */

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        themeBtn.textContent = "☀️";
        localStorage.setItem("theme", "dark");

    } else {

        themeBtn.textContent = "🌙";
        localStorage.setItem("theme", "light");

    }

});


if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark");
    themeBtn.textContent = "☀️";

}


/* ================= SET MINIMUM DATES ================= */

const today = new Date().toISOString().split("T")[0];

const pickupDate = document.getElementById("pickupDate");
const returnDate = document.getElementById("returnDate");
const heroPickup = document.getElementById("heroPickup");

pickupDate.min = today;
returnDate.min = today;
heroPickup.min = today;

pickupDate.value = today;
heroPickup.value = today;


/* ================= CAR FILTER ================= */

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const transmissionFilter =
    document.getElementById("transmissionFilter");
const priceFilter =
    document.getElementById("priceFilter");

const carCards = document.querySelectorAll(".car-card");
const noResults = document.getElementById("noResults");


function filterCars() {

    const search =
        searchInput.value.toLowerCase().trim();

    const category =
        categoryFilter.value;

    const transmission =
        transmissionFilter.value;

    const price =
        priceFilter.value;

    let visibleCars = 0;


    carCards.forEach(card => {

        const name =
            card.dataset.name.toLowerCase();

        const cardCategory =
            card.dataset.category;

        const cardTransmission =
            card.dataset.transmission;

        const cardPrice =
            Number(card.dataset.price);


        const searchMatch =
            name.includes(search);

        const categoryMatch =
            category === "all" ||
            category === cardCategory;

        const transmissionMatch =
            transmission === "all" ||
            transmission === cardTransmission;


        let priceMatch = true;


        if (price === "low") {

            priceMatch =
                cardPrice < 100;

        }


        if (price === "medium") {

            priceMatch =
                cardPrice >= 100 &&
                cardPrice <= 200;

        }


        if (price === "high") {

            priceMatch =
                cardPrice > 200;

        }


        if (
            searchMatch &&
            categoryMatch &&
            transmissionMatch &&
            priceMatch
        ) {

            card.style.display = "block";

            visibleCars++;

        } else {

            card.style.display = "none";

        }

    });


    if (visibleCars === 0) {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

    }

}


searchInput.addEventListener("input", filterCars);

categoryFilter.addEventListener(
    "change",
    filterCars
);

transmissionFilter.addEventListener(
    "change",
    filterCars
);

priceFilter.addEventListener(
    "change",
    filterCars
);


/* ================= HERO SEARCH ================= */

const heroCategory =
    document.getElementById("heroCategory");

const heroSearch =
    document.getElementById("heroSearch");


heroSearch.addEventListener("click", () => {

    categoryFilter.value =
        heroCategory.value;

    if (heroPickup.value) {

        pickupDate.value =
            heroPickup.value;

    }

    filterCars();

    document.getElementById("cars").scrollIntoView({
        behavior: "smooth"
    });

});


/* ================= FAVORITES ================= */

const favoriteButtons =
    document.querySelectorAll(".favorite-btn");


favoriteButtons.forEach(button => {

    button.addEventListener("click", () => {

        button.classList.toggle("active");

        if (button.classList.contains("active")) {

            button.textContent = "♥";

        } else {

            button.textContent = "♡";

        }

    });

});


/* ================= CAR DETAILS MODAL ================= */

const carModal =
    document.getElementById("carModal");

const closeModal =
    document.getElementById("closeModal");

const modalTitle =
    document.getElementById("modalTitle");

const modalImage =
    document.getElementById("modalImage");

const modalPrice =
    document.getElementById("modalPrice");

const modalDescription =
    document.getElementById("modalDescription");

const modalBook =
    document.getElementById("modalBook");


const carData = {

    "BMW 5 Series": {

        price: 85,

        image:
            "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1000&q=85",

        description:
            "A premium luxury sedan offering a smooth ride, elegant interior and powerful performance."

    },


    "Range Rover": {

        price: 120,

        image:
            "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1000&q=85",

        description:
            "A spacious luxury SUV designed for comfortable city drives and exciting adventures."

    },


    "Porsche 911": {

        price: 250,

        image:
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=85",

        description:
            "A legendary sports car delivering thrilling performance, premium comfort and unforgettable driving."

    },


    "Audi A4": {

        price: 70,

        image:
            "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1000&q=85",

        description:
            "An elegant executive sedan with excellent comfort, technology and everyday practicality."

    },


    "Jeep Wrangler": {

        price: 95,

        image:
            "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1000&q=85",

        description:
            "An adventure-ready SUV built for road trips, outdoor adventures and comfortable journeys."

    },


    "Lamborghini Huracan": {

        price: 300,

        image:
            "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1000&q=85",

        description:
            "A spectacular supercar created for an unforgettable premium driving experience."

    }

};


document.querySelectorAll(".details-btn")
.forEach(button => {

    button.addEventListener("click", () => {

        const carName =
            button.dataset.car;

        const car =
            carData[carName];


        if (!car) return;


        modalTitle.textContent =
            carName;

        modalPrice.textContent =
            "$" + car.price;

        modalImage.src =
            car.image;

        modalDescription.textContent =
            car.description;


        carModal.classList.add("show");

    });

});


closeModal.addEventListener("click", () => {

    carModal.classList.remove("show");

});


carModal.addEventListener("click", event => {

    if (event.target === carModal) {

        carModal.classList.remove("show");

    }

});


/* ================= CALCULATOR ================= */

const carSelect =
    document.getElementById("carSelect");

const insurance =
    document.getElementById("insurance");

const calculateBtn =
    document.getElementById("calculateBtn");

const bookNowBtn =
    document.getElementById("bookNowBtn");


function calculateRent() {

    const dailyRate =
        Number(carSelect.value);


    const selectedOption =
        carSelect.options[
            carSelect.selectedIndex
        ];


    const carName =
        selectedOption.dataset.name;


    let start =
        new Date(pickupDate.value);

    let end =
        new Date(returnDate.value);


    let days = 1;


    if (
        pickupDate.value &&
        returnDate.value
    ) {

        const difference =
            end - start;

        days =
            Math.ceil(
                difference /
                (1000 * 60 * 60 * 24)
            );


        if (days < 1) {

            days = 1;

        }

    }


    const insurancePerDay =
        Number(insurance.value);


    const insuranceCost =
        insurancePerDay * days;


    const rentalCost =
        dailyRate * days;


    const total =
        rentalCost + insuranceCost;


    document.getElementById(
        "selectedCar"
    ).textContent = carName;


    document.getElementById(
        "dailyRate"
    ).textContent = dailyRate;


    document.getElementById(
        "totalDays"
    ).textContent = days;


    document.getElementById(
        "insuranceCost"
    ).textContent = insuranceCost;


    document.getElementById(
        "totalPrice"
    ).textContent = total;


    document.getElementById(
        "finalTotal"
    ).textContent = total;

}


calculateBtn.addEventListener(
    "click",
    calculateRent
);

carSelect.addEventListener(
    "change",
    calculateRent
);

insurance.addEventListener(
    "change",
    calculateRent
);

pickupDate.addEventListener(
    "change",
    () => {

        returnDate.min =
            pickupDate.value;

        calculateRent();

    }
);

returnDate.addEventListener(
    "change",
    calculateRent
);


/* ================= BOOKING ================= */

const bookingModal =
    document.getElementById("bookingModal");

const closeBooking =
    document.getElementById("closeBooking");

const bookingCar =
    document.getElementById("bookingCar");

const bookingDays =
    document.getElementById("bookingDays");

const bookingTotal =
    document.getElementById("bookingTotal");

const confirmBooking =
    document.getElementById("confirmBooking");


function openBooking() {

    calculateRent();


    bookingCar.textContent =
        document.getElementById(
            "selectedCar"
        ).textContent;


    bookingDays.textContent =
        document.getElementById(
            "totalDays"
        ).textContent;


    bookingTotal.textContent =
        document.getElementById(
            "finalTotal"
        ).textContent;


    bookingModal.classList.add("show");

}


bookNowBtn.addEventListener(
    "click",
    openBooking
);


modalBook.addEventListener(
    "click",
    () => {

        carModal.classList.remove("show");

        openBooking();

    }
);


closeBooking.addEventListener(
    "click",
    () => {

        bookingModal.classList.remove("show");

    }
);


bookingModal.addEventListener(
    "click",
    event => {

        if (event.target === bookingModal) {

            bookingModal.classList.remove("show");

        }

    }
);


confirmBooking.addEventListener(
    "click",
    () => {

        alert(
            "🎉 Booking request submitted successfully!"
        );

        bookingModal.classList.remove("show");

    }
);


/* ================= CONTACT FORM ================= */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


contactForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        formMessage.textContent =
            "✓ Thank you! Your message has been sent successfully.";

        contactForm.reset();

    }
);


/* ================= ESC KEY ================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            carModal.classList.remove("show");

            bookingModal.classList.remove("show");

        }

    }
);


/* ================= INITIAL CALCULATION ================= */

calculateRent();