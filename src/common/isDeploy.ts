// Vite が標準で提供している import.meta.env.DEV を使うと、npm run dev の時は true、ビルド後は false に自動で切り替わる（初期値：`false`）
export const isDeploy: boolean = !import.meta.env.DEV;