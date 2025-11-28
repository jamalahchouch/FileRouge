
import Reac, {useState} from "react";


export default function incrementation(){

    const [count,setCount] = useState(0);
    console.log(count)

    return (
    <div>
        <h1>increentation {count}</h1>
        <button onClick={setCount(count+1)}>iNCRE?TER +1</button>
    </div>


)
}