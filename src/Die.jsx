import "./Die.css"
export default function Die(props){
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return(
    <div 
    className="Dice-container" 
    style={styles}
    onClick={props.holdDice}>
        <h2 className="number">{props.value}</h2>
    </div>
    )
}
