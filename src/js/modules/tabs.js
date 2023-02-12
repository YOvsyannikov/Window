// Создаем переменную с ее свойствами
const tabs = (headerSelector, tabSelector, contentSelector, activeClass) => {
    const header = document.querySelector(headerSelector),
          tab = document.querySelectorAll(tabSelector),
          content = document.querySelectorAll(contentSelector);

//Скрываем весь контент в каждом табе.
    function hideTabContent() {
        content.forEach(item => {
            item.style.display = 'none';
        });

//Убираем класс активности в каждом табе.
        tab.forEach(item => {
            item.classList.remove(activeClass);
        });
    }
//При клике показываем контент в табе по полученому индексу и добавляем класс активности.
    function showTabContent(i = 0) {
        content[i].style.display = 'block';
        tab[i].classList.add(activeClass);
    }
//Вызываем вункции.
    hideTabContent();
    showTabContent();

//Отслеживаем какой именно таб кликнул пользователь. Используем делегирование и классы.
    header.addEventListener('click', (e) => {
        const target = e.target;
        if (target &&
            (target.classList.contains(tabSelector.replace(/\./, "")) || 
        target.parentNode.classList.contains(tabSelector.replace(/\./, "")))) {
            tab.forEach((item, i) => {
                if (target == item || target.parentNode == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
};
//Экспортируем по дефолту
export default tabs;