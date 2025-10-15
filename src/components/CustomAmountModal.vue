<template>
  <Transition name="modal" appear>
    <div v-if="isOpen" class="modal-overlay" @click="handleOverlayClick">
      <div class="modal-content" @click.stop>
        <button class="close-btn" @click="close">×</button>

        <div class="modal-header">
          <h3 class="modal-title">Custom</h3>
        </div>

        <div class="modal-body">
          <!-- Number of Coins Section -->
          <div class="mb-3">
            <label class="form-label fw-semibold">Number of Coins ▼</label>
            <div class="coins-display d-flex align-items-center bg-light">
              <img
                src="../img/coin-tiktok.png"
                alt="TikTok Logo"
                class="coin-icon me-2"
                width="20"
                height="20"
              />
              <span class="coins-value fs-5 fw-bold text-dark">{{
                formatNumber(customCoins || 0)
              }}</span>
            </div>
          </div>

          <!-- Number Pad with Bootstrap Grid -->
          <div class="number-pad mb-3">
            <div class="row g-2">
              <div class="col-3">
                <button class="btn w-100 num-btn" @click="addNumber(1)">
                  1
                </button>
              </div>
              <div class="col-3">
                <button class="btn w-100 num-btn" @click="addNumber(2)">
                  2
                </button>
              </div>
              <div class="col-3">
                <button class="btn w-100 num-btn" @click="addNumber(3)">
                  3
                </button>
              </div>
              <div class="col-3">
                <button class="btn w-100 num-btn" @click="clearLast">⌫</button>
              </div>

              <div class="col-3">
                <button class="btn w-100 num-btn" @click="addNumber(4)">
                  4
                </button>
              </div>
              <div class="col-3">
                <button class="btn w-100 num-btn" @click="addNumber(5)">
                  5
                </button>
              </div>
              <div class="col-3">
                <button class="btn w-100 num-btn" @click="addNumber(6)">
                  6
                </button>
              </div>
              <div class="col-3">
                <button class="btn w-100 num-btn" @click="addThreeZeros">
                  000
                </button>
              </div>

              <div class="col-3">
                <button class="btn w-100 num-btn" @click="addNumber(7)">
                  7
                </button>
              </div>
              <div class="col-3">
                <button class="btn w-100 num-btn" @click="addNumber(8)">
                  8
                </button>
              </div>
              <div class="col-3">
                <button class="btn w-100 num-btn" @click="addNumber(9)">
                  9
                </button>
              </div>
              <div class="col-3">
                <button class="btn w-100 num-btn" @click="addNumber(0)">
                  0
                </button>
              </div>
            </div>
          </div>

          <div class="d-flex justify-content-between">
            <span class="fw-bold">Total:</span>
            <span class="fw-bold text-black"
              >${{ formatPrice(customPrice || 0) }}</span
            >
          </div>
        </div>

        <div class="modal-footer">
          <div class="d-flex gap-3 w-100">
            <button
              class="btn btn-danger flex-fill py-2"
              @click="confirm"
              :disabled="!isValid"
            >
              Recharge
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  exchangeRate: {
    type: Number,
    default: 100,
  },
});

const emit = defineEmits(["close", "confirm"]);

const customCoins = ref(0);
const customPrice = ref("");

const isValid = computed(() => {
  return customCoins.value > 0 && customPrice.value > 0;
});

const addNumber = (num) => {
  customCoins.value = customCoins.value * 10 + num;
  calculatePrice();
};

const addThreeZeros = () => {
  if (customCoins.value > 0) {
    // Chỉ thêm 000 nếu đã có số trước đó
    customCoins.value = customCoins.value * 1000;
    calculatePrice();
  }
};

const clearLast = () => {
  customCoins.value = Math.floor(customCoins.value / 10);
  calculatePrice();
};

const clearAll = () => {
  customCoins.value = 0;
  customPrice.value = "";
};

const calculatePrice = () => {
  if (customCoins.value > 0) {
    // Tỷ lệ cố định: 1 coin = 0.01057 USD
    const pricePerCoin = 0.74/70;
    const totalPrice = customCoins.value * pricePerCoin;
    customPrice.value = totalPrice.toFixed(2);
  } else {
    customPrice.value = "";
  }
};

