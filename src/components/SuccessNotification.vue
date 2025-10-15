<template>
  <div v-if="isVisible" class="notification-overlay" @click="close">
    <div class="notification-content" @click.stop>
      <!-- Success Icon -->
      <div class="success-icon">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <circle cx="30" cy="30" r="30" fill="#00C851" />
          <path
            d="M20 30l8 8 12-16"
            stroke="white"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <!-- Title -->
      <h3 class="notification-title">
        {{
          orderData?.type === "purchase"
            ? "Purchase Completed"
            : "Payment Completed"
        }}
      </h3>

      <!-- Message -->
      <p class="notification-message" v-if="orderData">
        <span v-if="orderData.type === 'purchase'">
          You purchased
          <strong>{{ formatNumber(orderData.coins) }} Coins</strong> for
          <strong>${{ formatPrice(orderData.price) }}</strong
          >. <br />Your new balance:
          <strong>{{ formatNumber(orderData.balanceAfter || 0) }} coins</strong>
        </span>
        <span v-else>
          You recharged
          <strong>{{ formatNumber(orderData.coins) }} Coins</strong>. You can
          use Coins to send virtual Gifts.
        </span>
      </p>

      <!-- Button -->
      <button class="go-back-btn" @click="close">Go back</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

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

const formatNumber = (num) => {
  return parseInt(num).toLocaleString();
};

const formatPrice = (price) => {
  return parseFloat(price).toFixed(2);
};

const close = () => {
  emit("close");
};

// Bỏ auto close
</script>

<style scoped>
.notification-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;

  /* Thêm animation cho overlay */
  animation: fadeIn 0.3s ease-out;
}

.notification-content {
  background: white;
  border-radius: 12px;
  padding: 40px 30px;
  width: 100%;
  max-width: 350px;
  text-align: center;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);

  /* Thêm animation slide up */
  animation: slideUp 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Keyframes cho fade in overlay */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Keyframes cho slide up content */
@keyframes slideUp {
  from {
    transform: translateY(100vh);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.success-icon {
  margin: 0 auto 24px;
  width: 60px;
  height: 60px;
  animation: successPop 0.6s ease-out 0.3s both; /* Delay để chờ slide up xong */
}

@keyframes successPop {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.notification-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px 0;
  line-height: 1.3;
}

.notification-message {
  font-size: 14px;
  color: #666;
  margin: 0 0 32px 0;
  line-height: 1.5;
}

.notification-message strong {
  color: #333;
  font-weight: 600;
}

.go-back-btn {
  width: 100%;
  background: #fe2c55;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(254, 44, 85, 0.3);
}

.go-back-btn:hover {
  background: #e02c55;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(254, 44, 85, 0.4);
}

.go-back-btn:active {
  transform: translateY(0);
}

/* Mobile responsive */
@media (max-width: 576px) {
  .notification-content {
    padding: 30px 20px;
    margin: 20px;
  }

  .success-icon {
    width: 50px;
    height: 50px;
  }

  .success-icon svg {
    width: 50px;
    height: 50px;
  }

  .notification-title {
    font-size: 18px;
  }
}
</style>
