import { Html, Main, NextScript , Head} from 'next/document'

export default function Documents() {
	return (
		<Html>
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
				<link href="https: //fonts.googleapis.com/css2?family= família= Roboto:wght@400;700 & display=swap" rel="stylesheet" />
			</Head>
			<body className='bg-gray-900'>
				<Main/>
				<NextScript />
			</body>
		</Html>
	)
}