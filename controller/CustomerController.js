import {Customer} from "../model/Customer.js";

class CustomerController{
    constructor() {
        console.log('called')
        $('#manageCustomer .buttons button:first-child').click(this.addCustomer.bind(this));
        $('#manageCustomer .buttons button:nth-child(2)').click(this.searchCustomer.bind(this));
        $('#manageCustomer .buttons button:nth-child(4)').click(this.updateCustomer.bind(this));
        $('#manageCustomer .buttons button:nth-child(5)').click(this.deleteCustomer.bind(this));

    }

    addCustomer(){
        let boolean = this.validate();
        if(!boolean){
            alert("Fill All With Valid Details")
        }

        let customer = this.collectData();
        console.log(customer.toString());
    }
    updateCustomer(){
        let boolean = this.validate(1);
        if(!boolean){
            alert("Fill All With Valid Details")
        }
        let customer = this.collectData();
        console.log(customer.toString());
    }

    searchCustomer(){
        let id = $('#id').val();
        if(!id){
            alert("Enter Id")
            return;
        }
        let customer = this.collectData();
        console.log(customer.toString());
        //fetch customer

    }

    deleteCustomer(){
        let boolean = this.validate(1);
        if(!boolean){
            alert('Enter Id and Search First');
            return
        }
        let customer = this.collectData();
        console.log(customer.toString());
    }


    collectData(){
        return new Customer($('#id').val(), $('#name').val(), $('#address').val(), $('#contact').val()
            ,  $('#birthDay').val(), $('.gender input[type=radio]:checked').eq(0).val());
    }

    validate(op){
        let customer = this.collectData();
        let s = /^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\d)\d{6}$/;
        if(op===1){
            return !customer._id ? false : !customer._name ?false : !s.test(customer._mobileNo) ? false :
                !customer._birthday ? false : !customer._gen ? false : true;
        }
        return !customer._name ?false : !s.test(customer._mobileNo) ? false :
            !customer._birthday ? false : !customer._gen ? false : true;
    }


}
new CustomerController();