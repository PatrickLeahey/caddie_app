import handleDeleteRound from "./HandleDeleteRound";

const TableBody = ({ data, columns, deleteRoundById }) => {

  return (
    <tbody>
      {data.map((data) => {
        return (
          <tr key={data.id}>
            {columns.map(({ accessor }) => {
              const tData = data[accessor] ? data[accessor] : "——";
              return <td key={accessor}>{tData}</td>;
            })}
            <td>
              <button className="custom-button-small" onClick={() => handleDeleteRound(data.id, deleteRoundById)}>Delete</button>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};
 
export default TableBody;