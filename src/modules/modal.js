class Modal {
    constructor() {
        this.modalElement = document.getElementById("my-modal");
        this.openButton = document.getElementById("open-modal-btn");
        this.closeButton = document.getElementById("close-my-modal-btn");

        this.openButton.addEventListener("click", this.open.bind(this));
        this.closeButton.addEventListener("click", this.close.bind(this));
        window.addEventListener('keydown', this.closeOnEsc.bind(this));
        this.modalElement.querySelector(".modal__box").addEventListener('click', this.preventCloseClickInside.bind(this));
        this.modalElement.addEventListener('click', this.closeOnClickOutside.bind(this));
    }

    open() {
        this.modalElement.classList.add("open");
        document.body.style.overflow = 'hidden';
        document.querySelector(".modal__box").style.display = 'block';
    }

    close() {
        this.modalElement.classList.remove("open");
        document.body.style.overflow = 'visible';
    }

    closeOnEsc(e) {
        if (e.key === "Escape") {
            this.close();
        }
    }

    preventCloseClickInside(event) {
        event._isClickWithInModal = true;
    }

    closeOnClickOutside(event) {
        if (!event._isClickWithInModal) {
            this.close();
        }
    }
}

export default Modal;
