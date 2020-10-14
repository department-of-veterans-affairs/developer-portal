import Swagger, { RequestOptions, SwaggerMapValues } from 'swagger-client';
import Im from 'immutable';

export const curlify = (requestOptions: RequestOptions): string => {
  /* eslint-disable @typescript-eslint/indent */
  const request = Im.fromJS(Swagger.buildRequest(requestOptions)) as Im.Map<
    string,
    SwaggerMapValues
  >;
  /* eslint-enable @typescript-eslint/indent */
  const curlified = [];
  let type = '';
  const newline = ' \\\r\n';
  const headers = request.get('headers') as Im.Map<string, string>;
  const method = request.get('method') as string;
  const url = request.get('url') as string;
  const body = request.get('body') as Im.Map<string, SwaggerMapValues>;

  curlified.push('curl -X ', `${method} `, `'${url}'`);

  if (headers && headers.size) {
    const headerEntries = Object.entries(headers.toJS() as { [header: string]: string });
    for (const [header, value] of headerEntries) {
      curlified.push(newline, '--header ', `'${header}: ${value}'`);
      if (header.toLowerCase() === 'content-type') {
        type = value;
      }
    }
  }

  if (body && method === 'POST') {
    if (type === 'multipart/form-data') {
      const bodyEntries = Object.entries(body.toJS() as { [prop: string]: unknown });
      for (const [key, value] of bodyEntries) {
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
