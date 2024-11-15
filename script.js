const searchInput = document.getElementById('search');
const recipesDiv = document.getElementById('recipes');

// 레시피 API 호출 (예시: OpenRecipe API)
const fetchRecipes = async (ingredient) => {
  const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient}&apiKey=ca6e341a0c994412b55c077cc870e22e`);
  const recipes = await response.json();

  displayRecipes(recipes);
};

// 레시피 목록 표시
const displayRecipes = (recipes) => {
  recipesDiv.innerHTML = '';  // 이전 검색 결과 초기화
  recipes.forEach(recipe => {
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe');
    recipeDiv.innerHTML = `
      <h2>${recipe.title}</h2>
      <p>요리 시간: ${recipe.readyInMinutes}분</p>
      <a href="${recipe.sourceUrl}" target="_blank">레시피 보기</a>
    `;
    recipesDiv.appendChild(recipeDiv);
  });
};

// 검색 입력값이 변경될 때마다 레시피 검색
searchInput.addEventListener('input', (e) => {
  const ingredient = e.target.value.trim();
  if (ingredient.length > 2) { // 3글자 이상일 때 검색
    fetchRecipes(ingredient);
  }
});

// 서비스 워커 등록 코드 추가
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('서비스 워커 등록 성공:', registration);
      })
      .catch((error) => {
        console.log('서비스 워커 등록 실패:', error);
      });
  });
}
