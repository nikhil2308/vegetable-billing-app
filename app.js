let billItems = [];


// ==============================
// GET HTML ELEMENTS
// ==============================

const priceLabel = document.getElementById("priceLabel");

const vegetableNameInput = document.getElementById("vegetableName");
const quantityInput = document.getElementById("quantity");
const unitInput = document.getElementById("unit");
const priceInput = document.getElementById("price");

const addItemBtn = document.getElementById("addItemBtn");
const clearBtn = document.getElementById("clearBtn");
const whatsappBtn = document.getElementById("whatsappBtn");

const billItemsContainer = document.getElementById("billItems");
const totalAmount = document.getElementById("totalAmount");


// ==============================
// UNIT CHANGE
// ==============================

unitInput.addEventListener("change", function () {

    if (unitInput.value === "kg" || unitInput.value === "gram") {

        priceLabel.textContent = "Price per KG";
        priceInput.placeholder = "e.g. 60";

    } else {

        priceLabel.textContent =
            "Price per " + getUnitName(unitInput.value);

        priceInput.placeholder = "e.g. 20";
    }

});


// ==============================
// GET UNIT NAME
// ==============================

function getUnitName(unit) {

    const unitNames = {

        kg: "KG",
        gram: "Gram",
        bunch: "Bunch",
        piece: "Piece",
        bottle: "Bottle",
        packet: "Packet",
        box: "Box"

    };

    return unitNames[unit] || unit;
}


// ==============================
// ADD ITEM BUTTON
// ==============================

addItemBtn.addEventListener("click", addItem);


// ==============================
// ADD ITEM
// ==============================

function addItem() {

    const name = vegetableNameInput.value.trim();

    const quantity =
        parseFloat(quantityInput.value);

    const unit =
        unitInput.value;

    const price =
        parseFloat(priceInput.value);


    // ==============================
    // VALIDATION
    // ==============================

    if (name === "") {

        alert("Please enter vegetable name.");

        vegetableNameInput.focus();

        return;
    }


    if (isNaN(quantity) || quantity <= 0) {

        alert("Please enter a valid quantity.");

        quantityInput.focus();

        return;
    }


    if (isNaN(price) || price < 0) {

        alert("Please enter a valid price.");

        priceInput.focus();

        return;
    }


    // ==============================
    // CALCULATE AMOUNT
    // ==============================

    let amount;


    // KG and Grams
    // Price is calculated per KG

    if (unit === "gram") {

        amount =
            (quantity / 1000) * price;

    } else if (unit === "kg") {

        amount =
            quantity * price;

    } else {

        // Bunch / Piece / Bottle /
        // Packet / Box

        amount =
            quantity * price;
    }


    // ==============================
    // CREATE ITEM
    // ==============================

    const item = {

        name: name,

        quantity: quantity,

        unit: unit,

        price: price,

        amount: amount

    };


    // Add to bill

    billItems.push(item);


    // Update bill

    displayBill();


    // ==============================
    // CLEAR INPUTS
    // ==============================

    vegetableNameInput.value = "";

    quantityInput.value = "";

    priceInput.value = "";


    vegetableNameInput.focus();
}


// ==============================
// DISPLAY BILL
// ==============================

function displayBill() {

    billItemsContainer.innerHTML = "";


    let total = 0;


    billItems.forEach((item, index) => {

        total += item.amount;


        // Main item container

        const billItem =
            document.createElement("div");

        billItem.className =
            "bill-item";


        // ==============================
        // ITEM DETAILS
        // ==============================

        const details =
            document.createElement("div");

        details.className =
            "item-details";


        // Vegetable name

        const name =
            document.createElement("span");

        name.className =
            "item-name";

        name.textContent =
            item.name;


        // Quantity + price

        const quantity =
            document.createElement("span");

        quantity.className =
            "item-quantity";


        let unitText;


        if (item.unit === "kg") {

            unitText = "kg";

        } else if (item.unit === "gram") {

            unitText = "g";

        } else if (item.unit === "bunch") {

            unitText = "bunch";

        } else if (item.unit === "piece") {

            unitText = "piece";

        } else if (item.unit === "bottle") {

            unitText = "bottle";

        } else if (item.unit === "packet") {

            unitText = "packet";

        } else if (item.unit === "box") {

            unitText = "box";

        }


        // Display price correctly

        let priceText;


        if (
            item.unit === "kg" ||
            item.unit === "gram"
        ) {

            priceText =
                `₹${item.price}/kg`;

        } else {

            priceText =
                `₹${item.price}/${unitText}`;

        }


        quantity.textContent =
            `${item.quantity} ${unitText} × ${priceText}`;


        details.appendChild(name);

        details.appendChild(quantity);


        // ==============================
        // AMOUNT SECTION
        // ==============================

        const amountSection =
            document.createElement("div");


        amountSection.innerHTML = `

            <span class="item-amount">
                ₹${item.amount.toFixed(2)}
            </span>

            <button
                class="delete-btn"
                onclick="deleteItem(${index})">

                Delete

            </button>

        `;


        // Add everything

        billItem.appendChild(details);

        billItem.appendChild(amountSection);


        billItemsContainer.appendChild(billItem);

    });


    // ==============================
    // UPDATE TOTAL
    // ==============================

    totalAmount.textContent =
        total.toFixed(2);
}


