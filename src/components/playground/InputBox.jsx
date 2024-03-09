import React from "react";
import { Splitter, SplitterPanel } from "primereact/splitter";

function InputBox({ compileData,alignment }) {
  const errorRegex = /error: (.+)/i;
  const match = compileData.stderr.match(errorRegex);
  const errorMessage = match ? match[1] : compileData.stderr;

  return (
    <>
      <Splitter layout={alignment} style={{ width: "100%", height: "90%" }}>
        <SplitterPanel size={50} minSize={30}>
          <div className="bg-gray-100 text-black w-full h-full p-2 flex flex-col">
            <b>INPUT :</b>
            <div
              id="input-area"
              className="w-full h-full"
              // contentEditable="true"
              style={{ outline: "none" }}
            >
            <p>
                10
            </p>
            </div>
          </div>
        </SplitterPanel>
        <SplitterPanel
          className="bg-gray-100 text-black w-full h-full p-2 flex flex-col"
          size={50}
          minSize={30}
        >
          <b>OUTPUT :</b>
          <div id="output-area" className="w-full h-full">
            {compileData.exitCode === 0 ? (
              <p>{compileData.stdout}</p>
            ) : (
              <p>{errorMessage}</p>
            )}
          </div>
        </SplitterPanel>
      </Splitter>
    </>
  );
}

export default InputBox;
