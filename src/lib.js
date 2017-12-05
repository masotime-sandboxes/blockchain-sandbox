function clone(obj) { return JSON.parse(JSON.stringify(obj)); }

// rules:
// 1. sum of deposits and withdrawls must be 0
// 2. user's account must have sufficient funds to cover withdrawals
export function updateState(txn, state) {
	const newState = clone(state);

	for (const user of Object.keys(txn)) {
		newState[user] = newState[user] || 0 + txn[user];
	}
}

export function validateTxn(txn, state) {
	const sum = Object.values(txn).reduce((acc, val) => acc += val, 0);
	if (sum !== 0) return false;

	for (const [user, amt] of Object.entries(txn)) {
		if ((state[user] || 0) + amt < 0) return false;
	}

	return true;
}