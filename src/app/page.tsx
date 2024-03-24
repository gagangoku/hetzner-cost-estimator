'use client';
import { estimateCost } from "@/lib/cost";
import { useEffect, useState } from "react";
import SimpleLoader from "./components/SimpleLoader";
import githubIcon from '../../public/github-mark.svg';
import Image from 'next/image';


const Home = () => {
    const [key, setKey] = useState('');
    const [price, setPrice] = useState('-');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const ret = getKeyFromLS();
        console.log('setting key as: ', ret);
        setKey(ret);
    }, []);

    const getKeyFromLS = () => {
        return window.localStorage[LOCALSTORAGE_KEY] || '';
    };
    const saveKeyToLS = (value: string) => {
        window.localStorage[LOCALSTORAGE_KEY] = value;
    };

    const onClickFn = async () => {
        if (!key) {
            window.alert('key is must');
            return;
        }

        saveKeyToLS(key);
        setLoading(true);
        setPrice('-');
        const p = await estimateCost(key);
        setPrice('' + p + ' €');
        setLoading(false);
    };

    return (
        <div>
            <main className="flex min-h-screen flex-col p-5">
                <div className="text-2xl">Cost estimator for Hetzner cloud</div>
                <div className="flex flex-row mt-4">
                    <div className="">API key</div>
                    <input className="ml-4 px-2 text-sm" type="text" value={key} onChange={(event) => setKey(event.target.value)}
                        placeholder="  your Hetzner cloud api key"
                        style={{ borderBottom: '1px solid #a0a0a0', borderRadius: 0, outline: 'none', width: 400, maxWidth: 800, color: '#505050' }} />
                </div>
                <button className="px-4 py-1 mt-4" style={{ width: 200, background: 'blue', color: 'white', borderRadius: 2 }} onClick={onClickFn}>
                    Get Estimate
                </button>

                <div className="mt-4 text-sm">
                    Your monthly bill estimate (without VAT): <b>{loading ? <SimpleLoader /> : price}</b>
                </div>
                <div className="flex flex-col mt-8">
                    <div className="mb-2 text-lg">FAQs</div>
                    <div className="text-sm" style={{ color: '#505050' }}>
                        <div className="">&bull; This tool uses your API key to get the current running servers & volumes</div>
                        <div className="">&bull; We only look at your current running servers, not the ones you have launched in the past</div>
                    </div>
                </div>

                <div className="mt-12">
                    <a className="text-xs flex flex-row items-center" href="https://github.com/gagangoku/hetzner-cost-estimator" target="_blank">
                        <Image className="mr-2" alt='github' src={githubIcon} height={20} width={20} />
                        See the source code
                    </a>
                </div>
            </main>
        </div>
    );
};

const LOCALSTORAGE_KEY = 'hetzer_key';

export default Home;
