/* ============================================================
   JAVASCRIPT PIZZA ORDER PAGE (Exercise 11 - JavaScript part 2)
   Shawn Alfred Padilla
   Description: Validates inputs, computes pizza cost, and displays summary.
   ============================================================ */

window.onload = function() {
    const form = document.querySelector("form");
    const nameInput = document.getElementById("name");
    const numberInput = document.getElementById("number");
    const emailInput = document.getElementById("email-add");
    const flavorSelect = document.querySelector("select[name='flavor']");
    const sizeRadios = document.querySelectorAll("input[name='size']");
    const toppingsCheckboxes = document.querySelectorAll("input[name='toppings']");
    const deliveryDateInput = document.querySelector("input[name='delivery-date']");
    const deliveryTimeInput = document.querySelector("input[name='delivery-time']");
    const addressTextarea = document.querySelector("textarea");

    form.addEventListener("submit", function(e) {
        e.preventDefault(); 
        if (!validateInputs()) return;
        const total = computeTotal();
        displaySummary(total);
    });

    function validateInputs() {
        const number = numberInput.value.trim();
        const validNumber = /^\d{11}$/;
        if (!validNumber.test(number)) {
            alert("Please enter a valid 11-digit mobile number.");
            return false;
        }

        const today = new Date();
        const deliveryDate = new Date(deliveryDateInput.value);
        if (isNaN(deliveryDate.getTime())) {
            alert("Please enter a valid delivery date.");
            return false;
        }
        if (deliveryDate <= today) {
            alert("Delivery date must be in the future.");
            return false;
        }

        const timeValue = deliveryTimeInput.value;
        if (!timeValue) {
            alert("Please enter a delivery time.");
            return false;
        }
        const hour = parseInt(timeValue.split(":")[0]);
        if (hour < 8 || hour > 22) {
            alert("Delivery time must be between 8:00 AM and 10:00 PM.");
            return false;
        }

        const selectedSize = document.querySelector("input[name='size']:checked");
        if (!selectedSize) {
            alert("Please select a pizza size.");
            return false;
        }

        // E. Validate required text fields (name, address)
        if (nameInput.value.trim() === "" || addressTextarea.value.trim() === "") {
            alert("Please fill out all required fields (name and address).");
            return false;
        }

        return true;
    }


    function computeTotal() {
        let total = 0;

        // A. Get flavor price directly from <select> value
        const flavorPrice = parseInt(flavorSelect.value);
        const flavorName = flavorSelect.options[flavorSelect.selectedIndex].text;

        // B. Get selected size price from checked radio button
        const selectedSize = document.querySelector("input[name='size']:checked");
        const sizePrice = parseInt(selectedSize.value);
        const sizeName = selectedSize.nextSibling.textContent.trim(); // get label text

        // C. Sum up all checked toppings
        let toppingsPrice = 0;
        let toppingsList = [];
        toppingsCheckboxes.forEach(topping => {
            if (topping.checked) {
                toppingsPrice += parseInt(topping.value);
                toppingsList.push(topping.nextSibling.textContent.trim());
            }
        });

        // D. Compute total
        total = flavorPrice + sizePrice + toppingsPrice;

        // E. Store data for summary
        form.dataset.flavor = flavorName;
        form.dataset.size = sizeName;
        form.dataset.toppings = toppingsList.join(", ") || "No extra toppings";

        return total;
    }


    function displaySummary(total) {
        const name = nameInput.value;
        const email = emailInput.value;
        const number = numberInput.value;
        const flavor = form.dataset.flavor;
        const size = form.dataset.size;
        const toppings = form.dataset.toppings;
        const address = addressTextarea.value;
        const date = deliveryDateInput.value;
        const time = deliveryTimeInput.value;

        let summary =
            "ORDER SUMMARY\n\n" +
            "👤 Customer Name: " + name + "\n" +
            "📱 Mobile Number: " + number + "\n" +
            "📧 Email: " + email + "\n\n" +
            "🍕 Pizza flavor: " + flavor + "\n" +
            "📏 Size: " + size + "\n" +
            "🧀 Toppings: " + toppings + "\n\n" +
            "🚚 Delivery Date: " + date + "\n" +
            "🕒 Delivery Time: " + time + "\n" +
            "🏠 Address: " + address + "\n\n" +
            "💵 TOTAL COST: ₱" + total;

        alert(summary);
    }
};
