# ShzmTwitchBot

### Requirements
sudo apt-get install build-essential
sudo apt-get install cmake git libgtk2.0-dev pkg-config libavcodec-dev libavformat-dev libswscale-dev
sudo apt-get install python-dev python-numpy libtbb2 libtbb-dev libjpeg-dev libpng-dev libtiff-dev libjasper-dev libdc1394-22-dev
sudo apt-get install libopencv-dev
sudo apt-get install imagemagick

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
