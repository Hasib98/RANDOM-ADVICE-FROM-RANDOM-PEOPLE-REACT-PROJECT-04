import { useState } from "react";

/* const cardData = [
  {
    id: 1,
    image: "./pic.jpg",
    quotes: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus
        commodi libero est fuga aperiam voluptate quos quibusdam laboriosam non
        culpa quasi a, quis eligendi nemo mollitia rerum, similique consectetur
        nulla.`,
  },
  {
    id: 1,
    image: "./pic.jpg",
    quotes: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus
        commodi libero est fuga aperiam voluptate quos quibusdam laboriosam non
        culpa quasi a, quis eligendi nemo mollitia rerum, similique consectetur
        nulla.`,
  },
  {
    id: 1,
    image: "./pic.jpg",
    quotes: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus
        commodi libero est fuga aperiam voluptate quos quibusdam laboriosam non
        culpa quasi a, quis eligendi nemo mollitia rerum, similique consectetur
        nulla.`,
  },
]; */
export default function App() {
  return (
    <div>
      <Card />
      {/* <Card /> */}
    </div>
  );
}

function Card() {
  const [randomId, setRandomId] = useState("CLICK MEEH!!");
  const [advice, setAdvice] = useState(
    "Welcom Fellas!!!  😒 i dun hab any advoic now . But  yo  caan click billlu on the purple shit  💩 cawlled button 😕 to generate som advice 💭 for yaa..!! hab  a noice day yoo 😈"
  );
  async function getAdvice() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();

    setAdvice(data.slip.advice);
  }

  return (
    <div className="card">
      <Image randomId={randomId} />

      <Quotes advice={advice} onSetAdvice={setAdvice} />
      <RandomId
        randomId={randomId}
        onSetRandomId={setRandomId}
        onGetAdvice={getAdvice}
      />
      {/* <h1> {cardData.map((data) => data.id)}</h1> */}
    </div>
  );
}
function RandomId({ randomId, onSetRandomId, onGetAdvice }) {
  function handleSetRandomId() {
    const length = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    onSetRandomId(result.toUpperCase());
    onGetAdvice();
  }
  return <button onClick={handleSetRandomId}>{randomId}</button>;
}
function Image({ randomId }) {
  return (
    <img
      className="image"
      src={`https://i.pravatar.cc/500?u=${randomId}`}
      alt={randomId}
    />
  );
}

function Quotes({ advice }) {
  return <p>{advice + advice}</p>;
}
