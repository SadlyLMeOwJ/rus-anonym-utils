import Balaboba from "./plugins/balaboba";

/**
 * @category Yandex
 * @description Класс для работы с Yandex
 * @hideconstructor
 */
class YandexUtils {
    /**
     * @description Класс для работы с Balaboba
     * @type {Balaboba}
     */
    public balaboba: Balaboba;

    // eslint-disable-next-line require-jsdoc
    constructor() {
        this.balaboba = new Balaboba();
    }
}

const yandex = new YandexUtils();

export { YandexUtils, yandex };
