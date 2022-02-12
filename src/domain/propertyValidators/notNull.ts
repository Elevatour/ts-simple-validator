export default class notNULL<valueType> 
{
    private _value: valueType;

    get getValue(): valueType 
    {
        return this._value;
    }

    set setValue(value: any)
    {
        if (value === null) throw new Error("value can not be null");

        this._value = value;
    }
}