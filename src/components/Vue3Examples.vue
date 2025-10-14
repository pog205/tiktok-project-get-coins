<!--
  Vue 3 Modern Composition API Examples
  Demonstrates advanced <script setup> patterns
-->
<template>
  <div class="vue3-examples">
    <h1>Vue 3 Composition API Syntax Sugar Examples</h1>

    <!-- Props Demo -->
    <section class="example-section">
      <h2>1. Props với Validation & TypeScript-like</h2>
      <div class="code-example">
        <p>User: {{ userInfo.name }} ({{ userInfo.role }})</p>
        <p>Count: {{ count }}</p>
        <p>Status: {{ status }}</p>
      </div>
    </section>

    <!-- Reactive Demo -->
    <section class="example-section">
      <h2>2. Reactive State Management</h2>
      <div class="controls">
        <button @click="increment">Increment: {{ counter }}</button>
        <button @click="toggleTheme">Theme: {{ currentTheme }}</button>
        <input v-model="searchQuery" placeholder="Search..." />
      </div>
    </section>

    <!-- Computed Demo -->
    <section class="example-section">
      <h2>3. Computed Properties</h2>
      <div class="results">
        <p>Double Counter: {{ doubleCounter }}</p>
        <p>Search Results: {{ filteredItems.length }} items</p>
        <p>Theme Classes: {{ themeClasses }}</p>
      </div>
    </section>

    <!-- Watchers Demo -->
    <section class="example-section">
      <h2>4. Watchers & Effects</h2>
      <div class="watcher-demo">
        <p>Search performed {{ searchCount }} times</p>
        <p>Last search: {{ lastSearchTime }}</p>
      </div>
    </section>

    <!-- Lifecycle Demo -->
    <section class="example-section">
      <h2>5. Lifecycle Hooks</h2>
      <div class="lifecycle-info">
        <p>Component mounted at: {{ mountedTime }}</p>
        <p>Window width: {{ windowWidth }}px</p>
      </div>
    </section>

    <!-- Advanced Patterns -->
    <section class="example-section">
      <h2>6. Advanced Patterns</h2>
      <div class="advanced-demo">
        <button @click="fetchData">Fetch Data ({{ dataStatus }})</button>
        <div v-if="userData" class="user-card">
          <h3>{{ userData.name }}</h3>
          <p>{{ userData.email }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  computed,
  watch,
  watchEffect,
  onMounted,
  onUnmounted,
  onBeforeMount,
  onBeforeUnmount,
  nextTick,
  toRefs,
  toRef,
} from "vue";

// ===== 1. PROPS DEFINITION với Advanced Validation =====
const props = defineProps({
  userInfo: {
    type: Object,
    required: true,
    default: () => ({ name: "Guest", role: "user" }),
    validator: (value) => {
      return value && typeof value.name === "string" && value.name.length > 0;
    },
  },
  count: {
    type: Number,
    default: 0,
    validator: (value) => value >= 0,
  },
  status: {
    type: String,
    default: "active",
    validator: (value) => ["active", "inactive", "pending"].includes(value),
  },
  theme: {
    type: String,
    default: "light",
  },
});

// ===== 2. EMITS DEFINITION với Type Safety =====
const emit = defineEmits([
  "update:count",
  "user-action",
  "theme-changed",
  "data-fetched",
]);

// ===== 3. REACTIVE STATE MANAGEMENT =====
// Ref for primitives
const counter = ref(0);
const searchQuery = ref("");
const currentTheme = ref(props.theme);
const isLoading = ref(false);
const mountedTime = ref("");
const windowWidth = ref(0);
const searchCount = ref(0);
const lastSearchTime = ref("");
const dataStatus = ref("idle");

// Reactive for objects
const userData = ref(null);
const appState = reactive({
  isAuthenticated: false,
  notifications: [],
  preferences: {
    language: "en",
    darkMode: false,
  },
});

// Sample data for filtering
const items = ref([
  { id: 1, name: "Vue.js", category: "framework" },
  { id: 2, name: "React", category: "library" },
  { id: 3, name: "Angular", category: "framework" },
  { id: 4, name: "Svelte", category: "framework" },
]);

// ===== 4. COMPUTED PROPERTIES =====
const doubleCounter = computed(() => counter.value * 2);

