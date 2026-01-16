<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6 w-full max-w-md mx-auto">
    
    <div class="p-4 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
            {{ car.brand[0] }}
        </div>
        <div>
          <h3 class="font-bold text-gray-800 leading-tight">{{ car.brand }} {{ car.model }}</h3>
          <p class="text-xs text-gray-500">{{ car.year }}</p>
        </div>
      </div>
    </div>

    <div class="w-full h-64 bg-gray-100 relative">
      <img 
        :src="car.urlImage || 'https://placehold.co/600x400?text=Sem+Imagem'" 
        class="w-full h-full object-cover"
        alt="Carro"
      />
    </div>

    <div class="p-4">
      <div class="flex items-center gap-4 mb-3">
        <button @click="toggleLike" class="transition transform active:scale-110">
          <Heart 
            :class="isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-gray-900'" 
            :size="28" 
          />
        </button>

        <button @click="showComments = !showComments">
          <MessageCircle class="text-gray-600 hover:text-gray-900" :size="28" />
        </button>
      </div>

      <p class="font-semibold text-sm mb-2 text-gray-800">
        {{ localLikesCount }} curtidas
      </p>

      <p class="text-sm text-gray-700">
        <span class="font-bold mr-1">{{ car.brand }}</span> 
        Olha essa máquina! Ano {{ car.year }}.
      </p>

      <div v-if="showComments" class="mt-4 border-t pt-3 animate-fade-in">
        <p class="text-xs text-gray-400 mb-2 font-bold uppercase">Comentários</p>
        
        <div v-if="comments.length > 0" class="space-y-2 mb-3 max-h-40 overflow-y-auto">
            <div v-for="comment in comments" :key="comment.id" class="text-sm">
                <span class="font-bold mr-1">{{ comment.user?.name || 'Usuário' }}:</span>
                {{ comment.content }}
            </div>
        </div>
        <div v-else class="text-sm text-gray-400 mb-3 italic">
            Nenhum comentário ainda. Seja o primeiro!
        </div>

        <div class="flex gap-2">
            <input 
                v-model="newComment"
                type="text" 
                placeholder="Adicione um comentário..." 
                class="flex-1 bg-gray-50 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                @keyup.enter="sendComment"
            />
            <button 
                @click="sendComment"
                class="text-blue-500 font-bold text-sm disabled:opacity-50"
                :disabled="!newComment"
            >
                Publicar
            </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Heart, MessageCircle } from 'lucide-vue-next';
import api from '../services/api';

const props = defineProps({ car: Object });
const emit = defineEmits(['like']);

// Estado Local
const showComments = ref(false);
const isLiked = ref(false); // Idealmente viria do backend: props.car.isLiked
const localLikesCount = ref(Math.floor(Math.random() * 50)); // Mock de curtidas
const comments = ref([]);
const newComment = ref('');

// Buscar comentários quando abrir a seção
async function loadComments() {
    try {
        const { data } = await api.get(`/comments/car/${props.car.id}`);
        comments.value = data;
    } catch (error) {
        console.error("Erro ao carregar comentários", error);
    }
}

// Enviar Comentário
async function sendComment() {
    if (!newComment.value) return;
    try {
        const { data } = await api.post(`/comments/${props.car.id}`, { content: newComment.value });
        comments.value.unshift(data); // Adiciona no topo da lista
        newComment.value = ''; // Limpa input
    } catch (error) {
        alert('Erro ao comentar!');
    }
}

// Dar Like
async function toggleLike() {
    try {
        const { data } = await api.post(`/likes/${props.car.id}`);
        isLiked.value = !isLiked.value;
        
        // Ajusta contador visualmente
        if (data.status === 'liked') localLikesCount.value++;
        else localLikesCount.value--;
        
    } catch (error) {
        console.error(error);
    }
}

// Carregar comentários iniciais se quiser, ou usar watch no showComments
import { watch } from 'vue';
watch(showComments, (newVal) => {
    if (newVal && comments.value.length === 0) loadComments();
});
</script>