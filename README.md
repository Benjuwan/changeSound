# 聞いて見て | 幼児・低学年の子供向け知育ゲーム
『聞いて見て』は、幼児・低学年の子供向け知育ゲームです。「色々な乗り物」や「動物たち」などカテゴリーを選択してゲーム開始ボタンをクリックすると当該対象物の音声が流れるとともに画像が表示されます。聴覚・視覚的に対象物（モノ・コト）を学ぶことができるでしょう。

- 公開サイト：[聞いて見て | 幼児・低学年の子供向け知育ゲーム](https://changesound-app.vercel.app/)

## 概要
`public/json`ディレクトリ内の各種`json`データからコンテンツ情報を取得し、`public`ディレクトリ内の`img`, `sounds`ディレクトリ内からコンテンツに準じた画像と音声を取得する疑似的CMSのような仕組み。

## ビルド時の注意事項
ホスティングする際は`src\common\isDeploy.ts`ファイルの`isDeploy`変数を`true`に変更する。

## 技術構成
- @eslint/js@9.39.2
- @tailwindcss/vite@4.1.18
- @types/react-dom@19.2.3
- @types/react@19.2.10
- @vitejs/plugin-react@5.1.2
- eslint-plugin-react-hooks@7.0.1
- eslint-plugin-react-refresh@0.4.26
- eslint-plugin-react@7.37.5
- eslint@9.39.2
- globals@17.2.0
- react-dom@19.2.4
- react@19.2.4
- tailwindcss@4.1.18
- typescript-eslint@8.54.0
- typescript@5.9.3
- vite@7.3.1
