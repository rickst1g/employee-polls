import { connect } from "react-redux";
import Question from './Question';

const TableGrid = ({info}) => {
    const questions = info.questions;
    const users = info.users;
    const data = info.data;
    const perRow = info.perRow;
    const rows = [];

    for (let i = 0; i < data.length; i += perRow) {
        rows.push(data.slice(i, i + perRow));
    }

    return (
        <tbody>
            {
            rows.map((row, i) => (
                <tr key={i}>
                    {row.map((cell, j) => (
                        <td key={cell}><Question id={cell} questions={questions} users={users} /></td>
                    ))} 
                    {rows.length < perRow && Array.from({ length: perRow - row.length }).map((_, k) => (
                        <td key={`empty-${k}`} />
                    ))}
                </tr>
            ))
            }
        </tbody> 
    );
}

export default connect()(TableGrid);

//Reference: CoPilot suggestions For creating mapping in groups of 4