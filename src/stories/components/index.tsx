import {FC} from "react";
import {Button, ButtonProps, Divider, DividerProps, Tooltip} from "antd";

export const ToolbarButton: FC<ButtonProps & { tooltip?: string }> = ({...rest}) => {
  return (
    <Tooltip title={rest.tooltip}>
      <Button {...rest} type="text"/>
    </Tooltip>
  );
};

export const ToolbarDivider: FC<DividerProps> = ({...rest}) => {
  return (<Divider type={'vertical'} style={{height: 'auto', top: 'unset'}} {...rest}/>
  );
};
