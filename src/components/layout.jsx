const MainLayout = ({ children }) => {
  return (
    <div>
      <div className="header">
        <h1>Todo List</h1>
      </div>
      <div className="content">{children}</div>
      <div className="footer">
        <p>Created by: Tin Huynh</p>
      </div>
    </div>
  );
};

export default MainLayout;
