import React from "react";

interface ResourceUtilizationProps {
  resourceUtilization: any;
}

function ResourceUtilization({
  resourceUtilization,
}: ResourceUtilizationProps) {
  return (
    <div>
      <p>
        Status: <span>{resourceUtilization?.status?.description}</span>
      </p>
      <p>
        Memory: <span>{resourceUtilization?.memory}</span>
      </p>
      <p>
        Time: <span>{resourceUtilization?.time}</span>
      </p>
    </div>
  );
}

export default ResourceUtilization;
