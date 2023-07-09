import {getAllCustomers, getAllItem, searchCustomer, searchItem} from '../db/Database.js';

export class PlaceOrderController {
    array = [];

    constructor() {
        this.setItemComboBox()
        this.setCustomerComboBox()
        $('#btnAddToCart').click(this.btnAddToCart.bind(this));
        $('#tblPlaceOrder tr').remove();
    }

    setItemComboBox() {
        $('#cbItem option').remove()
        let items = getAllItem();
        console.log(items)
        $.each(items, (i, e) => {
            let op = `<option>${e._itemCode}</option>`
            $('#cbItem').append($(op));

        });
        $('#cbItem').change(function () {
            let find = $(this).find('option:selected');
            let search1 = searchItem(find.text());
            $('#placeOrder .po_item input[name=itemCode]').val(search1._itemCode);
            $('#placeOrder .po_item input[name=itemName]').val(search1._itemName);
            $('#placeOrder .po_item input[name=qtyOnHand]').val(search1._itemQty);
            $('#placeOrder .po_item input[name=price]').val(search1._itemPrice);
        })
        /*let i = $('#cbItem option');
        $.each(i,function (ii,e){
            $(e).click(()=>{
                console.log($(e).text())
            })
        })*/
    }

    setCustomerComboBox() {
        $('#cbCustomer option').remove()
        let allCustomers = getAllCustomers();
        $.each(allCustomers, (i, e) => {
            var op = $(`<option>${e._id}</option>`);
            $('#cbCustomer').append(op);
        })

        $('#cbCustomer').change(function () {
            let find = $(this).find('option:selected');
            let text = find.text();
            let cust = searchCustomer(text);
            console.log(cust)
            $('#placeOrder .po_customer input[name=id]').val(cust._id);
            $('#placeOrder .po_customer input[name=name]').val(cust._name);
            $('#placeOrder .po_customer input[name=address]').val(cust._address);
            $('#placeOrder .po_customer input[name=contact]').val(cust._mobileNo);
        })
    }

    btnAddToCart() {
        let id = $('#cbItem').val();
        let name = $('.po_item input[name=itemName]').val();
        let price = $('.po_item input[name=price]').val();
        let qty = $('.po_item input[name=qtyBought]').val();
        let subTotal = parseFloat(price) * parseFloat(qty);


        let btn = $('<button>DELETE</button>');

        let raw = $(`<tr><td>${id}</td><td>${name}</td><td>${price}</td><td>${qty}</td><td>${subTotal}</td></tr>`);
        btn.click(function () {
            raw.remove()
        })
        let td = $('<td></td>');
        td.append(btn)
        raw.append(td)
        $('#tblPlaceOrder').append(raw)

        console.log(id + ' : ' + name + ' : ' + price + ' : ' + qty + ' : ' + subTotal)
    }
}

new PlaceOrderController()