import React from "react";

interface OutputPanelProps {
  outputDetails: any;
}

function OutputPanel({ outputDetails }: OutputPanelProps) {
  function getOutput() {
    let statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      // compilation error
      return <pre>{atob(outputDetails?.compile_output)}</pre>;
    } else if (statusId === 3) {
      return (
        <pre>
          {atob(outputDetails.stdout) !== null
            ? `${atob(outputDetails.stdout)}`
            : null}
        </pre>
      );
    } else if (statusId === 5) {
      return <pre>"Time Limit Exceeded"</pre>;
    } else {
      return <pre>{atob(outputDetails?.stderr)}</pre>;
    }
  }

  return (
    <>
      <h6>Output</h6>
      <div className="form-control w-auto p-3 border text-wrap">
        {outputDetails ? <>{getOutput()}</> : null}
      </div>
    </>
  );
}

export default OutputPanel;
