<template>
  <div>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-..." crossorigin="anonymous" referrerpolicy="no-referrer" />
    <h1 class="container" style="display: inline-block;">Питомцы</h1>
    <div class="app-container">
      <h1 class="page-title">Список питомцев</h1>
      <div class="table-container">
        <table class="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Имя</th>
              <th>Вид</th>
              <th>Возраст</th>
              <th>Пол</th>
              <th>Цена (₽)</th>
              <th>Доступен</th>
              <th>Изображение</th>
              <th class="actions-column">Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(pet, index) in paginatedPets" :key="pet.id" class="table-row">
              <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
              <td>{{ pet.name }}</td>
              <td>{{ pet.species }}</td>
              <td>{{ pet.age }}</td>
              <td>{{ pet.gender }}</td>
              <td>{{ pet.price }} ₽</td>
              <td>
                <span :class="['status', pet.available ? 'available' : 'unavailable']">
                  {{ pet.available ? 'Да' : 'Нет' }}
                </span>
              </td>
              <td>
                <img v-if="pet.img"
                     :src="`${backendUrl}${pet.img}`"
                     alt="Pet Image"
                     class="pet-image" />
                <span v-else>N/A</span>
              </td>
              <td class="actions-column">
                <div class="action-button-container" @click="viewPet(pet.id)">
                  <i class="fas fa-eye"></i>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-if="!paginatedPets.length" class="no-pets-message">Нет доступных питомцев.</p>
        <div class="pagination" v-if="totalPages > 1">
          <button @click="prevPage" :disabled="currentPage === 1">← Предыдущая</button>
          <span>Страница {{ currentPage }} из {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages">Следующая →</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pets: [],
      currentPage: 1,
      pageSize: 10,
      backendUrl: 'https://node-production-579e.up.railway.app',
    };
  },
  computed: {
    paginatedPets() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.pets.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.pets.length / this.pageSize);
    },
  },
  async created() {
    await this.fetchPets();
  },
  methods: {
    async fetchPets() {
      try {
        const response = await fetch(`${this.backendUrl}/api/pets`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched pets:', data);
        this.pets = data;
      } catch (err) {
        console.error('Error fetching pets:', err);
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    viewPet(petId) {
      console.log('Navigating to pet ID:', petId);
      this.$router.push(`/view-pet/${petId}`);
    },
  },
};
</script>

<style scoped>
/* Подключение Font Awesome не нужно в template, убираем его оттуда и добавляем в public/index.html */
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

.table-container {
  width: 100%;
  max-width: 1200px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  padding: 20px;
}

.styled-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 16px;
  overflow: hidden;
  margin-top: 20px;
}

.styled-table th {
  background: linear-gradient(135deg, #c70039, #800040);
  color: #ffffff;
  font-weight: bold;
  padding: 15px;
  text-align: center;
  border-bottom: none;
  border-right: none;
}

.styled-table td {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  padding: 15px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.styled-table th:last-child,
.styled-table td:last-child {
  border-right: none;
}

.styled-table tbody tr:last-child td {
  border-bottom: none;
}

.styled-table tbody tr:hover {
  background-color: rgba(255, 255, 255, 0.05);
  cursor: pointer;
}

/* Стиль для столбца "Действия" */
.actions-column {
  width: 70px; /* Уменьшенная ширина для предотвращения переноса текста */
}

/* Стиль для изображений питомцев */
.pet-image {
  max-width: 100px;
  max-height: 100px;
  border-radius: 8px;
}

.no-pets-message {
  text-align: center;
  font-size: 1.2rem;
  margin-top: 20px;
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

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
}

.pagination button {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.pagination button:disabled {
  background: rgba(255, 255, 255, 0.05);
  cursor: not-allowed;
}

.pagination button:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
}

/* Стиль для контейнера кнопки действия */
.action-button-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background-color: #007bff;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 0 auto; /* Центрирование кнопки в столбце */
}

.action-button-container:hover {
  background-color: #0056b3;
}

.action-button-container i {
  color: #ffffff;
  font-size: 1rem;
}
</style>
