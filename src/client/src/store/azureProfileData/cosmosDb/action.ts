import { ISaveCosmosDbSettingsAction, IRemoveCosmosDbSettingsAction, ISetCosmosAccountNameAvailabilityAction } from "./model";
import { AZURE_TYPEKEYS } from "../typeKeys";
import { IAvailabilityFromExtensionAction } from "../azure/model";

export const saveCosmosDbSettingsAction = (
  cosmosDbSettings: any
): ISaveCosmosDbSettingsAction => ({
  type: AZURE_TYPEKEYS.SAVE_COSMOS_DB_RESOURCE_SETTINGS,
  payload: cosmosDbSettings
});

export const removeCosmosSelectionAction = (
  selectionIndex: number
): IRemoveCosmosDbSettingsAction => ({
  type: AZURE_TYPEKEYS.REMOVE_COSMOS_RESOURCE,
  payload: selectionIndex
});