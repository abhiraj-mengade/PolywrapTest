import { ConnectWallet } from '@thirdweb-dev/react';
import { Sepolia } from "@thirdweb-dev/chains";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import CodeSnippet from '../components/DemoCodeSnippet';
import styles from '../styles/Home.module.css';
import { encrypt, decrypt, getresponse, uploadString, downloadString } from './util';
import { useEffect, useState, useRef } from 'react';
import { useUser, useAddress, useSigner } from "@thirdweb-dev/react";
import Image from 'next/image';

const contract_address = "0xaB694AB5624c65B816Cc65dda8619Ca6cCd4d953";
export default function Home() {
	const [joke, setJoke] = useState("");
	const [jdata, setJdata] = useState([]);
	const inputRef = useRef(null);
	const user  = useUser();
	const address  = useAddress();	
	const signer = useSigner();
	async function test() {
		let sdk;
		if(signer){

		 sdk = ThirdwebSDK.fromSigner(signer,Sepolia, {clientId: "842d83de2717af56d8d4df0e134f04ec"});
		 const contract = await sdk.getContract(contract_address);
		 let data = await contract.call("viewDataArray", []);
		 console.log(data);
		 setJdata(data);
		}
	
		// let data2 = await contract.call("addToDataArray", ["Test JOke1"], )
		// console.log(data2);
		// let data2 = await uploadString("Hello");
		// const res = await encrypt(["Hello"]);
		let res2 = await getresponse("https://v2.jokeapi.dev/joke/Any")
		res2 = await JSON.parse(res2);
		res2 = res2["setup"] + "\n" + res2["delivery"];

		// console.log(res2["setup"]); 
		setJoke(res2)

		console.log("hello");
		// console.log(res);
	}

	async function Add() {
		const sdk = ThirdwebSDK.fromSigner(signer,Sepolia, {clientId: "842d83de2717af56d8d4df0e134f04ec"});
		const contract = await sdk.getContract(contract_address);
		let data2 = await contract.call("addToDataArray", [inputRef.current.value], )
		console.log(data2);
		let data = await contract.call("viewDataArray", []);
		setJdata(data);
	}

	useEffect(() => {
		test();		
	}, [signer]);


	return (
		<div className={styles.container}>
			<div className={styles.header}>
			<Image src="/cat.png" alt="Wall" width={200} height={200} />
				<h1>Joke Wall</h1>
				{/* <h2>Connect Wallet</h2> */}
			</div>
			<ConnectWallet
				theme='dark'
				dropdownPosition={{
					align: 'center',
					side: 'bottom',
				}}


			/>

			<hr className={`${styles.divider} ${styles.spacerTop}`} />

			<h2>Today's Joke</h2>
			<CodeSnippet text={joke} />


			<h2> Add to the Wall</h2>
			{/* input using ref */}
			<input ref={inputRef} type="text" placeholder="Enter a joke" />
			<br />
			<button onClick={()=>Add()}>Add to the Wall</button>

			<h2>The Wall</h2>
			{jdata && jdata.map((item, index) => (
				<CodeSnippet key = {index} text={item} />
				))}
			
		</div>
	);
}
