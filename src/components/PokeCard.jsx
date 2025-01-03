import { useLoaderData, Form, Link } from "react-router";
import {useDispatch, useSelector} from "react-redux";

const PokeCard =(obj) => {
    const dispatch =useDispatch();
    const notes2=obj.notes2;
    console.log(notes2);
    const cart = useSelector((storeState)=>storeState.cart);
    return(
        <ul className="flex flex-row flex-wrap">
            {notes2.map((note) => (
                <div key={note.name} className="w-1/5 h-56 border-2">
                    <li className="text-3xl text-center">{note.name.charAt(0).toUpperCase() + note.name.slice(1)}</li>
                    <div className="h-4/6 content-evenly">
                        <img src={note.sprites.other.showdown.front_default}></img>
                    </div>
                    
                    <Link to={`/pokemon/${note.name}`}>
                        <button><img className="w-10" src="https://static.vecteezy.com/system/resources/previews/005/747/906/non_2x/info-icon-template-information-icon-colorful-free-vector.jpg" alt="" /></button>
                    </Link>
                    <button onClick={() => {
                                            const type1= cart.some((e1)=>e1.name==note.name)? "cart/removeFromCart": "cart/addToCart";
                                            dispatch({type:type1, payload: note});
                                            //console.log(cart);
                                            }}>
                                                <img className="w-10" src={ cart.some((e1)=>e1.name==note.name)?"https://cdn-icons-png.freepik.com/256/7219/7219095.png?semt=ais_hybrid":"https://www.iconpacks.net/icons/2/free-heart-icon-3510-thumb.png"} alt="" />
                                            </button>

                </div>
            ))}
        </ul>
    )
}

export default PokeCard;