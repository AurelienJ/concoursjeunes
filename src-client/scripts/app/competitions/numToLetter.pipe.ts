import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'numToLetter'
})

export class NumToLetterPipe implements PipeTransform {
	transform(value: any, ...args: any[]): any {
		if(value == undefined || value == null)
			return null;
			
		return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(value);
	}
}