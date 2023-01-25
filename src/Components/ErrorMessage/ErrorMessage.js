import "./ErrorMessage.css"

export default function ErrorMessage({children}) {
    return (
        <div className="error-container">
            <h2>{children}</h2>
        </div>
    );
}