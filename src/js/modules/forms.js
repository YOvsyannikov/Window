// Создаем переменную с ее свойствами
const forms = () => {
    const form = document.querySelectorAll('forrm'),
    inputs = document.querySelectorAll('input'),
    phoneInputs = document.querySelectorAll('input[name="user_phone"]');

// Делаем реплейс что-бы вводились только цифры
phoneInputs.forEach(item => {
    item.addEventListener('input', () => {
        item.value = item.value.replace(/\D/, '');
    });
});
//Сообщения формы. Так же могут быть различные спинеры, картинки...
    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро с вами свяжутся',
        failure: 'Что-то пошло не так'
    };
// Постим данные на сервер и возвращаем результат
    const postData = async (url, data) => {
        document.querySelector('status').textContent = message.loading;
        let result = await fetch(url, {
            method: 'POST',
            body: data
        });
        return await result.text();
    };
// Функция которая очищает инпуты
    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };

// Отправление данных для каждой формы без перезагрузки страницы
    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();
// Добавляем блок сообщений для пользователя
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);
//Сбор данныех которые есть в форме
            const formData = new FormData(item);
// Отправляем собранные данные с формы на сервер
            postData('assets/server.php', formData)
                .then(result => {
                    console.log(result);
                    statusMessage.textContent = message.success;
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000);
                });
        });
    });
};

//Экспорт по умолчанию
export default forms;