import {getAllCustomers, getAllItem, searchCustomer, searchItem} from '../db/Database.js';
import {CartItem} from "../model/cartItem.js";
import {getAllItems} from "./ItemController.js";
import {getOrderCount} from "./DashBoardController.js";

export class PlaceOrderController {
    array = [];

    constructor() {
        this.setItemComboBox()
        this.setCustomerComboBox()
        $('#btnAddToCart').click(this.btnAddToCart.bind(this));
        $('#btnPlaceOrder').click(this.placeOrder.bind(this));
        $('#tblPlaceOrder tr').remove();
    }

    setTotal(){
        let total=0;
        $.each(this.array,(i,e)=>{
            total=parseFloat(total)+parseFloat(e._itemSubtotal)
        });
        $('#total').text(total)
    }

    setItemComboBox() {
        $('#cbItem option').remove()
        $('#cbItem').append($('<option>SELECT ITEM</option>'))
        let items = getAllItem();
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
        $('#cbCustomer').append($('<option>SELECT CUSTOMER</option>'))
        let allCustomers = getAllCustomers();
        $.each(allCustomers, (i, e) => {
            var op = $(`<option>${e._id}</option>`);
            $('#cbCustomer').append(op);
        })

        $('#cbCustomer').change(function () {
            let find = $(this).find('option:selected');
            let text = find.text();
            let cust = searchCustomer(text);
            $('#placeOrder .po_customer input[name=id]').val(cust._id);
            $('#placeOrder .po_customer input[name=name]').val(cust._name);
            $('#placeOrder .po_customer input[name=address]').val(cust._address);
            $('#placeOrder .po_customer input[name=contact]').val(cust._mobileNo);
        })
    }

    btnAddToCart() {
        let qty = $('.po_item input[name=qtyBought]').val();
        if (!qty){
            alert('Qty Cannot Be Empty')
            return;
        }
        let id = $('#cbItem').val();
        let name = $('.po_item input[name=itemName]').val();
        let price = $('.po_item input[name=price]').val();

        let subTotal = parseFloat(price) * parseFloat(qty);
        let av = -1;
        $.each(this.array, (i, e) => {
            if (id === e._itemCode) {
                av = 1;
                let item = searchItem(id);
                if (parseInt(item._itemQty) < ((parseInt(e._itemQty)) + parseInt(qty))) {
                    alert('qty not enough');
                    return;
                }
                e._itemQty = parseInt(e._itemQty) + parseInt(qty);
                e._itemSubtotal = parseFloat(e._itemPrice) * parseFloat(e._itemQty);
                this.setTable();
            }
        })
        let item = searchItem(id);
        if (parseInt(item._itemQty) < (parseInt(qty))) {
            alert('qty not enough');
            return;
        }
        if (av === 1) {
            return;
        }
        let cartItem = new CartItem(id, name, price, qty, subTotal);
        this.array.push(cartItem);
        this.setTable();
        this.setTotal();
        this.clearItemDetails();
    }

    clearItemDetails() {
        $('#cbItem option').eq(0).attr('selected', 'true')
        $('#placeOrder .po_item input[name=itemCode]').val('');
        $('#placeOrder .po_item input[name=itemName]').val('');
        $('#placeOrder .po_item input[name=qtyOnHand]').val('');
        $('#placeOrder .po_item input[name=price]').val('');
        $('#placeOrder .po_item input[name=qtyBought]').val('');
    }

    clearCustomerDetails() {
        $('#cbCustomer option').eq(0).attr('selected', 'true')
        $('#placeOrder .po_customer input[name=id]').val('');
        $('#placeOrder .po_customer input[name=name]').val('');
        $('#placeOrder .po_customer input[name=address]').val('');
        $('#placeOrder .po_customer input[name=contact]').val('');

    }

    setTable() {
        $('#tblPlaceOrder tr').remove();
        $.each(this.array, (i, e) => {
            let btn = $('<button>DELETE</button>');
            let raw = $(`<tr><td>${e._itemCode}</td><td>${e._itemName}</td><td>${e._itemPrice}</td><td>${e._itemQty}</td><td>${e._itemSubtotal}</td></tr>`);
            btn.click(function () {
                controller.array.splice(parseInt(i), 1)
                controller.setTable()
                controller.setTotal();
            })
            let td = $('<td></td>');
            td.append(btn)
            raw.append(td)
            $('#tblPlaceOrder').append(raw)
        })
    }

    placeOrder() {
        let data = new Object();
        data.cartItems = controller.array;
        let id = $('#placeOrder .po_customer input[name=id]').val();
        data.customer = searchCustomer(id);
        let sendAble = JSON.stringify(data).replaceAll("_", "");
        let setting = {
            url: "http://localhost:8080/place",
            method: "POST",
            data: sendAble,
            timeout: 0
        }

        $.ajax(setting).done(resp => {
            this.clearCustomerDetails()
            getAllItems();
            controller.array=[];
            controller.setTable();
            this.setTotal();
            getOrderCount();
        })

    }

}

var controller = new PlaceOrderController();