import React from "react";
import Editor from '@monaco-editor/react';

function Playground() {
  return (
    <>
      <div className="play-page">
        <Editor height="100%" defaultLanguage="javascript" defaultValue="// some comment" />
      </div>
    </>
  );
}

export default Playground;
