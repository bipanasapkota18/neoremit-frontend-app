// vite.config.ts
import react from "file:///D:/CH/neoremit-frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
import { defineConfig } from "file:///D:/CH/neoremit-frontend/node_modules/vite/dist/node/index.js";
import checker from "file:///D:/CH/neoremit-frontend/node_modules/vite-plugin-checker/dist/esm/main.js";
import svgr from "file:///D:/CH/neoremit-frontend/node_modules/vite-plugin-svgr/dist/index.mjs";
var __vite_injected_original_dirname = "D:\\CH\\neoremit-frontend";
var vite_config_default = defineConfig(() => {
  return {
    server: { open: true, port: 6001 },
    plugins: [
      svgr(),
      react(),
      checker({ eslint: { lintCommand: "eslint src" }, overlay: false })
    ],
    publicDir: "public",
    resolve: {
      alias: {
        "@neo": path.resolve(__vite_injected_original_dirname, "src")
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxDSFxcXFxuZW9yZW1pdC1mcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcQ0hcXFxcbmVvcmVtaXQtZnJvbnRlbmRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L0NIL25lb3JlbWl0LWZyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgY2hlY2tlciBmcm9tIFwidml0ZS1wbHVnaW4tY2hlY2tlclwiO1xyXG5pbXBvcnQgc3ZnciBmcm9tIFwidml0ZS1wbHVnaW4tc3ZnclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCgpID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgc2VydmVyOiB7IG9wZW46IHRydWUsIHBvcnQ6IDYwMDEgfSxcclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgc3ZncigpLFxyXG4gICAgICByZWFjdCgpLFxyXG4gICAgICBjaGVja2VyKHsgZXNsaW50OiB7IGxpbnRDb21tYW5kOiBcImVzbGludCBzcmNcIiB9LCBvdmVybGF5OiBmYWxzZSB9KVxyXG4gICAgXSxcclxuICAgIHB1YmxpY0RpcjogXCJwdWJsaWNcIixcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgYWxpYXM6IHtcclxuICAgICAgICBcIkBuZW9cIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJzcmNcIilcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTZQLE9BQU8sV0FBVztBQUMvUSxPQUFPLFVBQVU7QUFDakIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxhQUFhO0FBQ3BCLE9BQU8sVUFBVTtBQUpqQixJQUFNLG1DQUFtQztBQU16QyxJQUFPLHNCQUFRLGFBQWEsTUFBTTtBQUNoQyxTQUFPO0FBQUEsSUFDTCxRQUFRLEVBQUUsTUFBTSxNQUFNLE1BQU0sS0FBSztBQUFBLElBQ2pDLFNBQVM7QUFBQSxNQUNQLEtBQUs7QUFBQSxNQUNMLE1BQU07QUFBQSxNQUNOLFFBQVEsRUFBRSxRQUFRLEVBQUUsYUFBYSxhQUFhLEdBQUcsU0FBUyxNQUFNLENBQUM7QUFBQSxJQUNuRTtBQUFBLElBQ0EsV0FBVztBQUFBLElBQ1gsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsUUFBUSxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLE1BQ3ZDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
