import ProductManager from "./productManager";

class Ui {
    static displayEntryData(
        openEntryData,
        formModal,
    ){
        openEntryData.addEventListener("click", () => {
            formModal.classList.add("display-form"); 
            const validationMessage = document.querySelector(".form__validation-message");
            validationMessage.style.display = "none";
            validationMessage.textContent = "";

            const invalidInputs = document.querySelectorAll(".form__invalid-input");
            invalidInputs.forEach(input => input.classList.remove("form__invalid-input"));
        }); 
    }
    static closeEntryData(
        closeform,
        formModal,
        form,
        validationMessage,
        formSubmitButton
    ){
        closeform.addEventListener("click", () => {
            formModal.classList.remove("display-form");
            validationMessage.style.display = "none";
            formSubmitButton.textContent = "Add";
            form.reset()

            const invalidInput = document.querySelector(".form__validation-message")
            invalidInput?.classList.remove("form__invalid-input")
            Ui.currentEditId = null;
         
        });
    }

    static displayDeleteModal(productId, productName){
        const deleteModal = document.querySelector(".delete-modal");
        const deleteMessage = document.querySelector(".delete-modal__text");
        const confirmDeleteButton = document.querySelector(".delete-modal__confirm-button")

        deleteMessage.textContent = `Are you sure you want to delete ${productName}?`;
        deleteModal.classList.add("display-modal");

        confirmDeleteButton.addEventListener("click", () => {
            ProductManager.deleteProduct(productId);
            deleteModal.classList.remove("display-modal");
            Ui.renderProducts(); 
        });
    }
    static closeDeleteModal() {
        const deleteModal = document.querySelector(".delete-modal");
        const cancelDeleteButton = document.querySelector(".delete-modal__cancel-button");
      
        cancelDeleteButton.addEventListener("click", () => {
          deleteModal.classList.remove("display-modal");
        });
    }
    static displayEditModal() {
        const formModal = document.querySelector(".form-modal");
        const formSubmitButton = document.querySelector(".form__submit-button");
      
        formModal.classList.add("display-form"); 
        formSubmitButton.textContent = "Confirm Edit"; 
        const validationMessage = document.querySelector(".form__validation-message");
        validationMessage.style.display = "none";
        validationMessage.textContent = "";
    
        const invalidInputs = document.querySelectorAll(".form__invalid-input");
        invalidInputs.forEach(input => input.classList.remove("form__invalid-input"));
    }

    static populateEditForm(id) {
        const productName = document.querySelector(".form__product-input");
        const supplier = document.querySelector(".form__supplier-input");
        const expirationDate = document.querySelector(".form__date-input");
        const quantity = document.querySelector(".form__quantity-input");
        const notes = document.querySelector("#notes");
      
        const productToEdit = ProductManager.productsCollection.find(
          (product) => product.id === id
        );
      
        if (!productToEdit) return;
      
        productName.value = productToEdit.productName;
        supplier.value = productToEdit.supplier;
        expirationDate.value = productToEdit.expirationDate;
        quantity.value = productToEdit.quantity;
        notes.value = productToEdit.notes || "";
      
        Ui.currentEditId = id; 
      }


    static deleteProduct(id){
        ProductManager.productsCollection = ProductManager.productsCollection.filter(product => {
            return product.id !== id
        });
        ProductManager.storeProducts(ProductManager.productsCollection);
        Ui.renderProducts();
    }


    static renderProducts() {
        const tableBody = document.querySelector(".table__body");
        const searchInput = document.querySelector(".inventory__search-input");
        const sortSelect = document.querySelector(".inventory__sort-select");
        const message = document.querySelector(".search-message"); 


        tableBody.innerHTML = ""; 

        let products = ProductManager.productsCollection || [];
        if (!products.length) return;

        // inventory controls
        const searchValue = searchInput.value.toLowerCase();
        if (searchValue) {
            products = products.filter((product) =>
                product.productName.toLowerCase().startsWith(searchValue)
              );
        }
        
        if (products.length === 0) {
            message.textContent = `No results for '${searchValue}'`;
            tableBody.innerHTML = "";
            return;
        } else {
            message.textContent = ""; 
        }

        switch(sortSelect.value){
            case "name-a-z": 
                products.sort((a, b) => a.productName.localeCompare(b.productName));
                break;
            case "date-desc":
                products.sort((a, b) => new Date(b.expirationDate) - new Date(a.expirationDate));
                break;
            case "date-asc":
                products.sort((a, b) => new Date(a.expirationDate) - new Date(b.expirationDate));
                break;
            case "quantity-asc":
                products.sort((a, b) => a.quantity - b.quantity);
                break;
            case "quantity-desc":
                products.sort((a, b) => b.quantity - a.quantity);
                break;

                default:
                    break; 
        }; 


        products.forEach((product, index) => {
            const row = document.createElement("tr"); 
            row.classList.add("table-row");

            const nameCell = document.createElement("td"); 
            const supplierCell = document.createElement("td");
            const dateCell = document.createElement("td");
            const statusCell = document.createElement("td");
            const quantityCell = document.createElement("td");
            const notesCell = document.createElement("td"); 
            const toolsCell = document.createElement("td");

            nameCell.textContent = product.productName;
            supplierCell.textContent = product.supplier;
            dateCell.textContent = product.expirationDate;
            quantityCell.textContent = product.quantity;
            notesCell.textContent = product.notes || "-";              
            notesCell.classList.add("notes-cell");
            notesCell.title = product.notes || "-";

            // Expiration status
            const today = new Date();
            const expiration = new Date(product.expirationDate);
            const timeDiff = expiration - today;
            const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

            if (daysDiff < 0) {
                statusCell.textContent = "Expired";
                statusCell.classList.add("status--expired");
            } else if (daysDiff <= 90) {
                statusCell.textContent = "Expiring soon";
                statusCell.classList.add("status--warning");
            } else {
                statusCell.textContent = "Valid";
                statusCell.classList.add("status--valid");
            }

            const deleteButton = document.createElement("button");
            const editButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            editButton.textContent = "Edit";


            deleteButton.classList.add("table__button--delete");
            editButton.classList.add("table__button--edit");


            // Append elements
            toolsCell.append(
                deleteButton, 
                editButton); 

            row.append(
                nameCell, 
                supplierCell, 
                dateCell, 
                statusCell, 
                quantityCell, 
                notesCell, 
                toolsCell);

            tableBody.appendChild(row);

            // Event listerns for delete & edit 

            deleteButton.addEventListener("click", () => {
                Ui.displayDeleteModal(product.id, product.productName);
                
            }); 
            editButton.addEventListener("click", () => {
                Ui.displayEditModal(); 
                Ui.populateEditForm(product.id); 
            });
        });

    }
}

export default Ui; 