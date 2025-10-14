<template>
  <div v-if="isOpen" class="modal-overlay" @click="handleOverlayClick">
    <div class="modal-content" @click.stop>
      <!-- Header -->
      <div class="modal-header"></div>

      <div class="modal-body">
        <!-- Loading State -->
        <div v-if="isProcessing" class="processing-section">
          <div class="tiktok-loader-container">
            <!-- TikTok Authentic Loading Animation -->
            <div class="tiktok-loader">
              <div class="circle circle-red"></div>
              <div class="circle circle-cyan"></div>
            </div>
          </div>
          <h4 class="processing-title">Processing your payment</h4>
          <p class="processing-subtitle">This could take few seconds</p>
          <div class="timer">{{ formatTime(timer) }}</div>
        </div>

        <!-- Order Details (hidden when processing or completed) -->
        <div v-else>
          <button class="close-btn" @click="close">✕</button>

          <h3 class="modal-title">Order summary</h3>

          <!-- Account Info -->
          <div class="order-item">
            <div class="item-label">Account</div>
            <div class="item-value">{{ accountId }}</div>
          </div>

          <!-- Coins Info -->
          <div class="order-item" v-if="orderData">
            <div class="item-label">
              {{ formatNumber(orderData.coins) }} Coins
            </div>
            <div class="item-value">${{ formatPrice(orderData.price) }}</div>
          </div>

          <!-- Total -->
          <div class="order-item total-item" v-if="orderData">
            <div class="item-label">Total</div>
            <div class="item-value">${{ formatPrice(orderData.price) }}</div>
          </div>

          <!-- Payment Method -->
          <div class="payment-method">
            <div class="payment-card">
              <div class="card-info">
                <span class="card-brand">VISA</span>
                <span class="card-number">••••••6422</span>
              </div>
            </div>
          </div>

          <!-- Terms -->
          <div class="terms-text">
            By clicking "Pay now", you agree to our
            <span class="link">Terms of Purchase for Coins</span>. By using any
            amount of Coins within 14 days after clicking "Pay now", you
            acknowledge and confirm that you will no longer be eligible for a
            refund of this order. <br /><br />
            To assess your tax rate in accordance with our
            <span class="link">Privacy Policy</span>, TikTok detected that your
            location is New York, New York, New York, United States
          </div>
        </div>
      </div>

      <!-- Buttons -->
      <div class="modal-footer" v-if="!isProcessing">
        <button class="pay-btn" @click="handlePayment">Pay now</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from "vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  orderData: {
    type: Object,
    default: null,
  },
  accountId: {
    type: String,
    default: "@uklam|9m53",
  },
});

const emit = defineEmits(["close", "payment-complete"]);

const isProcessing = ref(false);
const isCompleted = ref(false);
const timer = ref(300); // Bắt đầu từ 5 phút (300 giây)
let timerInterval = null;

const formatNumber = (num) => {
  return parseInt(num).toLocaleString();
};

const formatPrice = (price) => {
  return parseFloat(price).toFixed(2);
};

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

const close = () => {
  // Clear timer khi đóng modal
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  isProcessing.value = false;
  isCompleted.value = false;
  timer.value = 300; // Reset về 5 phút (300 giây)
  emit("close");
};

const handlePayment = () => {
  // Bắt đầu processing
  isProcessing.value = true;
  isCompleted.value = false;
  timer.value = 300; // Bắt đầu từ 5 phút (300 giây)

  // Bắt đầu timer đếm ngược bình thường (mỗi giây trừ 1 giây)
  timerInterval = setInterval(() => {
    timer.value -= 1; // Trừ 1 giây mỗi lần

    // Khi timer về 0 hoặc âm, hoàn thành thanh toán
    if (timer.value <= 295) {
      // Dừng timer

      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }

      // Emit payment complete và đóng modal ngay
      emit("payment-complete", props.orderData);

      // Reset states
      isProcessing.value = false;
      isCompleted.value = false;
      timer.value = 300;

      // Đóng modal
      emit("close");
    }
  }, 1000); // Mỗi 1 giây
};
const handleOverlayClick = () => {
  // Không cho đóng modal khi đang processing
  if (!isProcessing.value) {
    close();
  }
};

