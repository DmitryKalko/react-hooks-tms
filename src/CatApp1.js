import React from 'react';
import axios from 'axios';
import styles from './catApp.module.css';
import CatList from './components/CatList'

import CatDetails from './components/CatDetails';

import FormForCat from './components/FormForCat';

import Example1 from './components/HOCexample/Example1';
import Example2 from './components/HOCexample/Example2';
import Example3 from './components/HOCexample/Example3';

const url = 'https://serene-mesa-35124.herokuapp.com/files';

class CatApp extends React.Component {
  state = {
    cats: null,
		selectedCat: null,
		catDetail: null,
  }
  // под капотом вот это
  // constructor(props) {
  //   super(props);
  //   this.state = {cats: data};
  // }

	componentDidMount() {
		axios.get(`${url}/cats/list.json`)
		.then((response) => {
			const cats = response.data.data;
			this.setState({cats})
		})
	}

	componentDidUpdate(prevProps, prevState) {
		console.log(prevState)
		if(this.state.selectedCat !== prevState.selectedCat) {
			this.fetchData(this.state.selectedCat);
		}
	}

	fetchData = (path) => {
		console.log('fetch');

		axios.get(`${url}${path}`)
		.then((response) => {
			const catDetail = response.data;
			console.log(catDetail)
			this.setState({catDetail});
		})
	}

	toBuy = (id) => {
    const selectedCat = this.state.cats.filter((cat) => {
      if (cat.id === id) {
        return cat;
      }   
			return null 
    });
    console.log(selectedCat);
    //this.setState({selectedCat: selectedCat[0]}); 
		this.setState({selectedCat: selectedCat[0].more})

  }

  render() {
    const {cats, catDetail} = this.state;
		console.log(catDetail)
	
		if(!cats) {
			return <h1>ЗАГРУЗКА</h1>
		}
    return (
			<div className={styles.app}>
				<div className={styles.mainBlock}>
					<CatList cats={cats} toBuy={this.toBuy}/>

					{catDetail && (
							<>
								<CatDetails catDetail={catDetail} url={url}/>
							</>
						)}
				</div>


				<br/>
					<FormForCat />
					<Example1/>
					<br/>
					<Example2/>
					<br/>
					<Example3/>
					<br/>
			</div>	
    )
  }
}

export default CatApp;
