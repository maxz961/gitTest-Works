import React, { Component } from 'react';
import ListItem from './components/ListItem'
import AddItem from './components/AddItem'
import SearchItem from './components/SearchItem'
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import {connect} from 'react-redux'



class App extends Component {

  state = { isBlock: false }


  handleClick = () => {
    this.setState(state => ({
      isBlock: true
    }))
    
  }

  closeItem = () => {
    this.setState(state => ({
      isBlock: false
    }))  
  }


  render() {
    const style = {marginTop: '20px'}
    const {isBlock} = this.state
    return (
      <div className="App">
      <SearchItem />
      <button className="ui blue button" style={style} onClick={() => this.handleClick()}>Добавить контакт</button>
      <div className="toogle__elem" style={{display: isBlock ? 'block' : 'none'}}><AddItem closeItem={this.closeItem} /></div>
       <div><ListItem /></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      data: state.data
  }
}

export default connect(mapStateToProps)(App);
