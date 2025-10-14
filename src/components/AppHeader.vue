<template>
  <div class="header">
    <button class="back-btn" @click="$emit('back')">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M15 18L9 12L15 6"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
    <h1 class="title">{{ title }}</h1>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "Get Coins",
  },
});

defineEmits(["back"]);
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.back-btn {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #333;
  margin-right: 16px;
  transition: opacity 0.2s ease;
}

.back-btn:hover {
  opacity: 0.7;
}

.title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

@media (min-width: 768px) {
  .header {
    padding: 16px 40px;
  }
}

@media (min-width: 1440px) {
  .header {
    padding: 20px 60px;
  }
}
</style>
