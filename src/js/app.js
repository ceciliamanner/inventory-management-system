import ProductManager from "./productManager";
import Ui from "./ui";


const openEntryData = document.querySelector(".entry-data-button");
const closeForm = document.querySelector(".form__cancel-button");
const formModal = document.querySelector(".form-modal");

// Selecting for inputs 
const form = document.querySelector(".form");
const productName = document.querySelector(".form__product-input");
const supplier = document.querySelector(".form__supplier-input");
const expirationDate = document.querySelector(".form__date-input");
const quantity = document.querySelector(".form__quantity-input")
const formSubmitButton = document.querySelector(".form__submit-button");

// Adding Eventlisteners
document.addEventListener("DOMContentLoaded",() => {
    Ui.displayEntryData(
        openEntryData, 
        formModal,
        
    );

    Ui.closeEntryData(
        closeForm,
        formModal,
        form,
        formSubmitButton
    );
});

form.addEventListener("submit", (e) => {
    e.preventDefault(); 
    ProductManager.addProduct(
        productName.value.trim(), 
        supplier.value,
        expirationDate.value,
        quantity.value.trim()  
    );

    form.reset();
    
}); 
