import { WIZARD_INFO_TYPEKEYS, WIZARD_CONTENT_TYPEKEYS } from "../typeKeys";
import { IOption } from "../../../types/option";

export interface ISetVisitedPageAction {
  type: WIZARD_INFO_TYPEKEYS.SET_VISITED_WIZARD_PAGE;
  payload: string;
}

export interface IResetVisitedPageAction {
  type: WIZARD_INFO_TYPEKEYS.RESET_VISITED_WIZARD_PAGE;
}

export interface ISetPageAction {
  type: WIZARD_INFO_TYPEKEYS.SET_PAGE_WIZARD_PAGE;
  payload: string;
}

export interface IDetail {
  data: IOption;
  isIntlFormatted: boolean;
}

export interface ISetDetails {
  type: WIZARD_INFO_TYPEKEYS.SET_DETAILS_PAGE_INFO;
  payload: IDetail;
}

export interface IPageOptionsActionType {
  type: WIZARD_CONTENT_TYPEKEYS.GET_PAGES_OPTIONS_SUCCESS;
  payload: IOption[];
}