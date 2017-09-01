import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tableFilter'
})
export class TableFilterPipe implements PipeTransform {
    transform(value: any, args: string[]): any {

        let filter : string= null;
        if (args[0])
            filter = args[0].toLocaleLowerCase();
        return filter ? value.filter(item => {
            for (var key in item) {
                if (item.hasOwnProperty(key)) {
                    var element : any = item[key];
                    if (element && typeof element == "string" && element.toLocaleLowerCase().indexOf(filter) != -1)
                        return true;
                }
            }
            return false;
        }) : value;
    }
}
