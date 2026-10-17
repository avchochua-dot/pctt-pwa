# Deploy VGTB PWA V3 lên GitHub Pages

1. Giải nén toàn bộ bộ source.
2. Upload **nội dung bên trong thư mục** vào root repository `pctt-pwa`, ghi đè `index.html`, `manifest.webmanifest`, `sw.js`, `offline.html` và thư mục `icons`.
3. Commit, ví dụ: `VGTB PWA V3 mobile-first`.
4. GitHub: Settings → Pages → Deploy from a branch → `main` → `/ (root)`.
5. Chờ deployment hoàn tất rồi mở `https://avchochua-dot.github.io/pctt-pwa/`.
6. Nếu iPhone vẫn giữ bản cũ, đóng PWA hoàn toàn và mở lại; service worker V3 sẽ xóa cache V2 cũ.

Lưu ý: PWA V3 là sản phẩm độc lập, không liên quan repository website `pctt`.
