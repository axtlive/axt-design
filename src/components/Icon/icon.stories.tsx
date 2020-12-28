import { storiesOf } from "@storybook/react";
// import { action } from '@storybook/addon-actions'
import Icon from "./icon";

const videoIcon = () => <Icon icon="video" />;

const spinIcon = () => <Icon icon="spinner" spin />;

storiesOf("Icon 组件", module)
  .add("spin Icon", spinIcon)
  .add("video Input", videoIcon);
