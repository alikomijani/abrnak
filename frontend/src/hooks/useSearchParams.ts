import { PaginationParams } from "@/api/types";
import { paramsToObject } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useDebounceValue } from "usehooks-ts";

export function useSearchParams<T extends PaginationParams>(defaultValue: T) {
  const [params, setParams] = useState<T>(defaultValue);
  const [debouncedParams] = useDebounceValue(params, 500);

  const location = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams();
    Object.keys(params).forEach((key) => {
      if (params[key as keyof T]?.toString()) {
        searchParams.set(key, params[key as keyof T]?.toString() || "");
      }
    });
    nav(location.pathname + "?" + searchParams.toString());
  }, [params]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const paramsObject = paramsToObject(searchParams.entries());
    setParams({
      ...defaultValue,
      ...paramsObject,
    });
  }, [location.search]);
  return { params, setParams, debouncedParams };
}
