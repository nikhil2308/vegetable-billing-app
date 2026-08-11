let billItems = [];


// ==============================
// GET HTML ELEMENTS
// ==============================

const priceLabel =
    document.getElementById("priceLabel");

const vegetableNameInput =
    document.getElementById("vegetableName");

const quantityInput =
    document.getElementById("quantity");

const unitInput =
    document.getElementById("unit");

const priceInput =
    document.getElementById("price");

const deliveryChargeInput =
    document.getElementById("deliveryCharge");

const addItemBtn =
    document.getElementById("addItemBtn");

const clearBtn =
    document.getElementById("clearBtn");

const whatsappBtn =
    document.getElementById("whatsappBtn");

const billItemsContainer =
    document.getElementById("billItems");

const subtotalAmount =
    document.getElementById("subtotalAmount");

const totalAmount =
    document.getElementById("totalAmount");

const itemCount =
    document.getElementById("itemCount");


// ==============================
// UNIT CHANGE
// ==============================

unitInput.addEventListener(
    "change",
    function () {

        if (
            unitInput.value === "kg" ||
            unitInput.value === "gram"
        ) {

            priceLabel.textContent =
                "Price per KG";

            priceInput.placeholder =
                "e.g. 60";

        } else {

            priceLabel.textContent =
                "Price per " +
                getUnitName(unitInput.value);

            priceInput.placeholder =
                "e.g. 20";
        }

    }
);


// ==============================
// GET UNIT NAME
// ==============================

function getUnitName(unit) {

    const unitNames = {

        kg: "KG",

        gram: "KG",

        bunch: "Bunch",

        piece: "Piece",

        bottle: "Bottle",

        packet: "Packet",

        box: "Box"

    };

    return unitNames[unit] || unit;
}


// ==============================
// ADD ITEM
// ==============================

addItemBtn.addEventListener(
    "click",
    addItem
);


