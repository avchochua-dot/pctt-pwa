# VGTB Thủy văn · PWA V3

PWA mobile-first độc lập cho hệ thống Vu Gia – Thu Bồn.

## 6 màn hình
1. Tổng quan
2. Số liệu
3. Biểu đồ
4. Lưu vực
5. Mốc lũ
6. Windy

## Điểm chính V3
- Kiến trúc app mobile-first theo PWA A Vương: app-container cố định chiều cao, vùng nội dung cuộn riêng, bottom navigation cố định.
- Bottom navigation dùng `onclick` trực tiếp để ổn định trên iPhone/PWA standalone.
- Không hiển thị Cấu hình / Cài ứng dụng / Toàn màn hình.
- Số liệu chọn từng hồ hoặc từng trạm.
- Biểu đồ chọn một hồ; trạng thái 4 đường dùng chung cho cả 4 hồ, mặc định MNH + Q về.
- Service worker V3, cache shell và dữ liệu theo chiến lược network-first cho nguồn động.
