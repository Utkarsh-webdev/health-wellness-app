// src/components/Card.jsx
export const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 shadow-md rounded-xl border border-gray-200 
                  dark:border-gray-700 transition-all duration-300 
                  hover:shadow-lg hover:-translate-y-1 ${className}`}
    >
      {children}
    </div>
  );
};

export const CardContent = ({ children, className = "" }) => {
  return (
    <div className={`p-4 text-gray-800 dark:text-gray-200 ${className}`}>
      {children}
    </div>
  );
};
