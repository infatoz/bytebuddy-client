import React from "react";

function ProblemDetails({ problemData }) {
  return (
    <div className="max-w-screen-md mx-auto p-6 border rounded shadow bg-white overflow-hidden">
      <h2 className="text-3xl font-bold mb-4 text-blue-600">{problemData.question_title}</h2>
      <div className="text-lg mb-4 overflow-y-auto max-h-64">{problemData.description}</div>
      <div className="italic text-gray-600 mb-4">{problemData.topics}</div>
      {problemData.example_case && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-2 text-green-600">Example Case:</h3>
          <div className="ml-4">
            <p>
              <strong className="text-yellow-600">Input:</strong>
            </p>
            <pre className="bg-gray-800 p-2 rounded-md mb-4 text-white overflow-hidden">
              {problemData.example_case[0].sample_input}
            </pre>
            <p>
              <strong className="text-yellow-600">Output:</strong>
            </p>
            <pre className="bg-gray-800 p-2 rounded-md text-white overflow-hidden">
              {problemData.example_case[0].sample_output}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProblemDetails;
