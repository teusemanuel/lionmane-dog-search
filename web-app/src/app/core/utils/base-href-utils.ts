import { PlatformLocation } from '@angular/common';

export const getBaseHref = (platformLocation: PlatformLocation): string => {
	let url = platformLocation.getBaseHrefFromDOM();
	if (!url || url.length <= 1) {
		url = `${platformLocation.protocol}//${platformLocation.hostname}${platformLocation.port ? ':' + platformLocation.port : ''}/`;
	} else if (!url.startsWith('http')) {
		url = `${platformLocation.protocol}//${platformLocation.hostname}${platformLocation.port ? ':' + platformLocation.port : ''}${url}`;
	}
	return url;
};
