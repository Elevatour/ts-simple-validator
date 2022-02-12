import locationAddress from "./domain/locationAddress";
import { ClassValidatorBuilder } from "./infrastructure/classValidator";

var l = new ClassValidatorBuilder<locationAddress>()
    .setPropertyRule(r => r.cityName).notEmpty().notNull().build()
    .setPropertyRule(p => p.companyName).notEmpty().notNull().build()
    .buildClassValidator();

var d = new locationAddress("test", 2);
var a = new Array<string>("test")
var i1 = l.validate(d);
d.cityName = "test";
var i2 = l.validate(d);
console.log("test");