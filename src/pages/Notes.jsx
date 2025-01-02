import { useLoaderData, Form, Link } from "react-router";
import React, { useEffect, useState } from "react";
import { Switch } from '@headlessui/react'
import {useDispatch} from "react-redux";
const Notes = () => {

	const [data, setData] = useState(useLoaderData());
	const [loading, setLoading] = useState(true);

	const [offset, setOffset]=useState(0);
	useEffect(() => {
		const fetchData = async () => {
		  try {

			const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=50`);
			const data = await res.json();

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
			setData(results);
		  } catch (err) {
			setError(err.message);
		  } finally {
			setLoading(false);
		  }
		};
	
		fetchData();
	  }, [offset]);
	const notes = data;

	const dispatch =useDispatch();

	const [searchTerm, setSearchTerm] = useState("");
	const [sortNames, setSortNames] =useState(false);
	const [excludeTypes, setExcludeTypes]=useState([]);
	

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

	const filterTypes = (note)=>{
		for(let t1 of note.types){
			//console.log(t1.type.name);
			let name1 = t1.type.name;
			if(excludeTypes.includes(name1))
			{
				console.log(note.name + " excluded");
				return false;
			}
		}
		return true;
	}

	let types = notes.map((note)=>note.types);
	types=types.flat().map((note)=>note.type.name);
	let uniqueTypes= [...(new Set(types))];

	const notes2 = notes1.filter(filterTypes);

	if(loading){<img src="https://i.pinimg.com/736x/36/2e/f3/362ef366a3fcaba012d6f9903535763e.jpg"></img>}
	// useEffect(() => {
	// 	const notes2 = notes1.filter(filterTypes); // Overwrite notes1
	// 	console.log(notes1);
	// }, [excludeTypes]);

	//types=types.map((note)=>note.type);
	//console.log(types);
	//console.log(excludeTypes);
	//notes.map((note) => {console.log(note.sprites.other.home);});
	return (
		<div  className="">
			<div className="grid grid-cols-2">
			<button className="justify-self-start w-32" disabled={offset==0} onClick={()=>setOffset(offset-50)}>
				Previous Page
				<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0wvWp3negZpp2KIa4F2Ow85vNTT2fe7g2iQ&s" className="" />
			</button>
			<button className="justify-self-end w-32" onClick={()=>setOffset(offset+50)}>
				Next Page
				<img src="https://i.pinimg.com/736x/95/32/16/953216b00d15ce516b67f244cc332a94.jpg" className="" />
			</button>
			
			</div>
			<div className="search-container">
				<input className="search-box" type="text" placeholder="Search..." 
				value={searchTerm} 
				onChange={event => {
					setSearchTerm(event.target.value);
				}}
				/>
			</div>
			
			<div>
				<h2>{notes2.length} Pokemons</h2>
				{/* <button onClick={() => {console.log("sorting");
									setSortNames(!sortNames);
									
				}}>Sort by name</button>  */}
				
				<input type="checkbox" name="" id="" checked={sortNames} onChange={()=>{
					
					//setExcludeTypes(excludeTypes.includes(type)? excludeTypes.filter((a)=> a!=type): [...excludeTypes, type]); 
					setSortNames(!sortNames);
				}}/> Sort by name

				{uniqueTypes.map((type)=> (
					<div key={type}>
						<input type="checkbox" name="" id="" checked={!excludeTypes.includes(type)} onChange={()=>{
							
							setExcludeTypes(excludeTypes.includes(type)? excludeTypes.filter((a)=> a!=type): [...excludeTypes, type]); 
						
							}}/>
						{type}
					</div>
				)
				)}
				<ul className="flex flex-row flex-wrap">
					{notes2.map((note) => (
						<div key={note.name} className="w-1/5 h-56 border-2">
							<li className="text-3xl text-center">{note.name.charAt(0).toUpperCase() + note.name.slice(1)}</li>
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
	
	const responses = await Promise.all(data.results.map((note) => fetch(note.url)));
  	const results = await Promise.all(
		responses.map((response) => {
		if (!response.ok) {
			throw new Error(`Failed to fetch from ${response.url}`);
		}
		return response.json();
		})
	);
	//console.log(results);
	
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
