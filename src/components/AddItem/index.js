import React, {Component} from 'react'
import './AddItem.css'
import {connect} from 'react-redux'
import { Dropdown, Input } from 'semantic-ui-react'

class AddItem extends Component {
    constructor(props) {
    super(props)

    this.initialState = {
        options: [
            { key: '+380', text: '+380', value: '+380' },
            { key: '+7', text: '+7', value: '+7' },
            { key: '+375', text: '+375', value: '+375' },
          ],
        value: '+380',
        name: '',
        last: '',
        company: '',
        phone: '',
        avatar: '',
        email: '',
        isBlockName: false,
        isBlockLast: false,
        isBlockCompany: false,
        isBlockPhone: false,
        isBlockEmail: false
      }

    this.state = this.initialState;
    }

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }


    closeBlock = e => {
        this.setState(this.initialState)
        this.props.closeItem()
    }

    handleChange = (e, { value }) => this.setState({ value })

    handleSubmit = e => {
        const {name, last, phone, company, email} = this.state
        const validPhone = phone.match(/[^\d]/,'')
        const validEmail = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        if(name.length === 0)
            this.setState({ isBlockName: true})
        if(last.length === 0)
            this.setState({ isBlockLast: true})
        if(company.length === 0)
            this.setState({ isBlockCompany: true})
        if(phone.length >= 0 || phone.length < 9 || validPhone !== null) {
            this.setState({ isBlockPhone: true})
        }
        if(email.length === 0 || validEmail === null)
            this.setState({ isBlockEmail: true})


        if(name.length > 0)
            this.setState({ isBlockName: false})
        if(last.length > 0)
            this.setState({ isBlockLast: false})
        if(company.length > 0)
            this.setState({ isBlockCompany: false})
        if(phone.length === 9 && validPhone === null)
            this.setState({ isBlockPhone: false})
        if(email.length > 0 && validEmail !== null)
            this.setState({ isBlockEmail: false})

        if(name.length > 0 && last.length > 0 && company.length > 0 && phone.length === 9 && email.length > 0 && validEmail !== null && validPhone === null) {
        this.props.AddItem(this.state)
        this.props.closeItem()
        this.setState(this.initialState)
        }
    }

    render() {
        const style = {border: 'LightGray 1px solid'}
        const {name, last, avatar, phone, company, email, isBlockName, isBlockLast, isBlockCompany, isBlockPhone, isBlockEmail, value, options} = this.state
        return (
            <div className="fixed-overlay">
            <div className="divmodal">
            <div className="add__item">
                    <div className="ui error message" style={{display: isBlockName ? 'block' : 'none'}}>
                        <p>Поле <b>FirstName</b> обязательно к заполнению</p>
                    </div>
                    <div className="ui error message" style={{display: isBlockLast ? 'block' : 'none'}}>
                        <p>Поле <b>LastName</b> обязательно к заполнению</p>
                    </div>
                    <div className="ui error message" style={{display: isBlockCompany ? 'block' : 'none'}}>
                        <p>Поле <b>Company</b> обязательно к заполнению</p>
                    </div>
                    <div className="ui error message" style={{display: isBlockPhone ? 'block' : 'none'}}>
                        <p>Поле <b>Phone</b> обязательно к заполнению и должно иметь 9 цифр</p>
                    </div>
                    <div className="ui error message" style={{display: isBlockEmail ? 'block' : 'none'}}>
                        <p>Поле <b>Email</b> обязательно к заполнению</p>
                    </div>
                <form className="ui form" onSubmit={e => e.preventDefault()}>
                <div className="field">
                    <label htmlFor="name"><h2>Добавление контакта:</h2></label>
                    <div className="two fields">
                    <div className={isBlockName ? 'field error' : 'field'} >
                        <input maxLength="15" type="text" value={name} placeholder="First Name" id="name" onChange={this.onChange}/>
                    </div>
                    <div className={isBlockLast ? 'field error' : 'field'}>
                        <input maxLength="15" type="text" value={last} placeholder="Last Name" id="last" onChange={this.onChange}/>
                    </div>
                    </div>

                    <div className="two fields">
                    <div className={isBlockCompany ? 'field error' : 'field'}>
                        <input maxLength="15" type="text" value={company} placeholder="Company" id="company" onChange={this.onChange}/>
                    </div>
                    <div className={isBlockPhone ? 'field error' : 'field'}>
                        <Input maxLength="9" onChange={this.onChange} value={phone} type="text" id="phone"
                                label={<Dropdown style={style} onChange={this.handleChange} options={options} value={value}/>}
                                labelPosition='left'
                                placeholder='Phone'
                            />
                    </div>
                    </div>

                    <div className={isBlockEmail ? 'field error' : 'field'}>
                    <input maxLength="25" type="text"  value={email} placeholder="Email" id="email" onChange={this.onChange}/>
                    </div>

                    <div className="field">
                    <input type="text" value={avatar} placeholder="Img Url" id="avatar" onChange={this.onChange}/>
                    </div>
                    <button className="ui red button" onClick={this.closeBlock}>Отмена</button>
                    <button className="ui blue button" onClick={this.handleSubmit}>Добавить</button>
                    </div>
                </form>
            </div>
            </div>
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
        AddItem: (name) => {dispatch({ type: 'ADD_ITEM', name: name})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddItem)