export type Committee = {
  code: string;
  name: string;
  type: string;
  description: string;
  topic: string;
  accent: string;
};

export const committees: Committee[] = [
  {
    code: "DISEC",
    name: "Disarmament & International Security",
    type: "General Assembly",
    description: "Confront the technologies and alliances reshaping modern security.",
    topic: "Autonomous weapons & the future of warfare",
    accent: "cyan",
  },
  {
    code: "UNHRC",
    name: "United Nations Human Rights Council",
    type: "Human Rights",
    description: "Turn the language of rights into commitments that protect people everywhere.",
    topic: "Digital rights & freedom of expression",
    accent: "gold",
  },
  {
    code: "UNCSW",
    name: "UN Commission on the Status of Women",
    type: "Social, Humanitarian & Cultural",
    description: "Shape a more equitable future for women and girls across every society.",
    topic: "Women in leadership & economic inclusion",
    accent: "coral",
  },
  {
    code: "IPC",
    name: "International Press Corps",
    type: "Media & Communications",
    description: "Find the story behind the motion and report the debate as it unfolds.",
    topic: "Live coverage of the conference floor",
    accent: "lime",
  },
  {
    code: "AIPPM",
    name: "All India Political Parties Meet",
    type: "Indian Parliament",
    description: "Navigate high-stakes Indian policy through negotiation, strategy and debate.",
    topic: "One nation, many voices: federal cooperation",
    accent: "orange",
  },
];
