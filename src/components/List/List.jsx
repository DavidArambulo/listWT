import React from 'react';

const List = ({
    name,
    username,
    email,
    address,
    phone,
    website,
    company
}) => {
    return ( 
        <tr className='list-row'>
            <td className='item-name'>{name}</td>
            <td>{username}</td>
            <td>{email}</td>
            <td>{address.street}, {address.suite}, {address.city}, {address.zipcode}</td>
            <td>{phone}</td>
            <td>{website}</td>
            <td>{company.name}</td>
        </tr>
     );
}
 
export default List;