import { VSCODE_TYPEKEYS } from "./typeKeys";
import { PRODUCTION } from "../../utils/constants";
import mockVsCodeApi from "../../mockData/mockVsCodeApi";
import { IVSCodeAPIActionType, IVSCodeAPI } from "./model";

function vscodeApi(
  state: IVSCodeAPI = {
    isVsCodeApiAcquired: false,
    vscodeObject: mockVsCodeApi()
  },
  action: IVSCodeAPIActionType
) {
  switch (action.type) {
    case VSCODE_TYPEKEYS.GET_VSCODE_API:
      if (!state.isVsCodeApiAcquired) {
        const newState = { ...state };
        newState.isVsCodeApiAcquired = true;
        newState.vscodeObject =
          process.env.NODE_ENV === PRODUCTION
            ? //
              // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
              // @ts-ignore because function does not exist in dev environment
              acquireVsCodeApi()
            : mockVsCodeApi();
        return newState;
      }
      return state;
    default:
      return state;
  }
}

export default vscodeApi;
