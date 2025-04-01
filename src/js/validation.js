

class Validation {
    static validateForm(validationMessage){
        validationMessage.style.display = "none";
        validationMessage.textContent = "";

        const fieldsToValidate = [
            { name: "product-name", message: "Select a pharmacy product" },
            { name: "supplier", message: "Select a supplier" },
            { name: "expiration-date", message: "Enter the product's expiration date" },
            { name: "quantity", message: "Enter the quantity of packages" }
        ]  

        for (let field of fieldsToValidate){
            const inputField = document.querySelector(`[id=${field.name}]`);
            inputField.classList.remove("form__invalid-input");

            inputField.addEventListener("input", () => {
                inputField.classList.remove("form__invalid-input");
                validationMessage.style.display = "none";
                validationMessage.textContent = ""; 
            });
            if(!inputField.value.trim()){
                validationMessage.style.display = "block";
                validationMessage.textContent = field.message; 
                inputField.classList.add("form__invalid-input");
                return false
            }
        }

        return true
    }
}

export default Validation; 

// problem med validation-message 
