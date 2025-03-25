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
    
}

export default Ui; 