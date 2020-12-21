/**
 * @module Regular
 */

import list from "../DB/regularList";

function isEmail(email: string) {
	return list.email.test(email);
}

function isIPv4(address: string) {
	return list.IPv4.test(address);
}

function isIPv6(address: string) {
	return list.IPv6.test(address);
}

function isURL(url: string) {
	return list.url.test(url);
}

export { list, isIPv4, isIPv6, isEmail, isURL };
