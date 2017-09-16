require('shelljs/global');
var tmi = require("tmi.js");

const PERSONAL_CONFIG = require( "./personal.js" );
const CONFIG = {
    twitchIRC: { username: PERSONAL_CONFIG.twitchUSER.username , password: PERSONAL_CONFIG.twitchUSER.password },
    twitchChannel: PERSONAL_CONFIG.twitchUSER.channelName
};
var twitchIRCClient = new tmi.client({ identity: CONFIG.twitchIRC , channels: [ CONFIG.twitchChannel ] });
function twitchSay( wMessage ) { 
    return new Promise( async function( resolve , reject ) {
        try { await twitchIRCClient.say(  CONFIG.twitchChannel , wMessage ); resolve(); }
        catch( error ) { console.log( error ); reject( error ); }
    }); 
}

const adbPATH = PERSONAL_CONFIG.adbBinaryPath;
const adbSHELL = adbPATH + " shell ";
const SPACKAGE = PERSONAL_CONFIG.sPackageName;
const SACTIVITY = PERSONAL_CONFIG.sActivity;
function rCMD(wCMD){var x1=exec(wCMD,{silent:true,async:false});if(x1.stderr.length > 1){return null;}return x1.stdout.trim();}

const getCLIP = adbSHELL + "am broadcast -a clipper.get";
function getClipBoard() { var x1 = rCMD( getCLIP ); x1 = x1.split( "data=" )[1]; x1 = x1.split( "to discover " )[1].slice( 0 , -1 ); return x1; }

const clearCLIP = adbSHELL + "am broadcast -a clipper.set -e text 'BLANK_SHZM_BOT'";
function clearClipBoard() { rCMD( clearCLIP ); }

const forceS = adbSHELL + "am force-stop " + SPACKAGE;
function forceStop() { rCMD( forceS ); }

const fromU = adbSHELL + "am start -n " + SACTIVITY;
function fromUnopened() { rCMD( fromU ); }


const touchXY = adbSHELL + "input tap ";
const touch_TRY_AGAIN = touchXY + PERSONAL_CONFIG.XY_POS.tryAgainButton;
const touch_X_CANCEL = touchXY + PERSONAL_CONFIG.XY_POS.xCancelButton;
const touch_Share = touchXY + PERSONAL_CONFIG.XY_POS.shareButton;
const touch_Scroll_To_View_Clipboard = adbSHELL + "input touchscreen swipe " + PERSONAL_CONFIG.XY_POS.scrollToClipboard;
const touch_Copy_To_Clipboard = touchXY + PERSONAL_CONFIG.XY_POS.copyToClipboard;
function sendTouchPredefind( wCMD ) { rCMD( wCMD ); }
function sendTouchXY( x , y ) { rCMD( touchXY + x.toString() + " " + y.toString() ); }

const SEARCH_TIME = 15800;
function sleep( ms ) { return new Promise( resolve => setTimeout( resolve , ms ) ); }
function SleepSearchTime() { return new Promise( resolve => setTimeout( resolve , SEARCH_TIME ) ); }

var LAST_SONG = "";
var x1 = "";
async function checkShazam() {
    clearClipBoard();
    fromUnopened();
    await SleepSearchTime();
    sendTouchPredefind( touch_Share );
    await sleep( 250 );
    sendTouchPredefind( touch_Scroll_To_View_Clipboard );
    await sleep( 250 );
    sendTouchPredefind( touch_Copy_To_Clipboard );
    await sleep( 250 );
    x1 = getClipBoard();
    if ( x1 !== "BLANK_SHZM_BOT" && x1 !== LAST_SONG ) {
        console.log( "new song !!!" );
        await twitchSay( x1 );
    }
    LAST_SONG = x1;
    console.log( LAST_SONG );
    await sleep( 500 );
    forceStop();
}

( async ()=>{
    await twitchIRCClient.connect();
    console.log( "connected to twitch IRC" );
    checkShazam();
    setInterval( checkShazam , 30000 );
})();