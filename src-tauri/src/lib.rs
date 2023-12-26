mod command;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            command::create_mterm_default,
            command::create_mterm,
            command::destroy_mterm,
            command::read_mterm,
            command::write_mterm,
            command::wait_mterm,
            command::set_window_size_mterm,
            command::set_read_nonblock_mterm,
            command::check_running_mterm,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
