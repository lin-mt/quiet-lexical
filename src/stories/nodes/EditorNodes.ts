import {HeadingNode, QuoteNode} from "@lexical/rich-text";
import {Klass, LexicalNode} from "lexical";
import {ListItemNode, ListNode} from "@lexical/list";
import {CodeHighlightNode, CodeNode} from "@lexical/code";
import {AutoLinkNode, LinkNode} from "@lexical/link";
import {HorizontalRuleNode} from "@lexical/react/LexicalHorizontalRuleNode";
import {PageBreakNode} from "./PageBreakNode";
import {TableCellNode, TableNode, TableRowNode} from "@lexical/table";

const EditorNodes: Array<Klass<LexicalNode>> = [
  HeadingNode,
  ListNode,
  ListItemNode,
  CodeNode,
  CodeHighlightNode,
  QuoteNode,
  LinkNode,
  AutoLinkNode,
  HorizontalRuleNode,
  PageBreakNode,
  TableNode, TableCellNode, TableRowNode
]

export default EditorNodes;
