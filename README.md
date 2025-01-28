# 聞いて見て | 幼児・低学年の子供向け知育ゲーム
『聞いて見て』は、幼児・低学年の子供向け知育ゲームです。「色々な乗り物」や「動物たち」などカテゴリーを選択してゲーム開始ボタンをクリックすると当該対象物の音声が流れるとともに画像が表示されます。聴覚・視覚的に対象物（モノ・コト）を学ぶことができるでしょう。

- 公開サイト：[聞いて見て | 幼児・低学年の子供向け知育ゲーム](https://changesound-app.vercel.app/)

## 概要
`public/json`ディレクトリ内の各種`json`データからコンテンツ情報を取得し、`public`ディレクトリ内の`img`, `sounds`ディレクトリ内からコンテンツに準じた画像と音声を取得する仕組み。

## 技術構成
- @eslint/js@9.19.0
- @types/react-dom@18.3.5
- @types/react@18.3.18
- @vitejs/plugin-react@4.3.4
- eslint-plugin-react-hooks@5.1.0
- eslint-plugin-react-refresh@0.4.18
- eslint@9.19.0
- globals@15.14.0
- react-dom@18.3.1
- react@18.3.1
- styled-components@6.1.14
- typescript-eslint@8.22.0
- typescript@5.6.3
- vite@6.0.11

## 注意事項
ホスティングする際は下記コンポーネント・カスタムフックで（本番環境モードに切り替える）記述修正が必要。

- `PlaySound.tsx`, `useSetImgAndTxt.tsx`, `useSetAudioEls.ts`

## ファイル
- `useFetchApi.ts`<br />
`json`データを取得してグローバルState（`isGetFetchDates`）に格納する

- `useSetAudioEls.ts`<br />
音声データの切替を担う

- `useSetImgAndTxt.ts`<br />
音声データに準拠した画像と説明文をセット

- `useRingForSound.ts`<br />
サウンド（音声データ）再生

- `useBackToDefault.ts`<br />
サウンドの停止や初期化処理

- `Contents.tsx`<br />
各種コンポーネントを統括する親コンポーネント

- `FigureImg.tsx`<br />
画像表示用コンポーネント

- `SelectDate.tsx`<br />
ゲームのカテゴリー選択コンポーネント

- `ChangeSound.tsx`<br />
ゲーム開始及びカテゴリーの切替コンポーネント

- `PlaySound.tsx`<br />
音声再生コンポーネント