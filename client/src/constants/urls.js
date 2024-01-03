import { ModelTypes } from "./types";

const Urls = {
	[ModelTypes.BASE]: ``,
	[ModelTypes.USER]: `/api/person`,
	[ModelTypes.CLASS]: `/api/class`,
};
export const BASE_URL = "http://localhost:8080";
export const url = (modelType, method) => {
	// Added base Url below - if there is an error just remove it
	return `${BASE_URL}${Urls[modelType]}/${method}`;
};
