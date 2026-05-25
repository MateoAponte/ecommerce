function required(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

const env = {
  apiUrl: required(import.meta.env.VITE_API_URL, 'VITE_API_URL'),
  walmartApiUrl: required(import.meta.env.VITE_WALMART_API_URL, 'VITE_WALMART_API_URL'),
  appName: required(import.meta.env.VITE_APP_NAME, 'VITE_APP_NAME'),
  environment: import.meta.env.VITE_ENV,
  walmartApiKey: required(import.meta.env.VITE_WALMART_API_KEY, 'VITE_WALMART_API_KEY'),
};

export default env;
