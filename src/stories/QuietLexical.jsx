import React from 'react';
import {LexicalComposer} from "@lexical/react/LexicalComposer";
import './QuietLexical.css'
import Editor from "./components/Editor";
import PlaygroundEditorTheme from "./themes/EditorTheme";

export const QuietLexical = () => {

  const editorConfig = {
    namespace: 'QuietLexical',
    nodes: [],
    onError(error) {
      throw error;
    },
    theme: PlaygroundEditorTheme,
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className={'quiet-lexical'}>
        <Editor editorConfig={editorConfig}/>
      </div>
    </LexicalComposer>
  );
};
