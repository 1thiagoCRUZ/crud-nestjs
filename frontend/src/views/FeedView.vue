<template>
  <div class="min-h-screen pb-20">
    <header
      class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
    >
      <div class="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
        <div
          class="flex items-center gap-2 cursor-pointer transition hover:opacity-80"
          @click="scrollToTop"
        >
          <div
            class="bg-gradient-to-tr from-blue-600 to-blue-400 text-white p-1.5 rounded-lg shadow-sm"
          >
            <Car :size="20" stroke-width="2.5" />
          </div>
          <h1 class="font-sans text-xl font-extrabold tracking-tighter text-gray-900">
            Insta<span class="text-blue-600">Car</span>
          </h1>
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="handleLogout"
            class="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-red-500 hover:bg-red-50 px-3 py-2 rounded-full transition-all duration-200 group"
            title="Sair do sistema"
          >
            <span class="hidden sm:inline group-hover:text-red-600">Sair</span>
            <LogOut :size="20" class="group-hover:stroke-red-500" />
          </button>
        </div>
      </div>
    </header>

    <main class="p-4 flex flex-col items-center">
      <div v-if="loading" class="mt-10 animate-pulse text-gray-400">
        Carregando feed...
      </div>

      <CarCard v-else v-for="carro in cars" :key="carro.id" :car="carro" />

      <div v-if="!loading && cars.length === 0" class="text-center mt-10 text-gray-500">
        <p>Ainda não tem carros.</p>
        <p>Seja o primeiro a postar!</p>
      </div>
    </main>

    <button
      @click="showModal = true"
      class="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-105 active:scale-95 flex items-center justify-center"
    >
      <Plus :size="24" />
    </button>

    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
    >
      <div
        class="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl relative animate-fade-in-up"
      >
        <button
          @click="showModal = false"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X :size="20" />
        </button>

        <h2 class="text-xl font-bold mb-4 text-gray-800">Novo Carro 🚘</h2>

        <form @submit.prevent="createCar" class="flex flex-col gap-3">
          <input
            v-model="form.brand"
            placeholder="Marca (ex: Ferrari)"
            class="input-padrao"
            required
          />
          <input
            v-model="form.model"
            placeholder="Modelo (ex: F8)"
            class="input-padrao"
            required
          />
          <input
            v-model="form.year"
            type="number"
            placeholder="Ano (ex: 2024)"
            class="input-padrao"
            required
          />
          <input
            v-model="form.urlImage"
            placeholder="URL da Foto"
            class="input-padrao"
            required
          />

          <button
            type="submit"
            class="bg-blue-600 text-white font-bold py-3 rounded-lg mt-2 hover:bg-blue-700 transition"
          >
            Postar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
import { Plus, X, Car, LogOut } from "lucide-vue-next";

// Adicione essa funçãozinha para clicar no logo e subir a tela
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
import api from "../services/api";
import CarCard from "../components/CarCard.vue";

const auth = useAuthStore();
const router = useRouter();
const cars = ref([]);
const loading = ref(true);
const showModal = ref(false);

// Formulário reativo
const form = reactive({
  brand: "",
  model: "",
  year: "",
  urlImage: "",
});

// Carregar Feed
async function loadCars() {
  try {
    const response = await api.get("/cars");
    // Ordenar do mais novo pro mais antigo (gambiarra no front se o back nao ordenar)
    cars.value = response.data.reverse();
  } catch (error) {
    if (error.response?.status === 401) handleLogout();
  } finally {
    loading.value = false;
  }
}

// Criar Carro
async function createCar() {
  try {
    await api.post("/cars", {
      ...form,
      year: Number(form.year), // Garante que ano é numero
    });

    // Limpa e fecha
    showModal.value = false;
    form.brand = "";
    form.model = "";
    form.year = "";
    form.urlImage = "";

    // Recarrega lista
    await loadCars();
  } catch (error) {
    alert("Erro ao criar carro: " + error.message);
  }
}

function handleLogout() {
  auth.logout();
  router.push("/");
}

onMounted(loadCars);
</script>

<style scoped>
/* Animaçãozinha pro modal aparecer suave */
.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
