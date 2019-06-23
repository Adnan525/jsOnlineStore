COMP249 Web Technology 2019: Javascript Web Application
===
Student ID : 44292252
Student Name : Muntasir Adnan

<b>/products:</b> provides a json representation of the database that we are working on.

<b>/cart :</b> provides a json representation of the cart.

<b>Requirement 1</b>

Product name and cost has been added to the index.html using handlebar template. Each product name has id "product-button" and 
"data-parametre" which holds the specific product id of the product.

<b>Requirement 2</b>

An event listener is added to the elements of id : "product-button" to get the product details. Product
id is passed for that specific product using "data-parametre". Product details are showed using a list and 
a close button is added at the end to clear the list and remove the details from the display.

<b>Requirement 3</b>

The provided form from index.html is added to the list of product details. Product id will be loaded
automatically when a user click on that specific product using handlebar template.

<b>Requirement 4</b>

New div "cart" added with font size set to "h2". It will show the number of items in the cart, product type
and total cost. The submit button of the added form in requirement 2 had to be modified and an event listener
was added. When user clicks the "Add" button, it calls preventDefault() so the page does not redirect
to /cart.
A post request will be sent using Ajax which has "/cart" as URL, serialised data from the form (WHICH HAS THE VALUE 1 OR 0 THAT
DECIDES WHETHER QUANTITY WILL BE UPDATED OR ADDED) and a success function that updates the "cart"
div immediately.

<b>Requirement 5</b>

Event listener added to the "cart" that shows a table of cart items, total cost and a close cart button
that clears the table.

<b>Requirement 6</b>

Sorting added using two comparator functions. Every sorting function can call the other sort function and main program
function from the function itself. Otherwise, the programs ignores other event listeners. The problem
can be solved/improved using the onClick function, but since I have already done the requirements using "click" only,
I didn't change.

<b>Requirement 7</b>

The provided update form with value 1 from index.html is added to the list of product details. Product id will be loaded
automatically when a user click on that specific product using handlebar template like requirement and the "Update" button does
the same Ajax post request as the add button.

