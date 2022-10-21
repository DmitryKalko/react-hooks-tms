const CatDetails = (props) => {
	const { catDetail } = props;
	const { bio, pic } = catDetail;
console.log(catDetail)
	return (
		<div>
			<div className='info'>
				<h1>Поздравляем!</h1>
				<h2>Вы приобрели:</h2>
				<br />
				<img src={`${props.url}${pic}`} alt='pic' />
				<p>{bio}</p>
			</div>
		</div>
	);
};

export default CatDetails;
