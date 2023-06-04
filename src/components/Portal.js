import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

function Portal({
                    node,
                    children
                }) {
    const defaultNode = useRef(null);
    useEffect(() => {
        return () => {
            if (defaultNode.current) {
                document.body.removeChild(defaultNode.current);
            }

            defaultNode.current = null;
        };
    }, []);

    if (!node && !defaultNode.current) {
        defaultNode.current = document.createElement('div');
        document.body.appendChild(defaultNode.current);
    }

    return /*#__PURE__*/createPortal(children, node || defaultNode.current);
}

export { Portal };