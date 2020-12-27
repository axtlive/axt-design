import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
// import { action } from '@storybook/addon-actions'
import Input from "./input";
const ControlledInput = () => {
  const [value, setValue] = useState("");
  return (
    <Input
      value={value}
      defaultValue={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
const defaultInput = () => (
  <React.Fragment>
    <Input style={{ width: "300px" }} placeholder="漂亮的 Input" />
    <ControlledInput />
  </React.Fragment>
);

const disabledInput = () => (
  <Input style={{ width: "300px" }} disabled placeholder="disabled input" />
);

const iconInput = () => (
  <Input icon="list" style={{ width: "300px" }} placeholder="input with icon" />
);

const sizeInput = () => (
  <React.Fragment>
    <Input style={{ width: "300px" }} defaultValue="large size" size="lg" />
    <Input style={{ width: "300px" }} placeholder="small size" size="sm" />
  </React.Fragment>
);

const preOrSuffixInput = () => (
  <React.Fragment>
    <Input
      style={{ width: "300px" }}
      defaultValue="prepend text"
      prefix="https://"
    />
    <Input style={{ width: "300px" }} suffix=".com" defaultValue="google" />
  </React.Fragment>
);

storiesOf("Input Component", module)
  .add("Input", defaultInput)
  .add("被禁用的 Input", disabledInput)
  .add("带图标的 Input", iconInput)
  .add("大小不同的 Input", sizeInput)
  .add("带前后缀的 Input", preOrSuffixInput);
