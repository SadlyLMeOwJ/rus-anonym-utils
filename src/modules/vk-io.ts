import { VK } from "../../node_modules/vk-io/lib/vk";

const groups = {
	getLastConversation: async (instanceVK: VK): Promise<number> => {
		let maxConversationID = 2147483647;
		let minConversationID = 2000000001;
		let currentConversationID = maxConversationID;
		let status = false;
		async function checkConversationID(peerID: number) {
			try {
				let [data] = await (
					await instanceVK.api.messages.getConversationsById({
						peer_ids: peerID,
					})
				).items;
				if (data.peer.id) {
					return true;
				} else {
					return false;
				}
			} catch (error) {
				if (error.code === 927) {
					return false;
				} else {
					return true;
				}
			}
		}
		while (status === false) {
			if ((await checkConversationID(currentConversationID)) === false) {
				maxConversationID = currentConversationID;
				currentConversationID = Math.round(
					(currentConversationID + minConversationID) / 2,
				);
			} else {
				if (maxConversationID !== currentConversationID) {
					while (status === false) {
						if (minConversationID + 10 > maxConversationID) {
							for (let i = minConversationID; i < maxConversationID; i++) {
								if ((await checkConversationID(Number(i))) === false) {
									status = true;
									currentConversationID = Number(i) - 1;
									return currentConversationID;
								}
							}
						}
						currentConversationID = Math.round(
							(minConversationID + maxConversationID) / 2,
						);

						if ((await checkConversationID(currentConversationID)) === false) {
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
					return currentConversationID;
				}
			}
		}
		return currentConversationID;
	},
};

export { groups };
