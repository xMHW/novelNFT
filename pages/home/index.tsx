import { useEvmNativeBalance } from '@moralisweb3/next';
import { Input, Space } from 'antd';
import { useState } from 'react';

function GetBalance(props) {
    const {address} = props;
    const { data: nativeBalance } = useEvmNativeBalance({ address });
    return (
        <h3>Native Balance: {nativeBalance?.balance?.ether} ETH</h3>
    )
}

export default function Home() {
    const [address, setAddress] = useState<string>("");

    return (
        <div>
            <Space.Compact style={{ width: '100%' }}>
                <Input placeholder="MetaMask Address" onChange={(evt) => {setAddress(evt.target.value)}} />
            </Space.Compact>
            <h3>Wallet: {address}</h3>
            {GetBalance({address})}
        </div>
    );
}
