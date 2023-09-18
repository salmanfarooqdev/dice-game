
export default function Box(props){
    const handleBoxClick=(id)=>{
       

         const updatedDice = props.dice.map((die)=>{
          if(id === die.id)
          {
            return {...die, state: !die.state};
          }
          return die;
      
         })
         props.setAllDice(updatedDice);
         console.log(updatedDice);
      
        }
    return (
        <div className="box" style={props.style} onClick={() => handleBoxClick(props.id)}  >
            {props.value}
        </div>
    )
}