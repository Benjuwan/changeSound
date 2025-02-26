import { PartHeader } from "./PartHeader";
import { Contents } from "./Contents";
import { PartFooter } from "./PartFooter";

export const App = () => {
  return (
    <>
      <PartHeader />
      <Contents />
      <PartFooter />
    </>
  );
}