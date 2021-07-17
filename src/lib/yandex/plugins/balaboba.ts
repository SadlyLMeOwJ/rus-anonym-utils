/* eslint-disable require-jsdoc */

import axios from "axios";
import { performance } from "perf_hooks";

const generatorStyles = [
    "Без стиля",
    "Теории заговора",
    "Тосты",
    "Пацанские цитаты",
    "Рекламные слоганы",
    "Короткие истории",
    "Подписи в Instagram",
    "Короче, Википедия",
    "Синопсы фильмов",
    "Гороскоп",
    "Народные мудрости",
] as const;

type TStyle = typeof generatorStyles[number];

interface IGeneratorResponse {
    query: string;
    response: string;
    text: string;
    ms: number;
}

/**
 * @category Balaboba
 * @description Класс для работы с Yandex Balaboba
 * @hideconstructor
 */
class Balaboba {
    public async generate(
        query: string,
        style: TStyle = "Без стиля"
    ): Promise<IGeneratorResponse> {
        const start = performance.now();
        const response = await axios({
            url: "https://yandex.ru/lab/api/yalm/text3",
            method: "POST",
            data: {
                query,
                intro: generatorStyles[generatorStyles.indexOf(style)],
                filter: 1,
            },
        });
        const end = performance.now();
        return {
            query: response.data.query,
            response: response.data.text,
            text: response.data.query + response.data.text,
            ms: end - start,
        };
    }
}

export default Balaboba;
