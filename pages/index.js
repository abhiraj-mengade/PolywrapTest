import { ConnectWallet } from '@thirdweb-dev/react';
import CodeSnippet from '../components/DemoCodeSnippet';
import styles from '../styles/Home.module.css';
import { encrypt, decrypt, getresponse } from './util';
import { useEffect, useState } from 'react';

export default function Home() {
	const [joke, setJoke] = useState("");
	async function test() {
		// const res = await encrypt(["Hello"]);
		const res2 = await getresponse("https://v2.jokeapi.dev/joke/Any")
		// console.log(res2["setup"]); 
		setJoke(res2)

		console.log("hello");
		// console.log(res);
	}

	useEffect(() => {
		test();		
	}, []);


	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1>Connect Wallet Button</h1>
				<p style={{ marginBottom: 24 }}>
					Allow users to connect to your app with the wallet of their choice.
				</p>
			</div>

			<ConnectWallet
				theme='dark'
				dropdownPosition={{
					align: 'center',
					side: 'bottom',
				}}
			/>

			<hr className={`${styles.divider} ${styles.spacerTop}`} />

			<h2>Code Snippet</h2>

			<CodeSnippet
				text={joke}
			/>
		</div>
	);
}
