//Функция которая позваляет вводить в инпут только цифры

const checkNumInputs = (selector) => {
    const numInputs = document.querySelectorAll(selector);

    numInputs.forEach((item) => {
        item.addEventListener("input", () => {
             item.value = item.value.replace(/\D/, "");
        });
   });
};

export default checkNumInputs;