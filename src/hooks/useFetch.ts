  
  import { useEffect, useReducer, useState } from "react";
  
  interface State<DataType> {
    data?: DataType;
    error?: Error;
  }
  
  type Action<DataType> =
    | { type: "loading" }
    | { type: "success"; payload: DataType }
    | { type: "error"; payload: Error };
  
  export function useFetch<DataType = unknown>(
    url?: string,
    options?: RequestInit
  ): State<DataType> & { postData: (data: DataType) => void } {
    const [requestOptions, setRequestOptions] = useState<RequestInit | undefined>(
      options
    );
    const initialState: State<DataType> = {
      error: undefined,
      data: undefined,
    };
  
    const fetchReducer = (
      state: State<DataType>,
      action: Action<DataType>
    ): State<DataType> => {
      switch (action.type) {
        case "loading":
          return { ...initialState };
        case "success":
          return { ...initialState, data: action.payload };
        case "error":
          return { ...initialState, error: action.payload };
        default:
          return state;
      }
    };
  
    const [state, dispatch] = useReducer(fetchReducer, initialState);
  
    useEffect(() => {
      if (!url) return; // Do nothing if no URL is provided
  
      const fetchData = async () => {
        dispatch({ type: "loading" });
  
        try {
          const response = await fetch(url, requestOptions);
  
          if (!response.ok) {
            throw new Error(response.statusText);
          }
  
          const data = (await response.json()) as DataType;
          dispatch({ type: "success", payload: data });
        } catch (error) {
          dispatch({ type: "error", payload: error as Error });
        }
      };
  
      if (requestOptions?.method === "POST" && !requestOptions.body) {
        // Don't run if the request body is empty
        return;
      } else {
        fetchData();
      }
    }, [url, requestOptions]); // Re-run every time URL or request options is updated
  
    const postData = (data: DataType) => {
      // Update request options to trigger above re-render
      setRequestOptions({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    };
  
    return { ...state, postData };
  }
