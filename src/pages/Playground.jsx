import React from "react";
import Editor from '@monaco-editor/react';
import { Splitter, SplitterPanel } from "primereact/splitter";
import { Button } from "@mui/material";

function Playground() {
  return (
    <>
      <div className="bg-gray-200">
        <Splitter layout="vertical" style={{ height: "88vh" }}>
          <SplitterPanel className = "p-0" size={75}>
            <Editor 
              className = "p-2"
              theme={"vs-dark"}
              height="100%" 
              defaultLanguage="java" 
              defaultValue="" />
          </SplitterPanel>
          <SplitterPanel className = "w-full p-0" size={25}>
            <div className = "mx-2 bg-white h-full p-4 w-full">
              <div className="w-full h-full">
                <Splitter style={{ width: "100%", height: "100%" }}>
                  <SplitterPanel size={80} minSize={30}>
                    <div className="bg-gray-100 text-black w-full h-full p-2">
                      OUTPUT :
                      10
                    </div>
                  </SplitterPanel>
                  <SplitterPanel className="bg-gray-100 w-full flex justify-center items-center" size={20} minSize={10} >
                    <Button type="button" variant="contained" color="primary">
                      Run
                    </Button>
                  </SplitterPanel>
                </Splitter>
              </div>
            </div>
          </SplitterPanel>
        </Splitter>
      </div>
    </>
  );
}

export default Playground;
