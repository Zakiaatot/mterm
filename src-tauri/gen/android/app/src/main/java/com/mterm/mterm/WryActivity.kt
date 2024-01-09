/* THIS FILE IS AUTO-GENERATED. DO NOT MODIFY!! */

// Copyright 2020-2023 Tauri Programme within The Commons Conservancy
// SPDX-License-Identifier: Apache-2.0
// SPDX-License-Identifier: MIT

package com.mterm.mterm

import android.annotation.SuppressLint
import android.graphics.Rect
import android.os.Build
import android.os.Bundle
import android.os.VibrationEffect
import android.os.Vibrator
import android.view.KeyEvent
import android.view.View
import android.view.ViewTreeObserver
import android.webkit.JavascriptInterface
import android.webkit.WebView
import androidx.appcompat.app.AppCompatActivity

abstract class WryActivity : AppCompatActivity() {
  var keep = true
  private lateinit var mWebView: RustWebView

  inner class JsObject {
    @JavascriptInterface
    fun closeSplash() {
      keep = false
    }

    @JavascriptInterface
    fun setWhiteBar() {
      runOnUiThread { setStatusBarTextColor(true) }
    }

    @JavascriptInterface
    fun setBlackBar() {
      runOnUiThread { setStatusBarTextColor(false) }
    }

    @SuppressLint("InternalInsetResource", "DiscouragedApi")
    @JavascriptInterface
    fun getStatusBarHeight(): Int {
      var height = 0
      val resourceId =
        applicationContext.resources.getIdentifier("status_bar_height", "dimen", "android")
      if (resourceId > 0) {
        height = applicationContext.resources.getDimensionPixelSize(resourceId)
      }
      val dm = applicationContext.resources.displayMetrics;
      return (height / dm.density).toInt();
    }
    
    @JavascriptInterface
    fun vibrate(milliseconds: Long) {
      val vibrator = getSystemService(VIBRATOR_SERVICE) as Vibrator
      if (vibrator.hasVibrator()) {
        val vibrationEffect = VibrationEffect.createOneShot(milliseconds, VibrationEffect.DEFAULT_AMPLITUDE)
        vibrator.vibrate(vibrationEffect)
      }
    }
    
    @JavascriptInterface
    fun getOsArch(): String {
      val arch = Build.CPU_ABI
      return when {
        arch.startsWith("arm64") || arch.startsWith("aarch64") -> "aarch64"
        arch.startsWith("arm") -> "arm"
        arch.startsWith("x86_64") -> "x86_64"
        arch.startsWith("x86") -> "i686"
        else -> "unknown"
      }
    }
  }

  fun setStatusBarTextColor(light: Boolean) {
    var systemUiVisibility = window.decorView.systemUiVisibility
    systemUiVisibility = if (light) { //白色文字
      systemUiVisibility and View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR.inv()
    } else { //黑色文字
      systemUiVisibility or View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR
    }
    window.decorView.systemUiVisibility = systemUiVisibility
  }

  private fun setWebView(webView: RustWebView) {
    mWebView = webView
    mWebView.overScrollMode = WebView.OVER_SCROLL_NEVER
    mWebView.addJavascriptInterface(JsObject(), "AndroidApi")
    val rootView = window.decorView.rootView

    // 设置软键盘监听器
    rootView.viewTreeObserver.addOnGlobalLayoutListener(object :
      ViewTreeObserver.OnGlobalLayoutListener {
      private val rect = Rect()
      private var previousKeyboardHeight = 0

      override fun onGlobalLayout() {
        rootView.getWindowVisibleDisplayFrame(rect)
        val screenHeight = rootView.rootView.height
        val keyboardHeight = screenHeight - rect.bottom

        if (keyboardHeight != previousKeyboardHeight) {
          // 键盘高度发生变化时通知 WebView
          notifyWebViewKeyboardHeight(keyboardHeight)
          previousKeyboardHeight = keyboardHeight
        }
      }
    })

    // 将 WebView 添加到布局中
    setContentView(mWebView)
  }

  
  private fun notifyWebViewKeyboardHeight(keyboardHeight: Int) {
    val density = resources.displayMetrics.density
    val keyboardHeightPx = (keyboardHeight / density).toInt()
    val js = "javascript:notifyKeyboardHeight($keyboardHeightPx)"
    mWebView.evaluateJavascript(js, null)
  }

  val version: String
    @SuppressLint("WebViewApiAvailability", "ObsoleteSdkInt")
    get() {
      // Check getCurrentWebViewPackage() directly if above Android 8
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        return WebView.getCurrentWebViewPackage()?.versionName ?: ""
      }

      // Otherwise manually check WebView versions
      var webViewPackage = "com.google.android.webview"
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
        webViewPackage = "com.android.chrome"
      }
      try {
        @Suppress("DEPRECATION")
        val info = packageManager.getPackageInfo(webViewPackage, 0)
        return info.versionName
      } catch (ex: Exception) {
        Logger.warn("Unable to get package info for '$webViewPackage'$ex")
      }

      try {
        @Suppress("DEPRECATION")
        val info = packageManager.getPackageInfo("com.android.webview", 0)
        return info.versionName
      } catch (ex: Exception) {
        Logger.warn("Unable to get package info for 'com.android.webview'$ex")
      }

      // Could not detect any webview, return empty string
      return ""
    }

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    create(this)
  }

  override fun onStart() {
    super.onStart()
    start()
  }

  override fun onResume() {
    super.onResume()
    resume()
  }

  override fun onPause() {
    super.onPause()
    pause()
  }

  override fun onStop() {
    super.onStop()
    stop()
  }

  override fun onWindowFocusChanged(hasFocus: Boolean) {
    super.onWindowFocusChanged(hasFocus)
    focus(hasFocus)
  }

  override fun onSaveInstanceState(outState: Bundle) {
    super.onSaveInstanceState(outState)
    save()
  }

  override fun onDestroy() {
    super.onDestroy()
    destroy()
  }

  override fun onLowMemory() {
    super.onLowMemory()
    memory()
  }

  override fun onKeyDown(keyCode: Int, event: KeyEvent?): Boolean {
    if (keyCode == KeyEvent.KEYCODE_BACK && mWebView.canGoBack()) {
      mWebView.goBack()
      return true
    }
    return super.onKeyDown(keyCode, event)
  }

  fun getAppClass(name: String): Class<*> {
    return Class.forName(name)
  }

  companion object {
    init {
      System.loadLibrary("mterm_lib")
    }
  }

  private external fun create(activity: WryActivity)
  private external fun start()
  private external fun resume()
  private external fun pause()
  private external fun stop()
  private external fun save()
  private external fun destroy()
  private external fun memory()
  private external fun focus(focus: Boolean)


}
