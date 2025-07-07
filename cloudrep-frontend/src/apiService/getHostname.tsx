const getHostname = () => {
  return {
    mode: "prod",
    host: typeof window !== "undefined" ? window.location.host : "",
    hostname: typeof window !== "undefined" ? window.location.hostname : "",
    backendurl: process.env.NEXT_PUBLIC_BACKEND_URL + "/api",
  };
};
export default getHostname;
