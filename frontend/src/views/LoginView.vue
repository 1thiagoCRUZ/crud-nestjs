<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden">
    
    <img 
      src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1920&auto=format&fit=crop" 
      alt="Background Car"
      class="absolute inset-0 w-full h-full object-cover opacity-40 blur-sm"
    />

    <div class="relative z-10 bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl mx-4 animate-fade-in-up">
      
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-4">
          <Car :size="32" class="text-blue-600" />
        </div>
        <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">
          Insta<span class="text-blue-600">Car</span>
        </h1>
        <p class="text-gray-500 mt-2 text-sm">Bem-vindo de volta! Acelere seu dia. 🏎️</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail :size="20" class="text-gray-400" />
            </div>
            <input 
              v-model="email" 
              type="email" 
              placeholder="exemplo@instacar.com" 
              class="pl-10 input-moderno"
              required
            />
          </div>
        </div>

        <div>
          <div class="flex justify-between items-center mb-1">
            <label class="block text-sm font-medium text-gray-700">Senha</label>
            <a href="#" class="text-xs text-blue-600 hover:text-blue-800 font-medium">Esqueceu a senha?</a>
          </div>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock :size="20" class="text-gray-400" />
            </div>
            <input 
              v-model="password" 
              type="password" 
              placeholder="••••••••" 
              class="pl-10 input-moderno"
              required
            />
          </div>
        </div>

        <button 
          type="submit" 
          :disabled="loading"
          class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:ring-4 focus:ring-blue-300 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span v-if="loading">Carregando...</span>
          <span v-else>Entrar no Sistema</span>
        </button>
      </form>

      <div class="mt-6 text-center text-sm text-gray-500">
        Não tem uma conta? 
        <a href="#" class="text-blue-600 font-bold hover:underline">Crie agora</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import { Car, Mail, Lock } from 'lucide-vue-next'; // Ícones bonitos

const auth = useAuthStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const loading = ref(false);

async function handleLogin() {
  loading.value = true;
  // Pequeno delay fake só pra mostrar a animação do botão (opcional)
  await new Promise(r => setTimeout(r, 500));
  
  const success = await auth.login(email.value, password.value);
  
  if (success) {
    router.push('/feed');
  } else {
    alert('Email ou senha inválidos!');
  }
  loading.value = false;
}
</script>

<style scoped>
/* Animação de entrada suave */
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>