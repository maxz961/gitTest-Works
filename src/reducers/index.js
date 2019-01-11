const initState = {
    data: [
        {id: '1', name: 'Vasya', last: 'Serg', company: 'Apple', email: 'apple@gmail.com', value: '+380', phone: '931212222', avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/kevinoh/128.jpg"},
        {id: '2', name: 'Sanya', last: 'Merg', company: 'Intel', email: 'intel@gmail.com', value: '+380', phone: '931313333', avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/andysolomon/128.jpg"}
    ],
    works: [
        {id: '1', name: 'Vasya', last: 'Serg', company: 'Apple', email: 'apple@gmail.com', value: '+380', phone: '931212222', avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/kevinoh/128.jpg"},
        {id: '2', name: 'Sanya', last: 'Merg', company: 'Intel', email: 'intel@gmail.com', value: '+380', phone: '931313333', avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/andysolomon/128.jpg"}
    ]
}



const rootReducer = (state = initState, action) => {
    
    if(action.type === 'SEARCH_ITEM') {
        if(action.term.length === 0) 
        return {
            data: state.data,
            works: state.data
        }

            if(action.term.length > 0) {
        const newData = state.works.filter((dat) => {
            return dat.name.indexOf(action.term) > -1
        })
        return {
            data: state.data,
            works: newData
        }
    }
    }

    if(action.type === 'DELETE_DATA') {
        let newData = state.data.filter((dat) => {
            return action.id !== dat.id
        })
        return {
            data: newData,
            works: newData
        }
    }
    if(action.type === 'ADD_ITEM') {
        if(state.data.length > 0) 
        action.name.id = parseInt(state.data[state.data.length - 1].id) + 1
        else 
        action.name.id = 1
        if(action.name.avatar.length === 0)
        action.name.avatar = 'http://www.fn4m.org/executive-committee/img/hs.jpg'
        let newData = [...state.data, action.name]
        return {
            data: newData,
            works: newData
        }
    }
    if(action.type === 'CHANGE_ITEM') {
        if(action.name.avatar.length === 0)
        action.name.avatar = 'http://www.fn4m.org/executive-committee/img/hs.jpg'
        if(state.data.length > 0) {
        const {name, last, avatar, company, phone, email, value} = action.name
        const oldItem = state.data[action.name.id-1]
        const newItem = {...oldItem, name, last, company, phone, avatar, email, value}
        const newData = [
            ...state.data.slice(0, action.name.id-1),
            newItem,
            ...state.data.slice(action.name.id)
        ]
        return {
            data: newData,
            works: newData
        }
    }
    }
    return state;
}

export default rootReducer