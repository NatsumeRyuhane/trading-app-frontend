// list of dummy items

const dummyItems = [
  {
    id: 1,
    imgSrc: "https://via.placeholder.com/225x166",
    title: "Pot id 1",
    category: "Kitchen",
    price: 25,
    description:
      "Poshmark connects you to people and closets filled with unique styles, hard-to-find pieces, and endless items to discover.",
  },
  {
    id: 2,
    imgSrc:
      "https://images.unsplash.com/photo-1556911820-1238441ed1a7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBvdHxlbnwwfHwwfHx8MA%3D%3D",
    title: "Pot id 2",
    category: "Kitchen",
    price: 37,
    description:
      "Poshmark connects you to people and closets filled with unique styles, hard-to-find pieces, and endless items to discover.",
  },
  {
    id: 3,
    imgSrc:
      "https://images.unsplash.com/photo-1612372606404-0ab33e7187ee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hhaXJ8ZW58MHx8MHx8fDA%3D",
    title: "Chair id 3",
    category: "Furniture",
    price: 49.9,
    description:
      "Poshmark connects you to people and closets filled with unique styles, hard-to-find pieces, and endless items to discover.",
  },
  {
    id: 4,
    imgSrc:
      "https://images.unsplash.com/photo-1640003145136-f998284e11de?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1hdHRyZXNzfGVufDB8fDB8fHww",
    title: "Mattress id 4",
    category: "Bedding",
    price: 236,
    description:
      "Poshmark connects you to people and closets filled with unique styles, hard-to-find pieces, and endless items to discover.",
  },
  {
    id: 5,
    imgSrc:
      "https://plus.unsplash.com/premium_photo-1672419800149-d04c372c5113?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGFufGVufDB8fDB8fHww",
    title: "Pan id 5",
    category: "Kitchen",
    price: 18.99,
    description:
      "Poshmark connects you to people and closets filled with unique styles, hard-to-find pieces, and endless items to discover.",
  },
  {
    id: 6,
    imgSrc:
      "https://plus.unsplash.com/premium_photo-1672192166833-c8ae84e5e127?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWlyJTIwZnJ5ZXJ8ZW58MHx8MHx8fDA%3D",
    title: "Air Fryer id 6",
    category: "Kitchen",
    price: 80,
    description:
      "Poshmark connects you to people and closets filled with unique styles, hard-to-find pieces, and endless items to discover.",
  },
  {
    id: 7,
    imgSrc:
      "https://images.unsplash.com/photo-1640003145136-f998284e11de?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1hdHRyZXNzfGVufDB8fDB8fHww",
    title: "Mattress id 7",
    category: "Bedding",
    price: 254,
    description:
      "Poshmark connects you to people and closets filled with unique styles, hard-to-find pieces, and endless items to discover.",
  },
  {
    id: 8,
    imgSrc:
      "https://images.unsplash.com/photo-1694405156884-dea1ffb40ede?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdpcmVsZXNzJTIwa2V5Ym9hcmR8ZW58MHx8MHx8fDA%3D",
    title: "Wireless Keyboard id 8",
    category: "Electronics",
    price: 31.6,
    description:
      "Poshmark connects you to people and closets filled with unique styles, hard-to-find pieces, and endless items to discover.",
  },
  {
    id: 9,
    imgSrc:
      "https://images.unsplash.com/photo-1512212621149-107ffe572d2f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c29mYXxlbnwwfHwwfHx8MA%3D%3D",
    title: "Sofa id 9",
    category: "Furniture",
    price: 341,
    description:
      "Poshmark connects you to people and closets filled with unique styles, hard-to-find pieces, and endless items to discover.",
  },
  {
    id: 10,
    imgSrc:
      "https://plus.unsplash.com/premium_photo-1670963025006-3b650025442c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFufGVufDB8fDB8fHww",
    title: "Pan id 10",
    category: "Kitchen",
    price: 23.5,
    description:
      "Poshmark connects you to people and closets filled with unique styles, hard-to-find pieces, and endless items to discover.",
  },
  {
    id: 11,
    imgSrc:
      "https://images.unsplash.com/photo-1691703011149-5fc5a062319d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1hdHRyZXNzfGVufDB8fDB8fHww",
    title: "Mattress id 11",
    category: "Bedding",
    price: 198,
    description:
      "Poshmark connects you to people and closets filled with unique styles, hard-to-find pieces, and endless items to discover.",
  },
];

export default dummyItems;
