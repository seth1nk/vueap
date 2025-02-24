<template>
  <h1 class="container" style="display: inline-block;">О нас</h1>
  <main class="container text-center">
    <h1 class="page-title">О наших питомцах:</h1>
    <br>
    <!-- Блок про ежиков (текст слева, картинка справа) -->
    <div class="row align-items-center mb-5">
      <div class="col-md-6">
        <div class="text-container">
          <p class="fs-5">
            <b>Ежики</b> — очаровательные маленькие животные, которые становятся все более популярными как домашние питомцы. Они ночные существа, любят бегать по колесу и имеют уникальные характеры.
            <br><strong>Примерная стоимость:</strong> от 5000 до 15000 рублей.
          </p>
        </div>
      </div>
      <div class="col-md-6">
        <img src="/images/ezh.jpeg" class="img-fluid rounded border border-dark img-block large-image">
      </div>
    </div>
    <!-- Блок про попугаев (текст справа, картинка слева) -->
    <div class="row align-items-center mb-5 flex-md-row-reverse">
      <div class="col-md-6">
        <div class="text-container">
          <p class="fs-5">
            <b>Попугаи</b> — умные и общительные птицы, способные подражать человеческой речи. Они требуют внимания и заботы, но при этом дарят радость своим хозяевам.
            <br><strong>Примерная стоимость:</strong> от 2000 до 30000 рублей (в зависимости от вида).
          </p>
        </div>
      </div>
      <div class="col-md-6">
        <img src="/images/popygai.jpg" class="img-fluid rounded border border-dark img-block large-image">
      </div>
    </div>
    <!-- Блок про собак (текст слева, картинка справа) -->
    <div class="row align-items-center mb-5">
      <div class="col-md-6">
        <div class="text-container">
          <p class="fs-5">
            <b>Собаки</b> — преданные компаньоны, которые станут надежными друзьями для всей семьи. Разнообразие пород позволяет выбрать идеального питомца для любого образа жизни.
            <br><strong>Примерная стоимость:</strong> от 5000 до 50000 рублей (в зависимости от породы).
          </p>
        </div>
      </div>
      <div class="col-md-6">
        <img src="/images/dog.jpg" class="img-fluid rounded border border-dark img-block large-image">
      </div>
    </div>
    <!-- Блок про кошек (текст справа, картинка слева) -->
    <div class="row align-items-center mb-5 flex-md-row-reverse">
      <div class="col-md-6">
        <div class="text-container">
          <p class="fs-5">
            <b>Кошки</b> — независимые и грациозные животные, которые прекрасно подходят для тех, кто ценит спокойствие и уют. Они легко адаптируются к различным условиям жизни.
            <br><strong>Примерная стоимость:</strong> от 3000 до 50000 рублей (в зависимости от породы).
          </p>
        </div>
      </div>
      <div class="col-md-6">
        <img src="/images/cat.jpeg" class="img-fluid rounded border border-dark img-block large-image">
      </div>
    </div>
    <!-- Блок про черепах (текст слева, картинка справа) -->
    <div class="row align-items-center mb-5">
      <div class="col-md-6">
        <div class="text-container">
          <p class="fs-5">
            <b>Черепахи</b> — удивительные создания, которые могут жить десятилетия. Они не требуют особого внимания, но нуждаются в специальных условиях содержания.
            <br><strong>Примерная стоимость:</strong> от 1000 до 10000 рублей (в зависимости от вида).
          </p>
        </div>
      </div>
      <div class="col-md-6">
        <img src="/images/4erepaxa.jpeg" class="img-fluid rounded border border-dark img-block large-image">
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    name: 'About',
  };
</script>

<style scoped>
  /* Стили для основного контента */
  main {
    max-width: 1200px; /* Ограничиваем ширину контейнера */
    margin: 0 auto; /* Центрируем контейнер */
    text-align: left; /* Выравниваем текст по левому краю внутри контейнера */
  }

  .large-image {
    max-width: 400px; /* Ограничиваем максимальную ширину */
    display: block; /* Делаем изображение блочным элементом */
    margin: 0 auto; /* Центрируем изображение горизонтально */
  }

  /* Выравнивание текста внутри блоков */
  .text-container {
    text-align: center; /* Выравниваем текст внутри блоков по левому краю */
  }

  /* Стиль для заголовка страницы */
  .page-title {
    text-align: center; /* Выравниваем заголовок "О наших питомцах" по центру */
  }
</style>
