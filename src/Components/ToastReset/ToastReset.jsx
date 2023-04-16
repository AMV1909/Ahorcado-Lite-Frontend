import { toast } from "react-hot-toast";
import "./ToastReset.css";

export function ToastReset({ t, socket }) {
    return (
        <div className="ahorcado__toastReset">
            <p>¿Estás seguro de querer reiniciar el juego?</p>
            <div className="ahorcado__toastReset-buttons">
                <button onClick={() => toast.dismiss(t.id)}>Cancel</button>
                <button
                    onClick={() => {
                        socket.emit("resetGame");
                        toast.dismiss(t.id);
                    }}
                >
                    Reiniciar
                </button>
            </div>
        </div>
    );
}
