import Product from "./product";


class Medicine extends Product {
    constructor(name, supplier, expirationDate, quantity){
        super(name, supplier);
        this.expirationDate = expirationDate; 
        this.quantity = quantity;
    }
    isExpired(){
        return new Date(this.expirationDate) < new Date();
      }
}

export default Medicine; 