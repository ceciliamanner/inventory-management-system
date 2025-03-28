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
        tableBody.innerHTML = ""; 

        const productList = JSON.parse(localStorage.getItem("products-collection")) || [];
        if (!productList.length) return;

        productList.forEach((product, index) => {
            const row = document.createElement("tr"); 
            row.classList.add("table-row");

            const indexCell = document.createElement("td");
            const nameCell = document.createElement("td"); 
            const supplierCell = document.createElement("td");
            const dateCell = document.createElement("td");
            const quantityCell = document.createElement("td");
            const toolsCell = document.createElement("td");

            indexCell.textContent = index + 1;
            nameCell.textContent = product.productName;
            supplierCell.textContent = product.supplier;
            dateCell.textContent = product.expirationDate;
            quantityCell.textContent = product.quantity;

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
                quantityCell, 
                toolsCell);

            tableBody.appendChild(row);

            // event listerns for delete & edit - button here 

        });


    }
       


}

export default Ui; 