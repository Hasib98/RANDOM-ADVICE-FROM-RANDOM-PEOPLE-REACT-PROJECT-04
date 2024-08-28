import { useState } from "react";
export default function App() {
  const [savedCardData, setSavedCardData] = useState([]);

  return (
    <div className="app">
      <Card
        savedCardData={savedCardData}
        onSetSavedCardData={setSavedCardData}
      />
      <SavedCard savedCardData={savedCardData} />
    </div>
  );
}

function Card({ savedCardData, onSetSavedCardData }) {
  const [randomId, setRandomId] = useState("CLICK MEEH!!");
  const [advice, setAdvice] = useState(
    "Welcom Fellas!!!  😒 i dun hab any advoic now . But  yo  caan click on the purple shit  💩 cawlled button 😕 to generate som advice 💭 for yaa..!! hab  a noice day yoo 😈"
  );
  const avatar = `https://i.pravatar.cc/500?u=${randomId}`;
  async function getAdvice() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();

    setAdvice(data.slip.advice);
  }
  function handleAddData() {
    if (savedCardData.map((data) => data.id).includes(randomId)) return;
    onSetSavedCardData([
      ...savedCardData,
      {
        id: randomId,
        image: avatar,
        advice: advice,
      },
    ]);
  }

  return (
    <div className="card">
      <Image avatar={avatar} />

      <Advice advice={advice} onSetAdvice={setAdvice} />
      <RandomId
        randomId={randomId}
        onSetRandomId={setRandomId}
        onGetAdvice={getAdvice}
      />
      <Button onClick={handleAddData}>+</Button>
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
  return <Button onClick={handleSetRandomId}>{randomId}</Button>;
}

function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}
function Image({ avatar }) {
  return <img className="image-small" src={avatar} alt={""} />;
}

function Advice({ advice }) {
  return <p>{advice}</p>;
}

function SavedCard({ savedCardData }) {
  return (
    <div className="savedcards">
      {savedCardData.map((cardData) => (
        <div className="small-card" key={cardData.id}>
          <Image avatar={cardData.image} />
          <div className="thumb-id">{cardData.id}</div>
          <p>{cardData.advice}</p>
        </div>
      ))}
    </div>
  );
}
