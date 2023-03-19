import { useState } from "react";
import Editor from "@monaco-editor/react";

interface EditorPanelProps {
    language: string; 
    theme: string; 
    code: string; 
    onCodeEditorChange: any;
}

function EditorPanel({language, theme, code, onCodeEditorChange }: EditorPanelProps) {
    const [value, setValue] = useState(code || "// Add your code here");

    function handleCodeChange(value: any) {
        setValue(value);
        onCodeEditorChange("code", value);
    };

    return(
        <Editor className="border"
            height="85vh"
            width={`50%`}
            language={language || "javascript"}
            value={value}
            theme={theme}
            onChange={handleCodeChange}
        />
    );
}

export default EditorPanel;