const filteredItems = computed(() => {
  if (!searchQuery.value) return items.value;
  return items.value.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const themeClasses = computed(() => ({
  "theme-dark": currentTheme.value === "dark",
  "theme-light": currentTheme.value === "light",
  "is-loading": isLoading.value,
}));

const userDisplayName = computed(() => {
  const user = props.userInfo;
  return user ? `${user.name} (${user.role})` : "Anonymous";
});

// ===== 5. WATCHERS =====
// Simple watcher
watch(
  searchQuery,
  (newValue, oldValue) => {
    console.log(`Search changed from "${oldValue}" to "${newValue}"`);
    searchCount.value++;
    lastSearchTime.value = new Date().toLocaleTimeString();
  },
  {
    immediate: true,
    deep: true,
  }
);

// Multiple sources watcher
watch(
  [counter, currentTheme],
  ([newCounter, newTheme], [oldCounter, oldTheme]) => {
    console.log("Counter or theme changed:", {
      counter: { old: oldCounter, new: newCounter },
      theme: { old: oldTheme, new: newTheme },
    });
  }
);

// WatchEffect for reactive effects
watchEffect(() => {
  document.title = `Vue3 Demo - Counter: ${counter.value}`;
});

// Advanced watcher with options
watch(
  () => props.userInfo.name,
  (newName) => {
    console.log("User name changed to:", newName);
    emit("user-action", { type: "name-change", name: newName });
  },
  { flush: "post" }
);

// ===== 6. METHODS / FUNCTIONS =====
const increment = async () => {
  counter.value++;
  emit("update:count", counter.value);

  // Wait for DOM update
  await nextTick();
  console.log("Counter updated in DOM");
};

const toggleTheme = () => {
  currentTheme.value = currentTheme.value === "light" ? "dark" : "light";
  appState.preferences.darkMode = currentTheme.value === "dark";
  emit("theme-changed", currentTheme.value);
};

const fetchData = async () => {
  dataStatus.value = "loading";
  isLoading.value = true;

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    userData.value = {
      id: Math.floor(Math.random() * 1000),
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://via.placeholder.com/100",
    };

    dataStatus.value = "success";
    emit("data-fetched", userData.value);
  } catch (error) {
    console.error("Failed to fetch data:", error);
    dataStatus.value = "error";
  } finally {
    isLoading.value = false;
  }
};

const handleWindowResize = () => {
  windowWidth.value = window.innerWidth;
};

// ===== 7. COMPOSABLES PATTERN =====
const useLocalStorage = (key, defaultValue) => {
  const storedValue = ref(defaultValue);

  // Load from localStorage on init
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      storedValue.value = JSON.parse(stored);
    } catch (e) {
      storedValue.value = defaultValue;
    }
  }

  // Watch for changes and save
  watch(
    storedValue,
    (newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue));
    },
    { deep: true }
  );

  return storedValue;
};

// Use the composable
const savedPreferences = useLocalStorage("vue3-demo-prefs", {
  counter: 0,
  theme: "light",
});

// ===== 8. LIFECYCLE HOOKS =====
onBeforeMount(() => {
  console.log("Component about to mount");
});

onMounted(() => {
  console.log("Component mounted!");
  mountedTime.value = new Date().toLocaleString();

  // Set up event listeners
  window.addEventListener("resize", handleWindowResize);
  handleWindowResize(); // Initial call

  // Restore saved state
  if (savedPreferences.value.counter > 0) {
    counter.value = savedPreferences.value.counter;
  }
  if (savedPreferences.value.theme) {
    currentTheme.value = savedPreferences.value.theme;
  }
});

onBeforeUnmount(() => {
  console.log("Component about to unmount");

  // Save current state
  savedPreferences.value = {
    counter: counter.value,
    theme: currentTheme.value,
  };
});

onUnmounted(() => {
  console.log("Component unmounted!");

  // Cleanup event listeners
  window.removeEventListener("resize", handleWindowResize);
});

// ===== 9. EXPOSE PUBLIC API (Optional) =====
defineExpose({
  increment,
  fetchData,
  counter: readonly(counter),
  userData: readonly(userData),
});
</script>

<style scoped>
.vue3-examples {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.example-section {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #f9f9f9;
}

.example-section h2 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.3em;
}

.code-example,
.controls,
.results,
.watcher-demo,
.lifecycle-info,
.advanced-demo {
  background: white;
  padding: 15px;
  border-radius: 6px;
  border-left: 4px solid #3498db;
}

.controls button {
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 8px 16px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.controls button:hover {
  background: #2980b9;
}

.controls input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.user-card {
  background: #ecf0f1;
  padding: 15px;
  border-radius: 6px;
  margin-top: 10px;
}

.user-card h3 {
  margin: 0 0 5px 0;
  color: #2c3e50;
}

.user-card p {
  margin: 0;
  color: #7f8c8d;
}

/* Theme classes */
.theme-dark {
  background: #2c3e50;
  color: white;
}

.theme-light {
  background: white;
  color: #2c3e50;
}

.is-loading {
  opacity: 0.6;
  pointer-events: none;
}

/* Responsive */
@media (max-width: 768px) {
  .vue3-examples {
    padding: 10px;
  }

  .example-section {
    padding: 15px;
  }
}
</style>
