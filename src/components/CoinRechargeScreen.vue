<template>
  <div class="coin-recharge-screen">
    <AppHeader :title="title" @back="handleBack" />

    <AccountBalance
      :balance="currentBalance"
      :username="username"
      :label="balanceLabel"
      @toggle-dropdown="handleDropdownToggle"
    />

    <AccountInput
      v-model="accountId"
      :label="accountInputLabel"
      :placeholder="accountPlaceholder"
      :required="true"
      @validate="handleAccountValidation"
    />

    <CoinOptionsGrid
      :packages="coinPackages"
      :title="optionsTitle"
      :promo-text="promoText"
      @select-package="handleSelectPackage"
      @open-custom-modal="handleOpenCustomModal"
      @recharge="handleRecharge"
    />

    <!-- Modals -->
    <CustomAmountModal
      :is-open="showCustomModal"
      :exchange-rate="exchangeRate"
      @close="handleCloseCustomModal"
      @confirm="handleCustomAmountConfirm"
    />

    <PaymentModal
      :is-open="showPaymentModal"
      :order-data="currentOrder"
      :account-id="accountId"
      @close="handleClosePaymentModal"
      @payment-complete="handlePaymentComplete"
    />

    <SuccessNotification
      :is-visible="showSuccessNotification"
      :order-data="completedOrder"
      @close="handleCloseSuccessNotification"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from "vue";
import AppHeader from "./AppHeader.vue";
import AccountBalance from "./AccountBalance.vue";
import AccountInput from "./AccountInput.vue";
import CoinOptionsGrid from "./CoinOptionsGrid.vue";
import CustomAmountModal from "./CustomAmountModal.vue";
import PaymentModal from "./PaymentModal.vue";
import SuccessNotification from "./SuccessNotification.vue";

// Props definition với interface-like structure
const props = defineProps({
  title: {
    type: String,
    default: "Get Coins",
  },
  balanceLabel: {
    type: String,
    default: "Recharge",
  },
  accountInputLabel: {
    type: String,
  },
  accountPlaceholder: {
    type: String,
    default: "@Enter username",
  },
  optionsTitle: {
    type: String,
    default: "Recharge:",
  },
  promoText: {
    type: String,
    default: "Save around 25% with a lower third-party service fee",
  },
});

// Emits definition
const emit = defineEmits([
  "package-selected",
  "payment-completed",
  "navigation-back",
]);

// ===== REACTIVE STATE MANAGEMENT =====
const currentBalance = ref(29759447);
const username = ref("@uktamj9nf");
const accountId = ref("");
const exchangeRate = ref(100);

// Load balance from localStorage
const loadBalanceFromStorage = () => {
  const savedBalance = localStorage.getItem("tiktok_balance");
  if (savedBalance) {
    currentBalance.value = parseInt(savedBalance);
  } else {
    // Nếu chưa có trong localStorage, lưu số dư ban đầu
    localStorage.setItem("tiktok_balance", currentBalance.value.toString());
  }
};

// Coin packages data với TikTok branding
const coinPackages = ref([
  { coins: 70, price: 0.74 },
  { coins: 350, price: 3.7, isPopular: true },
  { coins: 700, price: 7.4 },
  { coins: 1400, price: 14.8, discount: 10 },
  { coins: 3500, price: 35 },
  { coins: 7000, price: 74, discount: 15 },
  { coins: 17500, price: 185, discount: 20 },
]);

// ===== MODAL STATE MANAGEMENT =====
const showCustomModal = ref(false);
const showPaymentModal = ref(false);
const showSuccessNotification = ref(false);
const currentOrder = ref(null);
const completedOrder = ref(null);
const isAccountValid = ref(false);

// ===== COMPUTED PROPERTIES =====
const formattedBalance = computed(() => {
  return new Intl.NumberFormat("vi-VN").format(currentBalance.value);
});

const availablePackages = computed(() => {
  return coinPackages.value.filter((pkg) => pkg.coins > 0);
});

const isReadyToOrder = computed(() => {
  return isAccountValid.value && accountId.value.trim().length > 0;
});

// ===== WATCHERS =====
watch(
  accountId,
  (newValue) => {
    console.log("Account ID changed:", newValue);
  },
  { immediate: true }
);

watch(
  currentOrder,
  (newOrder) => {
    if (newOrder) {
      emit("package-selected", newOrder);
    }
  },
  { deep: true }
);

