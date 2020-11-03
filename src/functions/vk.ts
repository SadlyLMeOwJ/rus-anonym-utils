import { VK } from "vk-io";
import request from "request-promise";

/**
 * Получить идентификатор последней беседы в группе.
 * @param instanceVK - Экземпляр VK из vk-io
 * @return Идентификатор беседы.
 */
export const groups = {
	getLastConversation: async (instanceVK: VK): Promise<number> => {
		return new Promise(async (resolve) => {
			let maxConversationID: number = 2147483647;
			let minConversationID: number = 2000000001;
			let currentConversationID: number = maxConversationID;
			let status = false;
			while (!status) {
				if (!(await checkConversationID(instanceVK, currentConversationID))) {
					maxConversationID = currentConversationID;
					currentConversationID = Math.round(
						(currentConversationID + minConversationID) / 2,
					);
				} else {
					if (maxConversationID !== currentConversationID) {
						while (!status) {
							if (minConversationID + 10 > maxConversationID) {
								for (let i = minConversationID; i < maxConversationID; i++) {
									if (!(await checkConversationID(instanceVK, i))) {
										status = true;
										currentConversationID = i - 1;
										resolve(currentConversationID);
									}
								}
							}
							currentConversationID = Math.round(
								(minConversationID + maxConversationID) / 2,
							);

							if (
								!(await checkConversationID(instanceVK, currentConversationID))
							) {
								maxConversationID = currentConversationID;
								currentConversationID = Math.round(
									(currentConversationID + minConversationID) / 2,
								);
							} else {
								minConversationID = currentConversationID;
							}
						}
					} else {
						status = true;
						resolve(currentConversationID);
					}
				}
			}
			resolve(currentConversationID);
		});
	},
};

export const api = {
	status: async (): Promise<
		Array<{
			section: string;
			performance: number;
			uptime: number;
		}>
	> => {
		let data = await request({
			uri: `https://vk.com/dev/health`,
		});
		data = data.toString();
		let position1 = await data.indexOf(`var content = {`);
		let position2 = await data.indexOf(`'header': ['`);
		let newData = data.substring(position1, position2);
		position1 = newData.indexOf(`[[`);
		position2 = newData.indexOf(`]]`);
		let arrayWithSections = JSON.parse(
			newData.substring(position1, position2 + 2),
		);
		let outputArray = [];
		for (let i in arrayWithSections) {
			outputArray.push({
				section: arrayWithSections[i][0],
				performance: arrayWithSections[i][2],
				uptime: arrayWithSections[i][3],
			});
		}
		return outputArray;
	},
};

async function checkConversationID(
	instanceVK: VK,
	peerID: number,
): Promise<boolean> {
	return instanceVK.api.messages
		.getConversationsById({
			peer_ids: peerID,
		})
		.then(({ items }) => {
			const [data] = items;
			return !!data.peer.id;
		})
		.catch((error) => {
			// @ts-ignore
			return !error.code === 927;
		});
}
