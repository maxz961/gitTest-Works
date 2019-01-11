import React, {Component} from 'react'
import {connect} from 'react-redux'
import ChangeItem from '../ChangeItem'
import './ListItem.css'

class ListItem extends Component {

    state = {
        id: '',
        isBlock: false,
        title: ''
    }

    ChangeItem = index => {
        this.setState(state => ({
            id: index,
            isBlock: true,
            title: this.props.data[parseInt(index) - 1]
        }))
    }

    deleteItem = (id) => {
        this.props.deleteData(id)
    }

    closeItem = () => {
        this.setState(state => ({
            isBlock: false
        }))
    }

render() {
    const { id, isBlock, title } = this.state
    const item = this.props.data.map((item) => {
        return <div className="item" key={item.id}>
                        <div className="image" style={{width: '65px'}}>
                            <img src={item.avatar} alt=""/>
                        </div>
                        <div className="content">
                            <div className="name__class">{item.name} {item.last}</div>

                            <div className="phone__class"><b>Phone:</b> {item.value}{item.phone}</div>
                            
                            <div className="info__class"><span><b>Company:</b>  {item.company} <b>Email:</b>  {item.email}</span></div>
            </div>
        <button className="ui blue button mini" onClick={() => this.ChangeItem(item.id)}><i className="material-icons">edit</i></button>  
        <button className="ui red button mini" onClick={() => this.deleteItem(item.id)}><i className="material-icons">delete_outline</i></button>
        </div>

    })
    return (
        <div className="list__item">
        <div className="toogle__elem" style={{display: isBlock ? 'block' : 'none'}}><ChangeItem id={id} title={title} closeItem={this.closeItem}/></div>
        <div className="ui items aligned selection list">
            {item}
        </div>
        </div>
    )
}
}

const mapStateToProps = (state) => {
    return {
        data: state.works
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteData: (id) => {dispatch({type: 'DELETE_DATA', id: id})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItem)
