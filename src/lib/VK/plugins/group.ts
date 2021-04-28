import { VK } from "vk-io";

export class VK_Group {
	private async __checkConversationID(
		instanceVK: VK,
		peerID: number,
	): Promise<boolean> {
		try {
			const { items } = await instanceVK.api.messages.getConversationsById({
				peer_ids: peerID,
			});
			const [data] = items;
			return !!data.peer.id;
		} catch (e) {
			return false;
		}
	}
	/**
	 * @description Получить идентификатор последней беседы в группе.
	 * @param {string} token Токен группы
	 * @returns {Promise.<number>} Идентификатор беседы.
	 */
	public async getLastConversation(token: string): Promise<number> {
		const instanceVK = new VK({ token: token });
		let maxConversationID = 2147483647;
		let minConversationID = 2000000001;
		let currentConversationID: number = maxConversationID;
		let status = false;
		while (!status) {
			if (
				!(await this.__checkConversationID(instanceVK, currentConversationID))
			) {
				maxConversationID = currentConversationID;
				currentConversationID = Math.round(
					(currentConversationID + minConversationID) / 2,
				);
			} else {
				if (maxConversationID !== currentConversationID) {
					while (!status) {
						if (minConversationID + 10 > maxConversationID) {
							for (let i = minConversationID; i < maxConversationID; i++) {
								if (!(await this.__checkConversationID(instanceVK, i))) {
									status = true;
									currentConversationID = i - 1;
									return currentConversationID;
								}
							}
						}
						currentConversationID = Math.round(
							(minConversationID + maxConversationID) / 2,
						);

						if (
							!(await this.__checkConversationID(
								instanceVK,
								currentConversationID,
							))
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
					return currentConversationID;
				}
			}
		}
		return currentConversationID;
	}
}

export const group = new VK_Group();
