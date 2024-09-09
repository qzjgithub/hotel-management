import axios from "axios";

export const aiAxiosInstance = axios.create({});

export const parseJson = (str: string) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return str;
  }
}

aiAxiosInstance.interceptors.request.use(
  (conf) => {
    return conf;
  }
);
aiAxiosInstance.interceptors.response.use(
  (conf) => {
    return conf.data;
  },
  (error) => {
    const responseData = error.response.data;
    console.log(error);
    if (responseData.readable) {
      const arr: any = [];
      return new Promise((resolve, reject) => {
        responseData.on('data', (data: any) => arr.push(data));
        responseData.on('end', () => {
          try {
            const buffer = Buffer.concat(arr);
            const jsonData = parseJson(buffer.toString('utf-8'));
            reject({
              message: error.message,
              data: typeof jsonData === 'string' ? jsonData : jsonData?.error
            });
          } catch (e: any) {
            console.log(e);
            reject({
              message: e.message
            });
          }
        });
      });
    } else {
      return Promise.reject({
        message: error.response.data?.error?.message || error.response.data?.message || error.message,
        data: error.response.data
      });
    }
  }
);