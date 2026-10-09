import type { ReactNode } from "react";

function Face({ x = 100, y = 105 }: { x?: number; y?: number }) {
  return (
    <g fill="#293d48">
      <circle cx={x - 17} cy={y} r="4" />
      <circle cx={x + 17} cy={y} r="4" />
      <path
        d={`M${x - 8} ${y + 14} Q${x} ${y + 23} ${x + 8} ${y + 14}`}
        fill="none"
        stroke="#293d48"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </g>
  );
}
export function Art({
  kind,
  color,
  className,
}: {
  kind: string;
  color?: string;
  className?: string;
}) {
  let drawing: ReactNode;
  const smile = <Face />;
  const animal = ["dog", "cat", "cow", "lion", "pig", "zebra"].includes(kind);
  if (animal) {
    const fur = {
      dog: "#d49557",
      cat: "#f4b463",
      cow: "#fffaf0",
      lion: "#ffcd66",
      pig: "#f4a3b4",
      zebra: "#fffaf0",
    }[kind];
    drawing = (
      <>
        {kind === "lion" && <circle cx="100" cy="105" r="80" fill="#c9823e" />}
        <path
          d="M54 75 Q20 3 58 30 L82 67 M146 75 Q180 3 142 30 L118 67"
          fill={fur}
          stroke="#b47754"
          strokeWidth="5"
          strokeLinejoin="round"
        />
        <ellipse
          cx="100"
          cy="115"
          rx="66"
          ry="62"
          fill={fur}
          stroke="#b47754"
          strokeWidth="3"
        />
        {kind === "dog" && (
          <>
            <ellipse cx="41" cy="85" rx="18" ry="42" fill="#875638" />
            <ellipse cx="159" cy="85" rx="18" ry="42" fill="#875638" />
            <ellipse cx="100" cy="137" rx="30" ry="22" fill="#ffe2b6" />
          </>
        )}
        {kind === "cow" && (
          <>
            <path
              d="M48 50 L48 25 Q63 20 65 60 M135 60 Q137 20 152 25 L152 50"
              fill="#ead6a1"
            />
            <ellipse cx="58" cy="98" rx="21" ry="28" fill="#48535b" />
            <ellipse cx="100" cy="143" rx="37" ry="23" fill="#efb9be" />
          </>
        )}
        {kind === "pig" && (
          <ellipse cx="100" cy="137" rx="31" ry="22" fill="#df7d99" />
        )}
        {kind === "zebra" && (
          <g stroke="#3b4650" strokeWidth="9">
            <path d="M79 57 L92 85 M107 57 L102 85 M44 118 L68 125 M156 118 L132 125" />
          </g>
        )}
        {smile}
        <ellipse cx="100" cy="126" rx="7" ry="5" fill="#574239" />
        {kind === "cat" && (
          <g stroke="#8e633e" strokeWidth="3">
            <path d="M56 125 L17 115 M57 137 L19 142 M144 125 L183 115 M143 137 L181 142" />
          </g>
        )}
      </>
    );
  } else
    switch (kind) {
      case "elephant":
        drawing = (
          <>
            <ellipse cx="43" cy="101" rx="37" ry="53" fill="#8bafc9" />
            <ellipse cx="157" cy="101" rx="37" ry="53" fill="#8bafc9" />
            <circle cx="100" cy="99" r="54" fill="#abc9dd" />
            <path
              d="M100 120 V160 Q100 187 133 173"
              fill="none"
              stroke="#abc9dd"
              strokeWidth="30"
              strokeLinecap="round"
            />
            <Face y={94} />
          </>
        );
        break;
      case "duck":
        drawing = (
          <>
            <ellipse cx="98" cy="135" rx="71" ry="45" fill="#ffd665" />
            <circle cx="106" cy="71" r="42" fill="#ffd665" />
            <path d="M135 72 L182 87 L138 98" fill="#ed8c3e" />
            <circle cx="119" cy="65" r="5" fill="#293d48" />
            <path
              d="M60 129 Q82 160 113 131"
              fill="none"
              stroke="#e6ad34"
              strokeWidth="7"
              strokeLinecap="round"
            />
          </>
        );
        break;
      case "apple":
      case "orange":
        drawing = (
          <>
            <path
              d="M101 58 Q105 29 121 26"
              stroke="#795b41"
              strokeWidth="9"
              fill="none"
            />
            <ellipse
              cx="127"
              cy="41"
              rx="24"
              ry="12"
              fill="#65a77b"
              transform="rotate(-25 127 41)"
            />
            <path
              d="M100 63 C20 29 13 147 70 174 Q100 184 130 174 C187 147 180 29 100 63"
              fill={kind === "apple" ? "#ee7272" : "#f9a047"}
            />
            {smile}
          </>
        );
        break;
      case "ball":
        drawing = (
          <>
            <circle cx="100" cy="103" r="74" fill={color || "#ef867b"} />
            <path
              d="M32 74 Q94 132 163 62 M56 163 Q86 80 123 32"
              fill="none"
              stroke={color ? "#ffffff" : "#ffe6aa"}
              strokeOpacity=".45"
              strokeWidth="14"
            />
            <ellipse
              cx="70"
              cy="64"
              rx="15"
              ry="9"
              fill="white"
              opacity=".35"
              transform="rotate(-35 70 64)"
            />
          </>
        );
        break;
      case "car":
        drawing = (
          <>
            <path
              d="M28 113 L53 65 H131 L160 112 Q180 112 180 139 V154 H20 V132 Q20 116 28 113"
              fill="#75b4d6"
            />
            <path
              d="M65 78 H91 V110 H48 Z M102 78 H125 L145 110 H102 Z"
              fill="#d8f1fa"
            />
            <circle cx="53" cy="157" r="22" fill="#354956" />
            <circle cx="148" cy="157" r="22" fill="#354956" />
            <circle cx="53" cy="157" r="9" fill="#fff7e8" />
            <circle cx="148" cy="157" r="9" fill="#fff7e8" />
          </>
        );
        break;
      case "egg":
        drawing = (
          <>
            <path
              d="M100 25 C73 25 31 101 42 144 C55 193 145 193 158 144 C169 101 127 25 100 25"
              fill="#ffe8b9"
            />
            {smile}
          </>
        );
        break;
      case "fish":
      case "whale":
        drawing = (
          <>
            <path d="M148 109 L190 71 V149 Z" fill="#6aabc7" />
            <ellipse cx="88" cy="115" rx="72" ry="49" fill="#84c4d8" />
            <circle cx="52" cy="101" r="5" fill="#293d48" />
            <path
              d="M38 120 Q50 135 60 120"
              stroke="#293d48"
              fill="none"
              strokeWidth="4"
            />
            {kind === "whale" && (
              <path
                d="M79 65 V28 M79 40 Q55 15 47 37 M79 40 Q103 15 111 37"
                fill="none"
                stroke="#84c4d8"
                strokeWidth="8"
                strokeLinecap="round"
              />
            )}
          </>
        );
        break;
      case "gift":
        drawing = (
          <>
            <rect
              x="38"
              y="76"
              width="124"
              height="104"
              rx="12"
              fill="#aa8aca"
            />
            <rect x="29" y="64" width="142" height="29" rx="8" fill="#c2a3de" />
            <path
              d="M100 179 V68 C26 72 55 4 100 64 C145 4 174 72 100 68"
              stroke="#ffda79"
              strokeWidth="17"
              fill="none"
            />
          </>
        );
        break;
      case "house":
        drawing = (
          <>
            <rect
              x="43"
              y="88"
              width="114"
              height="93"
              rx="10"
              fill="#f8bd74"
            />
            <path d="M20 95 L100 23 L180 95 Z" fill="#dd7e7c" />
            <rect x="83" y="126" width="34" height="55" rx="5" fill="#8ac2bf" />
            <rect x="55" y="106" width="21" height="23" rx="4" fill="#fff7e8" />
          </>
        );
        break;
      case "ice-cream":
        drawing = (
          <>
            <path d="M56 100 L100 185 L144 100" fill="#dca767" />
            <circle cx="100" cy="71" r="53" fill="#efadc1" />
            <path
              d="M58 62 Q100 33 144 62"
              stroke="#ffe4ed"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
            />
          </>
        );
        break;
      case "juice":
        drawing = (
          <>
            <path
              d="M129 25 L112 98"
              stroke="#86b8bc"
              strokeWidth="10"
              fill="none"
            />
            <path d="M49 69 H153 L141 177 H61 Z" fill="#ffa950" />
            <path d="M49 69 H153 L148 105 H53 Z" fill="#ffcc81" />
            {smile}
          </>
        );
        break;
      case "kite":
        drawing = (
          <>
            <path
              d="M104 146 Q55 170 92 185"
              stroke="#799fa8"
              strokeWidth="4"
              fill="none"
            />
            <path d="M100 18 L163 84 L100 149 L37 84 Z" fill="#80bbb2" />
            <path
              d="M100 18 V149 M37 84 H163"
              stroke="#ffe6a0"
              strokeWidth="6"
            />
          </>
        );
        break;
      case "moon":
        drawing = (
          <>
            <path
              d="M139 25 C27 8 11 177 117 179 Q164 179 180 135 C76 179 52 58 139 25"
              fill="#ffce66"
            />
            <circle cx="55" cy="94" r="5" fill="#6e704e" />
          </>
        );
        break;
      case "nest":
        drawing = (
          <>
            <ellipse cx="100" cy="138" rx="81" ry="38" fill="#ae8058" />
            <ellipse cx="80" cy="115" rx="20" ry="30" fill="#c2e1dc" />
            <ellipse cx="125" cy="115" rx="20" ry="30" fill="#ffe8b9" />
            <path
              d="M25 142 Q100 176 175 142 M35 157 Q100 185 165 157"
              stroke="#d3ae78"
              strokeWidth="9"
              fill="none"
            />
          </>
        );
        break;
      case "queen":
        drawing = (
          <>
            <path
              d="M42 83 L29 31 L72 56 L100 18 L128 56 L171 31 L158 83"
              fill="#ffd668"
            />
            <circle cx="100" cy="129" r="52" fill="#efc6a4" />
            {<Face y={120} />}
            <circle cx="100" cy="57" r="8" fill="#ae8dd0" />
          </>
        );
        break;
      case "rainbow":
        drawing = (
          <>
            {[
              "#ed7773",
              "#f3a054",
              "#ffda70",
              "#86be93",
              "#79afcf",
              "#ad92d0",
            ].map((c, i) => (
              <path
                key={c}
                d={`M${22 + i * 12} 165 A${78 - i * 12} ${78 - i * 12} 0 0 1 ${178 - i * 12} 165`}
                stroke={c}
                strokeWidth="13"
                fill="none"
              />
            ))}
          </>
        );
        break;
      case "sun":
        drawing = (
          <>
            <g stroke="#f5bf56" strokeWidth="13" strokeLinecap="round">
              {Array.from({ length: 8 }, (_, i) => (
                <path
                  key={i}
                  d="M100 16 V34"
                  transform={`rotate(${i * 45} 100 100)`}
                />
              ))}
            </g>
            <circle cx="100" cy="100" r="51" fill="#ffd570" />
            {smile}
          </>
        );
        break;
      case "tree":
        drawing = (
          <>
            <rect x="87" y="116" width="26" height="67" rx="8" fill="#ac835d" />
            <circle cx="100" cy="74" r="51" fill="#7bbf93" />
            <circle cx="61" cy="110" r="39" fill="#7bbf93" />
            <circle cx="139" cy="110" r="39" fill="#7bbf93" />
          </>
        );
        break;
      case "umbrella":
        drawing = (
          <>
            <path
              d="M99 85 V161 Q99 189 74 171"
              stroke="#799fac"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M18 99 A82 76 0 0 1 182 99 Q155 75 128 99 Q100 75 72 99 Q45 75 18 99"
              fill="#ac90d0"
            />
            <path
              d="M99 24 Q71 46 72 98 M99 24 Q128 46 128 98"
              fill="none"
              stroke="#d2bbea"
              strokeWidth="5"
            />
          </>
        );
        break;
      case "violin":
        drawing = (
          <>
            <path d="M95 87 V22 H109 V90" stroke="#795b49" strokeWidth="12" />
            <path
              d="M100 83 C42 39 32 96 64 114 C26 149 53 188 100 178 C147 188 174 149 136 114 C168 96 158 39 100 83"
              fill="#cf9158"
            />
            <path d="M100 40 V161" stroke="#fff0d0" strokeWidth="4" />
            <path d="M158 24 L141 178" stroke="#795b49" strokeWidth="6" />
          </>
        );
        break;
      case "xylophone":
        drawing = (
          <>
            {[
              "#ea8376",
              "#f3aa63",
              "#efd075",
              "#8fc09f",
              "#79b4d3",
              "#b194d2",
            ].map((c, i) => (
              <rect
                key={c}
                x={26 + i * 26}
                y={45 + i * 8}
                width="23"
                height={124 - i * 16}
                rx="6"
                fill={c}
              />
            ))}
            <path d="M43 31 L149 162" stroke="#9d805d" strokeWidth="7" />
            <circle cx="43" cy="31" r="15" fill="#9d805d" />
          </>
        );
        break;
      case "yo-yo":
        drawing = (
          <>
            <path
              d="M107 109 Q160 76 123 21"
              stroke="#8ca9af"
              strokeWidth="4"
              fill="none"
            />
            <ellipse cx="109" cy="129" rx="53" ry="51" fill="#b292d0" />
            <ellipse cx="87" cy="133" rx="49" ry="51" fill="#c6ace0" />
            <circle cx="87" cy="133" r="17" fill="#ffdf8b" />
          </>
        );
        break;
      case "alphabet":
        drawing = (
          <>
            <text
              x="13"
              y="125"
              fontSize="106"
              fontWeight="900"
              fill="#ef756b"
              transform="rotate(-12 58 100)"
            >
              A
            </text>
            <text
              x="89"
              y="160"
              fontSize="104"
              fontWeight="900"
              fill="#8364b6"
              transform="rotate(10 130 115)"
            >
              B
            </text>
            <text x="115" y="70" fontSize="74" fontWeight="900" fill="#e5a43b">
              C
            </text>
          </>
        );
        break;
      case "animals":
        drawing = (
          <>
            <g transform="translate(-10 3) scale(.72)">
              <Art kind="dog" />
            </g>
            <g transform="translate(77 50) scale(.6)">
              <Art kind="cat" />
            </g>
          </>
        );
        break;
      case "colors":
        drawing = (
          <>
            <circle cx="67" cy="65" r="44" fill="#ec7472" />
            <rect
              x="104"
              y="67"
              width="73"
              height="73"
              rx="21"
              fill="#7bb5d8"
              transform="rotate(12 140 100)"
            />
            <path d="M63 102 L112 180 H14 Z" fill="#ffd26c" />
          </>
        );
        break;
      default:
        drawing = (
          <>
            <circle cx="100" cy="100" r="70" fill="#abcfd6" />
            {smile}
          </>
        );
    }
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      {drawing}
    </svg>
  );
}
