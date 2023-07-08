const itemDb = "ITEMDATA"

export function search(id){
    let item = localStorage.getItem(itemDb);
    let parse = JSON.parse(item);
    return parse.find(obj=>obj._itemCode==id)
}