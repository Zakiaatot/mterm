#[tauri::command(rename_all = "snake_case")]
pub fn create_mterm_default() -> i32 {
    libmterm_rs::create_default()
}

#[tauri::command(rename_all = "snake_case")]
pub fn create_mterm(
    cmd: String,
    cwd: String,
    argv: Vec<String>,
    mut envp: Vec<String>,
    rows: u16,
    cols: u16,
) -> i32 {
    libmterm_rs::create(&cmd, &cwd, &argv, &mut envp, rows, cols)
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
pub fn set_read_nonblock_mterm(id: u32) {
    libmterm_rs::set_read_nonblock(id)
}

#[tauri::command(rename_all = "snake_case")]
pub fn check_running_mterm(id: u32) -> bool {
    libmterm_rs::check_running(id)
}
