import React from "react";

interface ResourceUtilizationProps {
  resourceUtilization: any;
}

function ResourceUtilization({resourceUtilization}: ResourceUtilizationProps) {
    return (
      <div className="metrics-container mt-4 flex flex-col space-y-3">
        <p className="text-sm">
          Status:{" "}
          <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
            {resourceUtilization?.status?.description}
          </span>
        </p>
        <p className="text-sm">
          Memory:{" "}
          <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
            {resourceUtilization?.memory}
          </span>
        </p>
        <p className="text-sm">
          Time:{" "}
          <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
            {resourceUtilization?.time}
          </span>
        </p>
      </div>
    );
}

export default ResourceUtilization;