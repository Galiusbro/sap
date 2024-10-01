import jsonServerProvider from "ra-data-json-server";

export const dataProvider = jsonServerProvider(
  import.meta.env.SERVER_URL,
  // import.meta.env.VITE_JSON_SERVER_URL,
);
