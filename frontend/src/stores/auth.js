import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api from '../services/api';

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem('token') || '');
    const user = ref(JSON.parse(localStorage.getItem('user')) || null);

    const isAuthenticated = computed(() => !!token.value);

    function setToken(tokenValue) {
        token.value = tokenValue;
        localStorage.setItem('token', tokenValue);
    }

    function setUser(userValue) {
        user.value = userValue;
        localStorage.setItem('user', JSON.stringify(userValue));
    }

    async function login(email, password) {
        try {
            const { data } = await api.post('/auth/login', { email, password });
            setToken(data.access_token);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    function logout() {
        token.value = '';
        user.value = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    return { token, user, isAuthenticated, login, logout, setUser };
});