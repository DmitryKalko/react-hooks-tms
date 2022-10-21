// теоретически useEffect
// == componentDidMount(если массив зависимостей пустой)
// == componentDidUpdate(если массив зависимостей не пустой или его нет - тогда следить будет за всеми изменениями)
// == componentWillUnmount(если return что-то, например отписка от события)

import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./catApp.module.css";
import CatList from "./components/CatList";

import CatDetails from "./components/CatDetails";

import FormForCat from "./components/FormForCat";

import Example1 from "./components/HOCexample/Example1";
import Example2 from "./components/HOCexample/Example2";
import Example3 from "./components/HOCexample/Example3";

import ClassRefExample from './components/REFexample/ClassRefExample';
import FuncRefExample from './components/REFexample/FuncRefExample';

import ClassContext from './components/CONTEXTexample/ClassContext';
import FuncContext from './components/CONTEXTexample/FuncContext';

const url = "https://serene-mesa-35124.herokuapp.com/files";

// class CatApp extends React.Component {

const CatApp = () => {
	// state = {
	//   cats: null,
	// 	selectedCat: null,
	// 	catDetail: null,
	// }

	const [cats, setCats] = useState(null);
	const [selectedCat, setSelectedCat] = useState(null);
	const [catDetail, setCatDetail] = useState(null);

	// под капотом вот это
	// constructor(props) {
	//   super(props);
	//   this.state = {cats: data};
	// }

	// componentDidMount() {
	// 	axios.get(`${url}/cats/list.json`)
	// 	.then((response) => {
	// 		const cats = response.data.data;
	// 		this.setState({cats})
	// 	})
	// }

	// работает как componentDidMount
	useEffect(() => {
		axios.get(`${url}/cats/list.json`).then((response) => {
			const cats = response.data.data;
			//this.setState({ cats });

			setCats(cats);
		});
	}, []);

	// componentDidUpdate(prevProps, prevState) {
	// 	console.log(prevState)
	// 	if(this.state.selectedCat !== prevState.selectedCat) {
	// 		this.fetchData(this.state.selectedCat);
	// 	}
	// }

	// работает как componentDidUpdate
	useEffect(() => {
		if(selectedCat !== null) {
			fetchData(selectedCat);
		}
	}, [selectedCat]);


	// работает как componentWillUnmount
	useEffect(() => {
		return () => {
			console.log("will unmount");
		};
	}, []);



	const fetchData = (path) => {
		console.log("fetch");

		axios.get(`${url}${path}`).then((response) => {
			const catDetail = response.data;
			console.log(catDetail);
			//this.setState({ catDetail });
			setCatDetail(catDetail);
		});
	};

	const toBuy = (id) => {
		const selectedCat = cats.filter((cat) => {
			if (cat.id === id) {
				return cat;
			}
			return null;
		});
		console.log(selectedCat);
		//this.setState({selectedCat: selectedCat[0]});
		//this.setState({ selectedCat: selectedCat[0].more });

		setSelectedCat(selectedCat[0].more);
	};

	// render() {
	//   const {cats, catDetail} = this.state;
	// 	console.log(catDetail)

	if (!cats) {
		return <h1>ЗАГРУЗКА</h1>;
	}
	return (
		<div className={styles.app}>
			<div className={styles.mainBlock}>
				<CatList cats={cats} toBuy={toBuy} />

				{catDetail && (
					<>
						<CatDetails catDetail={catDetail} url={url} />
					</>
				)}
			</div>

			<br />
			<FormForCat />
			<Example1 />
			<br />
			<Example2 />
			<br />
			<Example3 />
			<br />
			<ClassRefExample />
			<br />
			<FuncRefExample />
			<br />
			<ClassContext />
			<br />
			<FuncContext />
			<br />
		</div>
	);
};

export default CatApp;
