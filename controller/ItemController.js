import {Item} from "../model/Item.js";
import {getAllItem} from "../db/Database.js";
const itemDb = 'ITEMDATA';
class ItemController {
    constructor() {
        $('#manageItem .buttons button').eq(0).click(this.addItem.bind(this));
        $('#manageItem .buttons button').eq(1).click(this.searchItem.bind(this));
        $('#manageItem .buttons button').eq(2).click(this.updateItem.bind(this));
        $('#manageItem .buttons button').eq(3).click(this.deleteItem.bind(this));
        getAllItems();
    }
    addItem() {
        let boolean = this.validate();
        if (!boolean) {
            alert('Fill All With Valid Details');
            return
        }
        let item = this.collectData()
        item._itemCode = 0;
        let st = {
            url: "http://localhost:8080/item",
            method: "POST",
            headers: {"Content-Type": "application/json"},
            timeout: 0,
            data: JSON.stringify(item).replaceAll("_", "")
        };
        $.ajax(st).done((resp) => {
            getAllItems()
            ob.clearFields()
            alert("Item Added Success ( ID:" + resp.itemCode + ")");
        })
    }
    updateItem() {
        let boolean = this.validate(1);
        if (!boolean) {
            alert('Fill All With Valid Details');
            return
        }
        let item = this.collectData();
        let setting = {
            url: "http://localhost:8080/item",
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            data: JSON.stringify(item).replaceAll("_", ""),
            timeout: 0,
            statusCode: {
                402: function () {
                    alert("Update Fail,You Cannot change ID provide Your Existing Id For Do Update Operation")
                }
            }
        }

        $.ajax(setting).done((resp) => {
            getAllItems()
            ob.clearFields()
            alert("Item Update Success")
        })

    }
    searchItem() {
        let code = $('#itemCode').val();
        if (!code) {
            alert('Input ID');
            return
        }
        let setting = {
            url: "http://localhost:8080/item?itemCode=" + code,
            method: "GET",
            timeout: 0,
            statusCode: {
                402: function () {
                    alert("Customer Not Found")
                }
            }
        }
        $.ajax(setting).done((resp) => {
            $('#itemName').val(resp.itemName)
            $('#itemPrice').val(resp.itemPrice)
            $('#itemQty').val(resp.itemQty)
        });
    }

    clearFields(){
        $('#itemCode').val("");
        $('#itemName').val("");
        $('#itemPrice').val("");
        $('#itemQty').val("");
    }

    deleteItem() {
        let boolean = this.validate(1);
        if (!boolean) {
            alert('Insert ID And Search First');
            return
        }
        let item = this.collectData();
        let setting = {
            url: "http://localhost:8080/item?itemCode=" + item._itemCode,
            method: "DELETE",
            timeout: 0,
            statusCode: {
                402: function () {
                    alert("Delete Operation Failed")
                }
            }
        }
        $.ajax(setting).done((resp) => {
            getAllItems()
            ob.clearFields()
            alert("Deleted Success")
        })
    }

    collectData() {
        return new Item($('#itemCode').val(), $('#itemName').val(), $('#itemPrice').val(), $('#itemQty').val());
    }

    validate(op) {
        let item = this.collectData();
        if (op === 1)
            return !item._itemCode ? false : !item._itemName ? false : !item._itemPrice ? false : !item._itemQty ? false : true;
        return !item._itemName ? false : !item._itemPrice ? false : !item._itemQty ? false : true;
    }


}

var ob = new ItemController();

export function setTable(){
    $('#manageItem tbody').children().remove()
    let allItem = getAllItem();
    $.each(allItem,((i,e)=>{
        let tr = `<tr><td>${e._itemCode}</td><td>${e._itemName}</td><td>${e._itemPrice}</td><td>${e._itemQty}</td></tr>`;
        $('#manageItem tbody').append(tr)
    }))
}

export function getAllItems() {
    let setting = {
        url: "http://localhost:8080/item?type=all?",
        method: 'GET',
        timeout: 0
    };
    try {
        $.ajax(setting).done((resp) => {
            let item_arr = [];
            $.each(resp, (i, e) => {

                    item_arr.push(new Item(e.itemCode, e.itemName, e.itemPrice, e.itemQty))
                }
            );
            localStorage.setItem(itemDb,JSON.stringify(item_arr));

        }).always(function(jqXHR, textStatus) {
            setTable()
        });
    }catch (e) {
        console.log(e.toString())
        setTable();
    }

}