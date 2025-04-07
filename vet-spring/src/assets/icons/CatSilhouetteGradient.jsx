
const CatSilhouetteGradient = () => {
    return (
        <svg
          viewBox="0 0 300 300"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          className="w-[12rem] sm:w-full lg:w-[30rem]"
        >
          <defs>
            <linearGradient id="animatedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa">
                <animate
                  attributeName="stop-color"
                  values="#60a5fa;#4f46e5;#60a5fa"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="50%" stopColor="#a855f7">
                <animate
                  attributeName="stop-color"
                  values="#a855f7;#a855f7;#a855f7"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor="#4f46e5">
                <animate
                  attributeName="stop-color"
                  values="#4f46e5;#60a5fa;#4f46e5"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>
          </defs>
          <g transform="translate(0,300) scale(0.1,-0.1)" fill="url(#animatedGradient)">
          <path d="M1698 2362 c-57 -63 -147 -258 -164 -352 -16 -91 -30 -125 -75 -169
-39 -39 -66 -54 -177 -92 -48 -17 -107 -43 -131 -57 -110 -64 -208 -207 -250
-363 -35 -129 -42 -221 -35 -426 8 -220 14 -241 87 -273 38 -18 68 -20 327
-20 315 0 330 3 330 59 0 47 -26 61 -114 61 l-78 0 32 37 c40 45 77 124 86
181 7 49 20 62 30 30 21 -69 139 -317 160 -338 20 -21 35 -25 100 -28 81 -5
114 10 114 50 0 29 -45 68 -79 68 -20 0 -31 6 -35 18 -15 50 -38 296 -34 362
4 71 9 86 66 192 100 189 111 263 61 423 -30 99 -27 108 51 121 53 10 70 18
97 47 46 51 51 80 19 117 -14 17 -33 56 -42 86 -16 55 -66 117 -104 129 -17 5
-17 9 1 68 21 68 24 97 10 97 -5 0 -33 -19 -62 -42 -28 -24 -62 -51 -75 -61
l-22 -17 -11 52 c-11 50 -26 78 -41 78 -4 0 -23 -17 -42 -38z"/>
          </g>
        </svg>
      );
};

export default CatSilhouetteGradient;
