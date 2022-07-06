import { AxiosResponse } from "axios";
import { useMutation, UseMutationOptions } from "react-query";
import { request } from "../services";

type Args<Response, Error, Variables> = {
  url: string;
  method?: "POST" | "DELETE" | "PUT" | "PATCH";
  options?: UseMutationOptions<AxiosResponse<Response>, Error, Variables>;
};

const useAPIMutation = <Variables = any, Response = any, Error = any>({
  method = "POST",
  options = {},
  url,
}: Args<Response, Error, Variables>) =>
  useMutation((variables) => {
    const response = request({ method: method, url, data: variables });
    return response;
  }, options);

export default useAPIMutation;
