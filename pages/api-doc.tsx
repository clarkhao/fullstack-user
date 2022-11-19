import "swagger-ui-react/swagger-ui.css";
import dynamic from "next/dynamic";

const SwaggerUI = dynamic(import("swagger-ui-react"), { ssr: false });
function APIDoc() {
    return (
      <>
        <SwaggerUI url="/openapi.json" />
      </>
    );
}

export default APIDoc;