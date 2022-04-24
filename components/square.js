const Square = (props) => {
    if (!props.value) {
      return (
        <button
          className={`square sus_${props.sus}`}
          onClick={props.onClick}
          disabled={Boolean(props.winner)}
        />
      );
    }
    return (
      <button className={`square sus_${props.sus} square_${props.value.toLocaleLowerCase()}`} disabled>
        {props.value}
      </button>
    );
  };

export default Square;