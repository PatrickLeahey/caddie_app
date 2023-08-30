import TableBody from "./TableBody";
import TableHead from "./TableHead";

const Table = ({ data, columns }) => {

  return (
    <table className="table">
      <TableHead {...{ columns }}/>
      <TableBody {...{ columns, data }}/>
    </table>
  );
};

export default Table;