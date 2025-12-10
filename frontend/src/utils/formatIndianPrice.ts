/**
 * Formats a number to Indian numbering system with commas
 * Example: 1234567 becomes 12,34,567
 */
export const formatIndianPrice = (price: number): string => {
    const priceStr = price.toString();
    const [integerPart, decimalPart] = priceStr.split(".");

    // Handle numbers less than 1000 (no comma needed)
    if (integerPart.length <= 3) {
        return decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
    }

    // Get last 3 digits
    const lastThree = integerPart.slice(-3);
    // Get remaining digits
    const remaining = integerPart.slice(0, -3);

    // Add comma after every 2 digits for remaining part (from right to left)
    const formattedRemaining = remaining.replace(/\B(?=(\d{2})+(?!\d))/g, ",");

    const formattedPrice = `${formattedRemaining},${lastThree}`;

    return decimalPart ? `${formattedPrice}.${decimalPart}` : formattedPrice;
};
