# 聞いて見て | 幼児・低学年の子供向け知育ゲーム
『聞いて見て』は、幼児・低学年の子供向け知育ゲームです。「色々な乗り物」や「動物たち」などカテゴリーを選択してゲーム開始ボタンをクリックすると当該対象物の音声が流れるとともに画像が表示されます。聴覚・視覚的に対象物（モノ・コト）を学ぶことができるでしょう。

- 公開サイト：[聞いて見て | 幼児・低学年の子供向け知育ゲーム](https://changesound-app.vercel.app/)

## 概要
`public/json`ディレクトリ内の各種`json`データからコンテンツ情報を取得し、`public`ディレクトリ内の`img`, `sounds`ディレクトリ内からコンテンツに準じた画像と音声を取得する仕組み。

## 注意事項
ホスティングする際は`src\common\isDeploy.ts`ファイルの`isDeploy`変数を`true`に変更する。

## 技術構成
- @eslint/js@9.19.0
- @types/react-dom@18.3.5
- @types/react@18.3.18
- @vitejs/plugin-react@1.3.2
- eslint-plugin-react-hooks@5.1.0
- eslint-plugin-react-refresh@0.4.18
- eslint@9.19.0
- globals@15.14.0
- react-dom@18.3.1
- react@18.3.1
- styled-components@6.1.14
- typescript-eslint@8.22.0
- typescript@5.6.3
- vite@6.2.0
