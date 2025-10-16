<template>
  <div class="container-fluid px-3 px-md-4 px-lg-5 px-xl-6">
    <div class="row justify-content-center">
      <div
        class="col-12 col-sm-11 col-md-10 col-lg-8 col-xl-6 col-xxl-12 custom-xxl-width mx-0 px-0 py-2"
      >
        <div
          class="card shadow-sm border-0 rounded-3 bg-white hover-lift account-card"
        >
          <div class="card-body d-flex align-items-center">
            <!-- TikTok Icon -->
            <div class="flex-shrink-0 me-3 me-lg-4">
              <img
                :src="logoUrl"
                alt="TikTok Logo"
                class="rounded-circle object-fit-contain tiktok-icon"
                width="30"
                height="30"
              />
            </div>

            <!-- Balance Info -->
            <div class="flex-grow-1">
              <div class="d-flex align-items-center text-muted small mb-2">
                <i class="bi bi-wallet2 me-2"></i>
                {{ label }}
              </div>
              <div
                class="fw-bold text-dark balance-amount d-flex align-items-center"
              >
                <img
                  src="../img/coin-tiktok.png"
                  alt="TikTok Coin"
                  width="28"
                  height="28"
                  class="me-2 coin-icon"
                />
                <span class="balance-text">{{ formatNumber(balance) }}</span>
              </div>
            </div>

            <!-- Dropdown Button -->
            <div class="flex-shrink-0">
              <button
                class="btn btn-outline-light text-muted p-3 border-0 dropdown-toggle-custom"
                @click="$emit('toggle-dropdown')"
                type="button"
              >
                <svg width="10" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import logoUrl from "../img/logo.png";

// Props definition với default values
defineProps({
  balance: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "Recharge",
  },
});

// Emits definition
defineEmits(["toggle-dropdown"]);

// Helper functions
const formatNumber = (num) => {
  return num.toLocaleString();
};
</script>

<style scoped>
/* Account Card Design */

.account-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: 1px solid rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(10px);
}

/* Custom Bootstrap enhancements */
.hover-lift {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15) !important;
}

.tiktok-icon {
  transition: all 0.3s ease;
  color: #333 !important;
  border: 2px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.tiktok-icon:hover {
  transform: scale(1.05);
  border-color: rgba(254, 44, 85, 0.3);
}

.balance-text {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 500;
  letter-spacing: -0.02em;
}

.dropdown-toggle-custom {
  transition: all 0.3s ease;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
}

.dropdown-toggle-custom:hover {
  transform: rotate(180deg) scale(1.1);
  background: rgba(254, 44, 85, 0.1);
  border-color: rgba(254, 44, 85, 0.2);
}

.dropdown-toggle-custom:focus {
  box-shadow: 0 0 0 3px rgba(254, 44, 85, 0.15) !important;
}

/* Responsive adjustments for Bootstrap */
@media (max-width: 575.98px) {
  .tiktok-icon {
    width: 35px !important;
    height: 35px !important;
  }

  .balance-amount {
    font-size: 1.1rem !important;
  }

  .dropdown-toggle-custom svg {
    width: 18px !important;
    height: 18px !important;
  }

  .account-card {
    border-radius: 0 !important; /* Bỏ bo góc riêng cho mobile */
  }
.card-body{
  padding:5px 16px !important;  ;
}
}

@media (min-width: 576px) and (max-width: 767.98px) {
  .tiktok-icon {
    width: 48px !important;
    height: 48px !important;
  }

  .balance-amount {
    font-size: 1.2rem !important;
  }

  .card-body {
    padding: 0 !important;
  }
}

@media (min-width: 768px) and (max-width: 991.98px) {
  .tiktok-icon {
    width: 52px !important;
    height: 52px !important;
  }

  .balance-amount {
    font-size: 1.35rem !important;
  }

  .card-body {
    padding: 0 !important;
  }
}

@media (min-width: 992px) and (max-width: 1199.98px) {
  .tiktok-icon {
    width: 56px !important;
    height: 56px !important;
  }

  .balance-amount {
    font-size: 1.4rem !important;
  }

  .card-body {
    padding: 0 !important;
  }

  .dropdown-toggle-custom {
    padding: 0.5rem !important; /* Giảm từ 0.75rem xuống 0.5rem */
  }

  .dropdown-toggle-custom svg {
    width: 22px !important; /* Giảm từ 26px xuống 22px */
    height: 22px !important; /* Giảm từ 26px xuống 22px */
  }
}

/* TikTok Theme Colors */
.bg-tiktok-gradient {
  background: linear-gradient(
    135deg,
    rgba(255, 0, 80, 0.05),
    rgba(255, 255, 255, 0.95)
  ) !important;
}

.text-tiktok {
  color: #ff0050 !important;
}

.border-tiktok {
  border-color: rgba(255, 0, 80, 0.2) !important;
}

/* Coin Icon Enhancements */
.coin-icon {
  object-fit: contain;
  transition: all 0.3s ease;
  filter: brightness(1.2) saturate(1.4) hue-rotate(15deg) contrast(1.1);
  vertical-align: middle;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(254, 44, 85, 0.2);
}

.coin-icon:hover {
  transform: scale(1.1) rotate(10deg);
  filter: brightness(1.3) saturate(1.6) hue-rotate(20deg) contrast(1.2);
}

/* Responsive coin icon sizes */
@media (max-width: 575.98px) {
  .coin-icon {
    width: 22px !important;
    height: 22px !important;
  }
}

@media (min-width: 576px) and (max-width: 767.98px) {
  .coin-icon {
    width: 24px !important;
    height: 24px !important;
  }
}

@media (min-width: 768px) and (max-width: 991.98px) {
  .coin-icon {
    width: 26px !important;
    height: 26px !important;
  }
}

@media (min-width: 992px) and (max-width: 1199.98px) {
  .coin-icon {
    width: 30px !important;
    height: 30px !important;
  }
}

@media (min-width: 1200px) {
  .coin-icon {
    width: 32px !important;
    height: 32px !important;
  }
  .col {
    width: 1000px !important;
  }
  .card-body {
    padding: 5px !important;
  }
  .tiktok-icon {
    width: 40px !important;
    height: 40px !important;
  }

  .balance-amount {
    font-size: 1.5rem !important;
  }

  .dropdown-toggle-custom {
    padding: 0.5rem !important; /* Giảm từ 1rem xuống 0.5rem */
  }

  .dropdown-toggle-custom svg {
    width: 20px !important; /* Giảm từ 28px xuống 20px */
    height: 20px !important; /* Giảm từ 28px xuống 20px */
  }

  .account-card {
    border-radius: 1rem !important;
  }
}

/* Custom width cho màn hình XXL */
@media (min-width: 1400px) {
  .custom-xxl-width {
    flex: 0 0 99% !important; /* Custom width 95% thay vì 91.7% (col-11) hoặc 100% (col-12) */
    max-width: 96% !important;
  }
}

.balance-amount {
  display: flex !important;
  align-items: center !important;
}
</style>
