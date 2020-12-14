import Button, { ButtonType, ButtonsSize } from "./components/Button/button";

function App() {
  return (
    <div className="App">
      <ol>
        <li>
          <Button onClick={() => console.log("---------")}>
            default Button
          </Button>
        </li>
        <li>
          <Button disabled>Disabled Button</Button>
        </li>
        <li>
          <Button btnType={ButtonType.Primary} size={ButtonsSize.Large}>
            primary large Button
          </Button>
        </li>
        <li>
          <Button btnType={ButtonType.Danger} size={ButtonsSize.Small}>
            Danger Small Button
          </Button>
        </li>
        <li>
          <Button
            btnType={ButtonType.Link}
            href="http://www.baidu.com"
            target="_blank"
          >
            Link Button
          </Button>
        </li>
        <li>
          <Button
            btnType={ButtonType.Link}
            href="http://www.baidu.com"
            disabled
          >
            Link disabled Button
          </Button>
        </li>
      </ol>
    </div>
  );
}

export default App;
