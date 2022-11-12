<div align="center">
  <img src="https://raw.githubusercontent.com/SteamSecurity/ss-backpacktf-api/master/images/backpacktf-logo.png" width="750"><br>
  <b>A community made API Wrapper</b>
</div>
<br>
<div align="center">
  <img src="https://img.shields.io/npm/dt/ss-backpacktf-api?style=for-the-badge">
  <img src="https://img.shields.io/github/contributors/steamsecurity/ss-backpacktf-api?style=for-the-badge">
  <img src="https://img.shields.io/github/issues/steamsecurity/ss-backpacktf-api?style=for-the-badge">
  <img src="https://img.shields.io/github/languages/code-size/steamsecurity/ss-backpacktf-api?style=for-the-badge">
</div>
<br>

# About

SS-BackpackTF-API is a basic wrapper for the BackpackTF API used and maintained by SteamSecurity.org.
Please see [Limitations](#limitations) for further details.

### Installation

`npm i SS-BackpackTF-API`

# Basic usage

```js
// There are two ways to include this module in your project
// The first way is on a single line
const BackpackTF = new (require('ss-backpacktf-api'))();

// Alternatively you can do it like this.
const _backpacktf = require('ss-backpacktf-api');
const BackpackTF = new _backpacktf();

// Create a simple async function
async function test() {
	const request = await BackpackTFAPI.getReputation('76561198090658171');
	console.log(request);
}
// Call the function
test();
```

See test.js for more examples.

# Options

These are set using the constructor function when including the module

- ### _timeout_

  Time to wait in milliseconds before canceling the request and returning with an error.

- ### _cache_results_

  A Boolean dictating whether or not automatic caching happens. Typically you do not want to change from the default value 'true', however if you are using your own cache solution, you may want to disable this.

- ### _cache_time_

  Time to save a cached response in milliseconds.
  This is ignored if caching is disabled.

- ### _debug_

  A Boolean controlling whether or not the wrapper will run in debug mode. This is not recommended for production environments as it outputs a lot of text to the console window.

The following code block is an example on how to set up ss-backpacktf-api to have:

- Request timeout of 2 seconds
- Not cache results
- Set a cache time to 0 seconds
- Enable debugging mode

```js
const options = {
	timeout: 2000,
	cache_results: false,
	cache_time: 0,
	debug: true,
};

const _backpacktf = require('ss-backpacktf-api');
const BackpackTF = new _backpacktf(options);
```

# Methods

- ### getReputation(steamid64)

  - steamid64: A valid steamid64 for any account.

    This returns a promise formatted as such:

    ```js
    {
      positive: Int,
      negative: Int,
      bans: Array,
      banned: Boolean
    }
    ```

# Error Handling

Any errors with the Steam API or this wrapper should resolve the promise with both an 'error' and 'error_message' value.

```js
{
	error: 'Status code. Often a direct HTTP status code, otherwise most likely "1"',
	error_message: 'A more specific error message'
}
```

# Limitations

Until we reach a version 1.0.0 release, this package is not recommended for production environments. This is released as is in the hope of receiving community feedback and bug reports.

# Disclaimer

SS-BackpackTF-API is still a work-in-progress. There may be breaking changes with every update. This will remain true until our v1.0.0 release. Subsequent releases will be much more mature.
SS-BackpackTF-API is not endorsed or affiliated with Backpack.TF or Valve in any way.
Please ensure your use of the Backpack.TF API is in line with the [Backpack.TF API Terms](https://backpack.tf/developer/apikey/view).
