export default class UtilsError extends Error {
	public constructor(message: string) {
		super(message);
	}

	public get [Symbol.toStringTag](): string {
		return this.constructor.name;
	}

	/**
	 * Возвращает содержимое ошибки в JSON
	 */
	public toJSON(): Pick<this, keyof this> {
		const json = {} as Pick<this, keyof this>;

		for (const key of Object.getOwnPropertyNames(this)) {
			json[key as keyof this] = this[key as keyof this];
		}

		return json;
	}
}
