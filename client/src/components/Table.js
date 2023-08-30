import TableBody from "./TableBody";
import TableHead from "./TableHead";

const Table = ({ data, columns, deleteRoundById }) => {

  return (
    <table className="table">
      <TableHead {...{ columns }}/>
      <TableBody {...{ columns, data, deleteRoundById}}/>
    </table>
  );
};

export default Table;