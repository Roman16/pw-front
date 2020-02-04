import {useEffect} from 'react';

const useScript = ({url = false, funk}) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.async = true;

        if (url) {
            script.src = url;
        } else if (funk) {
            script.innerHTML = funk
        }

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, [url]);
};

export default useScript;