function addItem() {

    const name =
        vegetableNameInput.value.trim();

    const quantity =
        parseFloat(
            quantityInput.value
        );

    const unit =
        unitInput.value;

    const price =
        parseFloat(
            priceInput.value
        );


    // Validation

    if (name === "") {

        alert(
            "Please enter vegetable/item name."
        );

        vegetableNameInput.focus();

        return;
    }


    if (
        isNaN(quantity) ||
        quantity <= 0
    ) {

        alert(
            "Please enter a valid quantity."
        );

        quantityInput.focus();

        return;
    }


    if (
        isNaN(price) ||
        price < 0
    ) {

        alert(
            "Please enter a valid price."
        );

        priceInput.focus();

        return;
    }


    // ==============================
    // CALCULATE AMOUNT
    // ==============================

    let amount;


    if (unit === "gram") {

        amount =
            (quantity / 1000) *
            price;

    } else {

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


    billItems.push(item);


    // Update bill

    displayBill();


    // Clear fields

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


    if (billItems.length === 0) {

        billItemsContainer.innerHTML = `
            <div class="empty-bill">
                No items added yet
            </div>
        `;
    }


    let subtotal = 0;


    billItems.forEach(
        (item, index) => {

            subtotal +=
                item.amount;


            const billItem =
                document.createElement("div");


            billItem.className =
                "bill-item";


            // Details

            const details =
                document.createElement("div");


            details.className =
                "item-details";


            // Name

            const name =
                document.createElement("span");


            name.className =
                "item-name";


            name.textContent =
                item.name;


            // Quantity

            const quantity =
                document.createElement("span");


            quantity.className =
                "item-quantity";


            const unitText =
                getDisplayUnit(
                    item.unit
                );


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


            // Amount

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


            billItem.appendChild(details);

            billItem.appendChild(
                amountSection
            );


            billItemsContainer.appendChild(
                billItem
            );

        }
    );


    // ==============================
    // DELIVERY CHARGE
    // ==============================

    let delivery =
        parseFloat(
            deliveryChargeInput.value
        );


    if (
        isNaN(delivery) ||
        delivery < 0
    ) {

        delivery = 0;
    }


    // ==============================
    // FINAL TOTAL
    // ==============================

    const total =
        subtotal + delivery;


    subtotalAmount.textContent =
        subtotal.toFixed(2);


    totalAmount.textContent =
        total.toFixed(2);


    itemCount.textContent =
        `${billItems.length} ${
            billItems.length === 1
                ? "item"
                : "items"
        }`;
}


// ==============================
// GET DISPLAY UNIT
// ==============================

function getDisplayUnit(unit) {

    switch (unit) {

        case "kg":
            return "KG";

        case "gram":
            return "g";

        case "bunch":
            return "Bunch";

        case "piece":
            return "Pc";

        case "bottle":
            return "Bottle";

        case "packet":
            return "Pkt";

        case "box":
            return "Box";

        default:
            return unit;
    }
}


// ==============================
// DELETE ITEM
// ==============================

function deleteItem(index) {

    billItems.splice(
        index,
        1
    );

    displayBill();
}


// ==============================
// DELIVERY CHARGE CHANGE
// ==============================

deliveryChargeInput.addEventListener(
    "input",
    displayBill
);


// ==============================
// CLEAR BILL
// ==============================

clearBtn.addEventListener(
    "click",
    function () {

        if (
            billItems.length === 0 &&
            deliveryChargeInput.value === ""
        ) {

            return;
        }


        const confirmClear =
            confirm(
                "Clear the entire bill?"
            );


        if (confirmClear) {

            billItems = [];

            deliveryChargeInput.value = "";

            displayBill();
        }

    }
);


// ==============================
// WHATSAPP
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
    // DATE
    // ==============================

    const today = new Date();

    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();

    const currentDate = `${day}-${month}-${year}`;


    // ==============================
    // SUBTOTAL
    // ==============================

    const subtotal = billItems.reduce(
        (sum, item) => sum + item.amount,
        0
    );


    // ==============================
    // DELIVERY CHARGE
    // ==============================

    let delivery = parseFloat(
        deliveryChargeInput.value
    );

    if (isNaN(delivery) || delivery < 0) {
        delivery = 0;
    }


    // ==============================
    // FINAL TOTAL
    // ==============================

    const total = subtotal + delivery;


    // ==============================
    // START MESSAGE
    // ==============================

    let message = "```\n";

    message += "MAHESH FRUITS AND VEGETABLES\n";
    message += "VEGETABLE BILL\n";
    message += `Date: ${currentDate}\n`;

    message += "--------------------------------\n";


    // ==============================
    // TABLE HEADER
    // ==============================

    message += "Item       Qty       Amount\n";
    message += "--------------------------------\n";


    // ==============================
    // ITEMS
    // ==============================

    billItems.forEach(item => {

        const unitText = getWhatsAppUnit(item.unit);

        // Keep item name short for phone screens
        const itemName = item.name
            .substring(0, 9)
            .padEnd(10);

        const quantityText = `${item.quantity} ${unitText}`
            .padEnd(9);

        const amountText = `₹${item.amount.toFixed(2)}`;

        message +=
            `${itemName}${quantityText}${amountText}\n`;
    });


    // ==============================
    // SUMMARY
    // ==============================

    message += "--------------------------------\n";

    message +=
        `Subtotal                 ₹${subtotal.toFixed(2)}\n`;


    if (delivery > 0) {

        message +=
            `Delivery                 ₹${delivery.toFixed(2)}\n`;
    }


    message += "--------------------------------\n";

    message +=
        `TOTAL                    ₹${total.toFixed(2)}\n`;

    message += "--------------------------------\n\n";

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


// ==============================
// WHATSAPP UNIT
// ==============================

function getWhatsAppUnit(unit) {

    switch (unit) {

        case "kg":
            return "KG";

        case "gram":
            return "g";

        case "bunch":
            return "Bun";

        case "piece":
            return "Pc";

        case "bottle":
            return "Bot";

        case "packet":
            return "Pkt";

        case "box":
            return "Box";

        default:
            return unit;
    }
}