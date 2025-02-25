<template>
  <div class="app-container">
    <h1 class="page-title">Просмотр продукта</h1>
    <div v-if="product" class="product-details">
      <div class="product-image-container">
        <img v-if="product.img" :src="`${backendUrl}${product.img}`" alt="Product Image" class="product-image" />
        <span v-else>Нет изображения</span>
      </div>
      <div class="product-info">
        <p><strong>Название:</strong> {{ product.name }}</p>
        <p><strong>Вид:</strong> {{ product.vid }}</p>
        <p><strong>Бренд:</strong> {{ product.brand }}</p>
        <p><strong>Вес:</strong> {{ product.weight }} г</p>
        <p><strong>Описание:</strong> {{ product.description }}</p>
        <p><strong>Цена:</strong> {{ product.price }} ₽</p>
        <p>
          <strong>В наличии:</strong>
          <span :class="['status', product.in_stock ? 'available' : 'unavailable']">
            {{ product.in_stock ? 'Да' : 'Нет' }}
          </span>
        </p>
      </div>
      <div class="action-buttons">
        <button class="btn-secondary" @click="$router.push('/pitanie')">Вернуться к списку</button>
      </div>
    </div>
    <p v-else class="loading-message">Загрузка данных...</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        product: null,
        backendUrl: 'https://node-production-579e.up.railway.app',
      };
    },
    async created() {
      const productId = this.$route.params.id;
      await this.fetchProduct(productId);
    },
    methods: {
      async fetchProduct(productId) {
        try {
          const response = await fetch(`${this.backendUrl}/api/view-pitanie/${productId}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          this.product = data;
        } catch (err) {
          console.error('Ошибка при получении данных продукта:', err);
        }
      },
    },
  };
</script>

<style scoped>
  /* Стили для страницы просмотра продукта (аналогичны стилям для питомца) */
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

  .product-details {
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

  .product-image-container img {
    max-width: 200px;
    max-height: 200px;
    border-radius: 8px;
  }

  .product-info {
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
