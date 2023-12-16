import { useState } from "react";

function NameList() {
    const namesList = ["tien dat Mt", "Phong Vau", "duong2", "xq", "pq"];
    const [count, setCount] = useState(-10);
    function handleClick() {
        console.log("Be realistic!")
        setCount(count + 1)
    }
    return (
        <>
            <h1>Hello friends: </h1>
            <ul>
                {namesList.map((name) => {
                    return <li key={`id ${name}`}> {name} </li>
                })}
            </ul>
            <button onClick={handleClick}> Done report! {count} times </button>
        </>
    ) 
}

export default NameList