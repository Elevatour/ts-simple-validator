import validateResponse from "../domain/validateResponse/validateResponse";
import { PropertyValidator, PropertyValidatorBuilder } from "./propertyValidator";

export class ClassValidatorBuilder<baseClass>
{
    propertyValidators: Array<PropertyValidator<baseClass>>;

    setPropertyRule<property>(propertyGetter: (selectedClass: baseClass) => property)
        : PropertyValidatorBuilder<baseClass, ClassValidatorBuilder<baseClass>>
    {
        return new PropertyValidatorBuilder<baseClass, ClassValidatorBuilder<baseClass>>(propertyGetter, this);
    }

    buildClassValidator(): ClassValidator<baseClass>
    {
        return new ClassValidator<baseClass>(this.propertyValidators);
    }

    constructor()
    {
        this.propertyValidators = new Array<PropertyValidator<baseClass>>();
    }
}

export class ClassValidator<baseClass>
{
    private propertyValidators: Array<PropertyValidator<baseClass>>;

    validate(selectedClass: baseClass): Array<validateResponse>
    {
        var response: Array<validateResponse> = new Array<validateResponse>();
        this.propertyValidators.forEach(validator => response.push(validator.validateResponse(selectedClass)))
        return response;
    }

    constructor(propertyValidators: Array<PropertyValidator<baseClass>>)
    {
        this.propertyValidators = propertyValidators;
    }
}