// Cleanup timer khi component unmount
onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval);
  }
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 12px 12px 0 0;
  position: relative;
  border-bottom: 1px solid #f0f0f0;
}

.modal-title {
  color: #333;
  margin: 0;
  text-align: center;
}

.close-btn {
  background: none;
  border: none;
  font-size: 18px;
  color: #999;
  cursor: pointer;
  padding: 8px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  position: absolute;
  top: 15px;
  right: 15px;
}

.close-btn:hover {
  color: #333;
  background: #f0f0f0;
}

.modal-body {
  padding: 25px 20px 20px;
  background: white;
}

/* Processing Section */
.processing-section {
  text-align: center;
  padding: 40px 20px;
}

.processing-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 20px 0 8px 0;
}

.processing-subtitle {
  font-size: 14px;
  color: #666;
  margin: 0 0 20px 0;
}

.timer {
  font-size: 24px;
  font-weight: 600;
  color: #666;
  font-family: "Courier New", monospace;
}

/* TikTok Loader - Authentic 2 Circles Animation */
.tiktok-loader-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto 20px;
  height: 60px;
}

.tiktok-loader {
  position: relative;
  width: 50px;
  height: 50px;
  margin: 0 auto;
}

.circle {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  animation: tiktok-move 1.2s infinite ease-in-out;
  mix-blend-mode: multiply;
}

.circle-red {
  background-color: #FE2C55; /* TikTok red */
  animation-delay: -0.6s;
  box-shadow: 0 0 15px rgba(254, 44, 85, 0.4);
}

.circle-cyan {
  background-color: #25F4EE; /* TikTok cyan */
  animation-delay: 0s;
  box-shadow: 0 0 15px rgba(37, 244, 238, 0.4);
}

@keyframes tiktok-move {
  0% {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
  25% {
    transform: translateX(-15px) scale(0.8);
    opacity: 0.8;
  }
  50% {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
  75% {
    transform: translateX(15px) scale(0.8);
    opacity: 0.8;
  }
  100% {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
}
.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 0;
}

.item-label {
  color: #666;
  font-size: 15px;
  font-weight: 400;
}

.item-value {
  color: #333;
  font-weight: 600;
  font-size: 15px;
}

.total-item {
  border-top: 1px solid #e0e0e0;
  padding-top: 16px;
  margin-bottom: 24px;
  margin-top: 8px;
}

.total-item .item-label {
  font-weight: 600;
  color: #333;
  font-size: 16px;
}

.total-item .item-value {
  font-weight: 700;
  font-size: 16px;
  color: #333;
}

.payment-method {
  margin-bottom: 24px;
  padding: 0;
}

.payment-card {
  display: flex;
  align-items: center;
  padding: 0;
}

.card-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.card-brand {
  background: #1a1f71;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.card-number {
  color: #666;
  font-size: 14px;
}

.terms-text {
  font-size: 11px;
  color: #888;
  line-height: 1.5;
  margin-bottom: 0;
  text-align: left;
}

.link {
  color: #333;
  text-decoration: none;
  cursor: pointer;
  font-weight: 600;
}

.modal-footer {
  padding: 16px 20px 20px;
  background: white;
  border-radius: 0 0 12px 12px;
}

.pay-btn {
  width: 100%;
  background: rgb(254, 44, 85);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pay-btn:hover {
  background: rgb(230, 40, 77);
  transform: translateY(-1px);
}

/* Mobile responsive */
@media (max-width: 576px) {
  .modal-content {
    width: 95%;
    margin: 20px;
  }

  .modal-body,
  .modal-footer {
    padding: 16px;
  }
}
</style>
