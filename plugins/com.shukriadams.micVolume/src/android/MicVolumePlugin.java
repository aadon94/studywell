package com.shukriadams.micVolume;
 
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONObject;
import org.json.JSONArray;
import org.json.JSONException;
import android.app.Activity;

// used by audio
import android.os.Bundle;
import android.media.AudioFormat;
import android.media.AudioRecord;
import android.media.MediaRecorder;

public class MicVolumePlugin extends CordovaPlugin 
{
  @Override
  public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
    try 
    {
      if (action.equals("start")){
        start(callbackContext);
      } else if (action.equals("read")){
        read(callbackContext);
      } else if (action.equals("stop")){
        stop(callbackContext);
      } else {
        callbackContext.error("Unsupported action");
      }

      /*
      JSONObject returnObj = new JSONObject();
      returnObj.put("title", "you should still be seeing this");
          callbackContext.success(returnObj); // pass return object back here
          */
        return true;
    } 
    catch(Exception e) 
    {
        System.err.println("Exception: " + e.getMessage());
        callbackContext.error(e.getMessage());
        return false;
    }    
  }

    private short[] buffer = null;
    private AudioRecord audioRecord = null;
    private int bufferSize= 1024;
    private float volum = 0;
    private int buflen;
    boolean micOn = false;
    boolean isPaused = null;

        int freq =8000;
        int chan = AudioFormat.CHANNEL_IN_MONO;
        int enc  = AudioFormat.ENCODING_PCM_16BIT;
        int src  = MediaRecorder.AudioSource.MIC;
 
    private void start(CallbackContext callbackContext) {

        buflen = AudioRecord.getMinBufferSize(freq, chan, enc);
        audioRecord = new AudioRecord(src,freq,chan,enc,buflen);
 
        audioRecord.startRecording();
        micOn = true;
        isPaused = false;
        callbackContext.success();
    }

    private void stop(CallbackContext callbackContext) {
      if (micOn) {
      audioRecord.stop();
      audioRecord.release();
      audioRecord = null;
      isPaused = true;
      micOn = false;
    }

      callbackContext.success();
    } 
 
    private void read(CallbackContext callbackContext) throws JSONException {



        returnObj.put("volum", max);
        micOn = true;
       callbackContext.success(returnObj);
     }
    


}



 

