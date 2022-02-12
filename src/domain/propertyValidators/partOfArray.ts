// todo research https://www.digitalocean.com/community/tutorials/how-to-create-custom-types-in-typescript to create a custom type instead of a class
export default class partOfArray<arrayType extends Array<valueType>, valueType>
{
    private _array: arrayType;
    private _value: valueType;

    get getValue(): valueType
    {
        return this._value;
    }

    set setArray(value: arrayType)
    {
        this._array = value;
    }

    set setValue(value: valueType)
    {
        if (this._array === null) throw new Error("Array must be defined before value");

        if (!this._array.find(x => x == value)) throw new Error("Value not available in provided array");
    }
}