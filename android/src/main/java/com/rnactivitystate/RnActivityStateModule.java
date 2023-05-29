package com.rnactivitystate;

import androidx.annotation.NonNull;
import androidx.lifecycle.Lifecycle;
import androidx.lifecycle.LifecycleEventObserver;
import androidx.lifecycle.LifecycleObserver;
import androidx.lifecycle.LifecycleOwner;
import androidx.lifecycle.ProcessLifecycleOwner;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.bridge.UiThreadUtil;
import com.facebook.react.modules.core.DeviceEventManagerModule;

@ReactModule(name = RnActivityStateModule.NAME)
public class RnActivityStateModule extends ReactContextBaseJavaModule implements LifecycleEventObserver {
  public static final String NAME = "RnActivityState";
  ReactApplicationContext mReactContext;

  public RnActivityStateModule(ReactApplicationContext reactContext) {
    super(reactContext);
    mReactContext = reactContext;
    UiThreadUtil.runOnUiThread(this::initLifecycle);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  private void initLifecycle() {
    ProcessLifecycleOwner.get().getLifecycle().addObserver((LifecycleObserver) this);
  }

  @Override
  public void onStateChanged(@NonNull LifecycleOwner lifecycleOwner, @NonNull Lifecycle.Event event) {
    if (mReactContext != null && mReactContext.hasCurrentActivity()){
      if (event == Lifecycle.Event.ON_START) {
        mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("onMoveToApp", null);
      }
      if (event == Lifecycle.Event.ON_STOP) {
        mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("onMoveToBackground", null);
      }
    }
  }
}
