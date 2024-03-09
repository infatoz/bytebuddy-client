import React from 'react'

function SolvedProblems() {

    const data = [
        { id: 1, name: 'John Doe', age: 25 },
        { id: 2, name: 'Jane Smith', age: 30 },
        { id: 3, name: 'Bob Johnson', age: 22 },
        { id: 4, name: 'Alice Williams', age: 28 },
        { id: 5, name: 'Charlie Brown', age: 35 },
        { id: 6, name: 'Emma Davis', age: 40 },
        { id: 7, name: 'Frank Miller', age: 19 },
        { id: 8, name: 'Grace Taylor', age: 26 },
        { id: 9, name: 'Henry Turner', age: 32 },
        { id: 10, name: 'Ivy Wilson', age: 45 },
        { id: 11, name: 'Jack Anderson', age: 27 },
        { id: 12, name: 'Karen Hall', age: 21 },
        { id: 13, name: 'Leo King', age: 38 },
        { id: 14, name: 'Mia White', age: 29 },
        { id: 15, name: 'Noah Clark', age: 23 },
        { id: 16, name: 'Olivia Turner', age: 31 },
        { id: 17, name: 'Peter Adams', age: 34 },
        { id: 18, name: 'Quinn Evans', age: 37 },
        { id: 19, name: 'Ruby Harris', age: 24 },
        { id: 20, name: 'Samuel Lee', age: 33 },
      ];


  return (
    <>
      <div className="container mx-auto mt-16">
      <h1 className="text-4xl font-bold mb-8 text-center text-purple-700">Solved Problems Records</h1>
      <div className="w-3/4 mx-auto bg-white rounded-md py-8">
        <table className="w-full border">
          <thead>
            <tr className="bg-purple-500 text-white">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Age</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                <td className="py-2 px-4">{item.id}</td>
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4">{item.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}

export default SolvedProblems
