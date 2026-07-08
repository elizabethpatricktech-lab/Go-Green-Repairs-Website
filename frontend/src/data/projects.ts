export interface MediaItem {
  type: "image" | "video";
  src: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  media: MediaItem[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Ductless Mini Split Installation",
    description:
      "Professional installation of a ductless mini split for efficient heating and cooling.",
    media: [{ type: "image", src: "Images/Go Green Repairs HVAC/HVAC(9).jpg" }],
  },
  {
    id: 2,
    title: "Espresso Coffee Machine Repair",
    description: "Commercial espresso machine diagnostic and repair service.",
    media: [
      {
        type: "video",
        src: "Images/Go Green Repairs Commercial Kitchen and Bakery Equipment/IMG_0848.mp4",
      },
    ],
  },
  {
    id: 3,
    title: "Electrical Panel Cleaning",
    description: "Deep cleaning and maintenance for electrical panels.",
    media: [
      { type: "image", src: "Images/Cleaning-Imgs/IMG_2202.jpg" },
      { type: "image", src: "Images/Cleaning-Imgs/IMG_2204.jpg" },
      { type: "image", src: "Images/Cleaning-Imgs/IMG_2210.jpg" },
      { type: "video", src: "Images/Cleaning-Imgs/IMG_2211.mp4" },
    ],
  },
  {
    id: 4,
    title: "Cleaning Mini Split AC",
    description: "Full cleaning service for ductless mini split AC systems.",
    media: [
      { type: "video", src: "Images/Go Green Repairs HVAC/HVAC(7).mp4" },
      { type: "video", src: "Images/Go Green Repairs HVAC/HVAC(8).mp4" },
      { type: "video", src: "Images/Go Green Repairs HVAC/HVAC(11).mp4" },
    ],
  },
  {
    id: 5,
    title: "Mini Split Condensers Installation on Rooftop",
    description: "Rooftop installation of multiple mini split condensers.",
    media: [{ type: "image", src: "Images/Go Green Repairs HVAC/HVAC(6).jpg" }],
  },
  {
    id: 6,
    title: "HVAC Air Handler Installed in an Attic",
    description: "Air handler installation inside a residential attic.",
    media: [
      { type: "image", src: "Images/Go Green Repairs HVAC/HVAC(12).jpg" },
      { type: "image", src: "Images/Go Green Repairs HVAC/HVAC(13).jpg" },
    ],
  },
  {
    id: 7,
    title: "Mini Split Condenser Maintenance",
    description:
      "Routine maintenance and system check for mini split condensers.",
    media: [
      { type: "image", src: "Images/Go Green Repairs HVAC/HVAC(19).jpg" },
    ],
  },
  {
    id: 8,
    title: "Ceiling Cassettes Installation",
    description: "Commercial ceiling cassette AC installation.",
    media: [
      { type: "image", src: "Images/Go Green Repairs HVAC/HVAC(15).jpg" },
    ],
  },
  {
    id: 9,
    title: "Mini Split Condenser Installed on Rooftop",
    description:
      "Installation of a mini split condenser on a rooftop platform.",
    media: [
      { type: "image", src: "Images/Go Green Repairs HVAC/HVAC(18).jpg" },
    ],
  },
  {
    id: 10,
    title: "Central Air Conditioning Repair",
    description:
      "Troubleshooting and repair of a central air conditioning system.",
    media: [
      { type: "image", src: "Images/Go Green Repairs HVAC/HVAC(14).JPG" },
    ],
  },
  {
    id: 11,
    title: "Central Air Conditioning Installation",
    description: "Full installation of a central air conditioning system.",
    media: [
      { type: "image", src: "Images/Go Green Repairs HVAC/HVAC(17).jpg" },
    ],
  },
  {
    id: 12,
    title: "Pitco Floor Fryer Repair",
    description: "Professional repair of a commercial Pitco floor fryer.",
    media: [
      {
        type: "image",
        src: "Images/Go Green Repairs Commercial Kitchen and Bakery Equipment/IMG_0037.jpg",
      },
      {
        type: "image",
        src: "Images/Go Green Repairs Commercial Kitchen and Bakery Equipment/IMG_0040.jpg",
      },
    ],
  },
  {
    id: 13,
    title: "Kettle Repair",
    description: "Commercial kettle repair and maintenance.",
    media: [
      {
        type: "image",
        src: "Images/Go Green Repairs Commercial Kitchen and Bakery Equipment/Commercial(12).jpg",
      },
    ],
  },
  {
    id: 14,
    title: "Mini Split AC Installation",
    description: "Installation of a mini split AC for commercial use.",
    media: [
      {
        type: "video",
        src: "Images/Go Green Repairs Commercial Kitchen and Bakery Equipment/IMG_0184.mp4",
      },
    ],
  },
  {
    id: 15,
    title: "Mixer Installation",
    description: "Installation of a commercial dough mixer.",
    media: [
      {
        type: "image",
        src: "Images/Go Green Repairs Commercial Kitchen and Bakery Equipment/Commercial(13).jpg",
      },
      {
        type: "image",
        src: "Images/Go Green Repairs Commercial Kitchen and Bakery Equipment/Commercial(14).jpg",
      },
    ],
  },
  {
    id: 16,
    title: "Mixer Repair",
    description: "Repairs performed on a large commercial mixer.",
    media: [
      {
        type: "video",
        src: "Images/Go Green Repairs Commercial Kitchen and Bakery Equipment/IMG_0281.mp4",
      },
    ],
  },
  {
    id: 17,
    title: "Braising Pan Burner Replacement",
    description:
      "Burner replacement and operational testing on a braising pan.",
    media: [
      {
        type: "image",
        src: "Images/Go Green Repairs Commercial Kitchen and Bakery Equipment/IMG_2447.jpg",
      },
      {
        type: "video",
        src: "Images/Go Green Repairs Commercial Kitchen and Bakery Equipment/IMG_2429.mp4",
      },
      {
        type: "video",
        src: "Images/Go Green Repairs Commercial Kitchen and Bakery Equipment/IMG_2448.mp4",
      },
    ],
  },
  {
    id: 18,
    title: "Rational Combi Oven Repair",
    description:
      "Full inspection, cleaning, and repair of a Rational Combi oven.",
    media: [
      {
        type: "image",
        src: "Images/Go Green Repairs Commercial Kitchen and Bakery Equipment/IMG_0053.jpg",
      },
      {
        type: "image",
        src: "Images/Go Green Repairs Commercial Kitchen and Bakery Equipment/IMG_0054.JPG",
      },
      {
        type: "video",
        src: "Images/Go Green Repairs Commercial Kitchen and Bakery Equipment/IMG_0058.mp4",
      },
    ],
  },
  {
    id: 19,
    title: "Kettle Repair",
    description: "Commercial kettle repair service.",
    media: [
      {
        type: "image",
        src: "Images/Go Green Repairs Commercial Kitchen and Bakery Equipment/Commercial(15).jpg",
      },
    ],
  },
  {
    id: 20,
    title: "Braising Pan",
    description: "Commercial braising pan servicing.",
    media: [
      {
        type: "image",
        src: "Images/Go Green Repairs Commercial Kitchen and Bakery Equipment/Commercial(16).jpg",
      },
    ],
  },
  {
    id: 21,
    title: "Bakery Rack Oven",
    description: "Servicing and repair of a commercial rack oven.",
    media: [
      {
        type: "image",
        src: "Images/Go Green Repairs Commercial Kitchen and Bakery Equipment/Commercial(17).jpg",
      },
    ],
  },
  {
    id: 22,
    title: "Mini Split Condenser Installation",
    description: "Installation of mini split condenser units.",
    media: [
      {
        type: "video",
        src: "Images/Go Green Repairs Commercial Kitchen and Bakery Equipment/IMG_0182.mp4",
      },
    ],
  },
  {
    id: 23,
    title: "Mini Split Condenser Repair",
    description: "Repair service for a residential mini split condenser.",
    media: [
      {
        type: "image",
        src: "Images/Go Green Repairs HVAC/IMG_0172.jpg",
      },
      {
        type: "image",
        src: "Images/Go Green Repairs HVAC/IMG_0173.jpg",
      },
    ],
  },
  {
    id: 24,
    title: "Dishwasher Repair",
    description: "Commercial dishwasher troubleshooting and repair.",
    media: [
      {
        type: "image",
        src: "Images/Go Green Repairs Commercial Kitchen and Bakery Equipment/IMG_0201.jpg",
      },
      {
        type: "video",
        src: "Images/Go Green Repairs Commercial Kitchen and Bakery Equipment/IMG_0200.mp4",
      },
    ],
  },
  {
    id: 25,
    title: "Tankless Water Heater / Boiler Repair",
    description:
      "Full repair and diagnostics for tankless water heater / boiler systems.",
    media: [
      {
        type: "image",
        src: "Images/Go Green Repairs HVAC/IMG_3864.jpg",
      },
      {
        type: "image",
        src: "Images/Go Green Repairs HVAC/IMG_3866.jpg",
      },
      {
        type: "video",
        src: "Images/Go Green Repairs HVAC/IMG_3871.mp4",
      },
    ],
  },
  {
    id: 26,
    title: "Rack Oven",
    description: "Commercial bakery rack oven repair.",
    media: [
      {
        type: "video",
        src: "Images/Go Green Repairs Commercial Kitchen and Bakery Equipment/IMG_3882.mp4",
      },
    ],
  },
];
