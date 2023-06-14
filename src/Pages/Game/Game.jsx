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
                                    <>
                                        <div
                                            onClick={() => letterSelected("A")}
                                            className={`${
                                                game.availableLetters.includes(
                                                    "A"
                                                )
                                                    ? "ahorcado__game-game_letters-letter"
                                                    : "ahorcado__game-game_letters-letter-disabled"
                                            }`}
                                        >
                                            <h1>A</h1>
                                        </div>

                                        <div
                                            onClick={() => letterSelected("B")}
                                            className={`${
                                                game.availableLetters.includes(
                                                    "B"
                                                )
                                                    ? "ahorcado__game-game_letters-letter"
                                                    : "ahorcado__game-game_letters-letter-disabled"
                                            }`}
                                        >
                                            <h1>B</h1>
                                        </div>

                                        <div
                                            onClick={() => letterSelected("C")}
                                            className={`${
                                                game.availableLetters.includes(
                                                    "C"
                                                )
                                                    ? "ahorcado__game-game_letters-letter"
                                                    : "ahorcado__game-game_letters-letter-disabled"
                                            }`}
                                        >
                                            <h1>C</h1>
                                        </div>

                                        <div
                                            onClick={() => letterSelected("D")}
                                            className={`${
                                                game.availableLetters.includes(
                                                    "D"
                                                )
                                                    ? "ahorcado__game-game_letters-letter"
                                                    : "ahorcado__game-game_letters-letter-disabled"
                                            }`}
                                        >
                                            <h1>D</h1>
                                        </div>

                                        <div
                                            onClick={() => letterSelected("E")}
                                            className={`${
                                                game.availableLetters.includes(
                                                    "E"
                                                )
                                                    ? "ahorcado__game-game_letters-letter"
                                                    : "ahorcado__game-game_letters-letter-disabled"
                                            }`}
                                        >
                                            <h1>E</h1>
                                        </div>
                                        
                                        <div
                                            onClick={() => letterSelected("F")}
                                            className={`${
                                                game.availableLetters.includes(
                                                    "F"
                                                )
                                                    ? "ahorcado__game-game_letters-letter"
                                                    : "ahorcado__game-game_letters-letter-disabled"
                                            }`}
                                        >
                                            <h1>F</h1>
                                        </div>

                                        <div
                                            onClick={() => letterSelected("G")}
                                            className={`${
                                                game.availableLetters.includes(
                                                    "G"
                                                )
                                                    ? "ahorcado__game-game_letters-letter"
                                                    : "ahorcado__game-game_letters-letter-disabled"
                                            }`}
                                        >
                                            <h1>G</h1>
                                        </div>

                                        <div
                                            onClick={() => letterSelected("H")}
                                            className={`${
                                                game.availableLetters.includes(
                                                    "H"
                                                )
                                                    ? "ahorcado__game-game_letters-letter"
                                                    : "ahorcado__game-game_letters-letter-disabled"
                                            }`}
                                        >
                                            <h1>H</h1>
                                        </div>

                                        <div
                                            onClick={() => letterSelected("I")}
                                            className={`${
                                                game.availableLetters.includes(
                                                    "I"
                                                )
                                                    ? "ahorcado__game-game_letters-letter"
                                                    : "ahorcado__game-game_letters-letter-disabled"
                                            }`}
                                        >
                                            <h1>I</h1>
                                        </div>

                                        <div
                                            onClick={() => letterSelected("J")}
                                            className={`${
                                                game.availableLetters.includes(
                                                    "J"
                                                )
                                                    ? "ahorcado__game-game_letters-letter"
                                                    : "ahorcado__game-game_letters-letter-disabled"
                                            }`}
                                        >
                                            <h1>J</h1>
                                        </div>

                                        <div
                                            onClick={() => letterSelected("K")}
                                            className={`${
                                                game.availableLetters.includes(
                                                    "K"
                                                )
                                                    ? "ahorcado__game-game_letters-letter"
                                                    : "ahorcado__game-game_letters-letter-disabled"
                                            }`}
                                        >
                                            <h1>K</h1>
                                        </div>

                                        <div
                                            onClick={() => letterSelected("L")}
                                            className={`${
                                                game.availableLetters.includes(
                                                    "L"
                                                )
                                                    ? "ahorcado__game-game_letters-letter"
                                                    : "ahorcado__game-game_letters-letter-disabled"
                                            }`}
                                        >
                                            <h1>L</h1>
                                        </div>

                                        <div
                                            onClick={() => letterSelected("M")}
                                            className={`${
                                                game.availableLetters.includes(
                                                    "M"
                                                )
                                                    ? "ahorcado__game-game_letters-letter"
                                                    : "ahorcado__game-game_letters-letter-disabled"
                                            }`}
                                        >
                                            <h1>M</h1>
                                        </div>

                                        <div
                                            onClick={() => letterSelected("N")}
                                            className={`${
                                                game.availableLetters.includes(
                                                    "N"
                                                )
                                                    ? "ahorcado__game-game_letters-letter"
                                                    : "ahorcado__game-game_letters-letter-disabled"
                                            }`}
                                        >
                                            <h1>N</h1>
                                        </div>

                                        <div
                                            onClick={() => letterSelected("Ñ")}
                                            className={`${
                                                game.availableLetters.includes(
                                                    "Ñ"
                                                )
                                                    ? "ahorcado__game-game_letters-letter"
                                                    : "ahorcado__game-game_letters-letter-disabled"
                                            }`}
                                        >
                                            <h1>Ñ</h1>
                                        </div>

                                        <div
                                            onClick={() => letterSelected("O")}
                                            className={`${
                                                game.availableLetters.includes(
                                                    "O"
                                                )
                                                    ? "ahorcado__game-game_letters-letter"
                                                    : "ahorcado__game-game_letters-letter-disabled"
                                            }`}
                                        >
                                            <h1>O</h1>
                                        </div>

                                        <div
                                            onClick={() => letterSelected("P")}
                                            className={`${
                                                game.availableLetters.includes(
                                                    "P"
                                                )
                                                    ? "ahorcado__game-game_letters-letter"
                                                    : "ahorcado__game-game_letters-letter-disabled"
                                            }`}
                                        >
                                            <h1>P</h1>
                                        </div>

                                        <div
                                            onClick={() => letterSelected("Q")}
                                            className={`${
                                                game.availableLetters.includes(
                                                    "Q"
                                                )
                                                    ? "ahorcado__game-game_letters-letter"
                                                    : "ahorcado__game-game_letters-letter-disabled"
                                            }`}
                                        >
                                            <h1>Q</h1>
                                        </div>

                                        <div
                                            onClick={() => letterSelected("R")}
                                            className={`${
                                                game.availableLetters.includes(
                                                    "R"
                                                )
                                                    ? "ahorcado__game-game_letters-letter"
                                                    : "ahorcado__game-game_letters-letter-disabled"
                                            }`}
                                        >
                                            <h1>R</h1>
                                        </div>

                                        <div
                                            onClick={() => letterSelected("S")}
                                            className={`${
                                                game.availableLetters.includes(
                                                    "S"
                                                )
                                                    ? "ahorcado__game-game_letters-letter"
                                                    : "ahorcado__game-game_letters-letter-disabled"
                                            }`}
                                        >
                                            <h1>S</h1>
                                        </div>

                                        <div
                                            onClick={() => letterSelected("T")}
                                            className={`${
                                                game.availableLetters.includes(
                                                    "T"
                                                )
                                                    ? "ahorcado__game-game_letters-letter"
                                                    : "ahorcado__game-game_letters-letter-disabled"
                                            }`}
                                        >
                                            <h1>T</h1>
                                        </div>

                                        <div
                                            onClick={() => letterSelected("U")}
                                            className={`${
                                                game.availableLetters.includes(
                                                    "U"
                                                )
                                                    ? "ahorcado__game-game_letters-letter"
                                                    : "ahorcado__game-game_letters-letter-disabled"
                                            }`}
                                        >
                                            <h1>U</h1>
                                        </div>

                                        <div
                                            onClick={() => letterSelected("V")}
                                            className={`${
                                                game.availableLetters.includes(
                                                    "V"
                                                )
                                                    ? "ahorcado__game-game_letters-letter"
                                                    : "ahorcado__game-game_letters-letter-disabled"
                                            }`}
                                        >
                                            <h1>V</h1>
                                        </div>

                                        <div
                                            onClick={() => letterSelected("W")}
                                            className={`${
                                                game.availableLetters.includes(
                                                    "W"
                                                )
                                                    ? "ahorcado__game-game_letters-letter"
                                                    : "ahorcado__game-game_letters-letter-disabled"
                                            }`}
                                        >
                                            <h1>W</h1>
                                        </div>

                                        <div
                                            onClick={() => letterSelected("X")}
                                            className={`${
                                                game.availableLetters.includes(
                                                    "X"
                                                )
                                                    ? "ahorcado__game-game_letters-letter"
                                                    : "ahorcado__game-game_letters-letter-disabled"
                                            }`}
                                        >
                                            <h1>X</h1>
                                        </div>

                                        <div
                                            onClick={() => letterSelected("Y")}
                                            className={`${
                                                game.availableLetters.includes(
                                                    "Y"
                                                )
                                                    ? "ahorcado__game-game_letters-letter"
                                                    : "ahorcado__game-game_letters-letter-disabled"
                                            }`}
                                        >
                                            <h1>Y</h1>
                                        </div>

                                        <div
                                            onClick={() => letterSelected("Z")}
                                            className={`${
                                                game.availableLetters.includes(
                                                    "Z"
                                                )
                                                    ? "ahorcado__game-game_letters-letter"
                                                    : "ahorcado__game-game_letters-letter-disabled"
                                            }`}
                                        >
                                            <h1>Z</h1>
                                        </div>
                                    </>
                                ) : (
                                    // letters.split("").map((letter, index) => {
                                    //     return (
                                    //         <div
                                    //             key={index}
                                    //             onClick={() =>
                                    //                 letterSelected(letter)
                                    //             }
                                    //             className={`${
                                    //                 game.availableLetters.includes(
                                    //                     letter
                                    //                 )
                                    //                     ? "ahorcado__game-game_letters-letter"
                                    //                     : "ahorcado__game-game_letters-letter-disabled"
                                    //             }`}
                                    //         >
                                    //             <h1>{letter}</h1>
                                    //         </div>
                                    //     );
                                    // })
                                    
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
