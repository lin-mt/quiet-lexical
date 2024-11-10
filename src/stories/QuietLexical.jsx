import React from 'react';
import {LexicalComposer} from "@lexical/react/LexicalComposer";
import './QuietLexical.css'
import Editor from "./components/Editor";
import EditorTheme from "./themes/EditorTheme";
import EditorNodes from "./nodes/EditorNodes";

export const QuietLexical = () => {

  const editorConfig = {
    namespace: 'QuietLexical',
    nodes: [...EditorNodes],
    onError(error) {
      throw error;
    },
    theme: EditorTheme,
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className={'quiet-lexical'}>
        <Editor editorConfig={editorConfig}/>
      </div>
    </LexicalComposer>
  );
};
