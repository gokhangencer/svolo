//package info
//https://www.npmjs.com/package/openai?activeTab=readme

import { Configuration, OpenAIApi } from 'openai';
import { SECRET_OPENAI_API_KEY } from '$env/static/private';

const configuration = new Configuration({
	apiKey: SECRET_OPENAI_API_KEY
});

export const openai = new OpenAIApi(configuration);
