import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
// 빌드마다 다른 식별자. 배포(GitHub Actions)에서는 커밋 해시, 로컬에서는 빌드 시각을 쓴다
const buildId = process.env.GITHUB_SHA?.slice(0, 7) ?? Date.now().toString(36)
// 열려 있는 앱이 새 배포를 알아챌 수 있도록 dist/version.json에 같은 식별자를 남긴다
const versionFile: Plugin = {
  name: 'version-file',
  apply: 'build',
  generateBundle() { this.emitFile({ type: 'asset', fileName: 'version.json', source: JSON.stringify({ id: buildId }) }) },
}
// GitHub Pages 프로젝트 페이지는 /저장소이름/ 아래에서 열려 배포 워크플로가 VITE_BASE를 넘긴다
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  define: { __BUILD_ID__: JSON.stringify(buildId) },
  plugins: [react(), versionFile],
})
