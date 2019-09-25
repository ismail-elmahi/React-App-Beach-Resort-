import React from 'react';
import {useContext} from 'react';
import {RoomContext} from '../Context';
import Title from '../Components/Title'; 


const getUnique =(items,value) => {
    return [...new Set(items.map(item => item[value]))]
}
const RoomFilter = ({rooms}) => {

    const context = useContext(RoomContext);
    
    const {
        handlerChange,
        type,
        capacity,
        price,
        minPrice,
        maxPrice,
        minSize,
        maxSize,
        breakfast,
        pets
    } = context
    // get unique types
 let types = getUnique(rooms,'type')
 // add all 
 types = ['all', ...types];
 types = types.map((item,index) => (
     <option value={item} key={index}> {item} </option>
 ));
 
 let people = getUnique(rooms,'capacity')
 people = people.map((item,index) => (
     <option value={item} key={index}> {item} </option>
 ));

    return (
        <section className="filter-container">
            <Title title="search rooms" />
            <form className="filter-form">
                {/* select type */}
                <div className="form-group">
                <label htmlFor="type">room type </label>
                <select 
                name="type"
                id="type"
                value={type}
                className="form-control"
                onChange={handlerChange}
                >
                    {types}
                </select>
                </div>
                {/* end select type */}
                {/* select guesst */}
                <div className="form-group">
                <label htmlFor="capacity">Guests</label>
                <select 
                name="capacity"
                id="capacity"
                value={capacity}
                className="form-control"
                onChange={handlerChange}
                >
                    {people}
                </select>
                </div>
                {/* end select guesst */}
                {/*  price */}
                <div className="form-group">
                    <label htmlFor="price">
                        room price ${price}
                    </label>
                    <input type="range" name="price" min={minPrice}
                    max={maxPrice} id="price" value={price} onChange={handlerChange}
                    className="form-control rangestyle" />

                </div>
                {/* end price */}
                {/* Size */}
                <div className="form-group">
                    <label htmlFor="size">room size</label>
                    <div className="size-inputs">
                        <input type="number" name="minSize" id="size"
                        value={minSize} onChange={handlerChange} className="size-input" />
                       <input type="number" name="maxSize" id="size"
                        value={maxSize} onChange={handlerChange} className="size-input" />
                    </div>
                </div>
                {/* end size */}
                {/* extras */}
                <div className="form-group">
                   <div className="single-extra">
                       <input type="checkbox" name="breakfast" 
                        id="breakfast" checked={breakfast}
                        onChange={handlerChange} />
                        <label htmlFor="breakfast">breakfast</label>
                   </div> 
                   <div className="single-extra">
                       <input type="checkbox" name="pets" 
                        id="pets" checked={pets}
                        onChange={handlerChange} />
                        <label htmlFor="pets">pets</label>
                   </div> 
                </div>
                {/* end extras */}
            </form>
        </section>
    );
};

export default RoomFilter;