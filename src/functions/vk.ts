import { VK } from "vk-io";

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

function checkConversationID(instanceVK: VK, peerID: number): Promise<boolean> {
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
