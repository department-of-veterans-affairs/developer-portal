import Swagger from "swagger-client";
import Im from "immutable";

// Usage:
// See: https://github.com/swagger-api/swagger-js#tryitout-executor
// options: {
// spec,
//
// operationId, // Either operationId, or you can use pathName + method
// (pathName),
// (method),
//
// parameters, // _named_ parameters in an object, eg: { petId: 'abc' }
// securities, // _named_ securities, will only be added to the request, if the spec indicates it. eg: {apiKey: 'abc'}
// requestContentType,
// responseContentType,
//
// (http), // You can also override the HTTP client completely
// (userFetch), // Alternatively you can just override the fetch method (if you want to use request.js or some other HttpAgent)
// }
// --------------------
// Example:
// let options = {
//   spec: system.spec().toJS().json,
//   operationId: 'postBenefitsDocumentUpload'
//   securities: {
//      authorized: {
//        apikey: '123'
//      }
//   }
// }
// system.fn.curlify(options)

export const curlify = function(requestOptions) {
  let request = Im.fromJS(Swagger.buildRequest(requestOptions));
  let curlified = [];
  let type = "";
  let headers = request.get("headers");
  curlified.push("curl");
  curlified.push("-X", request.get("method"));
  curlified.push(`"${request.get("url")}"`);

  if (headers && headers.size) {
    for (let p of request.get("headers").entries()) {
      let [h, v] = p;
      type = v;
      curlified.push("-H ");
      curlified.push(`"${h}: ${v}"`);
    }
  }

  if (request.get("body")) {
    if (type === "multipart/form-data" && request.get("method") === "POST") {
      for (let [k, v] of request.get("body").entrySeq()) {
        curlified.push("-F");
        if (v instanceof window.File) {
          curlified.push(`"${k}=@${v.name}${v.type ? `;type=${v.type}` : ""}"`);
        } else {
          curlified.push(`"${k}=${v}"`);
        }
      }
    } else {
      curlified.push("-d");
      curlified.push(JSON.stringify(request.get("body")).replace(/\\n/g, ""));
    }
  }

  return curlified.join(" ");
};
