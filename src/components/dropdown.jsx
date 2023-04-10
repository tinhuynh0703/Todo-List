function Dropdown(props) {
  return (
    <select
      className="dropdown"
      onChange={props.handleChange}
      value={props.value}
    >
      <option value="all">All</option>
      <option value="active">Active</option>
      <option value="completed">Completed</option>
    </select>
  );
}

export default Dropdown;
