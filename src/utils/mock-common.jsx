import mutual1 from "../assets/mock-image/2mutual.jpg";
import mutual2 from "../assets/mock-image/1mutual.jpg";
import mutual3 from "../assets/mock-image/3mutual.jpg";
import mutual4 from "../assets/mock-image/5mutual.jpg";
import snappImage from "../assets/mock-image/2mutual.jpg";

export const mockMutual = [
  { id: 1, name: "Jack", profile_img: mutual1, snappy_username: "jack111" },
  {
    id: 2,
    name: "Aaron",
    profile_img: mutual2,
    snappy_username: "aaron63211",
  },
  {
    id: 3,
    name: "Antony",
    profile_img: mutual3,
    snappy_username: "antony76677",
  },
  {
    id: 4,
    name: "Jenifer",
    profile_img: mutual4,
    snappy_username: "jenefier1213",
  },
];

export const mockDiscoverJokes = [
  {
    id: 1,
    question: "Why don't scientists trust atoms?",
    answer: "Because they make up everything!",
  },
  {
    id: 2,
    question:
      "Did you hear about the mathematician who's afraid of negative numbers?",
    answer: "He'll stop at nothing to avoid them!",
  },
  {
    id: 3,
    question: "Why did the scarecrow win an award?",
    answer: "Because he was outstanding in his field!",
  },
  {
    id: 4,
    question: "Why don't skeletons fight each other?",
    answer: "They don't have the guts!",
  },
  {
    id: 5,
    question: "What did one wall say to the other wall?",
    answer: "I'll meet you at the corner!",
  },
];

export const mockDiscoverfacts = [
  {
    id: 1,
    question: "What is the tallest mountain in the world?",
    answer: "Mount Everest.",
  },
  {
    id: 2,
    question: "What is the capital city of Australia?",
    answer: "Canberra.",
  },
  {
    id: 3,
    question: "How many planets are there in our solar system?",
    answer: "There are eight planets in our solar system.",
  },
  {
    id: 4,
    question: "Which animal is known as the 'king of the jungle'?",
    answer: "Lions.",
  },
  {
    id: 5,
    question: "What is the largest organ in the human body?",
    answer: "The skin.",
  },
  {
    id: 6,
    question: "What is the currency of Japan?",
    answer: "Japanese Yen.",
  },
  {
    id: 7,
    question: "What is the chemical symbol for gold?",
    answer: "Au.",
  },
  {
    id: 8,
    question: "Which is the largest ocean on Earth?",
    answer: "The Pacific Ocean.",
  },
  {
    id: 9,
    question: "What is the national animal of Canada?",
    answer: "The beaver.",
  },
  {
    id: 10,
    question: "What is the fastest land animal?",
    answer: "The cheetah.",
  },
  {
    id: 11,
    question: "What year did the first manned moon landing occur?",
    answer: "1969.",
  },
  {
    id: 12,
    question: "How many bones are in the human body?",
    answer: "There are 206 bones in the human body.",
  },
  {
    id: 13,
    question: "What is the largest continent?",
    answer: "Asia.",
  },
  {
    id: 14,
    question: "Who painted the Mona Lisa?",
    answer: "Leonardo da Vinci.",
  },
  {
    id: 15,
    question: "Which planet is known as the 'Red Planet'?",
    answer: "Mars.",
  },
  {
    id: 16,
    question: "What is the national flower of India?",
    answer: "Lotus.",
  },
  {
    id: 17,
    question: "What is the largest species of shark?",
    answer: "The whale shark.",
  },
  {
    id: 18,
    question: "Which country is home to the kangaroo?",
    answer: "Australia.",
  },
  {
    id: 19,
    question: "What is the largest bird in the world?",
    answer: "The ostrich.",
  },
  {
    id: 20,
    question: "What is the speed of light?",
    answer: "Approximately 299,792 kilometers per second.",
  },
];

