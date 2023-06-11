import { PartHeader } from "./PartHeader";
import { Contents } from "./Contents";

export const App = () => {
  return (
    <>
      <PartHeader />
      <Contents />
      <p style={{ "textAlign": "center", "fontSize": "10px" }}><small>『音楽：魔王魂』</small></p>
    </>
  );
}