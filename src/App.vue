<template>
  <header>
    <div class="wrapper">
      <router-view></router-view>
    </div>
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap" rel="stylesheet">
  </header>
  <main>
    <TheWelcome />
  </main>
  <!-- Правая панель -->
  <aside class="right-panel">
    <div class="logo-container">
      <router-link to="/">
        <img src="/images/logo.png" alt="Logo" class="logo" />
      </router-link>
    </div>
    <nav class="nav-buttons">
      <ul class="button-list">
        <li>
          <router-link to="/" class="button">Главная</router-link>
        </li>
        <li>
          <router-link to="/about" class="button">О нас</router-link>
        </li>
        <li>
          <router-link to="/contact" class="button">Контакты</router-link>
        </li>
        <li v-if="isAuthenticated">
          <router-link to="/pets" class="button">Питомцы</router-link>
        </li>
        <li v-if="isAuthenticated">
          <router-link to="/pitanie" class="button">Питание</router-link>
        </li>
        <li v-if="!isAuthenticated">
          <router-link to="/login" class="button">Войти</router-link>
        </li>
        <li v-if="!isAuthenticated">
          <router-link to="/register" class="button">Зарегистрироваться</router-link>
        </li>
        <li v-if="isAuthenticated" class="welcome-message">
          <span>Добро пожаловать, {{ username }}</span>
        </li>
        <li v-if="isAuthenticated">
          <button @click="logout" class="button">Выйти</button>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
  export default {
    data() {
      return {
        isAuthenticated: false,
        username: ''
      };
    },
    created() {
      this.checkAuth();
    },
    methods: {
      async checkAuth() {
        const token = localStorage.getItem('token');
        if (!token) {
          this.isAuthenticated = false;
          this.username = '';
          return;
        }

        try {
          const response = await fetch('https://node-production-579e.up.railway.app/auth/check', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.ok) {
            const data = await response.json();
            this.isAuthenticated = true;
            this.username = data.username || 'Пользователь';
          } else {
            console.error('Токен недействителен');
            localStorage.removeItem('token');
            this.isAuthenticated = false;
            this.username = '';
          }
        } catch (err) {
          console.error('Ошибка проверки авторизации:', err);
          localStorage.removeItem('token');
          this.isAuthenticated = false;
          this.username = '';
        }
      },
      async logout() {
        try {
          const response = await fetch('https://node-production-579e.up.railway.app/auth/logout', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });

          if (response.ok) {
            localStorage.removeItem('token');
            this.isAuthenticated = false;
            this.username = '';
            this.$router.push('/');
          } else {
            console.error('Сервер вернул ошибку при выходе');
          }
        } catch (err) {
          console.error('Ошибка выхода:', err);

          // Если возникла ошибка, все равно очищаем токен
          localStorage.removeItem('token');
          this.isAuthenticated = false;
          this.username = '';
          this.$router.push('/');
        }
      }
    }
  };
</script>

<style scoped>
  .right-panel {
    position: fixed;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    background-color: #f9f9f9;
    border-left: 1px solid #ddd;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  /* Убираем маркеры списка и отступы */
  .button-list {
    list-style-type: none; /* Убираем точки */
    padding-left: 0; /* Убираем отступ слева */
    margin: 0; /* Убираем внешние отступы */
  }

  .button {
    display: block;
    margin: 5px 0;
    padding: 8px 12px;
    background-color: crimson;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }

    .button:hover {
      background-color: firebrick;
    }

  .welcome-message span {
    display: block;
    margin: 5px 0;
    font-size: 16px;
    color: #333;
    font-weight: bold;
  }
</style>
