<template>
  <div class="coin-options-container mx2">
    <div class="recharge-section">
      <h2 class="section-title">{{ title }}</h2>
      <p class="promo-text">{{ promoText }}</p>

      <div class="packages-grid">
        <CoinCard
          v-for="(pkg, index) in packages"
          :key="index"
          :coins="pkg.coins"
          :price="pkg.price"
          :discount="pkg.discount"
          :is-popular="pkg.isPopular"
          :is-selected="selectedPackage?.coins === pkg.coins"
          @select="handleSelectPackage"
        />

        <!-- Custom Amount Card -->
        <div
          class="custom-card card border-0 shadow-sm h-100"
          @click="openCustomModal"
        >
          <div class="card-body p-3 text-center">
            <div
              class="coin-header d-flex align-items-center justify-content-center mb-0"
            >
              <img
                src="../img/coin-tiktok.png"
                alt="TikTok Logo"
                class="tiktok-logo me-1"
                width="20"
                height="20"
              />
              <span class="coin-amount fs-5 text-dark">Custom</span>
            </div>
            <div class="price text-muted">Large amount supported</div>
          </div>
        </div>
      </div>

      <!-- Payment Section -->
      <div class="payment-section mt-4">
        <!-- Payment Methods -->
        <div class="payment-methods mb-3">
          
            <img
              src="../img/bank.png"
              alt="Payment Methods"
              class="img-fluid payment-icon"></img>
        </div>

        <!-- Total -->
        <div
          class="total-section d-flex justify-content-between align-items-center mb-3"
        >
          <span class="total-label fs-5 fw-bold">Total</span>
          <span class="total-amount fs-4  text-primary"
            >${{ selectedTotal }}</span
          >
        </div>

        <!-- Recharge Button -->
        <button
          class="btn btn-danger w-100 py-3 fs-5 fw-bold"
          :disabled="!selectedPackage"
          @click="handleRecharge"
        >
          Recharge
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import CoinCard from "./CoinCard.vue";

const props = defineProps({
  packages: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    default: "Recharge:",
  },
  promoText: {
    type: String,
    default: "Save around 25% with a lower third-party service fee",
  },
});

const emit = defineEmits(["select-package", "open-custom-modal", "recharge"]);

const selectedPackage = ref(null);

// Computed total price
const selectedTotal = computed(() => {
  if (!selectedPackage.value) return "0.00";
  // Hiển thị giá chính xác với 2 chữ số thập phân, nhưng loại bỏ .00 nếu là số nguyên
  const price = selectedPackage.value.price;
  return price % 1 === 0 ? price.toString() : price;
});

const handleSelectPackage = (pkg) => {
  selectedPackage.value = pkg;
  emit("select-package", pkg);
};

const openCustomModal = () => {
  emit("open-custom-modal");
};

const handleRecharge = () => {
  if (selectedPackage.value) {
    emit("recharge", selectedPackage.value);
  }
};
</script>

<style scoped>
.coin-options-container {
  padding: 0px 15px;
}

.recharge-section {
  width: 100%;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 10px 0 8px 0;
}

.promo-text {
  font-size: 15px;
  color: #e30000fb;
  margin: 0 0 24px 0;
  display: flex;
  align-items: center;
}

.promo-text::after {
  content: "ⓘ";
  margin-left: 8px;
  color: #999;
}

.packages-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.custom-card {
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 12px !important;
  background: rgb(248, 248, 248) !important;
}

.custom-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1) !important;
  border-color: rgba(255, 193, 7, 0.8) !important;
}

.custom-card .tiktok-logo {
  transition: transform 0.3s ease;
  filter: brightness(1.2) saturate(1.4) sepia(1) hue-rotate(-20deg) saturate(5)
    brightness(0.9);
}

.custom-card:hover .tiktok-logo {
  transform: scale(1.1) rotate(5deg);
}
.payment-icons {
  flex-wrap: wrap;
}

.payment-icon {
  font-size: 24px;
  width: 300px;
  height: 20px;
  border-radius: 8px;
  background: #f8f9fa;
  transition: all 0.3s ease;
}

.payment-icon:hover {
  background: #e9ecef;
  transform: scale(1.1);
}

.total-section {
  padding-top: 16px;
}

.total-label {
  color: #333;
}

.total-amount {
  color: #363636 !important;
}
.btn-danger {
  background: rgb(254, 44, 85) !important;
  border-color: #ff0050 !important;
  border-radius: 12px !important;
  font-weight: 700 !important;
  transition: all 0.3s ease;
  
}

.btn-danger:hover:not(:disabled) {
  background: rgb(254, 44, 85) !important;
  color: rgb(255, 255, 255);
  border-color: #e6004a !important;
  transform: translateY(-1px);
}

.btn-danger:disabled {
  background: #6c757d !important;
  border-color: #6c757d !important;
  opacity: 0.6;
}

.price {
  font-size: 0.875rem;
}
@media (min-width: 768px) {
  .coin-options-container {
    padding: 0 40px 40px;
  }

  .packages-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) {
  .packages-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }

  .custom-card {
    padding: 24px 20px;
  }
}

@media (min-width: 1440px) {
  .coin-options-container {
    padding: 0 60px 60px;
  }

  .packages-grid {
    grid-template-columns: repeat(5, 1fr);
    gap: 24px;
  }
}
</style>
