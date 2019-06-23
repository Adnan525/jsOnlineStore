(function(){

    var dataChangedEvent = new Event('dataChanged')

    function Shop() {
        this.url = '/products'
        this.products = []
    }

    /* get data from the API endpoint and store it locally */
    Shop.prototype.getData = function() {

        var self = this

        $.get({
           url: self.url,
           success: function(data) {
                /* store data as a property of this object */
                self.products = data
                /* sort by episode number */
                /* trigger the data changed event */
                window.dispatchEvent(dataChangedEvent)
           }
        })
    }

    Shop.prototype.getProducts = function() {
        if (this.products === []) {
            return []
        } else {

            return this.products.products
        }
    }

    Shop.prototype.getProduct = function(id) {
        var products = this.getProducts()
        for(var i=0; i<products.length; i++) {
            if (products[i].id === parseInt(id)) {
                return products[i]
            }
        }
        return null
    }

    /* export to the global window object */
    window.app = window.app || {}
    window.app.Shop = Shop

})()