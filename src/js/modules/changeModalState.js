import checkNumInputs from "./checkNumInputs";

//Функция модального окна и элененты с которми она работает
const changeModalState = (state) => {
     const windowForm = document.querySelectorAll(".balcon_icons_img"),
          windowWidth = document.querySelectorAll("#width"),
          windowHeight = document.querySelectorAll("#height"),
          windowType = document.querySelectorAll("#view_type"),
          windowProfile = document.querySelectorAll(".checkbox"),
          btns = document.querySelectorAll('[data-btn]'),
          check = document.querySelectorAll('[data-check]');
//Ввод данных ширина и высоты окон в модальном окне
     checkNumInputs("#width");
     checkNumInputs("#height");
// Функция которая отслеживает состояние импута.
     function bindActionToElems(event, elem, prop) {
          elem.forEach((item, i) => {
               item.addEventListener(event, () => {
                    switch (item.nodeName) {
                         case "SPAN":
                              state[prop] = i;
                              break;
                         case "INPUT":
                              if (item.getAttribute("type") === "checkbox") {
                                   i === 0 ? state[prop] = "Холодное" : state[prop] = "Теплое";
                                   elem.forEach((box, j) => {
                                        box.checked = false;
                                        if (i == j) {
                                             box.checked = true;
                                        }
                                   });
                              } else {
                                   state[prop] = item.value;
                              }
                              break;
                         case "SELECT":
                              state[prop] = item.value;
                              break;
                    }

// Отключена кнопка отправки пока не заполнены поля
                    btns.forEach(btn => {
                         if (!(state.form && state.width && state.height)) {
                             btn.setAttribute('disabled', null);
                         } else {
                             btn.removeAttribute('disabled', null);
                         }
                     });
// Отключена кнопка отправки пока не заполнены поля
                    check.forEach(btn => {
                         if (!(state.type && state.profile)) {
                              btn.setAttribute('disabled', null);
                         } else {
                              btn.removeAttribute('disabled', null);
                         }
                    });
                    console.log(state);
               });
          });
     }

     bindActionToElems("click", windowForm, "form");
     bindActionToElems("input", windowHeight, "height");
     bindActionToElems("input", windowWidth, "width");
     bindActionToElems("change", windowType, "type");
     bindActionToElems("change", windowProfile, "profile");
};

export default changeModalState;
