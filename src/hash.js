import crypto from 'crypto';

export const ALGORITHMS = {
	SHA256: 'sha256'
};

export const FORMATS = {
	HEX: 'hex',
	LATIN: 'latin1',
	BASE64: 'base64'
};

export function createHasher(algorithm, format) {
	return {
		hash: json => {
			const hasher = crypto.createHash(algorithm);
			hasher.update(JSON.stringify(json));
			return hasher.digest(format);
		}
	}
}
