import {
  baseApi,
  immovablePath,
  movablePath,
  targetclassName,
} from "@src/constants";
import { useEffect, useRef, useState } from "react";
import "@pages/content/components/Demo/app.css";
import "./app.css";
import { debounce } from "../../../../../utils/reload/utils";

type ResponseType = {
  ShortDescription?: string;
  Description?: string;
  StartingPrice?: number;
  EstimatedPrice?: number;
  StartDate?: string;
  PublicationDate?: string;
  Place?: { Name: string; Municipality: string };
  Images?: { Base64: string };
  BidStep?: number;
};

export default function App() {
  const idRef = useRef("");
  const loadingRef = useRef(false);
  const [data, setData] = useState<ResponseType>({});
  const [position, setPosition] = useState({ top: "0", left: "0" });

  useEffect(() => {
    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const fetchData = async (id: number, url: string) => {
    loadingRef.current = true;
    const body = JSON.stringify({ AuctionId: id });

    const res = await fetch(url, {
      method: "POST",
      body,
      headers: {
        accept: "application/json",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "en-US,en;q=0.9,sr-RS;q=0.8,sr;q=0.7",
        "content-type": "application/json;charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => {
        loadingRef.current = false;
      });

    setData(res.Data);
  };

  const mouseMove = debounce((event: any) => {
    if (event.target.className === targetclassName) {
      const fullId = event.target.textContent;
      const type = fullId.replace(/\d+/, "");
      const id = fullId.replace(/^\D+/, "");
      const url = `${baseApi}${type === "П" ? movablePath : immovablePath}`;

      if (idRef.current !== id && !loadingRef.current) {
        idRef.current = id;
        fetchData(id, url);
        setPosition({
          top: `${event.pageY + 25}px`,
          left: `${event.pageX - 200}px`,
        });
      }
    }
  }, 100);

  const {
    ShortDescription,
    Description,
    StartingPrice,
    EstimatedPrice,
    StartDate,
    PublicationDate,
    Place,
    Images,
    BidStep,
  } = data;

  return Object.keys(data).length > 0 ? (
    <div
      className="box"
      style={{
        top: position.top,
        left: position.left,
        opacity: Object.keys(data).length ? 1 : 0,
      }}
    >
      <div id="close" onClick={() => setData({})}>
        X
      </div>
      <div id="output">
        <div className="section">
          <h3>
            <span id="city">{Place?.Name}</span> -{" "}
            <span id="munic">{Place?.Municipality}</span>
          </h3>
          <div id="short-desc">{ShortDescription}</div>
        </div>
        <div className="section">
          <div id="Description">{Description}</div>
        </div>
        <div className="section">
          <div className="info">
            Datum objave aukcije{" "}
            <span id="PublicationDate">
              {new Date(PublicationDate)?.toLocaleDateString()}
            </span>
          </div>
          <div className="info">
            Pocetak aukcije{" "}
            <span id="StartDate">
              {new Date(StartDate)?.toLocaleDateString()}
            </span>
          </div>
          <div className="info">
            Pocetna cena{" "}
            <span id="StartingPrice">{StartingPrice?.toLocaleString()}</span>{" "}
            rsd
          </div>
          <div className="info">
            Procenjena vrednost{" "}
            <span id="EstimatedPrice">{EstimatedPrice?.toLocaleString()}</span>{" "}
            rsd
          </div>
          <div className="info">
            Licitacioni korak{" "}
            <span id="BidStep">{BidStep?.toLocaleString()}</span> rsd
          </div>
        </div>
        <div>
          <img id="image" src={Images?.[0]?.Base64} />
        </div>
      </div>
    </div>
  ) : null;
}
