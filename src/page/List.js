import React, { useEffect, useState } from 'react';
import '../App.css';
import { getCollectionList } from '../service/Request';
import InfiniteScroll from 'react-infinite-scroller';
import { Card } from 'antd';
import { useHistory } from 'react-router-dom';
const { Meta } = Card;
const App = () => {
	const history = useHistory();
	const getCollection = async () => {
		setLoading(true);
		const { data } = await getCollectionList(offset);
		const newList = data.assets.map((el) => ({
			tokenId: el.token_id,
			name: el.name,
			image: el.image_url,
			contractAddress: el.asset_contract.address
		}));

		if (newList.length > 0) {
			setResult([...result, ...newList]);
			setOffset(offset + 20);
			setScrollToEnd(false);
			setLoading(false);
		} else {
			setHasMore(false);
		}
	};
	const [scrollToEnd, setScrollToEnd] = useState(true);
	const [offset, setOffset] = useState(0);
	const [hasMore, setHasMore] = useState(true);
	const [result, setResult] = useState([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		getCollection();
	}, [scrollToEnd]);
	return (
		<div className="App">
			<InfiniteScroll
				loadMore={() => {
					setScrollToEnd(true);
				}}
				className="result-container"
				hasMore={!loading || hasMore}
				loader={
					<div className="loader" key={0}>
						Loading ...
					</div>
				}
			>
				{result.map((el) => (
					<Card
						key={el.tokenId}
						onClick={() => {
							history.push(`${el.contractAddress}/${el.tokenId}`);
						}}
						hoverable
						className="card"
						cover={<img alt="avatar" src={el.image} style={{ width: '100%', height: '300px', objectFit: 'contain' }} />}
					>
						<Meta title={el.name} />
					</Card>
				))}
			</InfiniteScroll>
		</div>
	);
};

export default App;
