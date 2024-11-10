import {Button, Dropdown} from "antd";
import {ChevronDown} from "lucide-react";
import {CODE_LANGUAGE_OPTIONS} from "./language.tsx";
import {$getNodeByKey, LexicalEditor, NodeKey} from "lexical";
import {useCallback} from "react";
import {$isCodeNode, getLanguageFriendlyName} from "@lexical/code";

type LanguageCodeDropDownProps = {
  editor: LexicalEditor;
  codeLanguage: string;
  selectedElementKey: NodeKey | null;
}

export default function LanguageCodeDropDown({editor, codeLanguage, selectedElementKey}: LanguageCodeDropDownProps) {

  const onCodeLanguageSelect = useCallback(
    (value: string) => {
      editor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey);
          if ($isCodeNode(node)) {
            node.setLanguage(value);
          }
        }
      });
    },
    [editor, selectedElementKey],
  );

  return (
    <Dropdown
      menu={{
        items: CODE_LANGUAGE_OPTIONS.map(([value, name]) => ({
          key: value,
          label: <>{name}</>,
          onClick: () => onCodeLanguageSelect(value),
        }))
      }}
    >
      <Button type={'text'}>{getLanguageFriendlyName(codeLanguage)}<ChevronDown/></Button>
    </Dropdown>
  )
}
