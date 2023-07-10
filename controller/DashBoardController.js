export class DashBoardController{
    constructor() {
        this.getOrderCount();
    }

    getOrderCount(){
        let setting={
            url:"http://localhost:8080/dashboard?switch=orderCount",
            method:"GET",
            timeout:0
        }

        $.ajax(setting).done(resp=>{
            $('#orderCount').text(resp)
            console.log(resp)
        })
    }

    getCustomerCount(){

    }

}
new DashBoardController();