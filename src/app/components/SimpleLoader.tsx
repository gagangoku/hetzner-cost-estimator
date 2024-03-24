import dynamic from 'next/dynamic';
import { useEffect, useState } from "react";


class Props {
    text?: string;
    numMs?: number;
    maxDots?: number;
    className?: string;
}
const SimpleLoader = (props: Props) => {
    const DEFAULT_TIMER_MS = 200;
    const DEFAULT_TEXT = 'Loading';
    const DEFAULT_NUM_DOTS = 5;
    const [counter, setCounter] = useState<number>(0);

    const incrFn = () => {
        const nDots = props.maxDots || DEFAULT_NUM_DOTS;
        const newC = (counter + 1) % nDots;
        console.debug('incrFn called: ', { counter, nDots, newC });
        setCounter(newC);
    };
    useEffect(() => {
        const timeMs = props.numMs || DEFAULT_TIMER_MS;
        setTimeout(incrFn, timeMs);
    }, [counter]);

    const cls = props.className || 'text-sm font-bold';
    return (
        <>
            <div className={cls}>{props.text || DEFAULT_TEXT} {Array.from(Array(counter)).map(x => '.').join('')}</div>
        </>
    );
};

export default dynamic(() => Promise.resolve(SimpleLoader), { ssr: false });
