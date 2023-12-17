package com.mterm.mterm

import android.os.Bundle
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen

class MainActivity : TauriActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    installSplashScreen()
  }
}
