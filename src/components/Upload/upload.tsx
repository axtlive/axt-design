import { ChangeEvent, FC, useRef, useState } from "react";
import axios from "axios";
import UploadList from "./uploadList";
import Button from "../Button/button";
import Dragger from "./dragger";

export type UploadFileStatus = "ready" | "uploading" | "success" | "error";

export interface UploadFile {
  /**Id 标识 */
  uid: string;
  /**Size 大小 */
  size: number;
  /**Name 名称 */
  name: string;
  /**Percent 上传的百分比 */
  percent?: number;
  /**Status 状态 */
  status?: UploadFileStatus;
  /**源文件信息 */
  raw?: File;
  /**返回信息 */
  response?: any;
  /**失败信息 */
  error?: any;
}

export interface UploadProps {
  /**文件上传的服务器地址 */
  action: string;
  /**自定义文件名称 */
  fileName?: string;
  /**接受的文件类型 */
  accept?: string;
  /**是否可以多选文件 */
  multiple?: boolean;
  /**是否拖拽 */
  drag?: boolean;
  /**是否协带cookie */
  withCredentials?: boolean;
  /**默认的文件列表 */
  defaultFileList?: UploadFile[];
  /**自定义请求头 */
  headers?: { [key: string]: any };
  /**额外的参数 */
  extraData?: { [key: string]: any };
  /**上传文件发生变化的钩子 */
  onChange?: (file: UploadFile) => void;
  /**清除文件事件 */
  onRemove?: (file: UploadFile) => void;
  /**上传失败回调 */
  onError?: (err: any, file: UploadFile) => void;
  /**上传成功回调 */
  onSuccess?: (data: any, file: UploadFile) => void;
  /**上传过程中的进度 */
  onProcess?: (percentage: number, file: UploadFile) => void;
  /**上传之前的钩子函数 */
  beforeUpload?: (file: File) => boolean | Promise<File>;
}

/**
 * @description: Upload 上传组件
 * @param {FC<UploadProps>} props
 * @return {JSX} ReactNode
 */
const Upload: FC<UploadProps> = (props) => {
  const {
    drag,
    action,
    fileName,
    extraData,
    headers,
    accept,
    children,
    multiple,
    withCredentials,
    defaultFileList,
    onProcess,
    onError,
    onSuccess,
    beforeUpload,
    onChange,
    onRemove,
  } = props;

  const fileInput = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);

  /**
   * @description: 更新 fileList 的某个值
   * @param {UploadFile} updateFile
   * @param {Partial<UploadFile>} updateObj
   * @return {object} file | {...file,...updateObj}
   */
  const updateFileList = (
    updateFile: UploadFile,
    updateObj: Partial<UploadFile>,
  ) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj };
        }
        return file;
      });
    });
  };

  /**
   * @description: Button 按钮点击 触发 File Input 的 Click 事件
   */
  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  /**
   * @description: UploadList 组件的删除事件
   * @param {UploadFile} file
   */
  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter((item) => item.uid !== file.uid);
    });
    onRemove && onRemove(file);
  };

  /**
   * @description: File Input 的变更事件监听
   * @param {ChangeEvent<HTMLInputElement>} e
   */
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    uploadFiles(files);
    if (fileInput.current) fileInput.current.value = "";
  };

  /**
   * @description: 开始上传文件 若有 beforeUpload 钩子 则调用钩子后再进行上传
   * @param {FileList} files
   */
  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files);
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            post(processedFile);
          });
        } else if (result !== false) {
          post(file);
        }
      }
    });
  };

  /**
   * @description: 生成 FormData 包装要上传的文件 调用上传接口 并触发一些列钩子
   * @method : onChange onProcess onSuccess onError
   * @param {File} files
   */
  const post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + "upload-file",
      status: "ready",
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    };
    setFileList((prevList) => [_file, ...prevList]);
    const formData = new FormData();
    formData.append(fileName || file.name, file);
    if (extraData) {
      Object.keys(extraData).forEach((key) => {
        formData.append(key, extraData[key]);
      });
    }
    axios
      .post(action, formData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
        withCredentials,
        onUploadProgress: (e) => {
          let percentage = Math.round((e.loaded * 100) / e.total) || 0;
          if (percentage < 100) {
            updateFileList(_file, { percent: percentage, status: "uploading" });
            onProcess && onProcess(percentage, _file);
          }
        },
      })
      .then((res) => {
        console.log("服务器返回数据：", res);
        updateFileList(_file, {
          status: "success",
          response: res.data,
        });
        onSuccess && onSuccess(res.data, _file);
        onChange && onChange(_file);
      })
      .catch((err) => {
        console.log("发生了错误：", err);
        updateFileList(_file, {
          status: "error",
          error: err,
        });
        onError && onError(err, _file);
        onChange && onChange(_file);
      });
  };

  return (
    <>
      <div
        className="axtlive-upload-component"
        style={{ display: "inline-block" }}
        onClick={handleClick}
      >
        {drag ? (
          <Dragger onFile={(files) => uploadFiles(files)}>{children}</Dragger>
        ) : children ? (
          children
        ) : (
          <Button btnType="primary">点击上传</Button>
        )}
        <input
          className="axtlive-file-input"
          style={{ display: "none" }}
          onChange={handleFileChange}
          ref={fileInput}
          type="file"
          accept={accept}
          multiple={multiple}
        />
      </div>
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </>
  );
};

export default Upload;
