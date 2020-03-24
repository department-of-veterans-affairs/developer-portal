import Swagger from "swagger-client";
import Im from "immutable";

export const curlify = function(requestOptions) {
  let request = Im.fromJS(Swagger.buildRequest(requestOptions));
  let curlified = [];
  let type = "";
  let newline = " \\\r\n";
  let headers = request.get("headers");
  let method = request.get("method");
  let url = request.get("url");
  let body = request.get("body");

  curlified.push("curl -X ", `${method} `, `'${url}'`);

  if (headers && headers.size) {
    for (let p of headers.entries()) {
      let [h, v] = p;
      type = v;
      curlified.push(newline, "--header ", `'${h}: ${v}'`);
    }
  }

  if (request.get("body")) {
    if (method === "POST") {
      if (type === "multipart/form-data") {
        for (let [k, v] of request.get("body").entrySeq()) {
          curlified.push(newline, "-F");
          if (v instanceof window.File) {
            curlified.push(newline, `'${k}=@${v.name}${v.type ? `;type=${v.type}` : ""}'`);
          } else {
            curlified.push(newline, `'${k}=${v}'`);
          }
        }
      } else {
        curlified.push(newline, "--data-raw ", `'${JSON.stringify(request.get("body"), null, 2)}'`);
      }
    }
  }

  return curlified.join("");
};
