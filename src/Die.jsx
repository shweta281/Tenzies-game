import React from "react"

export default function Die(props){
    const styles = {
                backgroundColor:  props.held? "#59E391": "white"
            }
    // console.log(props);
    
    return (
        <div className="die-face" style={styles} onClick={(e)=> props.holdDice(props.id)}>
            <h1 className="die-num">{props.value}</h1>
        </div>
    )
}


// import React from "react"

// export default function Die(props) {
//     const styles = {
//         backgroundColor: props.held ? "#59E391" : "white"
//     }
//     return (
//         <div className="die-face" onClick={props.hold} style={styles}>
//             <h2 className="die-num">{props.value}</h2>
//         </div>
//     )
// }
