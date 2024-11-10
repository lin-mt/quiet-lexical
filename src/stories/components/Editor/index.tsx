import React, {CSSProperties, useState} from "react";
import ToolbarPlugin from "../../plugins/ToolbarPlugin";
import {theme} from "antd";

import './index.css'
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {RichTextPlugin} from "@lexical/react/LexicalRichTextPlugin";
import {LexicalErrorBoundary} from "@lexical/react/LexicalErrorBoundary";
import {ContentEditable} from "@lexical/react/LexicalContentEditable";
import {HistoryPlugin} from "@lexical/react/LexicalHistoryPlugin";
import {ListPlugin} from "@lexical/react/LexicalListPlugin";
import {CheckListPlugin} from "@lexical/react/LexicalCheckListPlugin";
import CodeHighlightPlugin from "../../plugins/CodeHighlightPlugin";

type EditorProps = {
  placeholder?: string;
}

export default function Editor({placeholder = '请输入内容...'}: EditorProps): React.JSX.Element {

  const {token} = theme.useToken()
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);
  const [isSmallWidthViewport, setIsSmallWidthViewport] =
    useState<boolean>(false);
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

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
      <RichTextPlugin
        contentEditable={
          <div className="editor-scroller">
            <div className="editor" ref={onRef}>
              <ContentEditable
                className={'content-editable'}
                aria-placeholder={placeholder}
                placeholder={
                  <div className={'content-editable-placeholder'} style={{color: token.colorTextPlaceholder}}>
                    {placeholder}
                  </div>
                }
              />
            </div>
          </div>
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin/>
      <ListPlugin/>
      <CheckListPlugin/>
      <CodeHighlightPlugin/>

    </div>
  );
};
