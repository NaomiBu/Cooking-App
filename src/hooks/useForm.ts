import { useReducer, type ChangeEvent } from "react";
  
  type Action = {
    type: "update";
    field: string;
    inputType?: string;
    value: string;
  };
  
  export function useForm<FormData>(initialState: FormData) {
    function reducer(state: FormData, action: Action) {
      switch (action.type) {
        case "update":
          return {
            ...state,
            [action.field]:
              action.inputType === "number"
                ? parseInt(action.value)
                : action.value,
          };
        default:
          return state;
      }
    }
  
    const [formData, dispatch] = useReducer(reducer, initialState);
  
    const updateFormField = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      dispatch({
        type: "update",
        inputType: e.target.type,
        value: e.target.value,
        field: e.target.name,
      });
    };
  
    return { formData, updateFormField };
  }
  