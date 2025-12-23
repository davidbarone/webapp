interface HttpWrapperType {
  apiUrl: string;
  apiGet: (string) => Promise<any>;
  apiPost: (string, any) => Promise<any>;
  apiPut: (string, any) => Promise<any>;
  apiDelete: (string) => Promise<any>;
}

interface HttpWrapperConstructor {
  // prettier-ignore
  new(apiUrl: string): HttpWrapperType;
}

const HttpWrapper: HttpWrapperConstructor = function (
  this: HttpWrapperType,
  apiUrl: string
) {
  this.apiUrl = apiUrl;

  // GET Request
  this.apiGet = async (url) => {
    const response = await fetch(`${this.apiUrl}${url}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  };

  // POST Request
  this.apiPost = async (url, data) => {
    const response = await fetch(`${this.apiUrl}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  };

  // PUT Request
  this.apiPut = async (url, data) => {
    const response = await fetch(`${this.apiUrl}${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  };

  // DELETE Request
  this.apiDelete = async (url) => {
    const response = await fetch(`${this.apiUrl}${url}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return 'Resource deleted successfully';
  };
} as any;

export { HttpWrapper };
