import "swagger-ui-react/swagger-ui.css";
import dynamic from "next/dynamic";

const SwaggerUI = dynamic(import("swagger-ui-react"), { ssr: false });
function APIDoc() {
  const mode = process.env.NODE_ENV;
  let jsonUrl = "/openapi.json";
  if (mode === "development") {
    jsonUrl = "/openapi_dev.json";
  } else {
    jsonUrl = "/openapi.json";
  }
  console.log(process.env.NODE_ENV);
  return (
    <>
      <SwaggerUI url={jsonUrl} />
    </>
  );
}

export default APIDoc;
