<template>
  <div
    class="coin-card card border-0 shadow-sm h-100"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    :class="cardClasses"
  >
    <div class="card-body p-1 text-center">
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
        <span class="coin-amount fs-6 text-dark">{{ formattedCoins }}</span>
      </div>
      <div class="price text-muted small">${{ formattedPrice }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

// ===== PROPS DEFINITION =====
const props = defineProps({
  coins: {
    type: Number,
    required: true,
    validator: (value) => value > 0,
  },
  price: {
    type: Number,
    required: true,
    validator: (value) => value > 0,
  },
  discount: {
    type: Number,
    default: 0,
    validator: (value) => value >= 0 && value <= 100,
  },
  isPopular: {
    type: Boolean,
    default: false,
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
  isCustom: {
    type: Boolean,
    default: false,
  },
});

// ===== EMITS DEFINITION =====
const emit = defineEmits(["select", "hover", "focus"]);

// ===== REACTIVE STATE =====
const isHovered = ref(false);
const isPressed = ref(false);

// ===== COMPUTED PROPERTIES =====
const formattedCoins = computed(() => {
  return new Intl.NumberFormat("en-US").format(props.coins);
});

const formattedPrice = computed(() => {
  return props.price;
});

const cardClasses = computed(() => ({
  "coin-card": true,
  selected: props.isSelected,
  popular: props.isPopular,
  custom: props.isCustom,
  hovered: isHovered.value,
  pressed: isPressed.value,
}));

// ===== METHODS =====
const handleClick = () => {
  isPressed.value = true;

  setTimeout(() => {
    isPressed.value = false;
  }, 150);

  emit("select", {
    coins: props.coins,
    price: props.price,
    isCustom: props.isCustom,
    timestamp: new Date().toISOString(),
  });
};

const handleMouseLeave = () => {
  isHovered.value = false;
  emit("hover", { coins: props.coins, action: "leave" });
};
</script>

<style scoped>
.coin-card {
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px !important;
  background: rgb(248, 248, 248) !important;
  border: 1px solid #e9ecef !important;
}



.coin-card.selected {
  border: 2px solid #ffc107 !important;
  
}

.tiktok-logo {
  transition: transform 0.3s ease;
  filter: brightness(1.2) saturate(1.4) sepia(1) hue-rotate(-20deg) saturate(5)
    brightness(0.9);
}

.coin-card:hover .tiktok-logo {
  transform: scale(1.1) rotate(5deg);
}



.coin-card.pressed {
  transform: translateY(0);
  transition: transform 0.1s ease;
}

/* Responsive adjustments with Bootstrap */
@media (max-width: 575.98px) {
  .tiktok-logo {
    width: 30px !important;
    height: 30px !important;
  }

  .coin-amount {
    font-size: 1.1rem !important;
  }

  .price {
    font-size: 0.75rem !important;
  }
}

@media (min-width: 576px) and (max-width: 767.98px) {
  .tiktok-logo {
    width: 20px !important;
    height: 20px !important;
  }
  .price {
    font-size: 0.8rem !important;
  }
}

@media (min-width: 768px) {
  .tiktok-logo {
    width: 20px !important;
    height: 20px !important;
  }
}
</style>
