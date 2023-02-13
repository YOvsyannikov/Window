import checkNumInputs from "./checkNumInputs";

// Создаем переменную с ее свойствами
const forms = (state) => {
     const form = document.querySelectorAll("form"),
          inputs = document.querySelectorAll("input"),
          windows = document.querySelectorAll('[data-modal]');

// Делаем реплейс что-бы вводились только цифры
          checkNumInputs('input[name="user_phone"]');

//Сообщения формы. Так же могут быть различные спинеры, картинки...
     const message = {
          loading: "Загрузка...",
          success: "Спасибо! Скоро мы с вами свяжемся",
          failure: "Что-то пошло не так...",
     };
// Постим данные на сервер и возвращаем результат
     const postData = async (url, data) => {
          document.querySelector(".status").textContent = message.loading;
          let res = await fetch(url, {
               method: "POST",
               body: data,
          });

          return await res.text();
     };
// Функция которая очищает инпуты
     const clearInputs = () => {
          inputs.forEach((item) => {
               item.value = "";
          });
     };

     const clearCheckBox = () => {
          document.querySelectorAll(".checkbox").forEach((item) => {
            item.checked = false;
          });
        };
      
        const clearSelect = () => {
          document.querySelector("#view_type").selectedIndex = 0;
        };

// Отправление данных для каждой формы без перезагрузки страницы
     form.forEach((item) => {
          item.addEventListener("submit", (e) => {
               e.preventDefault();
// Добавляем блок сообщений для пользователя
               let statusMessage = document.createElement("div");
               statusMessage.classList.add("status");
               item.appendChild(statusMessage);
//Сбор данныех которые есть в форме
               const formData = new FormData(item);
               if (item.getAttribute('data-calc') === 'end') {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
               }
// Отправляем собранные данные с формы на сервер и выводит сообщения
               postData("assets/server.php", formData)
                    .then((res) => {
                         console.log(res);
                         statusMessage.textContent = message.success;
                    })
                    .catch(() => (statusMessage.textContent = message.failure))
                    .finally(() => {
                         clearInputs();
                         setTimeout(() => {
                              statusMessage.remove();
                              clearCheckBox();
                              clearSelect();
                              for (let key in state) {
                              delete state[key];
                              }
                              windows.forEach(item => {
                                   item.style.display = "none";    
                               });
                               document.body.style.overflow = '';
                         }, 5000);
                         
                    });
                    
          });
     });
};

//Экспорт по умолчанию
export default forms;
