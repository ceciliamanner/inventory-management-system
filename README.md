# Inventory Management System

## Project Description
This project is part of the Frontend Development (FFU1200) course and demonstrates the use of Object-Oriented Programming (OOP) principles in JavaScript. It is a fully functional Pharmacy Inventory Management System that allows users to add, edit, delete, and manage information about different medicines in a clean and responsive interface.

The application is built using HTML, CSS, and JavaScript with a class-based structure and inheritance. All data is saved locally using localStorage, ensuring persistence across sessions.

## Live Demo
🌍 [View the deployed site on Netlify] https://inventory-management-system1.netlify.app/

## Installation
git clone https://github.com/ceciliamanner/inventory-management-system.git
cd inventory-management-system
npm install
npm run dev

## Usage
The app is designed to help users manage a medicine inventory in a simple and structured way.
- Click "Add Product" to open the input form.
- Fill in the required fields: product name, supplier, expiration date, and quantity.
- Optionally, add notes or special comments.
- Submitted products appear in a styled table, categorized by expiration status.
- Each entry includes Edit and Delete buttons for full control.
- Users can search by product name or sort by date, name, or quantity.

All changes are automatically saved in local storage.

## Features 
- Class-based JavaScript structure with inheritance (Medicine extends Product)
- Unique product ID generation using uuid
- Full CRUD functionality: Add, Edit, Delete, and View products
- Form validation with custom feedback messages
- Expiration status labels (e.g., "Expired", "Expiring soon", "Valid")
- Optional notes/comments field with character limits
- Responsive UI using CSS and media queries
- Dynamic search and sorting of products
- Modular file structure (js, css, assets)
- Version control with Git and GitHub
- Fully deployed as a live demo

## License
This project is licensed under MIT License.