export const feedData = [
  {
    id: "1",
    profile_img: mutual1,
    name: "Json Roy",
    snappy_username: "json1343",
    snapped_at: "15m",
    snapp: {
      message: "This is my First Snapp which I have snapped in this web site",
      image: snappImage,
    },
  },
  {
    id: "2",
    profile_img: mutual1,
    name: "Michelle Janny",
    snappy_username: "janny111",
    snapped_at: "Aug 21",
    snapp: {
      message:
        "ChatGPT is an advanced language model developed by OpenAI. Powered by the GPT-3.5 architecture, it is designed to generate human-like text and engage in interactive conversations with users. With a vast knowledge base and the ability to understand and respond to a wide range of topics, ChatGPT serves as a versatile tool for information retrieval, creative writing, and general conversation. It leverages its training on a diverse dataset to provide accurate and contextually appropriate responses to user queries. However, it is important to note that while ChatGPT is capable of producing coherent and fluent text, it may occasionally generate incorrect or nonsensical answers. Users should exercise critical thinking and verify information from reliable sources. OpenAI continues to refine and improve ChatGPT to enhance its capabilities and address any limitations or biases it may have",
      image: snappImage,
    },
  },
  {
    id: "3",
    profile_img: mutual1,
    name: "Smithy bou",
    snappy_username: "smithhh111",
    snapped_at: "21h",
    snapp: {
      message: "Hello Snappyess",
      image: snappImage,
    },
  },
];

export const singleFeedData = {
  id: "1",
  profile_img: mutual1,
  name: "Json Roy",
  snappy_username: "json1343",
  snapped_at: "12:53Pm Aug 8,2023",
  snapp: {
    message: "This is my First Snapp which I have snapped in this web site",
    image: snappImage,
  },
  likes: 39,
  bookmarks: 10,
  comments_count: 3,
  comments: [
    {
      id: 1,
      user_profile_pic: mutual1,
      user_name: "Alex",
      snapp_user_name: "aalex232e",
      commented_at: "23h",
      msg: "It is great",
      replied: [
        {
          id: 1,
          user_profile_pic: mutual2,
          user_name: "Kavya",
          snapp_user_name: "kavya123",
          commented_at: "27h",
          msg: "Where is the location Bro?",
        },
        {
          id: 2,
          user_profile_pic: mutual1,
          user_name: "Alex",
          snapp_user_name: "alex213",
          commented_at: "27h",
          msg: "Chennai",
        },
        {
          id: 3,
          user_profile_pic: mutual3,
          user_name: "Sam",
          snapp_user_name: "sam122",
          commented_at: "27h",
          msg: "Great It is awsome place I have vistied once",
        },
        {
          id: 4,
          user_profile_pic: mutual1,
          user_name: "Alex",
          snapp_user_name: "alex213",
          commented_at: "27h",
          msg: "yesssss.Its a greatt Place",
        },
      ],
    },
    {
      id: 2,
      user_profile_pic: mutual4,
      user_name: "Eoin",
      snapp_user_name: "eoin211",
      commented_at: "15m",
      msg: "Oh! It is wonderful",
    },
    {
      id: 3,
      user_profile_pic: mutual1,
      user_name: "Cary",
      snapp_user_name: "carry11323",
      commented_at: "23 June",
      msg: "New Life Starts is great",
      replied: [
        {
          id: 3,
          user_profile_pic: mutual3,
          user_name: "Sam",
          snapp_user_name: "sam122",
          commented_at: "27h",
          msg: "Great It is awsome place I have vistied once",
        },
        {
          id: 4,
          user_profile_pic: mutual1,
          user_name: "Alex",
          snapp_user_name: "alex213",
          commented_at: "27h",
          msg: "yesssss.Its a greatt Place",
        },
      ],
    },
    {
      id: 4,
      user_profile_pic: mutual4,
      user_name: "Ricky Rogers",
      snapp_user_name: "ricky754",
      commented_at: "May 01",
      msg: "I hope these wishes help you to express your love and appreciation for the special person in your life",
    },
  ],
};
