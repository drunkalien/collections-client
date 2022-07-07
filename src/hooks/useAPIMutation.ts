import { AxiosResponse } from "axios";
import { useMutation, UseMutationOptions } from "react-query";
import { request } from "../services";

type Args<Response, Error, Variables> = {
  url: string;
  method?: "POST" | "DELETE" | "PUT" | "PATCH";
  options?: UseMutationOptions<AxiosResponse<Response>, Error, Variables>;
  params?: object;
};

const useAPIMutation = <Variables = any, Response = any, Error = any>({
  method = "POST",
  options = {},
  url,
  params,
}: Args<Response, Error, Variables>) =>
  useMutation((variables) => {
    const response = request({ method: method, url, params, data: variables });
    return response;
  }, options);

export default useAPIMutation;