const calculateCoins = () => {
  if (customPrice.value && customPrice.value > 0) {
    // Công thức ngược: coins = price / 0.01057
    const pricePerCoin = 0.74/70; // Lấy từ gói nhỏ nhất
    const coins = Math.round(parseFloat(customPrice.value) / pricePerCoin);
    customCoins.value = coins;
  }
};

const formatNumber = (num) => {
  return parseInt(num).toLocaleString();
};

const formatPrice = (price) => {
  return parseFloat(price).toFixed(2);
};

const close = () => {
  customCoins.value = 0;
  customPrice.value = "";
  emit("close");
};

const confirm = () => {
  if (isValid.value) {
    emit("confirm", {
      coins: parseInt(customCoins.value),
      price: parseFloat(customPrice.value),
      isCustom: true,
    });
    close();
  }
};

const handleOverlayClick = () => {
  close();
};

// Reset values when modal opens
watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      customCoins.value = 0;
      customPrice.value = "";
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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 1000;
  padding: 0;
  border-radius: 8px;
}

.modal-content {
  background: white;
  border-radius: 20px 20px 0 0; /* Bo 2 góc trên, 2 góc dưới vuông */

  box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

/* Modal slide up animation */
.modal-enter-active {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.modal-leave-active {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.modal-enter-from {
  opacity: 0;
}

.modal-enter-from .modal-content {
  transform: translateY(100%);
}

.modal-leave-to {
  opacity: 0;
}

.modal-leave-to .modal-content {
  transform: translateY(100%);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0px;
}

.modal-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  text-align: center;
}

.close-btn {
  position: absolute;
  top: 8px; /* ← Giảm từ 15px xuống 8px */
  right: 12px; /* ← Giảm từ 20px xuống 12px */
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: #666;
  font-size: 18px;
  line-height: 1;
  transition: background-color 0.2s ease;
  z-index: 10; /* ← Thêm z-index để đảm bảo ở trên */
}

.close-btn:hover {
  background: #f5f5f5;
  border-radius: 4px;
}

.modal-body {
  padding-top: 0px !important;
  padding-bottom: 5px !important;
}

.coin-icon {
  width: 30px !important;
  height: 30px !important;
  object-fit: contain;
  transition: transform 0.3s ease;
  filter: brightness(1.2) saturate(1.4) sepia(1) hue-rotate(-20deg) saturate(5)
    brightness(0.9);
}

.coins-value {
  color: #333 !important;
}

.num-btn {
  aspect-ratio: 1.8 !important;
  font-size: 1.25rem !important;
  font-weight: 600 !important;
  border: 1px solid #dee2e6 !important;
  border-radius: 0 !important;
  transition: all 0.2s ease !important;
  min-height: 50px;
  background-color: rgba(22, 24, 35, 0.06) !important;
  color: #000000 !important;
}

/* Responsive for mobile */
@media (max-width: 575.98px) {
  .modal-title {
    font-size: 22px;
  }

  .close-btn {
    font-size: 16px;
    top: 6px; /* ← Giảm từ 18px xuống 6px */
    right: 10px; /* ← Giảm từ 18px xuống 10px */
  }

  .num-btn {
    font-size: 1rem !important;
    min-height: 40px;
  }

  .modal-body {
    padding: 1rem;
  }

  .coins-display {
    min-height: 20px !important;
    padding: 0px !important;
  }

  .coin-icon {
    width: 18px;
    height: 18px;
  }
  .coins-display {
    min-height: 60px;
    border-radius: 0;
    padding: 8px 12px 8px 4px !important;
  }
}

.num-btn:hover {
  background-color: #e9ecef !important;
  border-color: #adb5bd !important;
  transform: scale(0.98);
}

.num-btn:active {
  transform: scale(0.95);
}

.total-summary {
  border-radius: 0;
}

.modal-footer {
  padding: 1rem !important;
}

.btn-danger {
  background-color: rgb(254, 44, 85) !important;
  border-color: rgb(254, 44, 85) !important;
  font-weight: 600 !important;
  border-radius: 0 !important;
}

.btn-danger:hover:not(:disabled) {
  background-color: rgb(254, 44, 85) !important;
  border-color: rgb(254, 44, 85) !important;
  transform: translateY(-1px);
}

.btn-secondary {
  font-weight: 600 !important;
  border-radius: 0 !important;
}
</style>
