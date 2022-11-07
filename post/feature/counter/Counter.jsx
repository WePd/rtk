import {useSelector, useDispatch} from "react-redux";
import {increment, decrement,reset, incrementByMount } from "./counterSlice";
import {useState} from "react";

const Counter = () => {

	const count = useSelector((state) => state.counter.count)
	const dispatch = useDispatch()

	const [incrementByMounts, setIncrementByMount] = useState(0)

	const addValue = Number(incrementByMounts) || 0

	const resetAll = () => {
		//全部重置
		dispatch(reset())
		setIncrementByMount(0)
	}

	return (
		<section>
			<p>{count}</p>
			<div>
				<button onClick={() => dispatch(increment())}>+</button>
				<button onClick={() => dispatch(decrement())}>-</button>
			</div>

			<input type='text' value={incrementByMounts} onChange={(e) => setIncrementByMount(e.target.value)}/>
			<div>
				<button onClick={() => dispatch(incrementByMount(addValue))}>Increment Mount</button>
				<button onClick={resetAll}>ResetAll</button>

			</div>
		</section>
	)
}


export default  Counter