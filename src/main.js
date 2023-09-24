import './style.scss';
import Modal from './modules/modal.js';

const modal = new Modal();
const successPopup = document.getElementById("successPopup");
const closeSuccessPopupButton = document.getElementById("closePopup"); // Добавляем кнопку закрытия попапа

// Добавляем обработчик события для кнопки закрытия попапа
closeSuccessPopupButton.addEventListener("click", function () {
    successPopup.style.display = "none"; // Скрываем попап успешной отправки
});

document.getElementById('myForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Предотвращаем отправку формы по умолчанию

    // Получаем значения полей
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Сбрасываем предыдущие сообщения об ошибках
    clearErrors();

    // Проверяем валидность полей
    let isValid = true;

    if (!fullName.trim()) {
        isValid = false;
        showError('fullName', 'Full Name is required');
    }

    if (!isValidEmail(email)) {
        isValid = false;
        showError('email', 'Invalid Email');
    }

    if (!message.trim()) {
        isValid = false;
        showError('message', 'Message is required');
    }

    // Если форма валидна, отправляем данные на сервер
    if (isValid) {
        const data = {
            fullName: fullName,
            email: email,
            message: message,
        };

        // Определяем URL, на который будем отправлять данные
        const url = "https://jsonplaceholder.typicode.com/posts";

        // Определяем параметры запроса
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        // Отправляем запрос на сервер
        fetch(url, options)
            .then((response) => {
                if (response.ok) {
                    // Если запрос успешно выполнен (статус 200-299), закрываем модальное окно
                    modal.close();
                    // Отображаем попап с успешной отправкой
                    successPopup.style.display = "grid";
                    
                    document.getElementById("fullName").value = "";
                    document.getElementById("email").value = "";
                    document.getElementById("message").value = "";
                } else {
                    // Если сервер вернул ошибку, можно обработать её здесь
                    console.error("Ошибка при отправке данных на сервер");
                }
            })
            .catch((error) => {
                console.error("Ошибка при отправке данных на сервер:", error);
            });
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.modal__error');
    errorElements.forEach((errorElement) => {
        errorElement.textContent = '';
    });
}

function showError(fieldId, errorMessage) {
    const errorElement = document.getElementById(`${fieldId}Error`);
    errorElement.textContent = errorMessage;
}
