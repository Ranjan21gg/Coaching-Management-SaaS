let showLoader = () => {};
let hideLoader = () => {};

const loaderService = {
    register(show, hide) {
        showLoader = show;
        hideLoader = hide;
    },

    show() {
        showLoader();
    },

    hide() {
        hideLoader();
    },
};

export default loaderService;