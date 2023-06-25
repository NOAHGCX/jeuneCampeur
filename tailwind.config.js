// tailwind.config.js
// tailwind.config.js
const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: ["./{src,app,pages}/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderWidth: {
        DEFAULT: "1px",
        0: "0",
        2: "2px",
        3: "3px",
        4: "4px",
        6: "6px",
        8: "8px",
      },
      textColor: {
        "gray-menu": "#9a9a9A",
        pagination: "#93a0ab",
      },
      boxShadow: {
        menu: " 1px 1px 2px rgba(0, 0, 0, 0.2)",
        form: " 0px 1px 2px rgba(0, 0, 0, 0.2)",
        DropZone: " 0px 1px 2px rgba(0, 0, 0, 0.4)",
      },
      colors: {
        orange: {
          light: "#fd8a2b",
          DEFAULT: "#fd7e14",
          dark: "#ca6e22",
        },
        dark: {
          light: "#383838",
          DEFAULT: "#282828",
          dark: "#121212",
        },
        gris: {
          light: "#93a0ab",
          DEFAULT: "#6c757d",
          dark: "4e5459",
        },
        pagination: {
          light: "6C757D",
          DEFAULT: "#DADADA",
          dark: "4e5459",
        },
        hover: {
          DEFAULT: "#000000",
        },
        error: {
          DEFAULT: "#fc0303",
        },
      },
      fontFamily: {
        sans: ["Roboto", ...defaultTheme.fontFamily.sans],
        custom: ["Actor", "sans-serif"],
      },
      backgroundImage: (theme) => ({
        "loggin-pattern": "url('public/login.jpg')",
        'header': "url('/public/banniere.jpg')",

        Icon: "url('public/Icon.svg')",
      }),
      fontWeight: {
        hairline: 100,
        "extra-light": 100,
        thin: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        "extra-bold": 800,
        black: 900,
      },
      fontSize: {
        "72sec": "54px",
        xs: ".75rem",
        xsm: "14px",
        sm: ".875rem",
        tiny: ".875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
        "7xl": "5rem",
      },
      height: {
        20: "20px",
        500: "500px",
        200: "200px",
        458: "458px",
        screen: "100vh",
        40: "40px",
        80: "80px",
        180: "180px",
        30: "30px",
        400: "400px",
        100: "100px",
        1300: "1300px",
        350: "350px",
        384: "384px",
        268: "268px",
        18: "18px",
        24: "24px",
        39: "39px",
        66: "66px",
        15: "15px",
        705: "705px",
        163: "163px",
        96: "96px",
        48: "48px",
        36: "36px",
        227: "227px",
        14: "14px",
        41: "41px",
        789: "789px",
        50: "50px",
      },
      width: {
        50: "50px",
        41: "41px",
        30: "30px",
        14: "14px",
        100: "100px",
        121: "121px",
        20: "20px",
        40: "40px",
        291: "291px",
        200: "200px",
        355: "22.188rem",
        1440: "1440px",
        279: "279px",
        300: "300px",
        295: "295px",
        297: "297px",
        271: "271px",
        250: "250px",
        259: "259px",
        209: "209px",
        239: "239px",
        223: "223px",
        175: "175px",
        425: "425px",
        194: "194px",
        196: "196px",
        150: "155px",
        160: "160px",
        220: "220px",
        18: "18px",
        48: "48px",
        24: "24px",
        36: "36px",
        308: "308px",
        screen: "100vw",
        1200: "1200px",
        215: "215px",
        35: "35px",
        177: "177px",
        2200: "2200px",
        2180: "2180px",
        1920: "1920px",
        900: "900px",
        890: "890px",
        1190: "1190px",
        1444: "1444px",
        1892: "1892px",
        564: "564px",
        540: "540px",
        600: "600px",
        800: "800px",
      },
      maxWidth: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        1440: "1440px",
        120: "120px",
      },
      padding: {
        0: "0px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "48px",
        5: "1.25rem",
        25: "25px",
        30: "30px",
        35: "35px",
        128: "128px",
        68: "68px",
        15: "15px",
        20: "20px",
        24: "24px",
      },
      margin: {
        8: "8px",
        0: "0px",
        19: "19px",
        13: "13px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "48px",
        "-20": "-20px",
        2: "2px",
        20: "20px",
        23: "23px",
        15: "15px",
        25: "25px",
        24: "24px",
        28: "28px",
        53: "53px",
        30: "30px",
        35: "35px",
        40: "40px",
        80: "80px",
        43: "43px",
        42: "42px",
        45: "45px",
        60: "60px",
        70: "70px",
        50: "50px",
        144: "144px",
        557: "557px",
        auto: "auto",
        137: "137px",
        10: "10px",
        6: "6px",
        4: "4px",
        16: "16px",
        29: "29px",
        58: "58px",
        17: "17px",
      },
      borderRadius: {
        lgg: "10px",
        "2xl": "1rem",
        full: "9999px;",
        5: "5px",
      },
    },
    screens: {
      xsm: "320px",
      // => @media (min-width: 320px) { ... }

      sm: "375px",
      // => @media (min-width: 375px) { ... }

      smm: { max: "767px" },
      // => @media (max-width: 1279px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1441px",
      // => @media (min-width: 1441px) { ... }

      1024: "1024px",
      // => @media (min-width: 320px) { ... }

      1440: "1440px",
      // => @media (min-width: 375px) { ... }

      1660: "1660px",
      // => @media (max-width: 1279px) { ... }

      1880: "1880px",
      // => @media (min-width: 768px) { ... }

      2200: "2200px",
      // => @media (min-width: 1024px) { ... }

      2560: "2560px",
      // => @media (min-width: 1441px) { ... }
    },
  },
  variants: {
    extend: {
      position: ["group-hover", "hover"],
      display: ["group-hover", "hover"],
    },
  },
  corePlugins: {
    container: false,
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "100%",
          "@screen sm": {
            maxWidth: "425px",
          },
          "@screen md": {
            maxWidth: "425px",
          },
          "@screen lg": {
            maxWidth: "425px",
          },
          "@screen xl": {
            maxWidth: "425px",
          },
        },
      })
    },
    function ({ addComponents }) {
      addComponents({
        ".container_menu": {
          maxWidth: "100%",
          "@screen 1024": {
            maxWidth: "900px",
          },
          "@screen 1440": {
            maxWidth: "1200px",
          },
          "@screen 1660": {
            maxWidth: "1440px",
          },
          "@screen 1880": {
            maxWidth: "1440px",
          },
          "@screen 2200": {
            maxWidth: "1920px",
          },
          "@screen 2560": {
            maxWidth: "2200px",
          },
        },
      })
    },
    function ({ addComponents }) {
      addComponents({
        ".container_form": {
          maxWidth: "100%",
          "@screen 1024": {
            maxWidth: "1200px",
          },
          "@screen 1440": {
            maxWidth: "1200px",
          },
          "@screen 1660": {
            maxWidth: "1200px",
          },
          "@screen 1880": {
            maxWidth: "1200px",
          },
          "@screen 2200": {
            maxWidth: "1200px",
          },
          "@screen 2560": {
            maxWidth: "1200px",
          },
        },
      })
    },
  ],
}
