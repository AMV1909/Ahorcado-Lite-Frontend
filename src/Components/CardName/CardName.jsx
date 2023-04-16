import { useNavigate } from "react-router-dom";
import { useState } from "react";

import "./CardName.css";

export function CardName() {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const onChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("name", name);
        navigate("/game");
    };

    return (
        <form className="ahorcado__cardName" onSubmit={handleSubmit}>
            <h3>Ingresa un nombre</h3>
            <input type="text" onChange={onChange} required />
            <button>Jugar</button>
        </form>
    );
}
