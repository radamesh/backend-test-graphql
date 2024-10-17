export const axios = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  head: jest.fn(),
  patch: jest.fn(),
  request: jest.fn(),
  interceptors: {
    request: { use: jest.fn() },
    response: { use: jest.fn() }
  }
};

jest.mock("axios", () => {
  return {
    ...axios,
    create: jest.fn().mockImplementation(() => {
      return axios;
    })
  };
});
