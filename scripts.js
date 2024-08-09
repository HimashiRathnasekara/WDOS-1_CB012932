document.addEventListener('DOMContentLoaded', () => {
    const addtofavbutton = document.getElementById('addtofav');
    const applyfav = document.getElementById("applyfav");
    const buyNowButton = document.getElementById("buyNowButton");
    const buynoebtn = document.getElementById("paynowbutton");
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function addToCart(itemName, itemPrice, inputId) {
        let quantityInput = document.getElementById(inputId);
        let quantity = parseInt(quantityInput.value) || 0;
        if (quantity > 0) {
            let existingItem = cart.find(item => item.name === itemName);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({ name: itemName, price: itemPrice, quantity: quantity });
            }
            updateCart();
        }
        quantityInput.value = '';
    }

    function updateCart() {
        let cartItems = document.getElementById('cartItems');
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            let row = document.createElement('tr');

            let itemName = document.createElement('td');
            itemName.textContent = item.name;
            row.appendChild(itemName);

            let itemPrice = document.createElement('td');
            itemPrice.textContent = `Rs. ${item.price}`;
            row.appendChild(itemPrice);

            let itemQuantity = document.createElement('td');
            itemQuantity.textContent = item.quantity;
            row.appendChild(itemQuantity);

            let itemTotal = document.createElement('td');
            itemTotal.textContent = `Rs. ${item.price * item.quantity}`;
            row.appendChild(itemTotal);

            cartItems.appendChild(row);

            total += item.price * item.quantity;
        });

        document.getElementById('cartTotalPrice').textContent = `Total: Rs. ${total}`;
    }

    function buyNow() {
        if (cart.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cart));
            window.location.href = 'PaymentPage.html';
        } else {
            alert('Your cart is empty.');
        }
    }

    function saveToFavorites() {
        localStorage.setItem('favoriteCart', JSON.stringify(cart));
        alert('Your favorites have been saved!');
    }

    function applyFavorites() {
        let favoriteCart = JSON.parse(localStorage.getItem('favoriteCart'));
        if (favoriteCart) {
            cart = favoriteCart;
            updateCart();
            alert('Favorites applied to cart!');
        } else {
            alert('No favorites found.');
        }
    }


    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            let productGrid = button.parentElement;
            let itemName = productGrid.querySelector('h3').textContent.trim();
            let itemPrice = parseInt(productGrid.querySelector('.price').textContent.replace('Rs.', '').trim());
            let inputId = productGrid.querySelector('input').id;

            addToCart(itemName, itemPrice, inputId);
        });
    });


    
    if (buyNowButton) {
        buyNowButton.addEventListener('click', buyNow);
    }

    
    if (addtofavbutton) {
        addtofavbutton.addEventListener('click', saveToFavorites);
    }

    
    if (applyfav) {
        applyfav.addEventListener('click', applyFavorites);
    }

    
    if (buyNowButton) {
        buyNowButton.addEventListener("click", function() {
            
            const name = document.getElementById('name').value.trim();
            const address = document.getElementById('address').value.trim();
            const contactNumber = document.getElementById('contact number').value.trim();
            const paymentMethod = document.getElementById('payment').value;

            
            if (name === "") {
                alert('Please enter your name.');
                return;
            }

            if (address === "") {
                alert('Please enter your delivery address.');
                return;
            }

            if (contactNumber === "") {
                alert('Please enter your contact number.');
                return;
            }

            
            if (isNaN(contactNumber)) {
                alert('Please enter a valid contact number (numbers only).');
                return;
            }

            if (paymentMethod === "") {
                alert('Please select a payment method.');
                return;
            }

            
            const deliveryDate = new Date();
            deliveryDate.setDate(deliveryDate.getDate() + 1);
            const formattedDeliveryDate = deliveryDate.toLocaleDateString();

            
            alert(`Thank you for your purchase, ${name}!\nYour order will be delivered by ${formattedDeliveryDate}.`);

            
            document.getElementById('name').value = "";
            document.getElementById('address').value = "";
            document.getElementById('contact number').value = "";
            document.getElementById('payment').selectedIndex = 0; 
        });

        document.addEventListener('DOMContentLoaded', function() {
            
            let orderTableBody = document.getElementById('summaryitems');
            let orderTotalPrice = document.getElementById('orderTotalPrice');
            
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
            function displayOrderDetails() {
                orderTableBody.innerHTML = '';  
                let total = 0;  
        
                
                cart.forEach(function(item) {
                    let row = document.createElement('tr');  
        
                   
                    let itemName = document.createElement('td');
                    itemName.textContent = item.name;
                    row.appendChild(itemName);
        
                    let itemQuantity = document.createElement('td');
                    itemQuantity.textContent = item.quantity;
                    row.appendChild(itemQuantity);
        
                    let itemPrice = document.createElement('td');
                    itemPrice.textContent = 'Rs. ' + item.price;
                    row.appendChild(itemPrice);
        
                    let itemTotal = document.createElement('td');
                    itemTotal.textContent = 'Rs. ' + (item.price * item.quantity);
                    row.appendChild(itemTotal);
        
                    
                    orderTableBody.appendChild(row);
        
                    
                    total += item.price * item.quantity;
                });
        
                
                orderTotalPrice.textContent = 'Rs. ' + total;
            }
        
            
            displayOrderDetails();
        });
        

        
    }

});
