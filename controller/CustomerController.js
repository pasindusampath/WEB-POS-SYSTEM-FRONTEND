import {Customer} from "../model/Customer.js";
import {getAllCustomers} from "../db/Database.js";

const customerDb = 'CUSTOMERDATA';

class CustomerController {


    constructor() {
        $('#manageCustomer .buttons button:first-child').click(this.addCustomer.bind(this));
        $('#manageCustomer .buttons button:nth-child(2)').click(this.searchCustomer.bind(this));
        $('#manageCustomer .buttons button:nth-child(4)').click(this.updateCustomer.bind(this));
        $('#manageCustomer .buttons button:nth-child(5)').click(this.deleteCustomer.bind(this));
        this.getAll();

    }

    addCustomer() {
        let boolean = this.validate();
        if (!boolean) {
            alert("Fill All With Valid Details");
            return;
        }
        let customer = this.collectData();
        customer._id = 0;
        let json = JSON.stringify(customer);
        let jsonData = json.replaceAll('_', '');
        var setting = {
            url: "http://localhost:8080/customer",
            method: "POST",
            timeout: 0,
            headers: {"Content-Type": "application/json"},
            data: jsonData

        }
        $.ajax(setting).done(function (resp) {
            c1.clearFields();
            alert(customer._name + " Registered Success ( ID:" + resp.id + " )")
            c1.getAll();
        });
    }

    updateCustomer() {
        let boolean = this.validate(1);
        if (!boolean) {
            alert("Fill All With Valid Details")
            return
        }
        let customer = this.collectData();
        let data = JSON.stringify(customer);
        let send = data.replaceAll("_", "");

        var setting = {
            "url": "http://localhost:8080/customer",
            "method": "PUT",
            "headers": {"Content-Type": "application/json"},
            "data": send
        };

        $.ajax(setting).done(function () {
            c1.clearFields();
            alert("Update Success")
            c1.getAll();
        });

    }

    searchCustomer() {
        let id = $('#id').val();
        if (!id) {
            alert("Enter Id")
            return;
        }
        var settings = {
            "url": "http://localhost:8080/customer?id=" + id,
            "method": "GET",
            "timeout": 0,
        };

        $.ajax(settings).done(function (resp) {
            console.log(resp);
            $('#id').val(resp.id);
            $('#name').val(resp.name);
            $('#address').val(resp.address);
            $('#birthDay').val(resp.birthday);
            $('#contact').val(resp.mobileNo);
            let i = 1;
            if (resp.gen === 'Male') {
                i = 0;
            }
            $('#manageCustomer .gender input[type=radio]').eq(i).prop({"checked": true})
        });

    }

    deleteCustomer() {
        let boolean = this.validate(1);
        if (!boolean) {
            alert('Enter Id and Search First');
            return
        }
        let id = $('#id').val();
        let setting = {
            "url": "http://localhost:8080/customer?id=" + id,
            "method": "DELETE",
            "timeout": 0,

        }
        $.ajax(setting).done((resp) => {
            alert("Delete Success");
            c1.clearFields();
            this.getAll();
        })


    }

    clearFields() {
        $('#id').val("");
        $('#name').val("");
        $('#address').val("");
        $('#contact').val("");
        $('#birthDay').val("");
        $('.gender input[type=radio]:checked').eq(0).prop("checked", "false");
    }

    getAll() {
        let setting = {
            "url": "http://localhost:8080/customer?type=all",
            "method": "GET",
            "timeout": 0
        }

        $.ajax(setting).done(resp => {

            let itemArr = [];
            $.each(resp, (i, e) => {
                itemArr.push(new Customer(e.id, e.name, e.address, e.mobileNo, e.birthday, e.gen))
            })
            ;
            localStorage.setItem(customerDb, JSON.stringify(itemArr))
        }).always((a, b) => {
            c1.setTable();
        })

    }

    setTable() {
        $('#manageCustomer tbody').children().empty();
        let allCustomers = getAllCustomers();
        $.each(allCustomers, (i, e) => {
            let row = `<tr><td>${e._id}</td><td>${e._name}</td><td>${e._address}</td><td>${e._mobileNo}</td><td>${e._birthday}</td><td>${e._gen}</td></tr>`;
            $('#manageCustomer tbody').append(row)
        })
    }

    collectData() {
        return new Customer($('#id').val(), $('#name').val(), $('#address').val(), $('#contact').val()
            , $('#birthDay').val(), $('.gender input[type=radio]:checked').eq(0).val());
    }

    validate(op) {
        let customer = this.collectData();
        let s = /^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\d)\d{6}$/;
        if (op === 1) {
            return !customer._id ? false : !customer._name ? false : !s.test(customer._mobileNo) ? false :
                !customer._birthday ? false : !customer._gen ? false : true;
        }
        return !customer._name ? false : !s.test(customer._mobileNo) ? false :
            !customer._birthday ? false : !customer._gen ? false : true;
    }


}

let c1 = new CustomerController();