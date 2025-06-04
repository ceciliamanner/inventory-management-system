import Product from "./product";


class Medicine extends Product {
    constructor(name, supplier, expirationDate, quantity, notes = ""){
        super(name, supplier);
        this.expirationDate = expirationDate; 
        this.quantity = quantity;
        this.notes = notes; 
    }
    isExpired(){
        return new Date(this.expirationDate) < new Date();
      }
}

export default Medicine; 