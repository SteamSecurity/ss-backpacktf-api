require('dotenv').config();
const BackpackTFAPI = new (require('./index'))();

async function test() {
	const request = await BackpackTFAPI.getReputation('76561197978022923');
	console.log(request);
}
test();
