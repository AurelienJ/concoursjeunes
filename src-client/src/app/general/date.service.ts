import { Injectable }    from '@angular/core';

@Injectable()
export class DateService {
	public jsonWithDate(value : string) : any {
		return JSON.parse(value, this.dateReviver);
	}

	private dateReviver(key : any, value : any) {
		var a;
		if (typeof value === 'string') {
			a = /^(\d{4})-(\d{2})-(\d{2})(T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)(Z|[\+-]\d{2}:?(\d{2})?))?$/.exec(value);
			if (a) {
				return new Date(value);
			}
		}
		return value;
	};
}