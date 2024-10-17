import "./axios";
import axios, { AxiosPromise } from "axios";
import { mocked } from "jest-mock";

export const MockedAxios = mocked(axios);

export const axiosMockHelper = {
  ok200: <T>(body: T): AxiosPromise<T> => axiosMockHelper.response(200, body),
  ok201: <T>(body: T): AxiosPromise<T> => axiosMockHelper.response(201, body),
  badRequest400: <T>(body: T): AxiosPromise<T> => axiosMockHelper.response(400, body),
  badRequest404: <T>(body: T): AxiosPromise<T> => axiosMockHelper.response(404, body),
  response: <T>(status: number, body: T): AxiosPromise<T> =>
    <AxiosPromise>Promise.resolve({
      status: status,
      data: body,
    }),
  reset: (): void => {
    MockedAxios.create.mockReturnValue(axios);
  },
};
