<template>
  <div class="app-container">
    <h1 class="page-title">Просмотр питомца</h1>
    <div v-if="pet" class="pet-details">
      <div class="pet-image-container">
        <img v-if="pet.img" :src="`${backendUrl}${pet.img}`" alt="Pet Image" class="pet-image" />
        <span v-else>Нет изображения</span>
      </div>
      <div class="pet-info">
        <p><strong>Имя:</strong> {{ pet.name }}</p>
        <p><strong>Вид:</strong> {{ pet.species }}</p>
        <p><strong>Возраст:</strong> {{ pet.age }} лет</p>
        <p><strong>Пол:</strong> {{ pet.gender }}</p>
        <p><strong>Цена:</strong> {{ pet.price }} ₽</p>
        <p>
          <strong>Доступен:</strong>
          <span :class="['status', pet.available ? 'available' : 'unavailable']">
            {{ pet.available ? 'Да' : 'Нет' }}
          </span>
        </p>
      </div>
      <div class="action-buttons">
        <button class="btn-secondary" @click="$router.push('/list-pets')">Вернуться к списку</button>
        <button class="btn-primary" @click="$router.push(`/edit-pet/${pet.id}`)">Редактировать</button>
      </div>
    </div>
    <p v-else class="loading-message">Загрузка данных...</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pet: null,
        backendUrl: 'https://node-production-579e.up.railway.app',
      };
    },
    async created() {
      const petId = this.$route.params.id;
      await this.fetchPet(petId);
    },
    methods: {
      async fetchPet(petId) {
        try {
          const response = await fetch(`${this.backendUrl}/api/view-pet/${petId}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          this.pet = data;
        } catch (err) {
          console.error('Ошибка при получении данных питомца:', err);
        }
      },
    },
  };
</script>

<style scoped>
  /* Стили для страницы просмотра питомца */
  .app-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #800020, #400020);
    color: #ffffff;
    padding: 20px;
  }

  .page-title {
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 20px;
    color: #ffffff;
  }

  .pet-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .pet-image-container img {
    max-width: 200px;
    max-height: 200px;
    border-radius: 8px;
  }

  .pet-info {
    text-align: center;
  }

  .status {
    display: inline-block;
    padding: 5px 10px;
    border-radius: 5px;
    font-weight: bold;
    color: #ffffff;
  }

    .status.available {
      background: #32a852;
    }

    .status.unavailable {
      background: #c70039;
    }

  .action-buttons {
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }

  .btn-secondary,
  .btn-primary {
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
  }

  .btn-secondary {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: none;
  }

  .btn-primary {
    background: linear-gradient(135deg, #ffc107, #e0a800);
    color: white;
    border: none;
  }

  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  .btn-primary:hover {
    transform: translateY(-3px);
    background: linear-gradient(135deg, #e0a800, #b38800);
  }

  .loading-message {
    text-align: center;
    font-size: 1.2rem;
  }
</style>
