import React from 'react';
import RoomFilter from './RoomFilter';
import RoomList from './RoomList';
import {RoomConsumer} from '../Context';
import Loading from './Loading';

const RoomContainer = () => {
    return (
        <RoomConsumer>
         {
             value => {
                 const {loading, sortedRooms, rooms } = value;

                 if(loading) {
                     return <Loading />
                 }

                 return (
                    <div>
                   
                    <RoomFilter rooms={rooms}/>
                    <RoomList rooms={sortedRooms} />
                </div>
                 )
             }
         }
        </RoomConsumer>
    );
};

export default RoomContainer;