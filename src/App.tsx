import { PartHeader } from "./PartHeader";
import { Contents } from "./Contents";

export const App = () => {
  return (
    <>
      <PartHeader />
      <Contents />
      <p style={{ "fontSize": "10px", "textAlign": "center" }}><small><a href="https://ondoku3.com/ja/" target="_blank">Voice By ondoku3.com</a></small></p>
    </>
  );
}