import React from "react";
import Button from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import Icon from "./components/Icon/icon";

function App() {
  return (
    <div className="App">
      <div>
        <Menu
          onSelect={(i) => console.log(i)}
          defaultIndex={"0"}
          defaultOpenSubMenus={["2"]}
        >
          <MenuItem>菜单a菜单a</MenuItem>
          <MenuItem disabled>菜单b菜单b</MenuItem>
          <SubMenu title="菜单c菜单c">
            <MenuItem>dropdown1</MenuItem>
            <MenuItem>dropdown2</MenuItem>
            <MenuItem>dropdown3</MenuItem>
          </SubMenu>
          <MenuItem>菜单d菜单d</MenuItem>
          <MenuItem>菜单e菜单e</MenuItem>
        </Menu>
      </div>

      <div>
        <Button onClick={() => console.log("---------")}>default Button</Button>
        <Button disabled>Disabled Button</Button>
        <Button btnType="primary" size="lg">
          primary large Button
        </Button>
        <Button btnType="danger" size="sm">
          Danger Small Button
        </Button>
        <Button btnType="link" href="http://www.baidu.com" target="_blank">
          Link Button
        </Button>
        <Button btnType="link" href="http://www.baidu.com" disabled>
          Link disabled Button
        </Button>
      </div>

      <div>
        <Icon icon="arrow-alt-circle-down" theme="primary" size="10x" />
      </div>
    </div>
  );
}

export default App;
