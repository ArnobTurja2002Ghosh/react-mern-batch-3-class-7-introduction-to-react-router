//import {useDispatch} from "react-redux";
import { useFetch } from "../hooks/useFetch";
import { useParams } from "react-router";

const PostDetails = () => {
	const { name } = useParams();
	const { data: post } = useFetch(
		null,
		`https://pokeapi.co/api/v2/pokemon/${name}`,
	);

	//const dispatch =useDispatch();
	return (
		<div>
			<h2 className="text-xl">Pokemon Name - {post?.name.charAt(0).toUpperCase() + post?.name.slice(1)}</h2>
			<img className="h-80" src={post?.sprites.other.home.front_default}></img>
            <div>Abilities:</div>
            <ul className="list-disc">
                {post?.abilities.map((ability1)=>(
                    <li className="ml-10" key={ability1.ability.url}>{ability1.ability.name}</li>
                ))}
            </ul>
            <div>Types</div>
            <ul className="list-disc">
                {post?.types.map((ability1)=>(
                        <li className="ml-10" key={ability1.type.url}>{ability1.type.name}</li>
                    ))}
            </ul>
            <div className="ml-52">Base Stats</div>
            <table className="ml-52">
            <tbody>
                {post?.stats.map((ability1)=>(
                        <tr key={ability1.stat.name}><td>{ability1.stat.name}</td><td>{ability1.base_stat}</td></tr>
                    ))}
            </tbody>
            </table>
		</div>
	);
};

export default PostDetails;