import { Link } from "react-router-dom";
import { useState } from "react";

import { CardName } from "../../Components/CardName/CardName";
import Ahorcado from "../../../Public/img/Ahorcado.png";

import "./Home.css";

export function Home() {
    const [showInputName, setShowInputName] = useState(false);

    return (
        <div className="ahorcado__home content">
            {showInputName && <CardName />}

            <div className="ahorcado__home-logo">
                <img src={Ahorcado} alt="logo" />
            </div>
            <div className="ahorcado__home-menu">
                <Link onClick={() => setShowInputName(true)}>Jugar</Link>
            </div>
        </div>
    );
}
