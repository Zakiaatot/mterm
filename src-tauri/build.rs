fn main() {
    println!("cargo:rustc-link-lib=c++");
    tauri_build::build()
}
