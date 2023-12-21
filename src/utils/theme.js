function getTheme() {
    return localStorage.getItem('theme') || 'light'
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
    if (theme === 'dark')
        AndroidApi.setWhiteBar()
    else
        AndroidApi.setBlackBar()
}

function darkTrigger() {
    const theme = getTheme()
    if (theme === 'light') {
        setTheme('dark')
    } else {
        setTheme('light')
    }
}

export {
    darkTrigger, getTheme, setTheme
}