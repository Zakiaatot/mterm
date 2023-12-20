# THIS FILE IS AUTO-GENERATED. DO NOT MODIFY!!

# Copyright 2020-2023 Tauri Programme within The Commons Conservancy
# SPDX-License-Identifier: Apache-2.0
# SPDX-License-Identifier: MIT

-keep class com.mterm.mterm.* {
  native <methods>;
}

-keep class com.mterm.mterm.WryActivity {
  public <init>(...);

  void setWebView(com.mterm.mterm.RustWebView);
  java.lang.Class getAppClass(...);
  java.lang.String getVersion();
}

-keep class com.mterm.mterm.Ipc {
  public <init>(...);

  @android.webkit.JavascriptInterface public <methods>;
}

-keep class com.mterm.mterm.RustWebView {
  public <init>(...);

  void loadUrlMainThread(...);
  void loadHTMLMainThread(...);
  void setAutoPlay(...);
  void setUserAgent(...);
}

-keep class com.mterm.mterm.RustWebChromeClient,com.mterm.mterm.RustWebViewClient {
  public <init>(...);
}