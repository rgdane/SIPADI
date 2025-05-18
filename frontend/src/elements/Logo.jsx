import logo from '../assets/kejayan.PNG';

export default function Logo({ collapsed }){
    return (
        <div
            style={{
                height: 64,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'start',
                padding: '0 24px',
            }}
            >
            <img
                src={logo}
                alt="kejayan"
                style={{ height: 32 }}
            />
            {!collapsed && (
                <span
                    style={{
                        marginLeft: 12,
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: '#000',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        display: 'inline-block',
                        verticalAlign: 'middle',
                        transition: 'opacity 0.3s ease, max-width 0.3s ease',
                        opacity: collapsed ? 0 : 1,
                        maxWidth: collapsed ? 0 : 200,
                    }}
                >
                    SIPADI
                </span>
            )}
            </div>
    )
}