import notNull from "./propertyValidators/notNull";
import partOfArray from "./propertyValidators/partOfArray";


export default class locationAddress 
{
    streetName: notNull<string> = new notNull<string>()
    streetNumber: number = null;
    postalCode: number = null;
    cityName: string = null;
    companyName: string = null;
    testList: partOfArray<Array<string>, string> = new partOfArray<Array<string>, string>();

    constructor(streetName: string, streetNumber: number)
    {
        this.streetName.setValue = streetName;
        this.streetNumber = streetNumber;
        this.postalCode = null;
        this.cityName = null;
        this.companyName = null;
        this.testList.setArray = new Array<string>("test");
        this.testList.setValue = "test"; 
    }
}