import { AxiosHeaders } from 'axios';

type InitialStateType = {
  endpoint: string;
  query: string;
  variables: string;
  headers: string;
  parsedVariables: Record<string, unknown> | null;
  parsedHeaders: AxiosHeaders | null;
  stringifiedData: string;
};

export const initialState: InitialStateType = {
  endpoint: '',
  query: '',
  variables: '',
  headers: '',
  parsedVariables: null,
  parsedHeaders: null,
  stringifiedData: '',
};

export enum Types {
  SET_ENDPOINT,
  SET_QUERY,
  SET_VARIABLES,
  SET_HEADERS,
  SET_PARSED_VARIABLES,
  SET_PARSED_HEADERS,
  SET_STRINGIFIED_DATA,
}

type ActionType =
  | { type: Types.SET_ENDPOINT; payload: string }
  | { type: Types.SET_QUERY; payload: string }
  | { type: Types.SET_VARIABLES; payload: string }
  | { type: Types.SET_HEADERS; payload: string }
  | {
      type: Types.SET_PARSED_VARIABLES;
      payload: Record<string, unknown> | null;
    }
  | { type: Types.SET_PARSED_HEADERS; payload: AxiosHeaders | null }
  | { type: Types.SET_STRINGIFIED_DATA; payload: string }
  | Record<string, never>;

export const mainPageReducer = (
  state: InitialStateType,
  action: ActionType
) => {
  switch (action.type) {
    case Types.SET_ENDPOINT:
      return {
        ...state,
        endpoint: action.payload,
        query: '',
        stringifiedData: '',
      };
    case Types.SET_QUERY:
      return { ...state, query: action.payload };
    case Types.SET_VARIABLES:
      return { ...state, variables: action.payload };
    case Types.SET_HEADERS:
      return { ...state, headers: action.payload };
    case Types.SET_PARSED_VARIABLES:
      return { ...state, parsedVariables: action.payload };
    case Types.SET_PARSED_HEADERS:
      return { ...state, parsedHeaders: action.payload };
    case Types.SET_STRINGIFIED_DATA:
      return { ...state, stringifiedData: action.payload };
    default:
      return state;
  }
};
