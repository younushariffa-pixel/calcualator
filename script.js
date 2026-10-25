
const calculateBtn = document.getElementById("calculateBtn");
const resetBtn = document.getElementById("resetBtn");
const message = document.getElementById("message");
const bill = document.getElementById("bill");

const menuItems = [
    { name: "Veg Sandwich", price: 80, inputId: "qtySandwich" },
    { name: "Burger", price: 120, inputId: "qtyBurger" },
    { name: "French Fries", price: 70, inputId: "qtyFries" },
    { name: "Juice", price: 50, inputId: "qtyJuice" }
];

calculateBtn.addEventListener("click", calculateBill);
resetBtn.addEventListener("click", resetOrder);

function calculateBill() {
    message.textContent = "";
    bill.replaceChildren();

    let grandTotal = 0;
    const selectedItems = [];

    for (const item of menuItems) {
        const input = document.getElementById(item.inputId);
        const rawValue = input.value.trim();
        const quantity = Number(rawValue);

        if (
            rawValue === "" ||
            !Number.isInteger(quantity) ||
            quantity < 0
        ) {
            message.textContent =
                "Please enter a whole number quantity of 0 or more for every item.";
            input.focus();
            return;
        }

        if (quantity > 0) {
            const lineTotal = item.price * quantity;

            selectedItems.push({
                name: item.name,
                quantity: quantity,
                lineTotal: lineTotal
            });

            grandTotal += lineTotal;
        }
    }

    if (selectedItems.length === 0) {
        message.textContent = "Please select at least one item!";
        return;
    }

    const heading = document.createElement("h2");
    heading.textContent = "Your Bill";
    heading.classList.add("bill-title");
    bill.appendChild(heading);

    for (const item of selectedItems) {
        const row = document.createElement("div");
        row.classList.add("bill-row");

        const description = document.createElement("span");
        description.textContent =
            `${item.name} × ${item.quantity}`;

        const amount = document.createElement("span");
        amount.textContent = `₹${item.lineTotal}`;

        row.appendChild(description);
        row.appendChild(amount);
        bill.appendChild(row);
    }

    const totalRow = document.createElement("div");
    totalRow.classList.add("grand-total");

    const totalLabel = document.createElement("span");
    totalLabel.textContent = "Grand Total";

    const totalAmount = document.createElement("span");
    totalAmount.textContent = `₹${grandTotal}`;

    totalRow.appendChild(totalLabel);
    totalRow.appendChild(totalAmount);
    bill.appendChild(totalRow);
}

function resetOrder() {
    for (const item of menuItems) {
        document.getElementById(item.inputId).value = 0;
    }

    message.textContent = "";
    bill.replaceChildren();
}
