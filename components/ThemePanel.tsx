import Select from "react-select";

interface ThemePanelProps {
  onThemeSelection: any;
}

export const themeOptions = [
  {
    label: "vs-light",
    key: "light",
    value: "light",
  },

  {
    label: "vs-dark",
    key: "vs-dark",
    value: "vs-dark",
  },
];

function ThemePanel({ onThemeSelection }: ThemePanelProps) {
  return (
    <>
      <h6>Theme: </h6>
      <Select
        id="selectThemeBox"
        instanceId="selectThemeBox"
        className="btn-group w-15 p-3"
        placeholder={`Select Theme`}
        options={themeOptions}
        defaultValue={themeOptions[1]}
        onChange={(selectedTheme) => onThemeSelection(selectedTheme)}
      />
    </>
  );
}

export default ThemePanel;
