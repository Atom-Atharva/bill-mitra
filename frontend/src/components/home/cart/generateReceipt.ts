interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

export const generateReceipt = (
    cartItems: CartItem[],
    subtotal: number,
    itemCount: number,
    paymentMethod: "CASH" | "UPI" | null
) => {
    const printWindow = window.open("", "", "width=800,height=600");
    if (!printWindow) return;

    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
    const timeString = currentDate.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    const receiptHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Receipt</title>
            <style>
                @media print {
                    @page { margin: 0; }
                    body { margin: 1cm; }
                }
                body {
                    font-family: 'Courier New', monospace;
                    max-width: 300px;
                    margin: 20px auto;
                    padding: 20px;
                    border: 2px dashed #333;
                }
                .header {
                    text-align: center;
                    margin-bottom: 20px;
                    border-bottom: 2px solid #000;
                    padding-bottom: 10px;
                }
                .header h1 {
                    margin: 0;
                    font-size: 24px;
                    font-weight: bold;
                }
                .header p {
                    margin: 5px 0;
                    font-size: 12px;
                }
                .info {
                    margin: 15px 0;
                    font-size: 12px;
                }
                .info div {
                    display: flex;
                    justify-content: space-between;
                    margin: 3px 0;
                }
                .divider {
                    border-bottom: 1px dashed #333;
                    margin: 10px 0;
                }
                .items {
                    margin: 15px 0;
                }
                .item {
                    margin: 8px 0;
                    font-size: 13px;
                }
                .item-header {
                    display: flex;
                    justify-content: space-between;
                    font-weight: bold;
                }
                .item-details {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 3px;
                    font-size: 11px;
                }
                .total {
                    border-top: 2px solid #000;
                    border-bottom: 2px solid #000;
                    padding: 10px 0;
                    margin: 15px 0;
                }
                .total-row {
                    display: flex;
                    justify-content: space-between;
                    font-size: 16px;
                    font-weight: bold;
                }
                .payment {
                    text-align: center;
                    margin: 15px 0;
                    font-size: 14px;
                    font-weight: bold;
                }
                .footer {
                    text-align: center;
                    margin-top: 20px;
                    padding-top: 10px;
                    border-top: 1px dashed #333;
                    font-size: 11px;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>BILL MITRA</h1>
                <p>Thank You for Your Purchase!</p>
            </div>

            <div class="info">
                <div>
                    <span>Date:</span>
                    <span>${dateString}</span>
                </div>
                <div>
                    <span>Time:</span>
                    <span>${timeString}</span>
                </div>
                <div>
                    <span>Receipt #:</span>
                    <span>${Math.floor(Math.random() * 100000)}</span>
                </div>
            </div>

            <div class="divider"></div>

            <div class="items">
                <div class="item" style="font-weight: bold; border-bottom: 1px solid #333; padding-bottom: 5px;">
                    <div class="item-header">
                        <span>ITEM</span>
                        <span>AMOUNT</span>
                    </div>
                </div>
                ${cartItems
                    .map(
                        (item) => `
                    <div class="item">
                        <div class="item-header">
                            <span>${item.name}</span>
                            <span>₹${item.price * item.quantity}</span>
                        </div>
                        <div class="item-details">
                            <span>₹${item.price} × ${item.quantity}</span>
                        </div>
                    </div>
                `
                    )
                    .join("")}
            </div>

            <div class="divider"></div>

            <div class="info">
                <div>
                    <span>Total Items:</span>
                    <span>${itemCount}</span>
                </div>
            </div>

            <div class="total">
                <div class="total-row">
                    <span>TOTAL</span>
                    <span>₹${subtotal}</span>
                </div>
            </div>

            ${
                paymentMethod
                    ? `
                <div class="payment">
                    Payment Mode: ${paymentMethod}
                </div>
            `
                    : ""
            }

            <div class="footer">
                <p>Thank you for your business!</p>
                <p>Visit again!</p>
            </div>
        </body>
        </html>
    `;

    const blob = new Blob([receiptHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    printWindow.location.href = url;

    printWindow.onload = () => {
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
            URL.revokeObjectURL(url);
        }, 250);
    };
};
