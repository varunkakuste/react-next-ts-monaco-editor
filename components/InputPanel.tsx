import React from "react";

interface InputPanelProps {
  input: string;
  setInput: any;
}

function InputPanel({ input, setInput }: InputPanelProps) {
  return (
    <>
      <h6>Input</h6>
      <textarea
        placeholder={"Input test-cases"}
        className="form-control"
        rows={5}
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
    </>
  );
}

export default InputPanel;
