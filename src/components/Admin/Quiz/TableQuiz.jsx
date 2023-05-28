import React from 'react'

const TableQuiz = ({ quizList, handleOnClickDeleteBtn, handleOnClickUpdateBtn }) => {
  return (
    <>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Difficulty</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(quizList) &&
            quizList.length > 0 &&
            quizList.map((quizItem) => (
              <tr key={quizItem.id}>
                <th scope="row">{quizItem.id}</th>
                <td>{quizItem.name}</td>
                <td>{quizItem.description}</td>
                <td>{`${quizItem.difficulty.charAt(0)}${quizItem.difficulty
                  .slice(1)
                  .toLowerCase()}`}</td>
                <td>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleOnClickUpdateBtn(quizItem)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleOnClickDeleteBtn(quizItem)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}

export default TableQuiz
