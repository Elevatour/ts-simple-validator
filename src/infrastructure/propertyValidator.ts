import validateResponse from "../domain/validateResponse/validateResponse";
import validateResponseItem from "../domain/validateResponse/validateResponseItem";
import { ClassValidatorBuilder } from "./classValidator";

class DefinedRuleSet
{
    functionName: string;
    definedFunction: Function;
}

export class PropertyValidatorBuilder<baseClass, caller extends ClassValidatorBuilder<baseClass>>
{
    propertyRules: Array<DefinedRuleSet> = new Array<DefinedRuleSet>();
    propertyGetter: Function;

    private _caller: caller;

    private _pushPropertyRules(ruleName: string, ruleFunction: Function): void 
    {
        // * only create rule when it is not already created
        if (!this.propertyRules.find(x => x.functionName === ruleName))
        {
            this.propertyRules.push(
                {
                    functionName: ruleName,
                    definedFunction: ruleFunction
                });
        }
    }

    notNull(): PropertyValidatorBuilder<baseClass, caller>
    {
        this._pushPropertyRules("notNull", (value: any, propertyName: string) => 
        {
            if (value === null) return new validateResponseItem(propertyName, "Value can not be null")
        });

        return this;
    }

    notEmpty(): PropertyValidatorBuilder<baseClass, caller>
    {
        this._pushPropertyRules("notEmpty", (value: any, propertyName: string) => 
        {
            if (value === null || value === "") return new validateResponseItem(propertyName, "Value can not be empty")
        });

        return this;
    }

    partOfArray(list: Array<any>): PropertyValidatorBuilder<baseClass, caller>
    {
        this._pushPropertyRules("partOfArray", (value: any, propertyName: string) => 
        {
            if (!list.find(x => x === value)) return new validateResponseItem(propertyName, "Value not part of array")
        });

        return this;
    }

    build(): caller
    {
        this._caller.propertyValidators.push(new PropertyValidator<baseClass>(this.propertyRules, this.propertyGetter));
        return this._caller;
    }

    constructor(propertyGetter: Function, caller: caller)
    {
        this.propertyGetter = propertyGetter;
        this._caller = caller;
    }
}

export class PropertyValidator<baseClass>
{
    private _ruleSet: Array<DefinedRuleSet> = new Array<DefinedRuleSet>();
    private _propertyGetter: Function;

    validateResponse(selectedClass: baseClass): validateResponse
    {
        var response: validateResponse = new validateResponse();

        this._ruleSet.forEach(rule => 
        {
            var validation = rule.definedFunction(this._propertyGetter(selectedClass), getPropertyName(this._propertyGetter));

            if (validation != null)
            {
                response.success = false;
                response.items.push(validation);
            }
        })

        return response;
    }

    constructor(ruleSet: any, propertyGetter: Function)
    {
        this._ruleSet = ruleSet;
        this._propertyGetter = propertyGetter;
    }
}

// todo resolve it in runtime (override string value with the correct property name)
function getPropertyName(propertyFunction: Function): string
{
    return /\.([^\.;]+);?\s*\}$/.exec(propertyFunction.toString())[1];
}