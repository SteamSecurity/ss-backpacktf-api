const axios = require('axios');
let log;
try {
	log = require('easy-logger');
} catch {
	log = '';
}

let cache = {};

class BackpackTFAPI {
	constructor({ timeout = 5000, cache_time = 1800000, cache_results = true, debug = false } = {}) {
		this.timeout = timeout;
		this.cache_time = cache_time;
		this.cache_results = cache_results;
		this.debug = debug;
	}

	/**
	 * Fetch the reputation information of a Steam user from Steam services.
	 * @param {String} steamid64 SteamID64 of the user to request
	 * @returns {Promise} A completed promise returns all available information about a Steam user
	 */
	getReputation(steamid64) {
		return new Promise(async (resolve) => {
			let return_value = { positive: 0, negative: 0, bans: [], banned: false };

			const response = await this._get(`https://backpack.tf/api/IGetUsers/v3?steamid=${steamid64}`);
			if (response.error) return resolve(response);
			const profile = response.data.response.players[steamid64];

			if (profile.backpack_tf_trust) {
				return_value.positive = profile.backpack_tf_trust?.for || 0;
				return_value.negative = profile.backpack_tf_trust?.against || 0;
			}

			if (profile.backpack_tf_bans) {
				Object.keys(profile.backpack_tf_bans).forEach((tag) => {
					return_value.bans.push(profile.backpack_tf_bans[tag]);
				});
			}

			if (return_value.bans.length > 0) return_value.banned = true;

			resolve(return_value);
		});
	}
	/**
	 * Create a GET request to a specified URL
	 * @param {String} url The URL to submit a GET request to
	 */
	_get(url) {
		return new Promise((resolve) => {
			this._debugLog({ data: `Making HTTP request` });
			axios
				.get(url, { timeout: this.timeout })
				.then(resolve)
				.catch((reason) => {
					resolve(this._newErrorResponse(reason.message, reason.response?.status));
				});
		});
	}

	/**
	 * Quickly format an error response.
	 * @param {String} message A detailed message to rely to the user.
	 * @param {Number} status An error code.
	 * @returns {Object}
	 */
	_newErrorResponse(message, status = '1') {
		return {
			error: status,
			error_message: message,
		};
	}

	/**
	 * A quick little debug logger. :3
	 * @param {Object} [options]
	 * @param {String} [options.data] A message to send to the terminal.
	 * @param {String} [options.title] A header for the output. Disables 'type'.
	 * @param {String} [options.type=debug] The type of log to send.
	 * @returns
	 */
	_debugLog({ data, title, type = 'debg' } = {}) {
		if (!this.debug) return;

		if (title) {
			console.log(`-- ${title} -------------------------------------`);
			console.log(data);
			console.log(`\n\n`);
		} else {
			try {
				log[type](data);
			} catch {
				console.log(data);
			}
		}
	}
}

module.exports = BackpackTFAPI;
