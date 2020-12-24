import { withInfo } from "@storybook/addon-info";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

const styles: React.CSSProperties = {
  textAlign: "center",
  marginTop: "100px",
};
const CenterDecorator = (storyFn: any) => <div style={styles}>{storyFn()}</div>;

export const decorators = [withInfo];
