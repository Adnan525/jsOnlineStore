var temp = []; //to be used later to update cart
(function(){

    $(document).ready(function() {

        /* make a model instance and trigger data load */

        window.app.model = new window.app.Shop()
        window.app.model.getData()


        $(window).on("dataChanged", function() {


                                    function nameSort(){
                                        var sortName = document.getElementById("sortByName")
                                        sortName.addEventListener("click", function(){
                                        console.log("sortName working")
                                        var sortedName = products.sort(function(a,b){ a = a.name.toLowerCase(); b = b.name.toLowerCase(); return (a < b) ? -1 : 0;})
                                        var template = Handlebars.compile($("#productTemplate").html())
                                        var list = template({products: sortedName})
                                        $("#product").html(list)
                                        priceSort()
                                        mainProgram()
                                        })
                                        }
                                    function priceSort(){
                                        var sortPrice = document.getElementById("sortByPrice")
                                        sortPrice.addEventListener("click", function(){
                                        console.log("sortPrice working")
                                        var sortedPrice = products.sort(function(a,b){return parseInt(a.unit_cost)-parseInt(b.unit_cost)})
                                        var template = Handlebars.compile($("#productTemplate").html())
                                        var list = template({products: sortedPrice})
                                        $("#product").html(list)
                                        mainProgram()
                                        nameSort()
                                        })
                                        }


        //rq 6 sorting
            //product table
            var products = window.app.model.getProducts()
            var template = Handlebars.compile($("#productTemplate").html())
            var list = template({products: products})
            $("#product").html(list)

                    var sortName = document.getElementById("sortByName")
                    sortName.addEventListener("click", function(){
                    console.log("sortName working")
                    // ascending order
                    //code taken from : https://stackoverflow.com/questions/6712034/sort-array-by-firstname-alphabetically-in-javascript
                    var sortedName = products.sort(function(a,b){ a = a.name.toLowerCase(); b = b.name.toLowerCase(); return (a < b) ? -1 : 0;})
                    var template = Handlebars.compile($("#productTemplate").html())
                    var list = template({products: sortedName})
                    $("#product").html(list)
                                                            mainProgram()
                                                            priceSort()
                    })



                    var sortPrice = document.getElementById("sortByPrice")
                    sortPrice.addEventListener("click", function(){
                    console.log("sortPrice working")
                    var sortedPrice = products.sort(function(a,b){return parseInt(a.unit_cost)-parseInt(b.unit_cost)})
                    var template = Handlebars.compile($("#productTemplate").html())
                    var list = template({products: sortedPrice})
                    $("#product").html(list)
                                                            mainProgram()
                                                            nameSort()
                    })


         function mainProgram(){
        //getting the cart line
        $.get({url: "/cart",
               success: function(data) {
                        var cartList = data.cart
                        var totalCost = 0
                        var totalQuantity = 0
                        for(var i = 0; i<temp.length; i++)
                        {
                            totalQuantity += parseInt(temp[i].quantity)
                            totalCost = totalCost + parseInt(temp[i].cost)
                        }
                        if(temp.length === 0)
                        {
                            $("#cart").html("Your cart is empty")
                        }
                        else
                        {
                            $("#cart").html("Your cart has "+totalQuantity+ " item(s), "+cartList.length+" types of products . Total cost : $"+totalCost)
                        }


                        //show the cart when cart is clicked
                         var carDiv = document.getElementById('cart')
                         console.log(carDiv)
                         if(carDiv)
                         {
                         carDiv.addEventListener('click', function(event) {
                         $.get({url: "/cart", success: function(data) {temp = data.cart}})
                         console.log("show cart table working")
                         console.log(temp)
                         var template = Handlebars.compile($("#cartTemplate").html())
                         var totalCart = 0
                         for(var i = 0; i<temp.length; i++){totalCart = totalCart + parseInt(temp[i].cost)}
                         console.log(totalCart)
                         var list = template ({cartItem : temp, cartCost : totalCart})
                         console.log(list)
                         $("#cartTable").html(list)
                         document.getElementById("closeCart").addEventListener("click", function(){$("#update").empty()})

                         })}
                         }
               })

            //show product detail
            $(".product-button").click(function(){

            var id = this.dataset.parametre
            console.log(id)
            var product = window.app.model.getProduct(id)
            console.log(product)



            var template = Handlebars.compile($("#detailTemplate").html())
            var list = template({name : product.name, image_url : product.image_url, description : product.description, unit_cost : product.unit_cost, id : product.id})
            $("#productDetails").html(list)

            //add the close button
                        var el = document.getElementById('btn');
                        console.log(el)
                        if(el){
                            el.addEventListener('click', function() {
                                console.log("Close")
                                $("#list").empty()
                                return false
                                })
                            }

                        //submit button of the product detail
                        //jQuery('input[name="url"]').val();
                        //function formHandler(buttonName, form, value){}
                        var el1 = document.getElementById('stay');
                        if(el1){
                            el1.addEventListener('click', function(event) {
                            console.log("stay in the page")
                            event.preventDefault()
                            var form = $('#ajaxForm')
                            var formData = $(form).serialize()
                            console.log(formData)
                            $.ajax({
                                type: 'POST',
                                url: "/cart",
                                data: formData,
                                success : function(){
                                //update the cart

                                            $.get({
                                            url: "/cart",
                                            success: function(data) {
                                            var cartList = data.cart
                                            temp = cartList
                                            var totalCost = 0
                                            var totalQuantity = 0
                                            for(var i = 0; i<cartList.length; i++)
                                                {
                                                    totalCost = totalCost + parseInt(cartList[i].cost)
                                                    totalQuantity += parseInt(cartList[i].quantity)
                                                }
                                                $("#cart").html("Your cart has "+totalQuantity+ " item(s), "+cartList.length+" types of products . Total cost : $"+totalCost)
                                            }})
                                }
                                })
                            })
                        }

                        //2nd form
                        var el2 = document.getElementById('stay1');
                        if(el2){
                            el2.addEventListener('click', function(event) {
                            console.log("stay in the page")
                            event.preventDefault()
                            var form2 = $('#ajaxFormUpdate')
                            var formData = $(form2).serialize()
                            console.log(formData)
                            $.ajax({
                                type: 'POST',
                                url: "/cart",
                                data: formData,
                                success : function(){
                                //update the cart

                                            $.get({
                                            url: "/cart",
                                            success: function(data) {
                                            var cartList = data.cart
                                            temp = cartList
                                            var totalCost = 0
                                            var totalQuantity = 0
                                            for(var i = 0; i<cartList.length; i++)
                                                {
                                                    totalCost = totalCost + parseInt(cartList[i].cost)
                                                    totalQuantity += parseInt(cartList[i].quantity)
                                                }
                                                $("#cart").html("Your cart has "+totalQuantity+ " item(s), "+cartList.length+" types of products . Total cost : $"+totalCost)
                                            }})
                                }
                                })
                            })
                        }
            })}
            mainProgram()


        })
    })

})()