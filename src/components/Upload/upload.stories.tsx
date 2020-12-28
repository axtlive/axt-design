import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Upload, { UploadFile } from "./upload";

const defaultFileList: UploadFile[] = [
  {
    uid: "123",
    size: 1234,
    name: "hello.md",
    status: "uploading",
    percent: 30,
  },
  { uid: "122", size: 1234, name: "xyz.md", status: "success", percent: 30 },
  { uid: "121", size: 1234, name: "eyiha.md", status: "error", percent: 30 },
];

const checkFileSize = (file: File) => {
  if (file.size / 1024 > 100) {
    alert("file too large");
    return false;
  }
  return true;
};

const filePromise = (file: File) => {
  const newFile = new File([file], "new_name.docx", { type: file.type });
  return Promise.resolve(newFile);
};

const simpleUpload = () => {
  return (
    <div>
      <Upload
        // action="http://jsonplaceholder.typicode.com/posts/"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        onChange={action("change")}
        fileName="myFile"
        accept=".pdf"
        multiple
        // drag
        extraData={{ destination: "shanghai" }}
        headers={{ "X-Powered-By": "axtlive" }}
        // defaultFileList={defaultFileList}
      >
        {/* <button>上传</button> */}
      </Upload>
      <Upload
        // action="http://jsonplaceholder.typicode.com/posts/"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        onChange={action("change")}
        fileName="myFile"
        accept=".pdf"
        multiple
        drag
        extraData={{ destination: "shanghai" }}
        headers={{ "X-Powered-By": "axtlive" }}
      />
    </div>
  );
};

storiesOf("simpleUpload Component", module).add("simpleUpload", simpleUpload);
