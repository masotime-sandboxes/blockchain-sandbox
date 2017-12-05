/* eslint-disable import/unambiguous */

const sampleState = { Alice: 5, Bob: 5 };

const sampleTxns = [
	{ Alice: -3, Bob: 3 },
	{ Alice: -4, Bob: 3 },
	{ Alice: -6, Bob: 6 },
	{ Alice: -4, Bob: 2, Lisa: 2},
	{ Alice: -4, Bob: 3, Lisa: 2}
];

sampleTxns.forEach(txn =>
	console.log(
		JSON.stringify({
			txn,
			isValid: validateTxn(txn, sampleState)
		})
	)
);