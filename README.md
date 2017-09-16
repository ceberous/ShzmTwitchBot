# ShzmTwitchBot

### Requirements
1.) Install Clipper from: https://github.com/majido/clipper


2.) Gather and implement a personal.js file with at least:

```javascript
module.exports = {
        // https://twitchapps.com/tmi
	twitchUSER: {
		username: "" ,
		password: "" ,
		channelName: "" ,
	},
	adbBinaryPath: "" ,
	sPackageName: "" ,
	sActivity: "" ,
        // AndroidDevice --> developer options --> enable Pointer Location 
        // --> locate custom X , Y positons for Device
	XY_POS: {
		tryAgainButton: "" ,
		xCancelButton: "" ,
		shareButton: "" ,
		scrollToClipboard: "" ,
		copyToClipboard: "" ,
	}
};
```
