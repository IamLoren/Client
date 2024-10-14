import React from "react";

const Container:React.FC<{children:React.ReactNode}> = ({ children }) => {
    return (
      <div className="max-w-screen-xxl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    )
  }

export default Container