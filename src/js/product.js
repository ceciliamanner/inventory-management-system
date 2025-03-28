import { v4 as uuidv4 } from 'uuid';

class Product {
    constructor(productName, supplier){
        this.id = uuidv4(); 
        this.productName = productName; 
        this.supplier = supplier; 
    }
}

export default Product;