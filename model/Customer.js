export class Customer{
    constructor(id,name,address,mobileNo,birthday,gen) {
        this._id = id;
        this._name = name;
        this._address = address;
        this._mobileNo = mobileNo;
        this._birthday = birthday;
        this._gen=gen;
    }
    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get address() {
        return this._address;
    }

    set address(value) {
        this._address = value;
    }

    get mobileNo() {
        return this._mobileNo;
    }

    set mobileNo(value) {
        this._mobileNo = value;
    }

    get birthday() {
        return this._birthday;
    }

    set birthday(value) {
        this._birthday = value;
    }


    get gen() {
        return this._gen;
    }

    set gen(value) {
        this._gen = value;
    }

    toString(){
        return 'id : '+this._id+' Name : '+this._name+' address : '+this._address+' contact : '
            +this._mobileNo+' birthday : '+this._birthday+' : '+this._gen
    }
}