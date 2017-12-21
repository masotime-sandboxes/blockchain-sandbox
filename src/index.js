import { ALGORITHMS, FORMATS, createHasher } from 'hash';
import { validateTxn, updateState } from 'lib';

const hasher = createHasher(ALGORITHMS.SHA256, FORMATS.HEX);

function createTxn(maxValue = 3) {
	const sign = Math.floor(Math.random() * 2) - 1;
	const amount = Math.ceil(Math.random() * maxValue);

	const alicePays = sign * amount;
	const bobPays = -alicePays;

	return {
		Alice: alicePays,
		Bob: bobPays
	};
}

const txnBuffer = Array(30).fill().map(createTxn);

const initialState = { Alice: 50, Bob: 50 };

// genesisBlock: first block in the system
// 1) prepare the data
const genesisBlockTxns = [ state ];
const genesisBlockContents = {
	blockNumber: 0,
	parentHash: null,
	txnCount: 1,
	txns: genesisBlockTxns
};
const genesisHash = hasher.hash(genesisBlockContents);

// 2) define the block
const genesisBlock = {
	hash: genesisHash,
	contents: genesisBlockContents
};
const genesisBlockStr = JSON.stringify(genesisBlock);

// begin the chain
const chain = [genesisBlock];

function makeBlock(txns, chain) {
	// prepare the data, cross-referencing the parent
	const parentBlock = chain.slice(-1);
	const parentHash = parentBlock.hash;
	const blockNumber = parentBlock.contents.blockNumber + 1;
	const txnCount = txns.length;

	// create the block
	const blockContents = { blockNumber, parentHash, txnCount, txns };
	const block = { hash: hasher.hash(blockContents), contents: blockContents };

	return block;
}

// ????
const BLOCK_SIZE_LIMIT = 5;

// run through all transactions and ignore invalid transactions
// each block should hold no more than BLOCK_SIZE_LIMIT txns
function mergeChain({ chain, state, txns }) {
	let runningState = { ...state }; // clone state
	const validTxns = [];
	for (const txn of txns) {
		if (validateTxn(txn, runningState)) {
			validTxns.push(txn);
			runningState = updateState(txn, runningState);
		}
	}

	chain.push(makeBlock(validTxns, chain));
}

// create the first blocks from the txnBuffer
mergeChain({ chain, initialState})