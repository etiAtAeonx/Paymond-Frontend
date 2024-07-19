import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';

function UserTableRow({
  name,
  company,
  department,
  designation,
  phone,
  email,
  qrcodeUrl,
  selected,
  handleClick,
  onQRCodeClick,
}) {
  return (
    <TableRow hover selected={selected} onClick={handleClick}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} />
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{company}</TableCell>
      <TableCell>{department}</TableCell>
      <TableCell>{designation}</TableCell>
      <TableCell>{phone}</TableCell>

      <TableCell>{email}</TableCell>
      <TableCell>
        <img
          src={qrcodeUrl}
          alt="QR Code"
          style={{ width: 50, height: 50, cursor: 'pointer' }}
          onClick={(e) => {
            e.stopPropagation(); // Prevents the click event from bubbling up to the row
            onQRCodeClick();
          }}
        />
      </TableCell>
    </TableRow>
  );
}

export default UserTableRow;
