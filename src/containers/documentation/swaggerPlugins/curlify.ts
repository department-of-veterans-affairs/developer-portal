import Swagger, { RequestOptions, SwaggerMapValues } from 'swagger-client';
import Im from 'immutable';

export const curlify = (requestOptions: RequestOptions): string => {
  let request = Im.fromJS(Swagger.buildRequest(requestOptions)) as Im.Map<string, SwaggerMapValues>;
  let curlified = [];
  let type = '';
  let newline = ' \\\r\n';
  let headers = request.get('headers') as Im.Map<string, string>;
  let method = request.get('method') as string;
  let url = request.get('url') as string;
  let body = request.get('body') as Im.Map<string, SwaggerMapValues>;

  curlified.push('curl -X ', `${method} `, `'${url}'`);

  if (headers && headers.size) {
    const headerEntries = Object.entries(headers.toJS() as { [header: string]: string });
    for (let [header, value] of headerEntries) {
      curlified.push(newline, '--header ', `'${header}: ${value}'`);
      if (header.toLowerCase() === 'content-type') {
        type = value;
      }
    }
  }

  if (body && method === 'POST') {
    if (type === 'multipart/form-data') {
      const bodyEntries = Object.entries(body.toJS() as { [prop: string]: unknown });
      for (let [key, value] of bodyEntries) {
        curlified.push(newline, '-F');
        if (value instanceof window.File) {
          curlified.push(
            newline,
            `'${key}=@${value.name}${value.type ? `;type=${value.type}` : ''}'`,
          );
        } else {
          curlified.push(newline, `'${key}=${value as string}'`);
        }
      }
    } else {
      curlified.push(newline, '--data-raw ', `'${JSON.stringify(request.get('body'), null, 2)}'`);
    }
  }

  return curlified.join('');
};
