import { useLoaderData, Form, Link } from "react-router";
import React, { useEffect, useState } from "react";
import { Switch } from '@headlessui/react'
import {useDispatch} from "react-redux";
const Notes = () => {
	const notes = useLoaderData();

	const dispatch =useDispatch();

	const [searchTerm, setSearchTerm] = useState("");
	const [sortNames, setSortNames] =useState(false);
	

	const filteredPokemonList = notes.filter((pokemon) =>
		pokemon.name.includes(searchTerm)
	);
	
	console.log(filteredPokemonList);
	const notes1= filteredPokemonList.length >0? filteredPokemonList:notes;
	if(sortNames)
	{
		notes1.sort(function (a, b) {
			if (a.name < b.name) {
			  return -1;
			}
			if (a.name > b.name) {
			  return 1;
			}
			return 0;
		  });
	}
	
	//notes.map((note) => {console.log(note.sprites.other.home);});
	return (
		<div  className="">
			<div className="search-container">
				<input className="search-box" type="text" placeholder="Search..." 
				value={searchTerm} 
				onChange={event => {
					setSearchTerm(event.target.value);
				}}
				/>
			</div>
			
			<div>
				<h2>{notes1.length} Pokemons</h2>
				<button onClick={() => {console.log("sorting");
									setSortNames(!sortNames);
									
				}}>Sort by name</button> 
				<ul className="flex flex-row flex-wrap">
					{notes1.map((note) => (
						<div key={note.name} className="w-1/5 h-56 border-2">
							<li className="text-2xl text-center">{note.name.charAt(0).toUpperCase() + note.name.slice(1)}</li>
							<div className="h-4/6 content-evenly">
								<img src={note.sprites.other.showdown.front_default}></img>
							</div>
							
							<Link to={`/pokemon/${note.name}`}>
								<button>View Details</button>
							</Link>
							<button onClick={() => dispatch({type:'cart/addToCart', payload: note})}>Add to Fav</button>
        	
						</div>
					))}
				</ul>
			</div>
		</div>
	);
};

export const loader = async () => {
	const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
	const data = await res.json();
	console.log(data.results);
	
	const responses = await Promise.all(data.results.map((note) => fetch(note.url)));
  	const results = await Promise.all(
		responses.map((response) => {
		if (!response.ok) {
			throw new Error(`Failed to fetch from ${response.url}`);
		}
		return response.json();
		})
	);
	console.log(results);
	
	return results;
};

export const action = async ({ request, params }) => {
	const formData = await request.formData();
	const title = formData.get("title");
	console.log(title);

	await fetch(`http://localhost:4000/todos`, {
		method: "POST",
		body: JSON.stringify({ title: title, completed: false }),
		headers: {
			"Content-type": "application/json",
		},
	});
};

export default Notes;