// ==============================
// DELETE ITEM
// ==============================

function deleteItem(index) {

    billItems.splice(index, 1);

    displayBill();
}


// ==============================
// CLEAR BILL
// ==============================

clearBtn.addEventListener("click", function () {

    if (billItems.length === 0) {

        return;
    }


    const confirmClear =
        confirm("Clear the entire bill?");


    if (confirmClear) {

        billItems = [];

        displayBill();
    }

});


// ==============================
// WHATSAPP BUTTON
// ==============================

whatsappBtn.addEventListener(
    "click",
    shareOnWhatsApp
);


// ==============================
// SHARE ON WHATSAPP
// ==============================

function shareOnWhatsApp() {

    if (billItems.length === 0) {
        alert("Please add at least one item.");
        return;
    }

    // ==============================
    // GET CURRENT DATE
    // ==============================

    const today = new Date();

    const day = String(today.getDate()).padStart(2, "0");

    const month = String(today.getMonth() + 1).padStart(2, "0");

    const year = today.getFullYear();

    const currentDate = `${day}-${month}-${year}`;


    // ==============================
    // START WHATSAPP MESSAGE
    // ==============================

    let message = "```\n";


    // ==============================
    // SHOP HEADER
    // ==============================

    message += "MAHESH FRUITS AND VEGETABLES\n";

    message += "========================================\n";

    message += "             BILL\n";

    message += "========================================\n";

    message += `Date: ${currentDate}\n\n`;


    // ==============================
    // TABLE HEADER
    // ==============================

    message +=
        "| ITEM         | QTY      | RATE     | AMOUNT   |\n";

    message +=
        "|--------------|----------|----------|----------|\n";


    // ==============================
    // TABLE ROWS
    // ==============================

    billItems.forEach(item => {

        let unitText;

        switch (item.unit) {

            case "kg":
                unitText = "KG";
                break;

            case "gram":
                unitText = "G";
                break;

            case "bunch":
                unitText = "Bunch";
                break;

            case "piece":
                unitText = "Pc";
                break;

            case "bottle":
                unitText = "Bottle";
                break;

            case "packet":
                unitText = "Pkt";
                break;

            case "box":
                unitText = "Box";
                break;

            default:
                unitText = item.unit;
        }


        // Item name
        const itemName =
            item.name.substring(0, 12);


        // Quantity
        const quantityText =
            `${item.quantity} ${unitText}`;


        // Rate
        const rateText =
            `₹${item.price.toFixed(2)}`;


        // Amount
        const amountText =
            `₹${item.amount.toFixed(2)}`;


        // Table row
        message +=
            `| ${itemName.padEnd(12)} ` +
            `| ${quantityText.padEnd(8)} ` +
            `| ${rateText.padEnd(8)} ` +
            `| ${amountText.padEnd(8)} |\n`;

    });


    // ==============================
    // TOTAL
    // ==============================

    const total =
        billItems.reduce(
            (sum, item) => sum + item.amount,
            0
        );


    message +=
        "|--------------|----------|----------|----------|\n";


    message +=
        `| TOTAL        |          |          | ₹${total.toFixed(2).padEnd(8)} |\n`;


    message +=
        "========================================\n\n";


    message += "Thank you!";


    // ==============================
    // END CODE BLOCK
    // ==============================

    message += "\n```";


    // ==============================
    // OPEN WHATSAPP
    // ==============================

    const whatsappURL =
        `https://wa.me/?text=${encodeURIComponent(message)}`;


    window.open(
        whatsappURL,
        "_blank"
    );
}