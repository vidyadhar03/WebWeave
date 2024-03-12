export const CardContainer = ({ title, description, children }) => {
  return (
    <div className="border border-gray-400 px-16 py-4 shadow-lg rounded-md">
      <div className="text-lg text-center">{title}</div>
      <div className="text-base text-center my-4">{description}</div>
      {children}
    </div>
  );
};

export const CardTitle = ({ children }) => {
  return <div className="text-lg text-center">{children}</div>;
};

export const CardDescription = ({ children }) => {
  return <div className="text-base text-center my-4">{children}</div>;
};
