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

function toProperCase(text) {

    return text
        .toLowerCase()
        .replace(/\b\w/g, char => char.toUpperCase());

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
    toProperCase(
        vegetableNameInput.value.trim()
    );

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


    // Clear inputs

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


            details.appendChild(
                name
            );

            details.appendChild(
                quantity
            );


            // Amount + Delete

            const amountSection =
                document.createElement("div");


            amountSection.innerHTML = `

                <span class="item-amount">
                    ₹${item.amount.toFixed(2)}
                </span>

                <button
                    class="delete-btn"
                    onclick="deleteItem(${index})"
                    type="button">

                    Delete

                </button>

            `;


            billItem.appendChild(
                details
            );

            billItem.appendChild(
                amountSection
            );


            billItemsContainer.appendChild(
                billItem
            );

        }
    );


    // ==============================
    // DELIVERY
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
    // TOTAL
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
// DISPLAY UNIT
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
// DELIVERY CHANGE
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
// SHARE BILL IMAGE
// ==============================

whatsappBtn.addEventListener(
    "click",
    shareBillImage
);


// ==============================
// GENERATE BILL IMAGE
// ==============================

async function shareBillImage() {

    if (billItems.length === 0) {

        alert("Please add at least one item.");

        return;
    }

    const originalButtonText =
        whatsappBtn.textContent;

    whatsappBtn.disabled = true;

    whatsappBtn.textContent =
        "Generating Bill...";


    try {

        // ==============================
        // DATE
        // ==============================

        const today = new Date();

        const day =
            String(today.getDate()).padStart(2, "0");

        const month =
            String(today.getMonth() + 1).padStart(2, "0");

        const year =
            today.getFullYear();

        const currentDate =
            `${day}-${month}-${year}`;


        // ==============================
        // SUBTOTAL
        // ==============================

        const subtotal =
            billItems.reduce(
                (sum, item) =>
                    sum + item.amount,
                0
            );


        // ==============================
        // DELIVERY
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
        // TOTAL
        // ==============================

        const total =
            subtotal + delivery;


        // ==============================
        // CANVAS
        // ==============================

        const canvas =
            document.createElement("canvas");

        const ctx =
            canvas.getContext("2d");


        const width = 900;

        const headerHeight = 210;

        const tableHeaderHeight = 70;

        const itemRowHeight = 70;

        const summaryHeight =
            delivery > 0 ? 270 : 210;

        const footerHeight = 100;


        const height =
            headerHeight +
            tableHeaderHeight +
            (
                billItems.length *
                itemRowHeight
            ) +
            summaryHeight +
            footerHeight;


        canvas.width = width;

        canvas.height = height;


        // ==============================
        // BACKGROUND
        // ==============================

        ctx.fillStyle = "#ffffff";

        ctx.fillRect(
            0,
            0,
            width,
            height
        );


        // ==============================
        // HEADER
        // ==============================

        ctx.fillStyle = "#198754";

        ctx.fillRect(
            0,
            0,
            width,
            headerHeight
        );


        ctx.fillStyle = "#ffffff";

        ctx.textAlign = "center";


        ctx.font =
            "bold 38px Arial";

        ctx.fillText(
            "MAHESH FRUITS AND VEGETABLES",
            width / 2,
            65
        );


        ctx.font =
            "bold 30px Arial";

        ctx.fillText(
            "BILL",
            width / 2,
            115
        );


        ctx.font =
            "22px Arial";

        ctx.fillText(
            `Date: ${currentDate}`,
            width / 2,
            165
        );


        // ==============================
        // TABLE HEADER
        // ==============================

        let y = headerHeight;


        ctx.fillStyle = "#f1f5f3";

        ctx.fillRect(
            0,
            y,
            width,
            tableHeaderHeight
        );


        ctx.fillStyle = "#222222";

        ctx.font =
            "bold 23px Arial";


        ctx.textAlign = "left";

        ctx.fillText(
            "ITEM",
            55,
            y + 45
        );


        ctx.textAlign = "center";

        ctx.fillText(
            "QTY",
            500,
            y + 45
        );


        ctx.textAlign = "right";

        ctx.fillText(
            "AMOUNT",
            845,
            y + 45
        );


        y += tableHeaderHeight;


        // ==============================
        // ITEMS
        // ==============================

        billItems.forEach(
            (item, index) => {

                if (index % 2 === 0) {

                    ctx.fillStyle =
                        "#fafafa";

                    ctx.fillRect(
                        0,
                        y,
                        width,
                        itemRowHeight
                    );
                }


                ctx.fillStyle =
                    "#222222";

                ctx.font =
                    "23px Arial";

                ctx.textAlign =
                    "left";


                let itemName =
                    item.name;


                if (
                    itemName.length > 24
                ) {

                    itemName =
                        itemName.substring(
                            0,
                            24
                        ) + "...";
                }


                ctx.fillText(
                    itemName,
                    55,
                    y + 44
                );


                // Quantity

                ctx.textAlign =
                    "center";


                const unitText =
                    getImageUnit(
                        item.unit
                    );


                ctx.fillText(
                    `${item.quantity} ${unitText}`,
                    500,
                    y + 44
                );


                // Amount

                ctx.textAlign =
                    "right";

                ctx.font =
                    "bold 23px Arial";


                ctx.fillText(
                    `₹${item.amount.toFixed(2)}`,
                    845,
                    y + 44
                );


                // Row line

                ctx.strokeStyle =
                    "#e5e5e5";

                ctx.lineWidth = 1;

                ctx.beginPath();

                ctx.moveTo(
                    40,
                    y + itemRowHeight
                );

                ctx.lineTo(
                    width - 40,
                    y + itemRowHeight
                );

                ctx.stroke();


                y += itemRowHeight;

            }
        );


        // ==============================
        // SUMMARY
        // ==============================

        y += 25;


        ctx.fillStyle =
            "#444444";

        ctx.font =
            "24px Arial";

        ctx.textAlign =
            "left";


        ctx.fillText(
            "Subtotal",
            55,
            y + 35
        );


        ctx.textAlign =
            "right";


        ctx.fillText(
            `₹${subtotal.toFixed(2)}`,
            845,
            y + 35
        );


        y += 55;


        if (delivery > 0) {

            ctx.textAlign =
                "left";

            ctx.fillText(
                "Delivery Charge",
                55,
                y + 35
            );


            ctx.textAlign =
                "right";

            ctx.fillText(
                `₹${delivery.toFixed(2)}`,
                845,
                y + 35
            );


            y += 55;
        }


        // ==============================
        // TOTAL
        // ==============================

        ctx.fillStyle =
            "#198754";


        ctx.fillRect(
            40,
            y + 15,
            width - 80,
            75
        );


        ctx.fillStyle =
            "#ffffff";


        ctx.font =
            "bold 30px Arial";

        ctx.textAlign =
            "left";


        ctx.fillText(
            "TOTAL",
            70,
            y + 63
        );


        ctx.textAlign =
            "right";


        ctx.fillText(
            `₹${total.toFixed(2)}`,
            830,
            y + 63
        );


        // ==============================
        // FOOTER
        // ==============================

        y += 125;


        ctx.fillStyle =
            "#666666";

        ctx.textAlign =
            "center";

        ctx.font =
            "22px Arial";


        ctx.fillText(
            "Thank you!",
            width / 2,
            y
        );


        // ==============================
        // CREATE IMAGE
        // ==============================

        const blob =
            await canvasToBlob(canvas);


        if (!blob) {

            throw new Error(
                "Could not create image."
            );
        }


        // ==============================
        // CREATE IMAGE FILE
        // ==============================

        const file =
            new File(
                [blob],
                "Mahesh-Vegetable-Bill.png",
                {
                    type: "image/png"
                }
            );


        // ==============================
        // SHARE IMAGE ONLY
        // ==============================

        if (
            navigator.share &&
            navigator.canShare &&
            navigator.canShare({
                files: [file]
            })
        ) {

            /*
             * IMPORTANT:
             *
             * Do NOT send text here.
             * We are sharing ONLY the PNG.
             */

            await navigator.share({

                files: [file]

            });

            return;
        }


        // ==============================
        // FALLBACK
        // ==============================

        const imageURL =
            URL.createObjectURL(blob);


        window.location.href =
            imageURL;


    } catch (error) {

        console.error(
            "Bill sharing error:",
            error
        );


        if (
            error.name !==
            "AbortError"
        ) {

            alert(
                "Your phone does not support direct image sharing. Please try opening the bill image and share it from there."
            );

        }

    } finally {

        whatsappBtn.disabled =
            false;

        whatsappBtn.textContent =
            "📷 Share Bill Image";

    }
}


// ==============================
// CANVAS TO BLOB
// ==============================

function canvasToBlob(canvas) {

    return new Promise(
        resolve => {

            canvas.toBlob(
                blob => {

                    resolve(blob);

                },
                "image/png"
            );

        }
    );

}


// ==============================
// IMAGE UNIT
// ==============================

function getImageUnit(unit) {

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
// INITIAL DISPLAY
// ==============================

displayBill();