import { AxiosError } from "axios";
import { ApiError } from "./common";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError<ApiError>;
  }
}
