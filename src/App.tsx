import { PartHeader } from "./PartHeader";
import { Contents } from "./Contents";

export const App = () => {
  return (
    <>
      <p>再生するサウンドを「お母さんやお父さん、おじいちゃんの声」や「アニメキャラクターの声」に？</p>
      <p>子ども向けなので余白やフォントは大きめに。</p>
      <PartHeader />
      <Contents />
      <p style={{ "textAlign": "center", "fontSize": "10px" }}><small>『音楽：魔王魂』</small></p>
    </>
  );
}