export const DOMAIN_URL =
  process.env.NODE_ENV == "development"
    ? "http://localhost:3000"
    : process.env.NEXT_PUBLIC_DOMAIN_URL;
