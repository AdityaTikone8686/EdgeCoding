/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
            },
            colors: {
                brand: {
                    50: '#f0f4ff',
                    100: '#e0e9ff',
                    200: '#c7d7fe',
                    300: '#a5bbfc',
                    400: '#8098f9',
                    500: '#6172f3',
                    600: '#4f52e8',
                    700: '#4140d0',
                    800: '#3636a9',
                    900: '#313185',
                },
                accent: {
                    400: '#fb7185',
                    500: '#f43f5e',
                    600: '#e11d48',
                },
                neon: {
                    green: '#39ff14',
                    cyan: '#00f5ff',
                    purple: '#bf5af2',
                }
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'gradient': 'gradient 8s ease infinite',
                'typing': 'typing 3.5s steps(40, end)',
                'cursor-blink': 'cursor-blink 1s step-end infinite',
                'spin-slow': 'spin 20s linear infinite',
                'bounce-slow': 'bounce 3s infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                gradient: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                typing: {
                    from: { width: '0' },
                    to: { width: '100%' },
                },
                'cursor-blink': {
                    'from, to': { borderColor: 'transparent' },
                    '50%': { borderColor: 'white' },
                },
            },
            backgroundSize: {
                '200%': '200%',
            },
        },
    },
    plugins: [],
}
