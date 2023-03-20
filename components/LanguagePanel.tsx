import Select from "react-select";

interface LanguagePanelProps {
  onLanguageSelection: any;
}

export const languageOptions = [
  {
    id: 43,
    name: "Plain Text",
    label: "Plain Text",
    value: "text",
  },

  {
    id: 60,
    name: "Go (1.13.5)",
    label: "Go",
    value: "go",
  },

  {
    id: 62,
    name: "Java (OpenJDK 13.0.1)",
    label: "Java",
    value: "java",
  },

  {
    id: 63,
    name: "JavaScript (Node.js 12.14.0)",
    label: "JavaScript",
    value: "javascript",
  },

  {
    id: 70,
    name: "Python (2.7.17)",
    label: "Python",
    value: "python",
  },

  {
    id: 81,
    name: "Scala (2.13.2)",
    label: "Scala",
    value: "scala",
  },
];

function LanguagePanel({ onLanguageSelection }: LanguagePanelProps) {
  return (
    <>
      <h6>Language: </h6>
      <Select
        id="selectLanguageBox"
        instanceId="selectLanguageBox"
        className="btn-group w-15 p-3"
        placeholder={`Select Language`}
        options={languageOptions}
        //   styles={customStyles}
        defaultValue={languageOptions[0]}
        onChange={(selectedLanguage) => onLanguageSelection(selectedLanguage)}
      />
    </>
  );
}

export default LanguagePanel;
