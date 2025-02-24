<template>
  <div class="app-container">
    <h1 class="page-title">Просмотр питомца</h1>
    <div v-if="loading" class="loading-message">Загрузка данных...</div>
    <div v-else-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div v-else-if="pet" class="pet-details">
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
        <p><strong>Доступен:</strong>
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
    <div v-else class="error-message">Не удалось загрузить данные о питомце.</div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            pet: null,
            loading: true,
            errorMessage: null,
            backendUrl: 'https://node-production-579e.up.railway.app',
        };
    },
    async created() {
        const petId = this.$route.params.id;

        // Проверяем, является ли id числом
        if (!/^\d+$/.test(petId)) {
            this.errorMessage = 'Некорректный ID';
            this.loading = false;
            return;
        }

        await this.fetchPet(petId);
    },
    methods: {
        async fetchPet(petId) {
            try {
                const response = await fetch(`${this.backendUrl}/api/view-pet/${petId}`);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                this.pet = data;
            } catch (err) {
                console.error('Ошибка при получении данных питомца:', err);
                this.errorMessage = err.message;
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>
