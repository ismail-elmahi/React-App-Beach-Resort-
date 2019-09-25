import React, { Component } from 'react';
// import items from './data';
import Client from './Contentfull';
 
const RoomContext = React.createContext();

class RoomProvider extends Component {
 
    state ={
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading : true,
        type: 'all',
        capacity: 1,
        price: 0 ,
        minPrice: 0 ,
        maxPrice: 0 ,
        minSize: 0 ,
        maxSize: 0 ,
        breakfast: false,
        pets:false

        
    };

    getData = async () => {
        try {
           let response = await Client.getEntries({
            // this is the id of the project name in contentfull
            content_type:"beachResort",
            order:"sys.createdAt"
        })

        console.log(response.items)
        let rooms = this.formatData(response.items);
        let featuredRooms = rooms.filter(room => room.featured === true);
        
        let maxPrice = Math.max(...rooms.map(item => item.price));
        let maxSize = Math.max(...rooms.map(item => item.size));
        
        this.setState({
            rooms,
            featuredRooms,
            sortedRooms: rooms,
            loading: false,
            price:maxPrice,
            maxPrice,
            maxSize
        });
        } catch (error) {
            console.log(error)
        }
        
    }

    componentDidMount(){
       this.getData()
         
    }
    
    formatData(items){
        let tempItems = items.map(item => {
            let id = item.sys.id;
            let images = item.fields.images.map(image => image.fields.file.url);
            let room = {...item.fields, images, id};
            return room ;
        });
        return tempItems
    }

    getRoom = slug => {
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find(room => room.slug === slug);
        return room;
    }

    handlerChange = event => {
        const target = event.target;
        const value = target.type === "checkbox" ? 
        target.checked : target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        },this.filterRooms);
    };

    filterRooms = () => {
// here we access to properties that we have in state 
        let{
           rooms, type, capacity, price, minSize, maxSize, breakfast, pets
        }= this.state
// here how we fltering rooms by type
        let tempRooms = [...rooms];
        if(type !== 'all'){
            tempRooms = tempRooms.filter(room => room.type === type);
        }
// filter by capacity 
        if(capacity !== 1) {
            tempRooms= tempRooms.filter(room => room.capacity >= capacity );
        } 
// filter by price 
    tempRooms= tempRooms.filter(room => room.price<= price );

// filter by size
 tempRooms= tempRooms.filter(room => room.size >= minSize && room.size <= maxSize);

// filter by breakfast
if(breakfast) {
    tempRooms= tempRooms.filter(room => room.breakfast === true);
} 
// filter by pets
if(pets) {
    tempRooms= tempRooms.filter(room => room.pets === true);
} 


 // here we update the state and send sortedrooms after fliter it to roomList component
        this.setState({
            sortedRooms:tempRooms
        })
 
    }

    render() {
        return (
            <RoomContext.Provider value={{...this.state,
             getRoom: this.getRoom,
             handlerChange: this.handlerChange}}>
                {this.props.children}
            </RoomContext.Provider>
        );
    }
}

const RoomConsumer = RoomContext.Consumer;

export {RoomProvider,RoomConsumer,RoomContext};