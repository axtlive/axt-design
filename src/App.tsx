import React from "react";
import Button, { ButtonType, ButtonsSize } from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";

function App() {
  return (
    <div className="App">
      <div>
        <Menu
          mode="vertical"
          onSelect={(i) => console.log(i)}
          defaultIndex={"0"}
          defaultOpenSubMenus={["2"]}
        >
          <MenuItem>菜单a</MenuItem>
          <MenuItem disabled>菜单b</MenuItem>
          <SubMenu title="菜单c">
            <MenuItem>dropdown1</MenuItem>
            <MenuItem>dropdown2</MenuItem>
            <MenuItem>dropdown3</MenuItem>
          </SubMenu>
          <MenuItem>菜单d</MenuItem>
          <MenuItem>菜单e</MenuItem>
        </Menu>
      </div>

      <div>
        <Button onClick={() => console.log("---------")}>default Button</Button>
        <Button disabled>Disabled Button</Button>
        <Button btnType={ButtonType.Primary} size={ButtonsSize.Large}>
          primary large Button
        </Button>
        <Button btnType={ButtonType.Danger} size={ButtonsSize.Small}>
          Danger Small Button
        </Button>
        <Button
          btnType={ButtonType.Link}
          href="http://www.baidu.com"
          target="_blank"
        >
          Link Button
        </Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com" disabled>
          Link disabled Button
        </Button>
      </div>
    </div>
  );
}

export default App;
