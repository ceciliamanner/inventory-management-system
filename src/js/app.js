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

    Ui.renderProducts();
    Ui.closeDeleteModal();

    // inventory control 
    const searchInput = document.querySelector(".inventory__search-input");
    const sortSelect = document.querySelector(".inventory__sort-select"); 

    searchInput.addEventListener("input", () => {
    Ui.renderProducts();
    });
  
    sortSelect.addEventListener("change", () => {
    Ui.renderProducts();
    });



});

form.addEventListener("submit", (e) => {
    e.preventDefault(); 
    if (Ui.currentEditId) {
        ProductManager.editProduct(
          Ui.currentEditId,
          productName.value.trim(),
          supplier.value,
          expirationDate.value,
          quantity.value.trim()
        );
        Ui.currentEditId = null;
    
        formModal.classList.remove("display-form");
        formSubmitButton.textContent = "Add";
      } else {
        ProductManager.addProduct(
          productName.value.trim(),
          supplier.value,
          expirationDate.value,
          quantity.value.trim()
        );
      }
    
      form.reset();
      Ui.renderProducts();
    
}); 

