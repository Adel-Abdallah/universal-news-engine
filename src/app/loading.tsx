export default function Loading() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            position: 'fixed',
            top: 0,
            left: 0,
            backgroundColor: 'var(--bg, #f5f5f5)', /* Fallback if var not ready */
            zIndex: 9999
        }}>
            <div className="loading-spinner"></div>
        </div>
    );
}
