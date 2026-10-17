# HƯỚNG DẪN ĐƯA AVC PWA LÊN GITHUB PAGES

Repository đã tạo: `avchochua-dot/pctt-pwa`

## 1. Upload source

1. Tải file `AVC_PCTT_PWA_V1_FULL_CODE.zip` và giải nén trên máy.
2. Trong repo `pctt-pwa`, chọn **Add file → Upload files**.
3. Kéo toàn bộ **nội dung bên trong thư mục giải nén** vào GitHub, gồm:
   - `index.html`
   - `manifest.webmanifest`
   - `sw.js`
   - `offline.html`
   - `.nojekyll`
   - `README.md`
   - thư mục `icons`
4. **Không upload `CNAME.example.txt` thành `CNAME` ở giai đoạn test**.
5. Commit message: `Initial AVC PWA V1` → **Commit changes**.

## 2. Bật GitHub Pages

1. Vào **Settings** của repo.
2. Chọn **Pages**.
3. **Source**: `Deploy from a branch`.
4. **Branch**: `main`.
5. Folder: `/(root)`.
6. Bấm **Save**.
7. Chờ GitHub build hoàn tất.

URL thử nghiệm dự kiến:

`https://avchochua-dot.github.io/pctt-pwa/`

## 3. Kiểm tra PWA

Mở URL bằng Chrome/Edge:

- Kiểm tra đủ 6 tab.
- Bấm **Cài ứng dụng** nếu nút xuất hiện.
- Trên Chrome/Edge desktop cũng có thể dùng biểu tượng cài đặt ở thanh địa chỉ.
- Android: Chrome → Cài ứng dụng / Add to Home screen.
- iPhone/iPad: Safari → Chia sẻ → Thêm vào Màn hình chính.

## 4. Test offline

Sau khi đã mở PWA ít nhất một lần:

1. Tắt Wi-Fi/mạng.
2. Mở lại app.
3. Giao diện phải mở được từ cache.
4. Dữ liệu gần nhất có thể được dùng làm dự phòng nếu API trước đó đã được cache.
5. Windy/Google Maps cần Internet và không được cache.
6. Không coi dữ liệu cache là LIVE; luôn kiểm tra timestamp/trạng thái nguồn trên Dashboard.

## 5. Cập nhật PWA sau này

Khi có thay đổi quan trọng:

1. Sửa code.
2. Đổi `VERSION` ở đầu `sw.js`, ví dụ:
   - `1.0.0` → `1.0.1`
3. Commit lên GitHub.
4. PWA đang cài sẽ phát hiện Service Worker mới và hiện nút **Cập nhật ngay**.

## 6. Gắn subdomain sau khi test xong

Khuyến nghị thử bằng GitHub Pages trước. Khi ổn mới dùng subdomain, ví dụ:

`pwa.avuonghydro.com`

Lúc đó tạo file `CNAME` ở root chứa đúng một dòng:

`pwa.avuonghydro.com`

và cấu hình DNS CNAME `pwa` trỏ về `avchochua-dot.github.io`.

## 7. Lưu ý API

PWA V1 giữ nguyên cấu hình API của AVC HYDRO MONITOR V9.5 để không làm thay đổi logic LIVE đang dùng. Sau khi deploy, nếu dữ liệu 4 hồ không lên trên một thiết bị mới, kiểm tra mục **Cấu hình** trong Dashboard và địa chỉ backend API đang sử dụng trước khi đổi code.
