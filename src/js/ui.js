import ProductManager from "./productManager";

class Ui {
    static displayEntryData(
        openEntryData,
        formModal,
    ){
        openEntryData.addEventListener("click", () => {
            formModal.classList.add("display-form"); 
        }); 
    }
    static closeEntryData(
        closeform,
        formModal,
        form,
        formSubmitButton
    ){
        closeform.addEventListener("click", () => {
            formModal.classList.remove("display-form");
            /* formSubmitButton.textContent = "Add"; */
        });

    }

    static renderProducts() {
        const tableBody = document.querySelector(".table__body");
        const searchInput = document.querySelector(".inventory__search-input");
        const sortSelect = document.querySelector(".inventory__sort-select");


        tableBody.innerHTML = ""; 

        let products = ProductManager.productsCollection || [];
        if (!products.length) return;

        // inventory controls
        const searchValue = searchInput.value.toLowerCase();
        if (searchValue) {
            products = products.filter((product) =>
                product.productName.toLowerCase().includes(searchValue)
              );
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

            const indexCell = document.createElement("td");
            const nameCell = document.createElement("td"); 
            const supplierCell = document.createElement("td");
            const dateCell = document.createElement("td");
            const statusCell = document.createElement("td");
            const quantityCell = document.createElement("td");
            const toolsCell = document.createElement("td");

            indexCell.textContent = index + 1;
            nameCell.textContent = product.productName;
            supplierCell.textContent = product.supplier;
            dateCell.textContent = product.expirationDate;
            quantityCell.textContent = product.quantity;

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


            indexCell.classList.add("table__cell--index");

            const deleteButton = document.createElement("button");
            const editButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            editButton.textContent = "Edit";

            deleteButton.classList.add("table__button--delete");
            editButton.classList.add("table__button--edit");


            // append elements
            toolsCell.append(
                deleteButton, 
                editButton); 

            row.append(
                indexCell,
                nameCell, 
                supplierCell, 
                dateCell, 
                statusCell, 
                quantityCell, 
                toolsCell);

            tableBody.appendChild(row);

            // event listerns for delete & edit - button here 

        });


    }
       


}

export default Ui; 