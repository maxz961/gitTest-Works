import React, {Component} from 'react'
import './SearchItem.css'
import {connect} from 'react-redux'

class SearchItem extends Component {
    state = {
        term: ''
    }

    onChange = (e) => {
        const term = e.target.value
        this.setState({ term })
        this.props.SearchItem(term)
    }


    render() {
        return (
            <div className="search__item">
                <form className="form-groupe" onSubmit={e => e.preventDefault()}>
                    <div className="ui search">
                        <div className="ui icon input">
                            <input className="prompt" type="text" placeholder="Search..." id="term"
                            value={this.state.term}
                            onChange={this.onChange} />
                                <i className="search icon"></i>
                        </div>
                        <div className="results"></div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        SearchItem: (term) => {dispatch({ type: 'SEARCH_ITEM', term: term})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchItem)