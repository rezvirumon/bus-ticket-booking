
document.addEventListener('DOMContentLoaded', function () {
    const seatButtons = document.querySelectorAll('.seat');
    const availableSeatsElement = document.getElementById('availableSeats');
    const selectedSeatsElement = document.getElementById('selectedSeats');
    const maxSeatsError = document.getElementById('maxSeatsError');
    const ticketConfirmation = document.getElementById('ticketConfirmation');
    const selectedSeatNumbers = document.getElementById('selectedSeatNumbers');
    const confirmationTotalPrice = document.getElementById('confirmationTotalPrice');
    const confirmationGrandTotal = document.getElementById('confirmationGrandTotal');
    let availableSeats = 8;
    let selectedSeats = 0;

    seatButtons.forEach(button => {
        button.addEventListener('click', function () {
            if (!this.classList.contains('selected') && availableSeats > 0 && selectedSeats < 4) {
                this.classList.add('selected');
                availableSeats--;
                selectedSeats++;
            } else if (this.classList.contains('selected')) {
                this.classList.remove('selected');
                availableSeats++;
                selectedSeats--;
            }

            updateAvailableSeats();
            updateSelectedSeats();
            calculateTotal();
            checkMaxSeats();
        });
    });

    function updateAvailableSeats() {
        availableSeatsElement.textContent = availableSeats;
    }

    function updateSelectedSeats() {
        selectedSeatsElement.textContent = selectedSeats;
    }

    function checkMaxSeats() {
        if (selectedSeats > 4) {
            maxSeatsError.textContent = 'You can book only 4 seats';
        }
        else {
            maxSeatsError.textContent = '';

        }
    }

    function clearSelection() {
        seatButtons.forEach(button => {
            button.classList.remove('selected');
        });
        availableSeats = 8;
        selectedSeats = 0;
        updateAvailableSeats();
        updateSelectedSeats();
        calculateTotal();
    }

    function showConfirmation() {
        const selectedSeatButtons = document.querySelectorAll('.selected');
        const selectedSeatNumbersArray = Array.from(selectedSeatButtons).map(button => button.dataset.seat);
        selectedSeatNumbers.textContent = selectedSeatNumbersArray.join(', ');
        confirmationTotalPrice.textContent = document.getElementById('totalPrice').textContent;
        confirmationGrandTotal.textContent = document.getElementById('grandTotal').textContent;
        ticketConfirmation.style.display = 'block';
    }

    function hideConfirmation() {
        ticketConfirmation.style.display = 'none';
    }

    document.getElementById('coupon').addEventListener('input', hideConfirmation);
});

// JavaScript to calculate total price and grand total with discount coupon
function calculateTotal() {
    const selectedSeats = document.querySelectorAll('.selected');
    const totalPriceElement = document.getElementById('totalPrice');
    const grandTotalElement = document.getElementById('grandTotal');
    const couponInput = document.getElementById('coupon');
    const couponError = document.getElementById('couponError');

    const ticketPrice = 550;

    const totalSeats = selectedSeats.length;
    const totalPrice = totalSeats * ticketPrice;

    let grandTotal = totalPrice;

    // Apply discount coupon is valid
    if (validateCoupon(couponInput.value)) {
        const discountAmount = (totalPrice * getCouponDiscountPercentage(couponInput.value)) / 100;
        grandTotal -= discountAmount;
        couponError.style.color = 'green';
        couponError.textContent = 'Valid';

    } else {
        couponError.style.color = 'red'
        couponError.textContent = 'Enter valid coupon';
    }

    totalPriceElement.textContent = totalPrice;
    grandTotalElement.textContent = grandTotal;
}

// JavaScript to validate discount coupon
function validateCoupon(couponCode) {
    // Add your coupon code validation logic here
    return couponCode === 'NEW15' || couponCode === 'Couple20';
}

// JavaScript to get discount percentage for a coupon
function getCouponDiscountPercentage(couponCode) {
    // Add your coupon code discount percentage mapping here
    if (couponCode === 'NEW15') {
        return 15;
    } else if (couponCode === 'Couple20') {
        return 20;
    } else {
        return 0; // Default to no discount
    }
}

// JavaScript to apply discount coupon
function applyCoupon() {
    calculateTotal();
}

// JavaScript to apply additional discount
function applyDiscount(discountPercentage) {
    const totalPriceElement = document.getElementById('totalPrice');
    const grandTotalElement = document.getElementById('grandTotal');
    const totalPrice = parseInt(totalPriceElement.textContent);
    const discountAmount = (totalPrice * discountPercentage) / 100;
    let grandTotal = totalPrice - discountAmount;
    grandTotalElement.textContent = grandTotal;
}




