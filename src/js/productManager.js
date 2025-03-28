import Medicine from "./medicine";


class ProductManager {
    static productsCollection = JSON.parse(localStorage.getItem("products-collection")) || [];

    static addProduct(productName, supplier, expirationDate, quantity){
        const latestCollection = JSON.parse(localStorage.getItem("products-collection")) || [];

        const newProduct = new Medicine(
            productName,
            supplier,
            expirationDate,
            quantity
        );

        latestCollection.push(newProduct); 
        this.storeProducts(latestCollection);
        ProductManager.productsCollection = latestCollection; 

        console.log("new product addes", newProduct);
        
    }
    static storeProducts(collection) {
        localStorage.setItem("products-collection", JSON.stringify(collection));

      }
}

export default ProductManager; 