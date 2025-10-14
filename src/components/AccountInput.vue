<template>
    <div class="mx-3 form-group">
     
      <label for="account-id" class="form-label text-muted fw-semibold small">{{
        label
      }}</label>
      <div class="input-group">
        <input
          id="account-id"
          v-model="accountId"
          type="text"
          :placeholder="placeholder"
          class="form-control border-0 shadow-sm rounded-0"
          @input="updateAccountId"
        />
      </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },

  showPasteButton: {
    type: Boolean,
    default: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "validate"]);

const accountId = ref(props.modelValue);
const error = ref("");

watch(
  () => props.modelValue,
  (newVal) => {
    accountId.value = newVal;
  }
);

const updateAccountId = () => {
  emit("update:modelValue", accountId.value);
  validateInput();
};

const pasteFromClipboard = async () => {
  try {
    const text = await navigator.clipboard.readText();
    accountId.value = text.trim();
    updateAccountId();
  } catch (err) {
    console.error("Failed to read clipboard:", err);
  }
};
</script>

<style scoped>
/* Custom Bootstrap form enhancements */

.form-control {
  padding: 0.625rem 0.875rem;
  font-size: 0.95rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  background-color: rgba(254, 44, 85, 0.07);

  color: #333333;
}
.form-control:focus {
  background-color: rgba(249, 68, 104, 0.07) !important;
}

.invalid-feedback {
  font-size: 0.75rem;
  color: #dc3545;
}

/* TikTok Theme */
.text-tiktok {
  color: #ff0050 !important;
}

/* Responsive adjustments */
@media (max-width: 575.98px) {
    
  .form-control {
    font-size: 0.9rem;
  }

  .form-label {
    font-size: 0.8rem !important;
  }
}

@media (min-width: 576px) and (max-width: 767.98px) {
  .form-control {
    font-size: 0.95rem;
  }
}

@media (min-width: 1200px) {
    .form-group {
        margin-right: 62px !important;
        margin-left: 62px !important;
    }
  .form-control {
    padding: 0.625rem 1rem;
    font-size: 0.95rem;
  }

  .form-label {
    font-size: 0.85rem !important;
  }
}
</style>
