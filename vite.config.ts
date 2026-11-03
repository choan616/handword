import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// GitHub Pages 프로젝트 페이지는 /저장소이름/ 아래에서 열려 배포 워크플로가 VITE_BASE를 넘긴다
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react()],
})
