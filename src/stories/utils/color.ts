import React from "react";
import type {GlobalToken} from "antd/es/theme/interface";


export function getActiveBgColor(isActive: boolean, token: GlobalToken): React.CSSProperties {
  return isActive ? {backgroundColor: token.controlItemBgActive} : {};
}
