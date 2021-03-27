import React, { useEffect, useState } from 'react';

import { getDetail } from '../service/Request';
import { Card } from 'antd';
import { useParams } from 'react-router-dom';
const { Meta } = Card;
const Detail = () => {
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
			<Card style={{ width: '100%' }} cover={<img alt="example" src={detail.imageUrl} />}>
				<Meta title={detail.name} description={detail.description} />
			</Card>
			<div>{detail.collectionName}</div>

			<div>{detail.name}</div>
			<div>{detail.description}</div>
			<div>{detail.permalink}</div>
		</div>
	);
};

export default Detail;
