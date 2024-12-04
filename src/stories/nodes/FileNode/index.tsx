import type {
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  EditorConfig,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from 'lexical';
import {$applyNodeReplacement, DecoratorNode} from 'lexical';
import * as React from 'react';
import {Suspense} from 'react';

export interface FilePayload {
  fileName: string;
  key?: NodeKey;
  href: string;
}

function $convertFileElement(domNode: Node): null | DOMConversionOutput {
  const span = domNode as HTMLSpanElement;
  const href = span.getAttribute("href");
  const fileName = span.getAttribute("fileName");
  if (!href || !fileName) {
    return null;
  }
  const node = $createFileNode({href, fileName});
  return {node};
}

export type SerializedFileNode = Spread<
  {
    fileName: string;
    href: string;
  },
  SerializedLexicalNode
>;

export class FileNode extends DecoratorNode<React.JSX.Element> {
  __href: string;
  __fileName: string;

  constructor(
    href: string,
    fileName: string,
    key?: NodeKey,
  ) {
    super(key);
    this.__href = href;
    this.__fileName = fileName;
  }

  static getType(): string {
    return 'file';
  }

  static clone(node: FileNode): FileNode {
    return new FileNode(
      node.__href,
      node.__fileName,
      node.__key,
    );
  }

  static importJSON(serializedNode: SerializedFileNode): FileNode {
    const {href, fileName} =
      serializedNode;
    return $createFileNode({
      href,
      fileName,
    });
  }

  static importDOM(): DOMConversionMap<HTMLSpanElement> | null {
    return {
      span: (domNode: HTMLSpanElement) => {
        if (!domNode.hasAttribute('fileName') || !domNode.hasAttribute('href')) {
          return null;
        }
        return {
          conversion: $convertFileElement,
          priority: 1,
        };
      },
    };
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('span');
    element.setAttribute('href', this.__href);
    element.setAttribute('fileName', this.__fileName);
    return {element};
  }

  exportJSON(): SerializedFileNode {
    return {
      fileName: this.getFileNameText(),
      href: this.getHref(),
      type: 'file',
      version: 1,
    };
  }

  // View

  createDOM(config: EditorConfig): HTMLElement {
    const span = document.createElement('span');
    const theme = config.theme;
    const className = theme.file;
    if (className !== undefined) {
      span.className = className;
    }
    return span;
  }

  updateDOM(): false {
    return false;
  }

  getHref(): string {
    return this.__href;
  }

  getFileNameText(): string {
    return this.__fileName;
  }

  decorate(): React.JSX.Element {
    return (
      <Suspense fallback={null}>
        <div style={{paddingLeft: 6, paddingRight: 6}}>
          {this.__fileName}
        </div>
      </Suspense>
    );
  }
}

export function $createFileNode({
                                  href,
                                  fileName,
                                  key,
                                }: FilePayload): FileNode {
  return $applyNodeReplacement(
    new FileNode(
      href,
      fileName,
      key,
    ),
  );
}

export function $isFileNode(
  node: LexicalNode | null | undefined,
): node is FileNode {
  return node instanceof FileNode;
}
