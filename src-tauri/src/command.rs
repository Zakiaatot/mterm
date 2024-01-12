#[tauri::command(rename_all = "snake_case")]
pub fn create_mterm_default() -> i32 {
    libmterm_rs::create(
        &"/system/bin/sh".to_string(),
        &"/".to_string(),
        &vec![],
        &mut vec![
            "HOME=/data/data/com.mterm.mterm/files/home".into(),
            "TERMUX_PREFIX=/data/data/com.mterm.mterm/files/usr".into(),
            "TERM=xterm-256color".into(),
        ],
        80,
        25,
    )
}

#[tauri::command(rename_all = "snake_case")]
pub fn create_mterm() -> i32 {
    libmterm_rs::create(
        &"/data/data/com.mterm.mterm/files/usr/bin/bash".to_string(),
        &"/data/data/com.mterm.mterm/files/home".to_string(),
        &vec!["-l".into()],
        &mut vec![
            "HOME=/data/data/com.mterm.mterm/files/home".into(),
            "TERMUX_PREFIX=/data/data/com.mterm.mterm/files/usr".into(),
            "TERM=xterm-256color".into(),
            "PATH=/data/data/com.mterm.mterm/files/usr/bin".into(),
            "LD_PRELOAD=/data/data/com.mterm.mterm/files/usr/lib/libtermux-exec.so".into(),
            "SHELL=/data/data/com.mterm.mterm/files/usr/bin/bash".into(),
            "TMPDIR=/data/data/com.mterm.mterm/files/usr/tmp".into(),
        ],
        80,
        25,
    )
}

#[tauri::command(rename_all = "snake_case")]
pub fn destroy_mterm(id: u32) -> i32 {
    libmterm_rs::destroy(id)
}

#[tauri::command(rename_all = "snake_case")]
pub fn read_mterm(id: u32) -> String {
    libmterm_rs::read(id)
}

#[tauri::command(rename_all = "snake_case")]
pub fn write_mterm(id: u32, data: String) -> i32 {
    libmterm_rs::write(id, data)
}

#[tauri::command(rename_all = "snake_case")]
pub fn wait_mterm(id: u32) -> i32 {
    libmterm_rs::wait(id)
}

#[tauri::command(rename_all = "snake_case")]
pub fn set_window_size_mterm(id: u32, rows: u16, cols: u16) {
    libmterm_rs::set_window_size(id, rows, cols)
}

#[tauri::command(rename_all = "snake_case")]
pub fn set_read_nonblock_mterm(id: u32) {
    libmterm_rs::set_read_nonblock(id)
}

#[tauri::command(rename_all = "snake_case")]
pub fn check_running_mterm(id: u32) -> bool {
    libmterm_rs::check_running(id)
}
