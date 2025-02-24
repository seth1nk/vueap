<template>
  <h1 class="container" style="display: inline-block;">Продукты</h1>
  <div class="app-container">
    <h1 class="page-title">Список продуктов</h1>
    <div class="table-container">
      <table class="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Вид</th>
            <th>Бренд</th>
            <th>Вес (кг)</th>
            <th>Цена (₽)</th>
            <th>В наличии</th>
            <th>Изображение</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in paginatedProducts" :key="product._id" class="table-row">
            <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.vid }}</td>
            <td>{{ product.brand }}</td>
            <td>{{ product.weight }}</td>
            <td>{{ product.price }} ₽</td>
            <td>
              <span :class="['status', product.in_stock ? 'available' : 'unavailable']">
                {{ product.in_stock ? 'Да' : 'Нет' }}
              </span>
            </td>
            <td>
              <img v-if="product.img"
                   :src="`${backendUrl}${product.img}`"
                   alt="Product Image"
                   class="product-image" />
              <span v-else>N/A</span>
            </td>
            <td>
              <button class="action-button" @click="viewProduct(product._id)">
                <i class="fas fa-eye"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="!paginatedProducts.length" class="no-products-message">Нет доступных продуктов.</p>
      <div class="pagination" v-if="totalPages > 1">
        <button @click="prevPage" :disabled="currentPage === 1">← Предыдущая</button>
        <span>Страница {{ currentPage }} из {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Следующая →</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        products: [],
        currentPage: 1,
        pageSize: 10,
        backendUrl: 'https://node-production-579e.up.railway.app',
      };
    },
    computed: {
      paginatedProducts() {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        return this.products.slice(start, end);
      },
      totalPages() {
        return Math.ceil(this.products.length / this.pageSize);
      },
    },
    async created() {
      await this.fetchProducts();
    },
    methods: {
      async fetchProducts() {
        try {
          const response = await fetch('https://node-production-579e.up.railway.app/api/pitanie');
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          console.log('Fetched products:', data);
          this.products = data;
        } catch (err) {
          console.error('Ошибка при получении продуктов:', err);
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
      async viewProduct(productId) {
        try {
          const response = await fetch(`${this.backendUrl}/api/view-pitanie/${productId}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const productData = await response.json();
          console.log('Данные продукта:', productData);

          // Перенаправляем на страницу просмотра продукта
          this.$router.push({ name: 'ViewPitanie', params: { id: productId }, state: { product: productData } });
        } catch (err) {
          console.error('Ошибка при получении данных продукта:', err);
        }
      },
    },
  };
</script>

<style scoped>
  /* Стили для таблицы продуктов (аналогичны стилям для питомцев) */
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

  .product-image {
    max-width: 100px;
    max-height: 100px;
    border-radius: 8px;
  }

  .no-products-message {
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
