<template>
  <div class="recharge-topup-screen">
    <AppHeader title="Nạp Tiền" @back="handleBack" />

    <div class="container py-4">
      <!-- Current Balance Display -->
      <div class="balance-display text-center mb-4">
        <h5 class="text-muted mb-2">Số dư hiện tại</h5>
        <div class="balance-amount">
          <img
            src="../img/coin-tiktok.png"
            alt="Coin"
            width="24"
            height="24"
            class="me-2"
          />
          <span class="fw-bold fs-3">{{
            currentBalance.toLocaleString()
          }}</span>
          <span class="text-muted ms-1">xu</span>
        </div>
      </div>

      <!-- Input Amount -->
      <div class="input-section mb-4">
        <h5 class="mb-3">Nhập số xu muốn nạp:</h5>
        <div class="input-group input-group-lg">
          <span class="input-group-text">
            <img
              src="../img/coin-tiktok.png"
              alt="Coin"
              width="20"
              height="20"
            />
          </span>
          <input
            type="number"
            class="form-control"
            placeholder="Nhập số xu"
            v-model="customCoins"
            @input="handleCustomCoins"
            min="1"
            step="1"
          />
          <span class="input-group-text">xu</span>
        </div>
        <div class="text-center mt-2">
          <small class="text-muted">
            Số tiền cần thanh toán:
            <strong>${{ totalAmount.toFixed(2) }}</strong>
          </small>
        </div>
      </div>

      <!-- Recharge Button -->
      <div class="action-section">
        <button
          class="btn btn-success btn-lg w-100 py-3"
          :disabled="totalCoins <= 0"
          @click="proceedToPayment"
        >
          <span v-if="totalCoins > 0"
            >Nạp {{ totalCoins.toLocaleString() }} xu</span
          >
          <span v-else>Nhập số xu để nạp</span>
        </button>
      </div>
    </div>

    <!-- Success Modal Component -->
    <SuccessModal
      :is-visible="showSuccessModal"
      :order-data="successOrderData"
      @close="handleSuccessClose"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import AppHeader from "./AppHeader.vue";
import SuccessModal from "./SuccessModal.vue";

const router = useRouter();

const selectedAmount = ref(0);
const customAmount = ref("");
const customCoins = ref("");
const currentBalance = ref(0);
const showSuccessModal = ref(false);
const successOrderData = ref(null);

// Load balance from localStorage on mount
onMounted(() => {
  const savedBalance = localStorage.getItem("tiktok_balance");
  if (savedBalance) {
    currentBalance.value = parseInt(savedBalance);
  } else {
    // Nếu chưa có, thiết lập số dư ban đầu
    currentBalance.value = 150000000;
    localStorage.setItem("tiktok_balance", currentBalance.value.toString());
  }

  // Listen for localStorage changes from other tabs
  window.addEventListener("storage", (e) => {
    if (e.key === "tiktok_balance" && e.newValue) {
      currentBalance.value = parseInt(e.newValue);
    }
  });
});

const totalAmount = computed(() => {
  if (customCoins.value && parseInt(customCoins.value) > 0) {
    return parseInt(customCoins.value) * 0.01057;
  }
  return 0;
});

const totalCoins = computed(() => {
  if (customCoins.value && parseInt(customCoins.value) > 0) {
    return parseInt(customCoins.value);
  }
  return 0;
});

const handleCustomCoins = () => {
  // Tự động tính tiền khi nhập xu
  if (customCoins.value && parseInt(customCoins.value) > 0) {
    customAmount.value = (parseInt(customCoins.value) * 0.01057).toFixed(2);
  } else {
    customAmount.value = "";
  }
};

const handleBack = () => {
  router.push("/");
};

const proceedToPayment = async () => {
  if (totalCoins.value <= 0) return;

  try {
    // Add coins to current balance
    const newBalance = currentBalance.value + totalCoins.value;

    // Save to localStorage
    localStorage.setItem("tiktok_balance", newBalance.toString());

    // Prepare success data
    successOrderData.value = {
      coins: totalCoins.value,
      amount: totalAmount.value,
      newBalance: newBalance,
      type: "topup",
    };

    // Update current balance
    currentBalance.value = newBalance;

    // Show success modal
    showSuccessModal.value = true;
  } catch (error) {
    console.error("Payment error:", error);
    alert("Có lỗi xảy ra khi nạp xu. Vui lòng thử lại!");
  }
};

const handleSuccessClose = () => {
  showSuccessModal.value = false;

  // Auto redirect after closing modal
  setTimeout(() => {
    router.push("/");
  }, 300);
};
</script>

<style scoped>
.recharge-topup-screen {
  min-height: 100vh;
  background: #f8f9fa;
}

/* Balance Display */
.balance-display {
  padding: 20px 0;
}

.balance-display h5 {
  color: #666;
  font-weight: 500;
}

.balance-amount {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 28px;
}

.balance-amount img {
  filter: brightness(1.2) saturate(1.4) sepia(1) hue-rotate(-20deg) saturate(5)
    brightness(0.9);
}

/* Input Section */
.input-section h5 {
  color: #333;
  font-weight: 600;
}

.input-group-lg .form-control {
  font-size: 18px;
  padding: 15px;
  border-radius: 12px 0 0 12px;
  border: 2px solid #e9ecef;
  transition: all 0.3s ease;
}

.input-group-lg .input-group-text {
  font-size: 18px;
  padding: 15px;
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.input-group-lg .input-group-text img {
  filter: brightness(1.2) saturate(1.4) sepia(1) hue-rotate(-20deg) saturate(5)
    brightness(0.9);
}

.input-group-lg .input-group-text:first-child {
  border-radius: 12px 0 0 12px;
  border-right: none;
}

.input-group-lg .input-group-text:last-child {
  border-radius: 0 12px 12px 0;
  border-left: none;
}

/* Action Section */
.action-section .btn {
  border-radius: 15px;
  font-weight: 600;
  font-size: 18px;
  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
  transition: all 0.3s ease;
  border: none;
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
}

.action-section .btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(40, 167, 69, 0.4);
}

.action-section .btn:disabled {
  background: #6c757d;
  box-shadow: none;
  transform: none;
}

.action-section .btn:active {
  transform: translateY(0);
}

/* Mobile responsive */
@media (max-width: 576px) {
  .balance-amount {
    font-size: 24px;
  }

  .input-group-lg .form-control,
  .input-group-lg .input-group-text {
    font-size: 16px;
    padding: 12px;
  }

  .action-section .btn {
    font-size: 16px;
  }
}
</style>
