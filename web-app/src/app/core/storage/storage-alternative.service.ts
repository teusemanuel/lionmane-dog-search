import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class StorageAlternativeService { // fix error for incognito browsers
	private static structureLocalStorage: any = {};
	private prefix = '__unique__'; // Prefix all keys to avoid matching built-ins

	setItem = (key: string, value: string) => {
		StorageAlternativeService.structureLocalStorage[this.prefix + key] = value;
	};

	getItem = (key: string) => {
		if (typeof StorageAlternativeService.structureLocalStorage[this.prefix + key] !== 'undefined') {
			return StorageAlternativeService.structureLocalStorage[this.prefix + key];
		} else {
			return null;
		}
	};

	removeItem = (key: string) => {
		delete StorageAlternativeService.structureLocalStorage[this.prefix + key];
	};

	clear = () => {
		StorageAlternativeService.structureLocalStorage = {};
	};
}
