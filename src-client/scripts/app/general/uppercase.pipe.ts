import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "upperCase"
})
export class UpperCasePipe implements PipeTransform {
    transform(value: any, args: string[]): any {
        if (value && typeof value == "string")
			return value.toLocaleUpperCase();
    }
}