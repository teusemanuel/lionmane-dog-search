import { ThemePalette } from '@angular/material/core';

export interface Icon {
	/* name of the icon */
	icon: string;

	/* color of the icon */
	color?: ThemePalette;

	/* Define if the icon is from SVG file */
	isSVG?: boolean;
	inline?: boolean;

	/* area-label of the icon */
	areaLabel?: string;

	/* custom class of the icon */
	customClass?: string;
}
