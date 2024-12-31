import React, { useEffect, useState } from "react";
import { useLoaderData, Form, Link } from "react-router";
import { useSelector } from "react-redux";
import {useDispatch} from "react-redux";
const Favourites = () => {
    const cart = useSelector((storeState)=>storeState.cart);
    const dispatch =useDispatch();
    //console.log(cart);
    return <div className="all-notes">
                <h2>All Favourites</h2>
                <ul>
                    {cart.map((note) => (
                        <div key={note.name}>
                            <li>{note.name}</li>
                            <img src={note.sprites.other.showdown.front_default}></img>
                            <Link to={`/pokemon/${note.name}`}>
                                <button>View Details</button>
                            </Link>
                            <button onClick={() => dispatch({type:'cart/removeFromCart', payload: note})}>Remove from Fav</button>
        
                        </div>
                    ))}
                </ul>
            </div>
}

export default Favourites;