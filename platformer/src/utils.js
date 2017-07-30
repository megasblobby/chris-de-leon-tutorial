"use strict";

function clamp(value, minValue, maxValue) {
	if (value < minValue)
		value = minValue;
	if (value > maxValue)
		value = maxValue;

	return value;
}

function clampToMinimum(value, minValue) {
	if (value < minValue)
		value = minValue;
    
	return value;
}
