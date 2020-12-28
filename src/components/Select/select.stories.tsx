import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Select from "./select";
import Option from "./option";

const SimpleSelect = () => {
  return (
    <Select onChange={action("changed")} onVisibleChange={action("visible")}>
      <Option value="上海" />
      <Option value="北京" />
      <Option value="广州" />
      <Option disabled value="南京" />
      <Option value="西安" />
    </Select>
  );
};

const MultipleSelect = () => {
  return (
    <Select
      multiple
      placeholder="支持多选"
      onChange={action("changed")}
      onVisibleChange={action("visible")}
    >
      <Option value="HTML" />
      <Option value="CSS" />
      <Option value="JavaScript" />
      <Option value="Vue" />
      <Option value="React" />
    </Select>
  );
};

const DisabledSelect = () => {
  return (
    <Select disabled placeholder="已被禁用！">
      <Option value="禁用1" />
      <Option value="禁用2" />
      <Option value="禁用3" />
    </Select>
  );
};

storiesOf("Select 组件", module)
  .add("Select", SimpleSelect)
  .add("支持多选的 Select", MultipleSelect)
  .add("被禁用的 Select", DisabledSelect);
