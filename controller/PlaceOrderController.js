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
            console.log(find.text())
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