# AVC PCTT PWA

PWA giám sát thủy văn liên hồ Vu Gia – Thu Bồn, phát triển từ AVC HYDRO MONITOR V9.5.

## 6 tab
1. Tổng quan
2. Số liệu
3. Biểu đồ
4. Sơ đồ lưu vực
5. Mốc lũ hạ du
6. Thời tiết Windy

## Deploy GitHub Pages
1. Upload toàn bộ nội dung thư mục này vào nhánh `main` của repo `pctt-pwa`.
2. Vào **Settings → Pages**.
3. Source: **Deploy from a branch**.
4. Branch: **main**, folder: **/(root)** → Save.
5. Chờ GitHub Pages build xong. URL thử nghiệm sẽ có dạng `https://avchochua-dot.github.io/pctt-pwa/`.

## PWA
- `manifest.webmanifest`: tên app, icon, màu, shortcuts.
- `sw.js`: cache giao diện, network-first cho JSON/API, không cache Windy/Google Maps.
- `offline.html`: trang dự phòng khi mất mạng.
- `icons/`: icon tiêu chuẩn và maskable.

## Cập nhật phiên bản
Khi sửa PWA quan trọng, đổi `VERSION` ở đầu `sw.js`, ví dụ `1.0.0` → `1.0.1`. Người dùng sẽ thấy thông báo **Có phiên bản PWA mới**.

## Lưu ý dữ liệu
PWA ưu tiên mạng cho dữ liệu quan trắc. Cache API chỉ dùng làm dự phòng. Giao diện hiện tại vẫn phải căn cứ timestamp để đánh dấu LIVE / dữ liệu cũ. Windy và Google Maps chỉ hoạt động khi có Internet.
