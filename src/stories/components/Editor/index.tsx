import React, {CSSProperties, useEffect, useState} from "react";
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
import FloatingLinkEditorPlugin from "../../plugins/FloatingLinkEditorPlugin";
import {LinkPlugin} from "@lexical/react/LexicalLinkPlugin";
import {CAN_USE_DOM} from "@lexical/utils";
import {HorizontalRulePlugin} from "@lexical/react/LexicalHorizontalRulePlugin";
import PageBreakPlugin from "../../plugins/PageBreakPlugin";

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

  useEffect(() => {
    const updateViewPortWidth = () => {
      const isNextSmallWidthViewport =
        CAN_USE_DOM && window.matchMedia('(max-width: 1025px)').matches;

      if (isNextSmallWidthViewport !== isSmallWidthViewport) {
        setIsSmallWidthViewport(isNextSmallWidthViewport);
      }
    };
    updateViewPortWidth();
    window.addEventListener('resize', updateViewPortWidth);

    return () => {
      window.removeEventListener('resize', updateViewPortWidth);
    };
  }, [isSmallWidthViewport]);

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
      <LinkPlugin/>
      <HorizontalRulePlugin />
      <PageBreakPlugin />
      {floatingAnchorElem && !isSmallWidthViewport && (
        <>
          <FloatingLinkEditorPlugin
            anchorElem={floatingAnchorElem}
            isLinkEditMode={isLinkEditMode}
            setIsLinkEditMode={setIsLinkEditMode}
          />
        </>
      )}
    </div>
  );
};
