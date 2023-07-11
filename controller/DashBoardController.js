export class DashBoardController{
    constructor() {
        getOrderCount()
        getCustomerCount();
        getIncomeData()
        //this.setChart()
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
    });
}
export function getCustomerCount(){
    let setting={
        url:"http://localhost:8080/dashboard?switch=customerCount",
        method:"GET",
        timeout:0
    }

    $.ajax(setting).done(resp=>{
        $('#customerCount').text(resp)
    })
}

export function getIncomeData(){
    let color = ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)', 'rgb(100, 200, 50)', 'rgb(0, 128, 255)', 'rgb(220, 20, 60)', 'rgb(128, 0, 128)', 'rgb(0, 0, 0)', 'rgb(255, 255, 0)', 'rgb(255, 165, 0)', 'rgb(70, 130, 180)', 'rgb(0, 128, 0)']
    let colors = [];
    let months=[];
    let values=[];
    let setting = {
        url:"http://localhost:8080/dashboard?switch=incomeData",
        method:"GET",
        timeout:0
    }

    try{
        $.ajax(setting).done(e => {
            console.log(e);
            for (let i = 0; i < e.length; i++) {
                months.push(e[i].month);
                values.push(e[i].amount);
                colors.push(color[i]);
            }
            setChart(months, values, colors);
        }).fail((a,b,c)=>{
            setChart(["loading failed", "loading failed"], [50, 50], ['rgb(54, 162, 235)', 'rgb(255, 205, 86)']);
        })
    }catch (e) {
        setChart(["loading failed", "loading failed"], [50, 50], ['rgb(54, 162, 235)', 'rgb(255, 205, 86)']);
    }



}

export function setChart(months,income,colors){
    const chartElement = document.getElementById('myChart');
    const chartData = {
        labels: months,
        datasets: [{
            label: 'Income',
            data: income,
            backgroundColor: colors,
            hoverOffset: 4
        }]
    };
    const chartConfig = {
        type: 'pie',
        data: chartData,
    };
    new Chart(chartElement, chartConfig)
}