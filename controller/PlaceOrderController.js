import {search} from '../db/Database.js';
const itemdb = 'ITEMDATA';
export class PlaceOrderController{

    constructor() {
        this.setItemComboBox()
    }

    setItemComboBox(){
        $('#cbItem option').remove()
        let items = localStorage.getItem(itemdb);
        $.each(JSON.parse(items),(i,e)=>{
            let op = `<option>${e._itemCode}</option>`

            $('#cbItem').append($(op));

        });
        $('#cbItem').change(function (){
            let find = $(this).find('option:selected');
            let search1 = search(find.text());
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

}
new PlaceOrderController()