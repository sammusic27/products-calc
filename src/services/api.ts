const BASE_URL = 'https://products-5e7f.restdb.io/rest/';
const urlParams = new URLSearchParams(window.location.search);
const X_APIKEY = urlParams.get('api-key');

type Options = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  body?: BodyInit,
  headers?: HeadersInit,
  params?: any,
}

export function api(queryData: Options){
  const {
    url,
    params,
    headers,
    ...options
  } = queryData;

  // migrate paging properties to api style
  if(params?.pageSize){
    params.page_size = params.pageSize;
    delete params.pageSize;
  }

  if(params?.pageNumber){
    params.page_number = params.pageNumber;
    delete params.pageNumber;
  }

  // build fetch url
  const fetchUrl = BASE_URL + url;
  const defaultHeaders: HeadersInit = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // @ts-ignore
    'x-apikey': X_APIKEY
  };

  // collect all fetch parameters
  const fetchParams: RequestInit = {
    credentials: 'same-origin',
    ...options,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
  };

  try{
    // stringify body if it exists
    if(options?.body){
      fetchParams.body = JSON.stringify(options.body);
    }
  }catch(e){
    return Promise.reject(e);
  }

  return fetch(fetchUrl, fetchParams).then((response: Response) => {
    // an error exist
    if (!response.ok) {
      return response.json().then((body) => {
        throw {
          ...body,
          statusCode: body.statusCode || response.status,
        };
      });
    }

    if (response.status === 204) {
      return {};
    }
    return response.json();
  });
}