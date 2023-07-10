export class DashBoardController{
    constructor() {
        getOrderCount()
        getCustomerCount()
    }



    getCustomerCount(){

    }

}
new DashBoardController();

export function getOrderCount(){
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
export function getCustomerCount(){
    let setting={
        url:"http://localhost:8080/dashboard?switch=customerCount",
        method:"GET",
        timeout:0
    }

    $.ajax(setting).done(resp=>{
        $('#customerCount').text(resp)
        console.log(resp)
    })
}