// ===============================
// DARK MODE
// ===============================

const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            themeBtn.textContent = "☀️";
        } else {
            themeBtn.textContent = "🌙";
        }
    });
}


// ===============================
// AGE CALCULATOR
// ===============================

function calculateAge() {
    const birthDate = document.getElementById("birthDate");
    const result = document.getElementById("result");

    if (!birthDate || !result) return;

    if (!birthDate.value) {
        result.innerHTML = "<p>Please select your date of birth.</p>";
        return;
    }

    const birth = new Date(birthDate.value);
    const today = new Date();

    if (birth > today) {
        result.innerHTML = "<p>Please select a valid date.</p>";
        return;
    }

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
        months--;

        const previousMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            0
        );

        days += previousMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    result.innerHTML = `
        <h3>Your Age</h3>
        <p style="font-size: 22px; margin-top: 10px;">
            ${years} Years ${months} Months ${days} Days
        </p>
    `;
}


// ===============================
// CALCULATOR
// ===============================

function appendValue(value) {
    const display = document.getElementById("display");

    if (display) {
        display.value += value;
    }
}


function clearDisplay() {
    const display = document.getElementById("display");

    if (display) {
        display.value = "";
    }
}


function deleteLast() {
    const display = document.getElementById("display");

    if (display) {
        display.value = display.value.slice(0, -1);
    }
}


function calculateResult() {
    const display = document.getElementById("display");

    if (!display || !display.value) {
        return;
    }

    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = "Error";
    }
}


// ===============================
// KEYBOARD SUPPORT
// ===============================

document.addEventListener("keydown", function (event) {

    const display = document.getElementById("display");

    if (!display) return;

    const key = event.key;

    if (
        (key >= "0" && key <= "9") ||
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "."
    ) {
        display.value += key;
    }

    else if (key === "Enter") {
        calculateResult();
    }

    else if (key === "Backspace") {
        deleteLast();
    }

    else if (key === "Escape") {
        clearDisplay();
    }
});
// ===============================
// UNIT CONVERTER
// ===============================

const unitData = {
    length: ["Meter", "Kilometer", "Centimeter", "Millimeter"],
    weight: ["Kilogram", "Gram", "Milligram"],
    temperature: ["Celsius", "Fahrenheit"]
};


function updateUnits() {

    const category = document.getElementById("category");
    const fromUnit = document.getElementById("fromUnit");
    const toUnit = document.getElementById("toUnit");

    if (!category || !fromUnit || !toUnit) {
        return;
    }

    const units = unitData[category.value];

    fromUnit.innerHTML = "";
    toUnit.innerHTML = "";

    units.forEach(unit => {

        const option1 = document.createElement("option");
        option1.value = unit;
        option1.textContent = unit;

        const option2 = document.createElement("option");
        option2.value = unit;
        option2.textContent = unit;

        fromUnit.appendChild(option1);
        toUnit.appendChild(option2);
    });

    convertUnit();
}


function convertUnit() {

    const category = document.getElementById("category");
    const input = document.getElementById("inputValue");
    const from = document.getElementById("fromUnit");
    const to = document.getElementById("toUnit");
    const result = document.getElementById("conversionResult");

    if (!category || !input || !from || !to || !result) {
        return;
    }

    const value = Number(input.value);

    if (input.value === "") {
        result.textContent = "0";
        return;
    }

    let converted;

    // LENGTH
    if (category.value === "length") {

        const meterValues = {
            Meter: 1,
            Kilometer: 1000,
            Centimeter: 0.01,
            Millimeter: 0.001
        };

        converted =
            value * meterValues[from.value] /
            meterValues[to.value];
    }


    // WEIGHT
    if (category.value === "weight") {

        const gramValues = {
            Kilogram: 1000,
            Gram: 1,
            Milligram: 0.001
        };

        converted =
            value * gramValues[from.value] /
            gramValues[to.value];
    }


    // TEMPERATURE
    if (category.value === "temperature") {

        if (from.value === to.value) {
            converted = value;
        }

        else if (
            from.value === "Celsius" &&
            to.value === "Fahrenheit"
        ) {
            converted = (value * 9 / 5) + 32;
        }

        else if (
            from.value === "Fahrenheit" &&
            to.value === "Celsius"
        ) {
            converted = (value - 32) * 5 / 9;
        }
    }


    result.textContent = Number(converted.toFixed(6));
}


// Initialize converter

updateUnits();
function searchTools() {

    const searchInput = document.getElementById("toolSearch");

    if (!searchInput) {
        return;
    }

    const searchText = searchInput.value.toLowerCase();

    const cards = document.querySelectorAll(".tool-card");

    cards.forEach(card => {

        const toolName = card
            .querySelector(".tool-name")
            .textContent
            .toLowerCase();

        if (toolName.includes(searchText)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
}
// ===============================
// CONTACT FORM
// ===============================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();
        const formMessage = document.getElementById("formMessage");

        if (!name || !email || !message) {
            formMessage.textContent = "Please fill in all fields.";
            return;
        }

        formMessage.textContent =
            "Message received! Thank you for contacting us.";

        contactForm.reset();
    });
}