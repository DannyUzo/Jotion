"use client";

import EmojiPicker, { Theme } from "emoji-picker-react"
import { useTheme } from "next-themes";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import React from "react";

interface IconPickerprops {
    onChange: (icon: string) => void,
    children: React.ReactNode,
    asChild?: boolean
}

const themeMap = {
    "dark": Theme.DARK,
    "light": Theme.LIGHT
}
type ThemeType = "dark" | "light";

export const IconPicker = React.memo(({ onChange, children, asChild }: IconPickerprops) => {
    const { resolvedTheme } = useTheme();
    const currentTheme = (resolvedTheme || "light") as ThemeType;

    const theme = themeMap[currentTheme];
    return (
        <Popover>
            <PopoverTrigger asChild={asChild}>
                {children}
            </PopoverTrigger>
            <PopoverContent className="p-0 w-full border-none shadow-none">
                <EmojiPicker height={350} theme={theme} onEmojiClick={(data) => onChange(data.emoji)} />
            </PopoverContent>
        </Popover>
    );
})