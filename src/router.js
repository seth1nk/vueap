import { createRouter, createWebHistory } from 'vue-router'; // Импортируем функции из Vue Router 4
import Home from './components/Home.vue'; // Импортируем компоненты
import About from './components/About.vue';
import Contact from './components/Contact.vue';
import PetList from './components/PetList.vue';
import PitanieList from './components/PitanieList.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import ViewPet from '@/components/ViewPet.vue';
import ViewPitanie from '@/components/ViewPitanie.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/contact', component: Contact },
  { path: '/pets', component: PetList },
  { path: '/pitanie', component: PitanieList },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/view-pet/:id', component: ViewPet },
  { path: '/view-pitanie/:id', component: ViewPitanie },
];

const router = createRouter({
  history: createWebHistory(), // Используем историю браузера
  routes,
});

export default router;
