<template>
  <div v-if="isVisible" class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <!-- Success Icon -->
      <div class="success-icon">
        <div class="check-circle">
          <div class="check-mark">✓</div>
        </div>
      </div>

      <!-- Title -->
      <h3 class="modal-title">Nạp xu thành công!</h3>

      <!-- Message -->
      <div class="modal-message">
        <p>Bạn đã nạp thành công</p>
        <div class="coin-amount">
          <img src="../img/coin-tiktok.png" alt="Coin" width="20" height="20" />
          <strong>{{ formatNumber(orderData?.coins || 0) }} xu</strong>
        </div>
        <p class="balance-info">
          Số dư mới:
          <strong>{{ formatNumber(orderData?.newBalance || 0) }} xu</strong>
        </p>
      </div>

      
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
  orderData: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["close"]);

const countdown = ref(3);
let countdownInterval = null;

const formatNumber = (num) => {
  return parseInt(num).toLocaleString();
};

const close = () => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
  emit("close");
};

onMounted(() => {
  if (props.isVisible) {
    startCountdown();
  }
});

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
});

const startCountdown = () => {
  countdownInterval = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      close();
    }
  }, 1000);
};

// Watch for visibility changes
watch(
  () => props.isVisible,
  (newVal) => {
    if (newVal) {
      countdown.value = 3;
      startCountdown();
    } else if (countdownInterval) {
      clearInterval(countdownInterval);
    }
  }
);
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease-out;
}

.modal-content {
  background: white;
  border-radius: 20px;
  padding: 40px 30px;
  width: 100%;
  max-width: 350px;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.success-icon {
  margin: 0 auto 20px;
}

.check-circle {
  width: 60px;
  height: 60px;
  background: #00c851;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.check-mark {
  color: white;
  font-size: 30px;
  font-weight: bold;
  line-height: 1;
}

.modal-title {
  font-size: 22px;
  font-weight: 600;
  color: #333;
  margin: 0 0 20px 0;
}

.modal-message {
  margin-bottom: 25px;
}

.modal-message p {
  font-size: 14px;
  color: #666;
  margin: 0 0 10px 0;
}

.coin-amount {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 15px 0;
  font-size: 18px;
  color: #fe2c55;
}

.coin-amount img {
  filter: brightness(1.2) saturate(1.4) sepia(1) hue-rotate(-20deg) saturate(5)
    brightness(0.9);
}

.balance-info {
  font-size: 14px;
  color: #00c851;
  font-weight: 500;
}

.auto-close-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.progress-ring {
  width: 40px;
  height: 40px;
  border: 3px solid #e9ecef;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
}

.progress-fill {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: conic-gradient(#fe2c55 0deg, transparent 0deg);
  border-radius: 50%;
  animation: progressFill 3s linear forwards;
}

@keyframes progressFill {
  to {
    background: conic-gradient(#fe2c55 360deg, transparent 360deg);
  }
}

.countdown {
  font-size: 12px;
  color: #999;
  font-weight: 500;
}

/* Mobile responsive */
@media (max-width: 576px) {
  .modal-content {
    margin: 20px;
    padding: 30px 20px;
  }

  .success-icon svg {
    width: 50px;
    height: 50px;
  }

  .modal-title {
    font-size: 20px;
  }
}
</style>
