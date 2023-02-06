import http from "./../config/http-common";

class HttpService {
  get(url: string): Promise<any> {
    return http.get(url);
  }

  create(url: string, data: any): Promise<any> {
    return http.post(url, data);
  }

  update(url: string, data: any): Promise<any> {
    return http.put(url, data);
  }

  delete(url: string): Promise<any> {
    return http.delete(url);
  }
}

export default new HttpService();
