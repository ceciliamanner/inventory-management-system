import Medicine from "./medicine";
import Ui from "./ui";


class ProductManager {
    static productsCollection = JSON.parse(localStorage.getItem("products-collection")) || [];

    static addProduct(productName, supplier, expirationDate, quantity, notes){
        const latestCollection = JSON.parse(localStorage.getItem("products-collection")) || [];

        const newProduct = new Medicine(
            productName,
            supplier,
            expirationDate,
            quantity,
            notes
        );
  
        latestCollection.push(newProduct); 
        this.storeProducts(latestCollection);
        ProductManager.productsCollection = latestCollection; 

        console.log("new product addes", newProduct);
        
    }
    static storeProducts(collection) {
        localStorage.setItem("products-collection", JSON.stringify(collection));

     }

    static editProduct(
        id, 
        productName, 
        supplier, 
        expirationDate, 
        quantity,
        notes
    ) {
        const latestCollection = JSON.parse(
          localStorage.getItem("products-collection")
        ) || [];
      
        const productIndex = latestCollection.findIndex(
          (product) => product.id === id
        );
      
        if (productIndex !== -1) {
          const updatedProduct = new Medicine(
            productName,
            supplier,
            expirationDate,
            quantity,
            notes 
        );
        updatedProduct.id = id;
        latestCollection[productIndex] = updatedProduct;

      }
      
        ProductManager.storeProducts(latestCollection);
        ProductManager.productsCollection = latestCollection;
    }

    static deleteProduct(id){
      const latestCollection = JSON.parse(localStorage.getItem("products-collection")) || [];

      ProductManager.productsCollection = ProductManager.productsCollection.filter(product => {
          return product.id !== id;
      });
    
      ProductManager.storeProducts(ProductManager.productsCollection);
      Ui.renderProducts();
    }

    
}

export default ProductManager; 