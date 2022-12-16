import React from "react";

export default function DarkModeToggle({toggleDarkMode, darkMode}) {
    return (
        <div className="dark-mode">
            <input
                onChange={toggleDarkMode}
                className="dark-mode-input"
                type="checkbox"
                id="dark-mode-toggle"
                name="dark-mode"
                checked={darkMode}
                hidden
            />
            <label htmlFor="dark-mode-toggle" className="dark-mode-label">
                <div className="dark-mode-circle"></div>
            </label>
        </div>
    )
}