// ===== EVENT HANDLERS =====
const handleBack = async () => {
  console.log("Navigate back");
  emit("navigation-back");
  // Add navigation logic here
};

const handleDropdownToggle = () => {
  console.log("Toggle account dropdown");
  // Handle account dropdown toggle
};

const handleAccountValidation = (isValid) => {
  isAccountValid.value = isValid;
  console.log("Account validation status:", isValid);
};

const handleOpenCustomModal = () => {
  showCustomModal.value = true;
};

const handleCloseCustomModal = () => {
  showCustomModal.value = false;
};

const handleCustomAmountConfirm = async (customPackage) => {
  currentOrder.value = {
    ...customPackage,
    accountId: accountId.value,
    timestamp: new Date().toISOString(),
    orderId: `TT-CUSTOM-${Date.now()}`,
    isCustomOrder: true,
  };

  await nextTick();

  showPaymentModal.value = true;
};

const handleRecharge = (packageData) => {
  currentOrder.value = {
    ...packageData,
    accountId: accountId.value,
    timestamp: new Date().toISOString(),
    orderId: `TT-RECHARGE-${Date.now()}`,
    isCustomOrder: false,
  };

  showPaymentModal.value = true;
};

const handleClosePaymentModal = () => {
  showPaymentModal.value = false;
  currentOrder.value = null;
};

const handlePaymentComplete = (orderData) => {
  console.log("Payment completed:", orderData);

  // Trừ coins từ balance (đã được xử lý trong PaymentModal)
  // Chỉ cần cập nhật balance từ localStorage
  const newBalance = parseInt(
    localStorage.getItem("tiktok_balance") || "29759447"
  );
  currentBalance.value = newBalance;

  // Store completed order data
  completedOrder.value = {
    ...orderData,
    type: "purchase", // Đánh dấu đây là giao dịch mua
    message: `Đã mua ${orderData.coins.toLocaleString()} coins thành công!`,
  };

  // Hiển thị SuccessNotification
  showSuccessNotification.value = true;

  // Emit completion event
  emit("payment-completed", {
    order: orderData,
    newBalance: currentBalance.value,
    timestamp: new Date().toISOString(),
  });
};

const handleCloseSuccessNotification = () => {
  showSuccessNotification.value = false;
  completedOrder.value = null;
};

// Navigation functions
const goToTopup = () => {
  router.push("/topup");
};

const stayOnCoins = () => {
  // Already on coins page, maybe scroll to top or refresh
  window.scrollTo(0, 0);
}; // ===== LIFECYCLE HOOKS =====
onMounted(() => {
  console.log("CoinRechargeScreen mounted");
  // Load balance from localStorage
  loadBalanceFromStorage();

  // Listen for localStorage changes from other tabs/components
  window.addEventListener("storage", (e) => {
    if (e.key === "tiktok_balance" && e.newValue) {
      currentBalance.value = parseInt(e.newValue);
    }
  });
});

onUnmounted(() => {
  console.log("CoinRechargeScreen unmounted");
  // Cleanup if needed
});
</script>

<style scoped>
.coin-recharge-screen {
  min-height: 100vh;
  width: 100%;
  background: #f8f9fa;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
</style>

<style>
/* SweetAlert2 Custom Styles */
.tiktok-success-popup {
  border-radius: 12px !important;
  padding: 20px !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3) !important;
  max-width: 400px !important;
}

.tiktok-success-title {
  font-size: 18px !important;
  font-weight: 600 !important;
  color: #333 !important;
  margin-bottom: 12px !important;
}

.tiktok-success-message {
  font-size: 14px !important;
  color: #666 !important;
  line-height: 1.4 !important;
  margin-bottom: 20px !important;
}

.tiktok-success-button {
  background: #fe2c55 !important;
  border: none !important;
  border-radius: 8px !important;
  padding: 16px 32px !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  min-width: 120px !important;
  transition: all 0.3s ease !important;
}

.tiktok-success-button:hover {
  background: #e02c55 !important;
  transform: translateY(-1px) !important;
}

.swal2-icon.swal2-success {
  border-color: #00c851 !important;
  color: #00c851 !important;
}

.swal2-icon.swal2-success .swal2-success-ring {
  border-color: #00c851 !important;
}

.swal2-icon.swal2-success .swal2-success-fix {
  background-color: #00c851 !important;
}
</style>
