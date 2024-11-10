import {HeadingNode, QuoteNode} from "@lexical/rich-text";
import {Klass, LexicalNode} from "lexical";
import {ListItemNode, ListNode} from "@lexical/list";
import {CodeHighlightNode, CodeNode} from "@lexical/code";

const EditorNodes: Array<Klass<LexicalNode>> = [
  HeadingNode,
  ListNode,
  ListItemNode,
  CodeNode,
  CodeHighlightNode,
  QuoteNode,
]

export default EditorNodes;
