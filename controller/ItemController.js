import {Item} from "../model/Item.js";

class ItemController{
    constructor() {
        $('#manageItem .buttons button').eq(0).click(this.addItem.bind(this));
        $('#manageItem .buttons button').eq(1).click(this.searchItem.bind(this));
        $('#manageItem .buttons button').eq(2).click(this.updateItem.bind(this));
        $('#manageItem .buttons button').eq(3).click(this.deleteItem.bind(this));
    }

    addItem(){
        let boolean = this.validate();
        if(!boolean){
            alert('Fill All With Valid Details');
            return
        }
        let item = this.collectData();
        console.log(item.toString())
    }

    updateItem(){
        let boolean = this.validate(1);
        if(!boolean){
            alert('Fill All With Valid Details');
            return
        }
        let item = this.collectData();
        console.log(item.toString())
    }

    searchItem(){
        let code = $('#itemCode').val();
        if(!code){
            alert('Input ID');
            return
        }
        let item = this.collectData();
        console.log(item.toString())
    }

    deleteItem(){
        let boolean = this.validate(1);
        if(!boolean){
            alert('Insert ID And Search First');
            return
        }
        let item = this.collectData();
        console.log(item.toString())
    }



    collectData(){
        return new Item($('#itemCode').val(),$('#itemName').val(),$('#itemPrice').val(),$('#itemQty').val());
    }

    validate(op){
        let item = this.collectData();
        if(op===1)
        return !item._itemCode ? false : !item._itemName ? false : !item._itemPrice ? false : !item._itemQty ? false : true;
        return !item._itemName ? false : !item._itemPrice ? false : !item._itemQty ? false : true;
    }

}
new ItemController();