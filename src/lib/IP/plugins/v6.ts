import { regular } from "../../regular/core";

/**
 * @category IP
 * @description Класс для работы с IPv6
 * @hideconstructor
 */
class IPv6 {
    /**
     * Проверка является ли переданная строка IPv6 адресом
     *
     * @param {string} IP IP адрес
     * @returns {boolean} является ли переданный IP адрес IPv6
     * @example
     * // Return true
     * IP.v6.is("2001:0db8:85a3:0000:0000:8a2e:0370:7334");
     * @example
     * // Return false
     * IP.v6.is("test");
     */
    public is(IP: string): boolean {
        return regular.isIPv6(IP);
    }
}

export default IPv6;
