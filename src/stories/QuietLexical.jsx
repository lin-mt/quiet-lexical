import React from 'react';
import {LexicalComposer} from "@lexical/react/LexicalComposer";
import './QuietLexical.css'

export const QuietLexical = () => {

  const editorConfig = {
    namespace: 'QuietLexical',
    nodes: [],
    onError(error) {
      throw error;
    },
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className={'quiet-lexical'}>
        Quiet Lexical
      </div>
    </LexicalComposer>
  );
};
