import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Button from "./button";

const defaultButton = () => (
  <Button btnType="primary" icon="search" onClick={action("clicked")}>
    default button
  </Button>
);

const buttonWithSize = () => (
  <>
    <Button size="lg" onClick={action("clicked")}>
      large button
    </Button>
    <Button size="sm" onClick={action("clicked")}>
      small button
    </Button>
  </>
);

const buttonWithType = () => (
  <>
    <Button btnType="primary" onClick={action("clicked")}>
      primary button
    </Button>
    <Button btnType="danger" onClick={action("clicked")}>
      danger button
    </Button>
    <Button
      btnType="link"
      href="http://www.axtlive.com"
      target="_blank"
      onClick={action("clicked")}
    >
      link button
    </Button>
  </>
);

storiesOf("Button Component", module)
  .add("默认 Button", defaultButton)
  .add("不同尺寸的 Button", buttonWithSize)
  .add("不同类型的 Button", buttonWithType);
