export default class notEmpty<valueType>
{
    private _value: valueType;

    get getValue(): valueType 
    {
        return this._value;
    }

    set setValue(value: any)
    {
        if (value === null || value === "") throw new Error("value can not be empty");

        this._value = value;
    }
}