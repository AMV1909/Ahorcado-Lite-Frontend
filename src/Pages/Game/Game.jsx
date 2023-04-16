import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AiOutlineReload } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";

import { ToastReset } from "../../Components/ToastReset/ToastReset";
import { Errors } from "../../Assets/Errors";

import "./Game.css";

export function Game({ socket }) {
    const [game, setGame] = useState();
    const letters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"; // This is the letters that the user can use, not the available letters
    const navigate = useNavigate();

    useEffect(() => {
        if (!socket || !localStorage.getItem("name")) {
            navigate("/");
        } else {
            if (socket.disconnected) socket.connect();

            socket.emit("joinGame", localStorage.getItem("name"));

            window.addEventListener("beforeunload", (e) => socket.disconnect());
        }
    }, []);

    socket.on("game", (data) => setGame(data));
    socket.on("resetGame", () => window.location.reload());

    const resetGame = () => {
        if (game.win || game.lose) {
            socket.emit("resetGame");
        } else {
            toast((t) => <ToastReset t={t} socket={socket} />, {
                duration: Infinity,
                style: {
                    background: "white",
                    color: "black",
                },
            });
        }
    };

    const letterSelected = (letter) => {
        if (game.availableLetters.includes(letter)) {
            socket.emit("letterSelected", letter);
        }
    };

    console.log(game);

    return (
        <div className="ahorcado__game content">
            <div className="ahorcado__game-header">
                <div
                    onClick={() => {
                        socket.disconnect();
                        navigate("/");
                    }}
                >
                    <BsArrowLeft size={30} />
                </div>
                <h1>Ahorcado</h1>
                <button onClick={() => resetGame()}>
                    <AiOutlineReload size={30} />
                </button>
            </div>
            <div className="ahorcado__game-span span">
                <span></span>
            </div>
            {game ? (
                <div className="ahorcado__game-game">
                    <div className="ahorcado__game-game_draw">
                        <img src={Errors[game.bad]} alt="Ahorcado" />
                    </div>
                    {!game.win && !game.lose ? (
                        <>
                            <div className="ahorcado__game-game_inputs">
                                {game.word.split("").map((letter, index) => {
                                    return (
                                        <div key={index}>
                                            <input
                                                type="text"
                                                value={
                                                    game.good.includes(letter)
                                                        ? letter
                                                        : ""
                                                }
                                                disabled
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="ahorcado__game-game_letters">
                                {game.players[game.turn].id == socket.id ? (
                                    letters.split("").map((letter, index) => {
                                        return (
                                            <div
                                                key={index}
                                                onClick={() =>
                                                    letterSelected(letter)
                                                }
                                                className={`${
                                                    game.availableLetters.includes(
                                                        letter
                                                    )
                                                        ? "ahorcado__game-game_letters-letter"
                                                        : "ahorcado__game-game_letters-letter-disabled"
                                                }`}
                                            >
                                                <h1>{letter}</h1>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <h1>
                                        Esperando a que{" "}
                                        {game.players[game.turn].name}{" "}
                                        seleccione una letra
                                    </h1>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="ahorcado__game-game_win">
                            <h1>{game.win ? "Ganaste" : "Perdiste"}</h1>
                            <h2>La palabra era: {game.word}</h2>
                            {game.win ? (
                                <h2>Errores: {game.bad}</h2>
                            ) : (
                                <button onClick={() => resetGame()}>
                                    Reiniciar
                                </button>
                            )}
                        </div>
                    )}
                </div>
            ) : (
                <div className="ahorcado__game-game">
                    <h1>Cargando...</h1>
                </div>
            )}
        </div>
    );
}
