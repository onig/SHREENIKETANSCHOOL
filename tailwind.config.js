/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    blue: "#1a3a6b",
                    yellow: "#fdb913",
                },
                brand: {
                    sky: "#e8f4f8",
                    orange: "#ff8c42",
                    green: "#7cb342",
                    grey: "#f5f5f5",
                    white: "#ffffff",
                },
                text: {
                    dark: "#333333",
                    secondary: "#666666",
                }
            },
            fontFamily: {
                sans: ['Poppins', 'sans-serif'],
            },
            borderRadius: {
                '2xl': '1rem',
                '3xl': '1.5rem',
            },
            boxShadow: {
                'premium': '0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            }
        },
    },
    plugins: [],
}
