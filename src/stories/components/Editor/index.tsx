import React, {CSSProperties, useState} from "react";
import ToolbarPlugin from "../../plugins/ToolbarPlugin";
import {theme} from "antd";

import './index.css'
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";

export default function Editor(): React.JSX.Element {

  const {token} = theme.useToken()
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);

  const containerStyle: CSSProperties = {
    borderRadius: token.borderRadius,
    borderColor: token.colorBorder,
    borderStyle: 'solid',
  }

  return (
    <div style={containerStyle} className={'editor-container'}>
      <ToolbarPlugin
        editor={editor}
        activeEditor={activeEditor}
        setActiveEditor={setActiveEditor}
        setIsLinkEditMode={setIsLinkEditMode}/>
      Quiet Lexical
    </div>
  );
};
