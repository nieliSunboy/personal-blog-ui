import { OptionsObject, SnackbarKey } from "notistack";

export const ToasterKeys = new Set<SnackbarKey>();

export class message {
  static info = (msg: string, option: OptionsObject = {}): SnackbarKey => {
    //inject
    return 0;
  };
  static warn = (msg: string, option: OptionsObject = {}): SnackbarKey => {
    //inject
    return 0;
  };
  static success = (msg: string, option: OptionsObject = {}): SnackbarKey => {
    //inject
    return 0;
  };
  static error = (msg: string, option: OptionsObject = {}): SnackbarKey => {
    //inject
    return 0;
  };
  static close = (key: SnackbarKey): void => {
    //inject
  };
}
