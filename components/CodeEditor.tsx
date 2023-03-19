import React, { useState } from "react";
import EditorPanel from "./EditorPanel";
import LanguagePanel, { languageOptions } from "./LanguagePanel";
import ThemePanel, { themeOptions } from "./ThemePanel";

function CodeEditor(props: any) {
    const [language, setLanguage] = useState(languageOptions[0]);
    const [theme, setTheme] = useState(themeOptions[1]);
    const [code, setCode] = useState("// Add your code here");
    
    function handleSelectedLanguage(selectedLanguage: any) {
        setLanguage(selectedLanguage);
    }

    function handleSelectedTheme(selectedTheme: any) {    
        setTheme(selectedTheme);    
    }

    function handleCodeEditorChange(operation: string, value: string) {
        if ("code" === operation) {
            setCode(value);
        }
    }

    return (
        <>
            <div className="container text-left">
                <div className="row">
                    <div className="col">
                        Language: <LanguagePanel onLanguageSelection={handleSelectedLanguage} />
                    </div>
                    <div className="col">
                        Theme: <ThemePanel onThemeSelection={handleSelectedTheme} />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <EditorPanel 
                            language={language?.value}
                            theme={theme.value}
                            code={code}
                            onCodeEditorChange={handleCodeEditorChange}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default CodeEditor;