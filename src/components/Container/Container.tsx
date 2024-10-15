import React from "react";

const Container:React.FC<{addStyles?: string, children:React.ReactNode}> = ({addStyles, children }) => {
    return (
      <div className={`max-w-screen-xxl mx-auto px-4 sm:px-6 lg:px-8 ${addStyles}`}>
        {children}
      </div>
    )
  }

export default Container