# tiktok-project

# TikTok Coin Recharge Interface

Một ứng dụng Vue 3 responsive để mua coin TikTok với giao diện hiện đại và các component có thể tái sử dụng.

## 🏗️ Cấu trúc Component

### 1. **CoinRechargeScreen.vue** (Màn hình chính)

- Component cha chứa toàn bộ màn hình nạp coin
- Quản lý state và logic chính của ứng dụng
- Kết nối các component con với nhau

### 2. **AppHeader.vue** (Tiêu đề)

- Header với nút back và title
- Props: `title` (mặc định: "Get Coins")
- Events: `@back` - xử lý nút quay lại

### 3. **AccountBalance.vue** (Hiển thị số dư)

- Hiển thị số coin hiện tại và thông tin tài khoản
- Props: `balance`, `username`, `label`
- Events: `@toggle-dropdown` - mở dropdown tài khoản

### 4. **AccountInput.vue** (Ô nhập ID)

- Input để nhập TikTok ID với validation
- Props: `modelValue`, `label`, `placeholder`, `required`
- Events: `@update:modelValue`, `@validate`
- Tính năng: paste từ clipboard, validation real-time

### 5. **CoinOptionsGrid.vue** (Container chứa các gói)

- Grid container cho các gói coin và nút custom
- Props: `packages`, `title`, `promoText`
- Events: `@select-package`, `@open-custom-modal`

### 6. **CoinCard.vue** (Component quan trọng - Card gói coin)

- Component tái sử dụng cho mỗi gói xu
- Props: `coins`, `price`, `discount`, `isPopular`, `isSelected`
- Events: `@select` - khi chọn gói coin
- Tính năng: hover effects, badges (discount, popular)

### 7. **CustomAmountModal.vue** (Modal nhập số tùy chỉnh)

- Modal để nhập số coin và giá custom
- Props: `isOpen`, `exchangeRate`
- Events: `@close`, `@confirm`
- Tính năng: tính toán tự động, validation

### 8. **PaymentModal.vue** (Modal thanh toán)

- Modal hiển thị trạng thái thanh toán
- Props: `isOpen`, `status`, `orderData`
- Events: `@close`, `@payment-method-selected`, `@retry`
- Tính năng: multiple payment states, progress bar

## 🎨 Tính năng

- ✅ **Responsive Design**: Mobile-first, tự động scale
- ✅ **Component Architecture**: Tách biệt logic, dễ maintain
- ✅ **Interactive**: Hover effects, animations mượt mà
- ✅ **Validation**: Real-time validation cho form inputs
- ✅ **Modal System**: Custom amount và payment modals
- ✅ **State Management**: Centralized state trong CoinRechargeScreen
- ✅ **Modern UI**: Glass morphism, gradient backgrounds

## 🚀 Cài đặt và Chạy

```bash
# Navigate to project directory
cd "D:\tiktok\tiktok-project"

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📱 Responsive Breakpoints

- **Mobile (< 480px)**: 2 cột grid
- **Tablet (768px+)**: 3 cột grid, padding tăng
- **Desktop (1024px+)**: Max-width 600px, centered

## 🔧 Customization

Các component được thiết kế để dễ dàng customize thông qua props:

```vue
<CoinRechargeScreen
  title="Mua Coin TikTok"
  balance-label="Số dư hiện tại"
  account-input-label="Nhập ID TikTok"
  options-title="Chọn gói coin:"
  promo-text="Tiết kiệm 25% với phí dịch vụ thấp"
/>
```

## 🎯 Các Component có thể mở rộng

1. **Payment Integration**: Tích hợp với API thanh toán thực
2. **User Authentication**: Thêm đăng nhập/đăng ký
3. **Transaction History**: Lịch sử giao dịch
4. **Multiple Currencies**: Hỗ trợ nhiều loại tiền tệ
5. **Push Notifications**: Thông báo trạng thái thanh toán

## 📁 File Structure

```
src/
├── components/
│   ├── AppHeader.vue
│   ├── AccountBalance.vue
│   ├── AccountInput.vue
│   ├── CoinCard.vue
│   ├── CoinOptionsGrid.vue
│   ├── CustomAmountModal.vue
│   ├── PaymentModal.vue
│   └── CoinRechargeScreen.vue
├── App.vue
└── main.js
```

Mỗi component được thiết kế độc lập, dễ dàng test và maintain riêng biệt.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
