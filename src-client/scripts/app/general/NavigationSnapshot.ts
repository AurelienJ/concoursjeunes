import { UrlSegment } from '@angular/router';

export class NavigationSnapshot {
	public returnData : any;
	public returnDataType : string;

	public path : string[];

	constructor(public label : string, public currentUrl : UrlSegment[], public queryParams: any, public stateData : any) {
		this.path = NavigationSnapshot.getPath(currentUrl);
	}

	public toPathString() : string {
		let pathString = this.path.join("/");
		if(this.queryParams) {
			let params = [];
			for (var key in this.queryParams) {
				if (this.queryParams.hasOwnProperty(key)) {
					var element = this.queryParams[key];
					params.push(key+"="+element.toString());
				}
			}
			if(params.length > 0)
				pathString += "?"+params.join("&");
		}

		return pathString;
	}

	public static getPath(url : UrlSegment[]) : string[] {
		let path = url.map(u => u.path);
		path.unshift("/");
		return path;
	}
}