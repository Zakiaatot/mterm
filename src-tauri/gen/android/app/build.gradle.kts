plugins {
  id("com.android.application")
  id("org.jetbrains.kotlin.android")
  id("rust")
}

android {
  lintOptions {
    isCheckReleaseBuilds = false
    // Or, if you prefer, you can continue to check for errors in release builds,
    // but continue the build even when errors are found:
    isAbortOnError = false
  }
  tasks.withType<org.jetbrains.kotlin.gradle.tasks.KotlinCompile> {
    exclude("**/generated/**")
  }
  compileSdk = 33
  namespace = "com.mterm.mterm"
  defaultConfig {
    manifestPlaceholders["usesCleartextTraffic"] = "false"
    applicationId = "com.mterm.mterm"
    minSdk = 28
    targetSdk = 28
    versionCode = 1
    versionName = "1.0.1"
  }
  buildTypes {
    getByName("debug") {
      manifestPlaceholders["usesCleartextTraffic"] = "true"
      isDebuggable = true
      isJniDebuggable = true
      isMinifyEnabled = false
      packaging {
        jniLibs.keepDebugSymbols.add("*/arm64-v8a/*.so")
        jniLibs.keepDebugSymbols.add("*/armeabi-v7a/*.so")
        jniLibs.keepDebugSymbols.add("*/x86/*.so")
        jniLibs.keepDebugSymbols.add("*/x86_64/*.so")
      }
    }
    getByName("release") {
      isMinifyEnabled = true
      proguardFiles(
        *fileTree(".") { include("**/*.pro") }
          .plus(getDefaultProguardFile("proguard-android-optimize.txt"))
          .toList().toTypedArray()
      )
    }
  }
  kotlinOptions {
    jvmTarget = "1.8"
  }
}

rust {
  rootDirRel = "../../../"
}

dependencies {
  implementation("androidx.webkit:webkit:1.6.1")
  implementation("androidx.appcompat:appcompat:1.6.1")
  implementation("com.google.android.material:material:1.8.0")
  testImplementation("junit:junit:4.13.2")
  androidTestImplementation("androidx.test.ext:junit:1.1.4")
  androidTestImplementation("androidx.test.espresso:espresso-core:3.5.0")
  val splashScreenVersion = "1.0.0-alpha01"
  implementation("androidx.core:core-splashscreen:$splashScreenVersion")
}

apply(from = "tauri.build.gradle.kts")
