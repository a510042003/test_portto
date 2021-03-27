import React, { useEffect, useState } from 'react';

import { getDetail } from '../service/Request';
import { Button } from 'antd';
import { useParams, useHistory } from 'react-router-dom';

const Detail = () => {
	const history = useHistory();
	const { contractAdress, tokenId } = useParams();
	const [detail, setDetail] = useState({});
	const getDetailRequest = async () => {
		const { data } = await getDetail(contractAdress, tokenId);

		setDetail({
			collectionName: data.collection.name,
			imageUrl: data.image_url,
			description: data.description,
			name: data.name,
			permalink: data.permalink
		});
	};
	useEffect(() => {
		getDetailRequest();
	}, []);
	return (
		<div className="App">
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					padding: '10px 20px',
					justifyContent: 'space-between',
					width: '100%'
				}}
			>
				<Button
					onClick={() => {
						history.goBack();
					}}
				>
					{'<'}
				</Button>

				<div>{detail.collectionName}</div>
				<div style={{ width: 40 }}></div>
			</div>
			<img alt="avatar" src={detail.imageUrl} style={{ width: '100%', height: '300px', objectFit: 'contain' }} />

			<div style={{ fontSize: 20 }}>{detail.name}</div>
			<div>{detail.description}</div>

			<Button
				type={'primary'}
				style={{ position: 'fixed', bottom: 20 }}
				onClick={() => {
					window.open(detail.permalink, '_blank');
				}}
			>
				Permalink
			</Button>
		</div>
	);
};

export default Detail;
