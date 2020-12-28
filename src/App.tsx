import { FC, ChangeEvent, useState } from "react";
import axios from "axios";
import Button from "./components/Button/button";
import Alert from "./components/Alert/alert";

const App: FC = () => {
  const [canSee, setCanSee] = useState(false);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const uploadedFile = files[0];
      const formData = new FormData();
      formData.append(uploadedFile.name, uploadedFile);
      axios
        .post("http://jsonplaceholder.typicode.com/posts/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((resp) => {
          console.log(resp);
        });
    }
  };
  return (
    <div>
      <Button
        btnType="primary"
        icon="download"
        onClick={() => setCanSee(!canSee)}
      >
        确定
      </Button>
      {canSee && (
        <Alert
          title="提示标题欧亲"
          description="this is a long description"
          closable
          onClose={() => {}}
        />
      )}
    </div>
  );
};

export default App;
